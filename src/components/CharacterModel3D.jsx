import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const getModelUrl = (filename) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}models/${filename}`;
};

const ANIMATIONS = [
  { label: '👋 Vẫy tay', act: 'Wave' },
  { label: '👍 Thumbs Up', act: 'ThumbsUp' },
  { label: '💃 Nhảy múa', act: 'Dance' },
  { label: '⚡ Đứng chờ', act: 'Idle' },
  { label: '🪑 Ngồi nghỉ', act: 'Sitting' },
  { label: '🦘 Nhảy cao', act: 'Jump' },
  { label: '🚶 Bước đi', act: 'Walking' },
  { label: '🥊 Quyết tâm', act: 'Punch' }
];

// Helper to create a soft radial gradient canvas for contact shadows
function createContactShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 120);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
  gradient.addColorStop(0.3, 'rgba(0, 0, 0, 0.55)');
  gradient.addColorStop(0.65, 'rgba(0, 0, 0, 0.18)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function CharacterModel3D({ className = '' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentAction, setCurrentAction] = useState('Wave');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const mixerRef = useRef(null);
  const actionsRef = useRef({});
  const controlsRef = useRef(null);
  const currentModelRef = useRef(null);
  const playActionRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const baseYRef = useRef(-1.2);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let isDestroyed = false;
    let isVisible = true;

    // 1. Responsive Dimensions
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;
    const isMobile = width < 500;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, isMobile ? 0.45 : 0.55, isMobile ? 4.2 : 3.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;

    // Enable soft shadow mapping
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. Realistic IBL Environment Map (PBR RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    const envTexture = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    scene.environment = envTexture;

    // 3. OrbitControls with smooth damping
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.target.set(0, 0.12, 0);
    controls.minDistance = 1.8;
    controls.maxDistance = 5.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.12;
    controls.autoRotate = false;
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN
    };
    controlsRef.current = controls;

    // 4. Professional Studio 3-Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Key Light (Warm sunlight with sharp-to-soft shadows)
    const keyLight = new THREE.DirectionalLight(0xfff6ea, 2.8);
    keyLight.position.set(3.5, 5, 3.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 14;
    keyLight.shadow.camera.left = -2;
    keyLight.shadow.camera.right = 2;
    keyLight.shadow.camera.top = 2;
    keyLight.shadow.camera.bottom = -2;
    keyLight.shadow.bias = -0.0004;
    keyLight.shadow.radius = 2.2;
    scene.add(keyLight);

    // Fill Light (Cyber Cyan)
    const fillLight = new THREE.DirectionalLight(0x00eefc, 2.0);
    fillLight.position.set(-3.5, 3, -1.5);
    scene.add(fillLight);

    // Rim / Backlight (Electric Violet for silhouette separation)
    const rimLight = new THREE.DirectionalLight(0xa855f7, 2.2);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Upward pedestal glow
    const bottomGlow = new THREE.PointLight(0x00eefc, 2.2, 5);
    bottomGlow.position.set(0, -1.1, 0);
    scene.add(bottomGlow);

    // 5. Holographic Cyber Pedestal & Grounding
    const pedestalGroup = new THREE.Group();

    // Contact Shadow Disc (Directly grounds the robot feet)
    const contactTexture = createContactShadowTexture();
    const contactGeo = new THREE.PlaneGeometry(1.9, 1.9);
    contactGeo.rotateX(-Math.PI / 2);
    const contactMat = new THREE.MeshBasicMaterial({
      map: contactTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });
    const contactMesh = new THREE.Mesh(contactGeo, contactMat);
    contactMesh.position.y = -1.195;
    pedestalGroup.add(contactMesh);

    // Directional Shadow Receiver Plane
    const shadowPlaneGeo = new THREE.PlaneGeometry(3.5, 3.5);
    shadowPlaneGeo.rotateX(-Math.PI / 2);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.45 });
    const shadowMesh = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowMesh.position.y = -1.196;
    shadowMesh.receiveShadow = true;
    pedestalGroup.add(shadowMesh);

    // Holographic Outer Glowing Ring
    const ringGeo = new THREE.RingGeometry(1.25, 1.34, 64);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00eefc,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = -1.2;
    pedestalGroup.add(ringMesh);

    // Secondary Pulsing Energy Ring
    const pulseGeo = new THREE.RingGeometry(1.0, 1.05, 48);
    pulseGeo.rotateX(-Math.PI / 2);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
    });
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    pulseMesh.position.y = -1.205;
    pedestalGroup.add(pulseMesh);

    // Cyber Platform Base Disc
    const discGeo = new THREE.CircleGeometry(1.24, 64);
    discGeo.rotateX(-Math.PI / 2);
    const discMat = new THREE.MeshStandardMaterial({
      color: 0x111318,
      metalness: 0.85,
      roughness: 0.25,
      transparent: true,
      opacity: 0.95
    });
    const discMesh = new THREE.Mesh(discGeo, discMat);
    discMesh.position.y = -1.21;
    discMesh.receiveShadow = true;
    pedestalGroup.add(discMesh);

    // Ambient Cyber Dust Particles
    const particleCount = 28;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 2.2;
      particlePositions[i * 3 + 1] = -1.2 + Math.random() * 2.2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2.2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00eefc,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    pedestalGroup.add(particlePoints);

    scene.add(pedestalGroup);

    // 6. Setup DRACO & GLTF Loader
    const dracoLoader = new DRACOLoader();
    const basePath = import.meta.env.BASE_URL || '/';
    const cleanBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
    dracoLoader.setDecoderPath(`${cleanBase}draco/gltf/`);
    dracoLoader.setDecoderConfig({ type: 'js' });

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    // Load Robot Model with PBR enhancements
    const loadRobotModel = () => {
      setIsLoading(true);
      setErrorMessage(null);

      if (currentModelRef.current) {
        scene.remove(currentModelRef.current);
        currentModelRef.current = null;
      }
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        mixerRef.current = null;
      }
      actionsRef.current = {};

      const url = getModelUrl('robot.glb');

      loader.load(
        url,
        (gltf) => {
          if (isDestroyed) return;

          const model = gltf.scene;

          // Normalize size
          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          
          if (maxDim > 0) {
            const scaleFactor = 2.1 / maxDim;
            model.scale.setScalar(scaleFactor);
          }

          const scaledBox = new THREE.Box3().setFromObject(model);
          const center = scaledBox.getCenter(new THREE.Vector3());
          model.position.x = -center.x;
          model.position.z = -center.z;
          const groundedY = -scaledBox.min.y - 1.2;
          model.position.y = groundedY;
          baseYRef.current = groundedY;

          // PBR Materials & Emissive Glow Tuning
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              if (child.material) {
                child.material.envMapIntensity = 1.35;
                // Boost emissive components (eyes, chest LEDs, status rings)
                const isEmissive = 
                  child.name.toLowerCase().includes('eye') ||
                  child.name.toLowerCase().includes('light') ||
                  (child.material.emissive && child.material.emissive.getHex() > 0);

                if (isEmissive) {
                  child.material.emissiveIntensity = 2.6;
                }
              }
            }
          });

          scene.add(model);
          currentModelRef.current = model;

          // Setup Animations with smooth crossfade
          if (gltf.animations && gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(model);
            mixerRef.current = mixer;

            gltf.animations.forEach((clip) => {
              const action = mixer.clipAction(clip);
              actionsRef.current[clip.name] = action;
            });

            const defaultClip = actionsRef.current['Wave'] || Object.values(actionsRef.current)[0];
            if (defaultClip) {
              defaultClip.reset().fadeIn(0.25).play();
              setCurrentAction('Wave');
            }
          }

          setIsLoading(false);
        },
        undefined,
        (err) => {
          console.error('Error loading Robot 3D model:', err);
          if (!isDestroyed) {
            setIsLoading(false);
            setErrorMessage('Không thể tải mô hình Robot Trợ Lý 3D.');
          }
        }
      );
    };

    playActionRef.current = (actionName) => {
      const action = actionsRef.current[actionName];
      if (!action || !mixerRef.current) return;

      Object.values(actionsRef.current).forEach((act) => {
        if (act !== action) act.fadeOut(0.28);
      });

      action.reset().fadeIn(0.28).play();
      setCurrentAction(actionName);
    };

    loadRobotModel();

    // 7. Interactive Pointer Movement (Head / Body subtle tracking)
    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointerRef.current.targetX = Math.max(-1, Math.min(1, x));
      pointerRef.current.targetY = Math.max(-1, Math.min(1, y));
    };

    const handlePointerLeave = () => {
      pointerRef.current.targetX = 0;
      pointerRef.current.targetY = 0;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    // 8. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || isDestroyed) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        const mob = w < 500;
        camera.aspect = w / h;
        camera.position.set(0, mob ? 0.45 : 0.55, mob ? 4.2 : 3.8);
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // 9. Pause when offscreen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    // 10. Render loop with micro-breathing & lifelike tracking
    let lastTime = performance.now();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const now = performance.now();
      const delta = (now - lastTime) * 0.001;
      lastTime = now;

      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      // Smooth pointer lerp
      pointerRef.current.x = THREE.MathUtils.lerp(
        pointerRef.current.x,
        pointerRef.current.targetX,
        0.06
      );
      pointerRef.current.y = THREE.MathUtils.lerp(
        pointerRef.current.y,
        pointerRef.current.targetY,
        0.06
      );

      // Subtle reactive torso tracking & micro-breathing
      if (currentModelRef.current) {
        const targetRotY = pointerRef.current.x * 0.32;
        const targetRotX = -pointerRef.current.y * 0.12;
        currentModelRef.current.rotation.y = THREE.MathUtils.lerp(
          currentModelRef.current.rotation.y,
          targetRotY,
          0.05
        );
        currentModelRef.current.rotation.x = THREE.MathUtils.lerp(
          currentModelRef.current.rotation.x,
          targetRotX,
          0.05
        );

        // Organic micro-breathing (subtle vertical rhythm)
        const breath = Math.sin(now * 0.0022) * 0.012;
        currentModelRef.current.position.y = baseYRef.current + breath;
      }

      // Rotate outer cyber ring
      ringMesh.rotation.z += delta * 0.35;

      // Pulse inner energy ring
      const pulseScale = 1.0 + Math.sin(now * 0.003) * 0.08;
      pulseMesh.scale.set(pulseScale, pulseScale, 1);
      pulseMat.opacity = 0.35 + Math.sin(now * 0.003) * 0.25;

      // Animate ambient cyber particles
      const posArr = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3 + 1] += delta * 0.18;
        if (posArr[i * 3 + 1] > 1.2) {
          posArr[i * 3 + 1] = -1.2;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);

      if (currentModelRef.current) {
        scene.remove(currentModelRef.current);
      }
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }

      dracoLoader.dispose();
      controls.dispose();
      pmremGenerator.dispose();
      envTexture.dispose();
      roomEnv.dispose();
      contactTexture.dispose();
      renderer.dispose();

      ringGeo.dispose();
      ringMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      discGeo.dispose();
      discMat.dispose();
      contactGeo.dispose();
      contactMat.dispose();
      shadowPlaneGeo.dispose();
      shadowPlaneMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  const handleActionClick = (actionName) => {
    if (playActionRef.current) {
      playActionRef.current(actionName);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-[320px] xs:h-[360px] sm:h-[420px] md:h-[480px] lg:h-[520px] flex flex-col items-center justify-center rounded-3xl glass-card border border-white/10 shadow-[0_0_35px_rgba(0,238,252,0.15)] overflow-hidden select-none ${className}`}
    >
      {/* Top HUD Header */}
      <div className="absolute top-2.5 sm:top-3 left-3 sm:left-4 right-3 sm:right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#00eefc]"></span>
          <span className="font-label-mono text-[9px] sm:text-[11px] font-bold text-secondary uppercase tracking-widest">
            ROBOT TRỢ LÝ 3D • PBR WEBGL
          </span>
        </div>
        <div className="font-label-mono text-[9px] sm:text-[10px] text-on-surface-variant/80 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md backdrop-blur-md pointer-events-auto">
          Dõi theo chuột • Kéo xoay 360°
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-secondary/20 border-t-secondary rounded-full animate-spin mb-2 sm:mb-3"></div>
          <span className="font-label-mono text-[10px] sm:text-xs text-secondary tracking-wider">
            ĐANG TẢI ROBOT 3D (PBR)...
          </span>
        </div>
      )}

      {/* Error Overlay */}
      {errorMessage && !isLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-background/90 p-4 text-center">
          <span className="material-symbols-outlined text-red-400 text-2xl mb-1">error</span>
          <p className="font-label-mono text-[11px] text-red-300 mb-2">{errorMessage}</p>
          <button
            onClick={() => window.location.reload()}
            className="font-label-mono text-[10px] bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg border border-white/20 text-on-surface cursor-pointer"
          >
            Tải lại trang
          </button>
        </div>
      )}

      {/* WebGL Canvas with pan-y touch action */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing z-10 touch-pan-y" 
        style={{ touchAction: 'pan-y' }}
      />

      {/* Bottom Gesture Controls - Robot Assistant */}
      {!isLoading && !errorMessage && (
        <div className="absolute bottom-2 sm:bottom-3 z-20 flex flex-wrap justify-center gap-1 sm:gap-1.5 px-2 max-w-[96%]">
          {ANIMATIONS.map(({ label, act }) => (
            <button
              key={act}
              onClick={() => handleActionClick(act)}
              className={`font-label-mono text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border transition-all cursor-pointer ${
                currentAction === act
                  ? 'bg-secondary/20 text-secondary border-secondary/50 font-bold shadow-[0_0_10px_rgba(0,238,252,0.35)]'
                  : 'bg-white/5 border-white/10 text-on-surface-variant hover:text-on-surface hover:bg-white/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Hint */}
      <div className="absolute bottom-1 right-2 sm:right-3 z-10 pointer-events-none font-label-mono text-[8px] sm:text-[9px] text-white/30 hidden xs:block">
        Cuộn để zoom • Kéo để xoay
      </div>
    </div>
  );
}
