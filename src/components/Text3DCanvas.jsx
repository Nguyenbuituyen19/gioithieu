import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import opentype from 'opentype.js';

const COLOR_THEMES = [
  { 
    id: 'cyan', 
    name: '💠 Cyan Neon (Mặc định)', 
    color: 0x00eefc, 
    emissive: 0x004455, 
    lightColor: 0x00eefc,
    introColor: 0xf5fbff,
    introEmissive: 0x051520
  },
  { 
    id: 'azure', 
    name: '🔷 Sapphire Blue', 
    color: 0x2288ff, 
    emissive: 0x001f4d, 
    lightColor: 0x3399ff,
    introColor: 0xf5f8ff,
    introEmissive: 0x081020
  },
  { 
    id: 'aqua', 
    name: '⚡ Electric Aqua', 
    color: 0x00ffcc, 
    emissive: 0x004433, 
    lightColor: 0x33ffdd,
    introColor: 0xf0fff9,
    introEmissive: 0x002218
  }
];

/**
 * Text3DCanvas: Modern Geometric 3D Typography (Montserrat Black)
 * Features:
 * 1. Cyan Neon PBR Reflective Chrome & Clearcoat Shader
 * 2. Glint Light Sweep (Moving specular point light across letters)
 * 3. Neon Pulse (Breathing emissive glow)
 * 4. Interactive Spring Inertia Tilt with Depth
 * 5. Floating Ambient Cyber Sparkles
 */
export default function Text3DCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeThemeId, setActiveThemeId] = useState('cyan');
  const [isLoaded, setIsLoaded] = useState(false);

  const materialsRef = useRef({ nameMat: null, introMat: null, rimLight: null, sweepLight: null, particleMat: null });
  const themeRef = useRef(COLOR_THEMES[0]);
  const textGroupRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let isDestroyed = false;
    let isVisible = true;

    // 1. Initial dimensions
    const width = container.clientWidth || 360;
    const isMobile = width < 540;
    const height = isMobile ? 185 : 230;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, isMobile ? 118 : 108);

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

    // 2. Studio Cyber Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(20, 35, 55);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(themeRef.current.lightColor, 4.0);
    rimLight.position.set(-35, -15, 35);
    scene.add(rimLight);
    materialsRef.current.rimLight = rimLight;

    // Moving Specular Light Sweep (Glint effect across letters)
    const sweepLight = new THREE.PointLight(themeRef.current.lightColor, 4.5, 120);
    sweepLight.position.set(-50, 0, 35);
    scene.add(sweepLight);
    materialsRef.current.sweepLight = sweepLight;

    const topSpecular = new THREE.PointLight(0xffffff, 2.0, 130);
    topSpecular.position.set(0, 45, 45);
    scene.add(topSpecular);

    // 3. Floating Ambient Cyber Sparkles
    const particleCount = 26;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 170;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 45;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: themeRef.current.lightColor,
      size: 1.5,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    materialsRef.current.particleMat = particleMat;

    // 4. Text Group
    const textGroup = new THREE.Group();
    scene.add(textGroup);
    textGroupRef.current = textGroup;

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

    // 5. Load Modern Geometric Font (Montserrat Black) & Generate 3D Extruded Meshes
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
          color: themeRef.current.introColor,
          emissive: themeRef.current.introEmissive,
          roughness: 0.22,
          metalness: 0.2,
          clearcoat: 0.8,
          clearcoatRoughness: 0.1
        });
        materialsRef.current.introMat = introMat;

        const introMesh = new THREE.Mesh(introGeo, introMat);

        // Line 2: "Nguyễn Bùi Tuyển" - Sharp, Beveled, Chrome-Clearcoat Cyan Neon
        const nameShapes = createShapesFromText(font, 'Nguyễn Bùi Tuyển', 21);
        const nameGeo = new THREE.ExtrudeGeometry(nameShapes, {
          depth: 6.8,
          bevelEnabled: true,
          bevelThickness: 1.8,
          bevelSize: 0.95,
          bevelSegments: 4
        });
        nameGeo.computeVertexNormals();

        const nameMat = new THREE.MeshPhysicalMaterial({
          color: themeRef.current.color,
          emissive: themeRef.current.emissive,
          emissiveIntensity: 1.0,
          roughness: 0.12,
          metalness: 0.38,
          clearcoat: 1.0,
          clearcoatRoughness: 0.06
        });
        materialsRef.current.nameMat = nameMat;

        const nameMesh = new THREE.Mesh(nameGeo, nameMat);

        introMesh.position.set(0, 14, 0);
        nameMesh.position.set(0, -13, 0);

        textGroup.add(introMesh);
        textGroup.add(nameMesh);

        // Center group
        const box = new THREE.Box3().setFromObject(textGroup);
        const center = box.getCenter(new THREE.Vector3());
        introMesh.position.x -= center.x;
        nameMesh.position.x -= center.x;

        // Apply responsive scale factor for small screens
        const currentW = container.clientWidth || 360;
        const scaleFactor = Math.min(1.0, Math.max(0.62, (currentW - 16) / 470));
        textGroup.scale.setScalar(scaleFactor);

        setIsLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to generate 3D text meshes:', err);
      });

    // 6. Interactive Mouse/Touch Tilt
    let targetRotX = 0;
    let targetRotY = 0;

    const updateTilt = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      const cX = rect.left + rect.width / 2;
      const cY = rect.top + rect.height / 2;

      const normX = (clientX - cX) / (window.innerWidth / 2);
      const normY = (clientY - cY) / (window.innerHeight / 2);

      targetRotY = Math.max(-0.35, Math.min(0.35, normX * 0.35));
      targetRotX = Math.max(-0.25, Math.min(0.25, -normY * 0.25));
    };

    const handleMouseMove = (e) => {
      updateTilt(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    // 7. Resize Observer - Auto scales 3D model & camera on mobile rotation/resize
    const resizeObserver = new ResizeObserver(() => {
      if (!container || isDestroyed) return;
      const w = container.clientWidth;
      if (w > 0) {
        const mob = w < 540;
        const h = mob ? 185 : 230;

        camera.aspect = w / h;
        camera.position.z = mob ? 118 : 108;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);

        if (textGroupRef.current) {
          const factor = Math.min(1.0, Math.max(0.62, (w - 16) / 470));
          textGroupRef.current.scale.setScalar(factor);
        }
      }
    });
    resizeObserver.observe(container);

    // 8. Pause when offscreen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    // 9. Render Loop: Glint Sweep + Neon Pulse + Floating Motion
    let animId;
    let lastTime = performance.now();
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const now = performance.now();
      const delta = (now - lastTime) * 0.001;
      lastTime = now;
      const time = (now - startTime) * 0.001;

      // Smooth inertia tilt
      textGroup.rotation.y += (targetRotY - textGroup.rotation.y) * 0.07;
      textGroup.rotation.x += (targetRotX - textGroup.rotation.x) * 0.07;
      textGroup.position.y = Math.sin(time * 1.6) * 1.2;

      // 1. Light Sweep across the letters (Chrome Glint effect)
      if (materialsRef.current.sweepLight) {
        materialsRef.current.sweepLight.position.x = Math.sin(time * 1.4) * 65;
        materialsRef.current.sweepLight.position.y = Math.cos(time * 1.4) * 10;
      }

      // 2. Neon Pulse Emissive Breathing
      if (materialsRef.current.nameMat) {
        const pulse = 1.0 + Math.sin(time * 2.4) * 0.45;
        materialsRef.current.nameMat.emissiveIntensity = pulse;
      }

      // 3. Floating Cyber Particles
      const pArr = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pArr[i * 3 + 1] += delta * 7;
        if (pArr[i * 3 + 1] > 35) {
          pArr[i * 3 + 1] = -35;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  const handleColorChange = (themeId) => {
    setActiveThemeId(themeId);
    const theme = COLOR_THEMES.find((t) => t.id === themeId);
    if (!theme) return;
    themeRef.current = theme;

    if (materialsRef.current.nameMat) {
      materialsRef.current.nameMat.color.setHex(theme.color);
      materialsRef.current.nameMat.emissive.setHex(theme.emissive);
    }
    if (materialsRef.current.rimLight) {
      materialsRef.current.rimLight.color.setHex(theme.lightColor);
    }
    if (materialsRef.current.sweepLight) {
      materialsRef.current.sweepLight.color.setHex(theme.lightColor);
    }
    if (materialsRef.current.particleMat) {
      materialsRef.current.particleMat.color.setHex(theme.lightColor);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full flex flex-col items-center lg:items-start select-none">
      {/* Real 3D WebGL Canvas with pan-y touch-action so mobile vertical scroll is smooth */}
      <div className="relative w-full h-[185px] sm:h-[210px] md:h-[230px] flex items-center justify-center">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-7 h-7 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin"></div>
          </div>
        )}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y" 
          style={{ touchAction: 'pan-y' }}
        />
      </div>

      {/* Palette Selector Bar - Compact & wrap-friendly on mobile */}
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 mt-2 bg-white/5 border border-white/10 p-1 rounded-xl backdrop-blur-md max-w-full">
        <span className="font-label-mono text-[9px] sm:text-[10px] text-on-surface-variant/70 px-1.5 uppercase tracking-wider font-semibold">
          Sắc độ xanh:
        </span>
        {COLOR_THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleColorChange(theme.id)}
            className={`font-label-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-lg transition-all cursor-pointer ${
              activeThemeId === theme.id
                ? 'bg-secondary/20 text-secondary border border-secondary/40 font-bold shadow-[0_0_10px_rgba(0,238,252,0.25)]'
                : 'text-on-surface-variant hover:text-white hover:bg-white/5'
            }`}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
}
