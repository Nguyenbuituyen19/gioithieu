import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import opentype from 'opentype.js';

const COLOR_THEMES = [
  { 
    id: 'amber', 
    name: '🟡 Vàng Cam', 
    color: 0xffaa00, 
    emissive: 0x441800, 
    lightColor: 0xff8800,
    introColor: 0xf0f0f5,
    introEmissive: 0x111118
  },
  { 
    id: 'mint', 
    name: '🟢 Xanh Mint', 
    color: 0x00f5a0, 
    emissive: 0x003318, 
    lightColor: 0x00d9f5,
    introColor: 0xf0f0f5,
    introEmissive: 0x111118
  },
  { 
    id: 'coral', 
    name: '🌸 Hồng San Hô', 
    color: 0xff3b6f, 
    emissive: 0x440018, 
    lightColor: 0xff88a3,
    introColor: 0xf0f0f5,
    introEmissive: 0x111118
  }
];

/**
 * Text3DCanvas: Mobile-Optimized Real 3D WebGL Mesh Typography
 * Dynamically recalculates 3D font scale and camera field of view based on container width
 * so the 3D text fits on mobile screens (320px - 480px) without overflow.
 */
export default function Text3DCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeThemeId, setActiveThemeId] = useState('amber');
  const [isLoaded, setIsLoaded] = useState(false);

  const materialsRef = useRef({ nameMat: null, introMat: null, rimLight: null });
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
    camera.position.set(0, 0, isMobile ? 115 : 105);

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

    // 2. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(20, 30, 50);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(themeRef.current.lightColor, 3.5);
    rimLight.position.set(-30, -10, 30);
    scene.add(rimLight);
    materialsRef.current.rimLight = rimLight;

    const topSpecular = new THREE.PointLight(0xffffff, 1.8, 120);
    topSpecular.position.set(0, 40, 40);
    scene.add(topSpecular);

    // 3. Text Group
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

    // 4. Load Font & Generate Extruded 3D Meshes
    const fontUrl = `${import.meta.env.BASE_URL}fonts/baloo2-extrabold.ttf`;

    fetch(fontUrl)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        if (isDestroyed) return;

        const font = opentype.parse(buffer);

        // Line 1: "Chào, mình là"
        const introShapes = createShapesFromText(font, 'Chào, mình là', 13);
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
          roughness: 0.25,
          metalness: 0.2,
          clearcoat: 0.6,
          clearcoatRoughness: 0.15
        });
        materialsRef.current.introMat = introMat;

        const introMesh = new THREE.Mesh(introGeo, introMat);

        // Line 2: "Nguyễn Bùi Tuyển"
        const nameShapes = createShapesFromText(font, 'Nguyễn Bùi Tuyển', 22);
        const nameGeo = new THREE.ExtrudeGeometry(nameShapes, {
          depth: 6.0,
          bevelEnabled: true,
          bevelThickness: 1.6,
          bevelSize: 0.9,
          bevelSegments: 4
        });
        nameGeo.computeVertexNormals();

        const nameMat = new THREE.MeshPhysicalMaterial({
          color: themeRef.current.color,
          emissive: themeRef.current.emissive,
          roughness: 0.18,
          metalness: 0.25,
          clearcoat: 0.9,
          clearcoatRoughness: 0.1
        });
        materialsRef.current.nameMat = nameMat;

        const nameMesh = new THREE.Mesh(nameGeo, nameMat);

        introMesh.position.set(0, 13, 0);
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

    // 5. Mouse/Touch Interaction for 3D Tilt
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

    // 6. Resize Observer - Auto scales 3D model & camera on mobile rotation/resize
    const resizeObserver = new ResizeObserver(() => {
      if (!container || isDestroyed) return;
      const w = container.clientWidth;
      if (w > 0) {
        const mob = w < 540;
        const h = mob ? 185 : 230;

        camera.aspect = w / h;
        camera.position.z = mob ? 115 : 105;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);

        if (textGroupRef.current) {
          const factor = Math.min(1.0, Math.max(0.62, (w - 16) / 470));
          textGroupRef.current.scale.setScalar(factor);
        }
      }
    });
    resizeObserver.observe(container);

    // 7. Pause when offscreen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    // 8. Render Loop
    let animId;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const now = performance.now();
      const time = (now - startTime) * 0.001;

      textGroup.rotation.y += (targetRotY - textGroup.rotation.y) * 0.06;
      textGroup.rotation.x += (targetRotX - textGroup.rotation.x) * 0.06;
      textGroup.position.y = Math.sin(time * 1.5) * 1.0;

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
          Màu chữ:
        </span>
        {COLOR_THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleColorChange(theme.id)}
            className={`font-label-mono text-[10px] sm:text-[11px] px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
              activeThemeId === theme.id
                ? 'bg-white/15 text-white border border-white/30 font-bold shadow-sm'
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