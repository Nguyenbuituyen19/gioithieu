import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import opentype from 'opentype.js';

const COLOR_THEMES = [
  { 
    id: 'amber', 
    name: '🟡 Vàng Cam Hổ Phách', 
    color: 0xffaa00, 
    emissive: 0x441800, 
    lightColor: 0xff8800,
    introColor: 0xf0f0f5,
    introEmissive: 0x111118
  },
  { 
    id: 'mint', 
    name: '🟢 Xanh Neon Mint', 
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
 * Text3DCanvas: True 3D WebGL Mesh Typography
 * Generates authentic extruded 3D geometry from chubby TTF font ('Baloo 2 ExtraBold')
 * with real physics bevels, specular reflections, rim lights, and mouse interaction.
 */
export default function Text3DCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeThemeId, setActiveThemeId] = useState('amber');
  const [isLoaded, setIsLoaded] = useState(false);

  const materialsRef = useRef({ nameMat: null, introMat: null, rimLight: null });
  const themeRef = useRef(COLOR_THEMES[0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let isDestroyed = false;
    let isVisible = true;

    // 1. Scene, Camera, Renderer
    const width = container.clientWidth || 550;
    const height = 240;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 110);

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

    // 3. 3D Text Group with mouse rotation
    const textGroup = new THREE.Group();
    scene.add(textGroup);

    // Helper: convert opentype font path to THREE.Shapes
    const createShapesFromText = (font, text, fontSize) => {
      const path = font.getPath(text, 0, 0, fontSize);
      const shapePath = new THREE.ShapePath();

      path.commands.forEach((cmd) => {
        // Invert Y because font coordinates have Y pointing down
        if (cmd.type === 'M') shapePath.moveTo(cmd.x, -cmd.y);
        else if (cmd.type === 'L') shapePath.lineTo(cmd.x, -cmd.y);
        else if (cmd.type === 'Q') shapePath.quadraticCurveTo(cmd.x1, -cmd.y1, cmd.x, -cmd.y);
        else if (cmd.type === 'C') shapePath.bezierCurveTo(cmd.x1, -cmd.y1, cmd.x2, -cmd.y2, cmd.x, -cmd.y);
        else if (cmd.type === 'Z') shapePath.closePath();
      });

      return shapePath.toShapes(true);
    };

    // 4. Load TTF and generate 3D Extruded Meshes
    const fontUrl = `${import.meta.env.BASE_URL}fonts/baloo2-extrabold.ttf`;

    fetch(fontUrl)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        if (isDestroyed) return;

        const font = opentype.parse(buffer);

        // Line 1: "Chào, mình là"
        const introShapes = createShapesFromText(font, 'Chào, mình là', 13.5);
        const introGeo = new THREE.ExtrudeGeometry(introShapes, {
          depth: 3.5,
          bevelEnabled: true,
          bevelThickness: 1.0,
          bevelSize: 0.6,
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

        // Line 2: "Nguyễn Bùi Tuyển" (Chubby 3D Headline)
        const nameShapes = createShapesFromText(font, 'Nguyễn Bùi Tuyển', 22.5);
        const nameGeo = new THREE.ExtrudeGeometry(nameShapes, {
          depth: 6.5,
          bevelEnabled: true,
          bevelThickness: 1.8,
          bevelSize: 1.0,
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

        // Position meshes relative to each other
        introMesh.position.set(0, 14, 0);
        nameMesh.position.set(0, -14, 0);

        textGroup.add(introMesh);
        textGroup.add(nameMesh);

        // Center group in viewport
        const box = new THREE.Box3().setFromObject(textGroup);
        const center = box.getCenter(new THREE.Vector3());
        introMesh.position.x -= center.x;
        nameMesh.position.x -= center.x;

        setIsLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to generate 3D text meshes:', err);
      });

    // 5. Mouse Interaction for 3D Tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const cX = rect.left + rect.width / 2;
      const cY = rect.top + rect.height / 2;

      const normX = (e.clientX - cX) / (window.innerWidth / 2);
      const normY = (e.clientY - cY) / (window.innerHeight / 2);

      targetRotY = Math.max(-0.45, Math.min(0.45, normX * 0.45));
      targetRotX = Math.max(-0.35, Math.min(0.35, -normY * 0.35));
    };

    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    // 6. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || isDestroyed) return;
      const w = container.clientWidth;
      if (w > 0) {
        camera.aspect = w / height;
        camera.updateProjectionMatrix();
        renderer.setSize(w, height);
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

      // Smooth damping interpolation
      textGroup.rotation.y += (targetRotY - textGroup.rotation.y) * 0.06;
      textGroup.rotation.x += (targetRotX - textGroup.rotation.x) * 0.06;

      // Subtle breathing float
      textGroup.position.y = Math.sin(time * 1.5) * 1.2;

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

  // Handle color change
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
      {/* Real 3D WebGL Canvas */}
      <div className="relative w-full h-[240px] flex items-center justify-center">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin"></div>
          </div>
        )}
        <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      </div>

      {/* Palette Selector Bar */}
      <div className="flex items-center gap-2 mt-1 bg-white/5 border border-white/10 p-1 rounded-xl backdrop-blur-md">
        <span className="font-label-mono text-[10px] text-on-surface-variant/70 px-2 uppercase tracking-wider font-semibold">
          Màu mô hình 3D:
        </span>
        {COLOR_THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleColorChange(theme.id)}
            className={`font-label-mono text-[11px] px-2.5 py-0.5 rounded-lg transition-all cursor-pointer ${
              activeThemeId === theme.id
                ? 'bg-white/15 text-white border border-white/30 font-bold shadow-md'
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