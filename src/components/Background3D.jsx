import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Background3D: Scroll-Driven 3D WebGL Cyber Horizon
 * The cyber grid, starfield, and camera dynamically warp and accelerate
 * according to user scroll position and velocity.
 */
export default function Background3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x131314, 0.045);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 3.2, 12);
    camera.rotation.x = -0.22;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // 2. 3D Cyber Grid Ground Plane
    const gridW = 60;
    const gridH = 60;
    const gridSegments = 45;
    const planeGeo = new THREE.PlaneGeometry(gridW, gridH, gridSegments, gridSegments);
    planeGeo.rotateX(-Math.PI / 2);
    planeGeo.translate(0, -2.2, 0);

    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x00eefc,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const gridMesh = new THREE.Mesh(planeGeo, planeMat);
    scene.add(gridMesh);

    // Save initial vertex Y coordinates for wave effect
    const positionAttr = planeGeo.attributes.position;
    const vertexCount = positionAttr.count;
    const initialY = new Float32Array(vertexCount);
    for (let i = 0; i < vertexCount; i++) {
      initialY[i] = positionAttr.getY(i);
    }

    // 3. Floating 3D Starfield / Data Particles
    const starCount = 380;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 40;
      starPositions[i + 1] = Math.random() * 20 - 2;
      starPositions[i + 2] = (Math.random() - 0.5) * 40;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xc1c1ff,
      size: 0.055,
      transparent: true,
      opacity: 0.75
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 4. Subtle Floating 3D Geometric Glyphs in Background
    const glyphsGroup = new THREE.Group();
    const glyphGeos = [
      new THREE.IcosahedronGeometry(0.7, 0),
      new THREE.OctahedronGeometry(0.6, 0),
      new THREE.TetrahedronGeometry(0.8, 0)
    ];
    const glyphMat = new THREE.MeshBasicMaterial({
      color: 0xc1c1ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });

    const glyphMeshes = [];
    for (let i = 0; i < 7; i++) {
      const geo = glyphGeos[i % glyphGeos.length];
      const mesh = new THREE.Mesh(geo, glyphMat);
      mesh.position.set(
        (Math.random() - 0.5) * 26,
        Math.random() * 9 + 1,
        (Math.random() - 0.5) * 20
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      glyphsGroup.add(mesh);
      glyphMeshes.push({
        mesh,
        baseRotSpeed: (Math.random() - 0.5) * 0.015,
        rotSpeedX: 0,
        rotSpeedY: 0
      });
    }
    scene.add(glyphsGroup);

    // 5. Parallax & Scroll Listeners with Velocity Tracking
    let targetX = 0;
    let targetY = 0;
    let currentScrollY = window.scrollY;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let smoothVelocity = 0;

    const handleMouseMove = (e) => {
      targetX = ((e.clientX / window.innerWidth) * 2 - 1) * 0.9;
      targetY = -((e.clientY / window.innerHeight) * 2 - 1) * 0.6;
    };

    const handleScroll = () => {
      currentScrollY = window.scrollY;
      scrollVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation Loop (Scroll-Driven Physics)
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        const time = (performance.now() - startTime) * 0.001;

        // Smooth velocity decay (inertial damping)
        smoothVelocity += (scrollVelocity - smoothVelocity) * 0.12;
        scrollVelocity *= 0.88; // decay

        // Dynamic wave time accelerated by scroll velocity
        const scrollOffset = currentScrollY * 0.003;
        const waveTime = time * 1.5 + scrollOffset;

        // Animate undulating cyber plane wave
        for (let i = 0; i < vertexCount; i++) {
          const x = positionAttr.getX(i);
          const z = positionAttr.getZ(i);
          const wave =
            Math.sin(x * 0.3 + waveTime) * (0.28 + Math.abs(smoothVelocity) * 0.01) +
            Math.cos(z * 0.3 + waveTime * 0.8) * 0.25;
          positionAttr.setY(i, initialY[i] + wave);
        }
        positionAttr.needsUpdate = true;

        // Infinite ground grid movement on scroll
        gridMesh.position.z = (currentScrollY * 0.02) % (gridH / gridSegments);

        // Spin glyphs faster during active scroll
        glyphMeshes.forEach(({ mesh, baseRotSpeed }) => {
          mesh.rotation.x += baseRotSpeed + smoothVelocity * 0.003;
          mesh.rotation.y += baseRotSpeed * 1.2 + smoothVelocity * 0.002;
        });

        // Drift & zoom starfield with scroll
        starField.rotation.y = time * 0.015 + currentScrollY * 0.0003;

        // Scroll-Driven Camera Tilt & Zoom
        const targetCamY = 3.2 + targetY - (currentScrollY * 0.001);
        const targetCamZ = 12 - Math.min(currentScrollY * 0.0008, 3.5);
        const targetRotX = -0.22 - (smoothVelocity * 0.003);

        camera.position.x += (targetX - camera.position.x) * 0.04;
        camera.position.y += (targetCamY - camera.position.y) * 0.04;
        camera.position.z += (targetCamZ - camera.position.z) * 0.04;
        camera.rotation.x += (targetRotX - camera.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      planeGeo.dispose();
      planeMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      glyphGeos.forEach((g) => g.dispose());
      glyphMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D Cyber Space Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}bg-space-3d.jpg)` }}
      />
      
      {/* 3D WebGL Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* Ambient Cyber Fog Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#131314]/80 via-transparent to-[#131314]/90 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#131314_100%)] pointer-events-none" />
    </div>
  );
}
