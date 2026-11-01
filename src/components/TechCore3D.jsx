import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * TechCore3D: An interactive 3D Holographic Cyber Core built with Three.js.
 * Features an outer glowing wireframe icosahedron, inner pulsing core, orbital rings,
 * floating particle field, and mouse-reactive 3D physics with viewport occlusion pausing.
 */
export default function TechCore3D({ className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer Setup
    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);

    // 2. Core 3D Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Group A: Outer Holographic Wireframe Icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xc1c1ff,
      wireframe: true,
      transparent: true,
      opacity: 0.55
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // Group B: Glowing Node Points on outer vertices
    const pointsMat = new THREE.PointsMaterial({
      color: 0x00eefc,
      size: 0.08,
      transparent: true,
      opacity: 0.95
    });
    const pointsMesh = new THREE.Points(outerGeo, pointsMat);
    coreGroup.add(pointsMesh);

    // Group C: Inner Core (Octahedron with Cyber Glow)
    const innerGeo = new THREE.OctahedronGeometry(1.2, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x5d5dff,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Solid inner core with ambient glow
    const solidInnerGeo = new THREE.IcosahedronGeometry(0.7, 0);
    const solidInnerMat = new THREE.MeshBasicMaterial({
      color: 0x00eefc,
      transparent: true,
      opacity: 0.35
    });
    const solidInnerMesh = new THREE.Mesh(solidInnerGeo, solidInnerMat);
    coreGroup.add(solidInnerMesh);

    // Group D: Orbital Hologram Rings
    const ringGeo1 = new THREE.TorusGeometry(2.8, 0.015, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00eefc,
      transparent: true,
      opacity: 0.5
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.1, 0.012, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xc1c1ff,
      transparent: true,
      opacity: 0.35
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 4;
    coreGroup.add(ring2);

    // Group E: Floating Cyber Particle Dust Field
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc1c1ff,
      size: 0.045,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 3. Mouse Interaction Tracking
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      targetRotationY = mouseX * 0.9;
      targetRotationX = -mouseY * 0.9;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 4. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // 5. Visibility / Occlusion Optimization
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // 6. Animation Loop
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Pause rendering when out of viewport

      const elapsedTime = (performance.now() - startTime) * 0.001;

      if (!prefersReducedMotion) {
        // Continuous organic rotation
        outerMesh.rotation.y += 0.004;
        outerMesh.rotation.x += 0.002;
        pointsMesh.rotation.y += 0.004;
        pointsMesh.rotation.x += 0.002;

        innerMesh.rotation.y -= 0.006;
        innerMesh.rotation.z += 0.003;

        // Subtle pulsing on inner core
        const pulse = 1 + Math.sin(elapsedTime * 2) * 0.08;
        solidInnerMesh.scale.set(pulse, pulse, pulse);

        // Orbital ring rotation
        ring1.rotation.z += 0.008;
        ring2.rotation.z -= 0.006;

        // Floating particles drift
        particles.rotation.y = elapsedTime * 0.02;

        // Mouse smooth easing (Damping lerp)
        coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.05;
        coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      outerGeo.dispose();
      outerMat.dispose();
      pointsMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      solidInnerGeo.dispose();
      solidInnerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none pointer-events-none ${className}`}
    />
  );
}
