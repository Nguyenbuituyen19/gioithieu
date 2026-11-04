import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import opentype from 'opentype.js';

// Dedicated Sapphire Blue Palette
const SAPPHIRE_BLUE = {
  name: 'Sapphire Blue',
  color: 0x0077ff,          // Vivid Electric Sapphire
  emissive: 0x002b66,       // Deep Royal Blue Emissive
  lightColor: 0x3399ff,     // Bright Specular Reflection
  introColor: 0xf0f6ff,     // Pristine Ice White with subtle cool tint
  introEmissive: 0x051226   // Deep subtle glow
};

/**
 * Text3DCanvas: Modern Geometric 3D Typography (Montserrat Black) in Pure Sapphire Blue
 * 
 * Interactive Mouse Effect:
 * - Dynamic Cursor Spotlight (Sapphire PointLight glides directly with mouse across 3D beveled letters)
 * - Ultra-smooth Magnetic 3D Parallax & Depth (Gentle position shift & subtle micro-tilt with spring damping)
 * - Autonomous Ambient Glint when mouse is idle / offscreen
 */
export default function Text3DCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const textGroupRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let isDestroyed = false;
    let isVisible = true;

    // 1. Initial dimensions & responsiveness
    const width = container.clientWidth || 360;
    const isMobile = width < 540;
    const height = isMobile ? 180 : 220;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, isMobile ? 116 : 106);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // 2. Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(25, 35, 60);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(SAPPHIRE_BLUE.lightColor, 3.8);
    rimLight.position.set(-35, -15, 35);
    scene.add(rimLight);

    // Dynamic Cursor Spotlight (PointLight tracking mouse cursor over 3D letters)
    const cursorSpotlight = new THREE.PointLight(SAPPHIRE_BLUE.lightColor, 5.0, 130);
    cursorSpotlight.position.set(0, 0, 30);
    scene.add(cursorSpotlight);

    const topSpecular = new THREE.PointLight(0xffffff, 1.8, 120);
    topSpecular.position.set(0, 45, 45);
    scene.add(topSpecular);

    // 3. Floating Ambient Sapphire Sparks
    const particleCount = 24;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 160;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 45;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: SAPPHIRE_BLUE.lightColor,
      size: 1.4,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Text Group
    const textGroup = new THREE.Group();
    scene.add(textGroup);
    textGroupRef.current = textGroup;

    let nameMaterial = null;

    const createShapesFromText = (font, text, fontSize) => {
      const path = font.getPath(text, 0, 0, fontSize);
      const shapePath = new THREE.ShapePath();

      path.commands.forEach((cmd) => {
        if (cmd.type === 'M') shapePath.moveTo(cmd.x, -cmd.y);
        else if (cmd.type === 'L') shapePath.lineTo(cmd.x, -cmd.y);
        else if (cmd.type === 'Q') shapePath.quadraticCurveTo(cmd.x1, -cmd.y1, cmd.x, -cmd.y);
        else if (cmd.type === 'C') shapePath.bezierCurveTo(cmd.x1, -cmd.y1, cmd.x2, -cmd.y2, cmd.x, -cmd.y);
        else if (cmd.type === 'Z') shapePath.closePath();
      });

      return shapePath.toShapes(true);
    };

    // 5. Load Font (Montserrat Black) & Generate 3D Meshes
    const fontUrl = `${import.meta.env.BASE_URL}fonts/montserrat-black.ttf`;

    fetch(fontUrl)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        if (isDestroyed) return;

        const font = opentype.parse(buffer);

        // Line 1: "Chào, mình là"
        const introShapes = createShapesFromText(font, 'Chào, mình là', 12.5);
        const introGeo = new THREE.ExtrudeGeometry(introShapes, {
          depth: 3.2,
          bevelEnabled: true,
          bevelThickness: 0.9,
          bevelSize: 0.5,
          bevelSegments: 3
        });
        introGeo.computeVertexNormals();

        const introMat = new THREE.MeshPhysicalMaterial({
          color: SAPPHIRE_BLUE.introColor,
          emissive: SAPPHIRE_BLUE.introEmissive,
          roughness: 0.22,
          metalness: 0.2,
          clearcoat: 0.8,
          clearcoatRoughness: 0.1
        });

        const introMesh = new THREE.Mesh(introGeo, introMat);

        // Line 2: "Nguyễn Bùi Tuyển" in Pure Sapphire Blue
        const nameShapes = createShapesFromText(font, 'Nguyễn Bùi Tuyển', 21);
        const nameGeo = new THREE.ExtrudeGeometry(nameShapes, {
          depth: 6.8,
          bevelEnabled: true,
          bevelThickness: 1.8,
          bevelSize: 0.95,
          bevelSegments: 4
        });
        nameGeo.computeVertexNormals();

        nameMaterial = new THREE.MeshPhysicalMaterial({
          color: SAPPHIRE_BLUE.color,
          emissive: SAPPHIRE_BLUE.emissive,
          emissiveIntensity: 1.1,
          roughness: 0.12,
          metalness: 0.40,
          clearcoat: 1.0,
          clearcoatRoughness: 0.06
        });

        const nameMesh = new THREE.Mesh(nameGeo, nameMaterial);

        introMesh.position.set(0, 14, 0);
        nameMesh.position.set(0, -13, 0);

        textGroup.add(introMesh);
        textGroup.add(nameMesh);

        // Center group
        const box = new THREE.Box3().setFromObject(textGroup);
        const center = box.getCenter(new THREE.Vector3());
        introMesh.position.x -= center.x;
        nameMesh.position.x -= center.x;

        // Responsive scale factor for small screens
        const currentW = container.clientWidth || 360;
        const scaleFactor = Math.min(1.0, Math.max(0.62, (currentW - 16) / 470));
        textGroup.scale.setScalar(scaleFactor);

        setIsLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to generate 3D text meshes:', err);
      });

    // 6. Interactive Mouse Motion Tracking (Spotlight follow + Parallax Depth)
    let isMouseOver = false;
    let targetNormX = 0;
    let targetNormY = 0;

    const handlePointerMove = (e) => {
      isMouseOver = true;
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetNormX = Math.max(-1.2, Math.min(1.2, normX));
      targetNormY = Math.max(-1.2, Math.min(1.2, normY));
    };

    const handlePointerLeave = () => {
      isMouseOver = false;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    // 7. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || isDestroyed) return;
      const w = container.clientWidth;
      if (w > 0) {
        const mob = w < 540;
        const h = mob ? 180 : 220;

        camera.aspect = w / h;
        camera.position.z = mob ? 116 : 106;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);

        if (textGroupRef.current) {
          const factor = Math.min(1.0, Math.max(0.62, (w - 16) / 470));
          textGroupRef.current.scale.setScalar(factor);
        }
      }
    });
    resizeObserver.observe(container);

    // 8. Intersection Observer (Pause when offscreen)
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    // 9. Render Loop: Cursor Spotlight + Parallax Tilt + Breathing
    let animId;
    let lastTime = performance.now();
    const startTime = performance.now();

    let currentNormX = 0;
    let currentNormY = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const now = performance.now();
      const delta = (now - lastTime) * 0.001;
      lastTime = now;
      const time = (now - startTime) * 0.001;

      // Smooth pointer lerp
      const lerpSpeed = 0.065;
      currentNormX = THREE.MathUtils.lerp(currentNormX, isMouseOver ? targetNormX : Math.sin(time * 1.2) * 0.5, lerpSpeed);
      currentNormY = THREE.MathUtils.lerp(currentNormY, isMouseOver ? targetNormY : Math.cos(time * 1.2) * 0.3, lerpSpeed);

      // Effect 1: Cursor-Driven Sapphire Spotlight (Gleams across 3D letters)
      cursorSpotlight.position.x = currentNormX * 52;
      cursorSpotlight.position.y = currentNormY * 26;
      cursorSpotlight.position.z = 28 + Math.sin(time * 2.0) * 4;

      // Effect 2: 3D Magnetic Parallax Shift & Micro-Tilt
      textGroup.position.x = THREE.MathUtils.lerp(textGroup.position.x, currentNormX * 3.5, 0.05);
      textGroup.position.y = THREE.MathUtils.lerp(textGroup.position.y, (currentNormY * 2.5) + (Math.sin(time * 1.6) * 1.0), 0.05);
      textGroup.rotation.y = THREE.MathUtils.lerp(textGroup.rotation.y, currentNormX * 0.14, 0.05);
      textGroup.rotation.x = THREE.MathUtils.lerp(textGroup.rotation.x, -currentNormY * 0.09, 0.05);

      // Effect 3: Sapphire Emissive Pulse
      if (nameMaterial) {
        const pulse = 1.0 + Math.sin(time * 2.2) * 0.35;
        nameMaterial.emissiveIntensity = pulse;
      }

      // Effect 4: Floating Sapphire Sparks
      const pArr = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pArr[i * 3 + 1] += delta * 6;
        if (pArr[i * 3 + 1] > 32) {
          pArr[i * 3 + 1] = -32;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animId);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full flex flex-col items-center lg:items-start select-none">
      {/* 3D WebGL Canvas with pan-y touch-action for smooth mobile scrolling */}
      <div className="relative w-full h-[180px] sm:h-[205px] md:h-[220px] flex items-center justify-center">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-7 h-7 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y" 
          style={{ touchAction: 'pan-y' }}
        />
      </div>
    </div>
  );
}
