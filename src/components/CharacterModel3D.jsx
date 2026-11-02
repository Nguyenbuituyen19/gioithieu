import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
    camera.position.set(0, isMobile ? 0.5 : 0.6, isMobile ? 4.1 : 3.7);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // 2. OrbitControls with Touch Support
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.target.set(0, 0.1, 0);
    controls.minDistance = 1.8;
    controls.maxDistance = 5.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.15;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 1.2;
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN
    };
    controlsRef.current = controls;

    // 3. Cyber Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xdbe6ff, 2.4);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00eefc, 2.6);
    rimLight.position.set(-3, 3, -2);
    scene.add(rimLight);

    const bottomGlow = new THREE.PointLight(0x00eefc, 2.0, 7);
    bottomGlow.position.set(0, -1.2, 0);
    scene.add(bottomGlow);

    // 4. Glowing 3D Pedestal
    const pedestalGroup = new THREE.Group();
    
    const ringGeo = new THREE.RingGeometry(1.25, 1.33, 48);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00eefc,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = -1.2;
    pedestalGroup.add(ringMesh);

    const discGeo = new THREE.CircleGeometry(1.24, 48);
    discGeo.rotateX(-Math.PI / 2);
    const discMat = new THREE.MeshBasicMaterial({
      color: 0x131314,
      transparent: true,
      opacity: 0.92
    });
    const discMesh = new THREE.Mesh(discGeo, discMat);
    discMesh.position.y = -1.21;
    pedestalGroup.add(discMesh);

    scene.add(pedestalGroup);

    // 5. Setup DRACO & GLTF Loader
    const dracoLoader = new DRACOLoader();
    const basePath = import.meta.env.BASE_URL || '/';
    const cleanBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
    dracoLoader.setDecoderPath(`${cleanBase}draco/gltf/`);
    dracoLoader.setDecoderConfig({ type: 'js' });

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    // Load Robot Model
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
          model.position.y = -scaledBox.min.y - 1.2;

          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add(model);
          currentModelRef.current = model;

          // Animations setup
          if (gltf.animations && gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(model);
            mixerRef.current = mixer;

            gltf.animations.forEach((clip) => {
              const action = mixer.clipAction(clip);
              actionsRef.current[clip.name] = action;
            });

            const defaultClip = actionsRef.current['Wave'] || Object.values(actionsRef.current)[0];
            if (defaultClip) {
              defaultClip.reset().fadeIn(0.2).play();
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
        if (act !== action) act.fadeOut(0.25);
      });

      action.reset().fadeIn(0.25).play();
      setCurrentAction(actionName);
    };

    loadRobotModel();

    // 6. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || isDestroyed) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        const mob = w < 500;
        camera.aspect = w / h;
        camera.position.set(0, mob ? 0.5 : 0.6, mob ? 4.1 : 3.7);
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
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

    // 8. Render loop
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

      ringMesh.rotation.z += delta * 0.4;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      if (currentModelRef.current) {
        scene.remove(currentModelRef.current);
      }
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }

      dracoLoader.dispose();
      controls.dispose();
      renderer.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      discGeo.dispose();
      discMat.dispose();
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
      className={`relative w-full h-[320px] xs:h-[360px] sm:h-[420px] md:h-[480px] lg:h-[520px] flex flex-col items-center justify-center rounded-3xl glass-card border border-white/10 shadow-[0_0_35px_rgba(0,238,252,0.12)] overflow-hidden ${className}`}
    >
      {/* Top HUD Header */}
      <div className="absolute top-2.5 sm:top-3 left-3 sm:left-4 right-3 sm:right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#00eefc]"></span>
          <span className="font-label-mono text-[9px] sm:text-[11px] font-bold text-secondary uppercase tracking-widest">
            ROBOT TRỢ LÝ 3D • WEBGL
          </span>
        </div>
        <div className="font-label-mono text-[9px] sm:text-[10px] text-on-surface-variant/80 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md backdrop-blur-md pointer-events-auto">
          Kéo xoay 360°
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-secondary/20 border-t-secondary rounded-full animate-spin mb-2 sm:mb-3"></div>
          <span className="font-label-mono text-[10px] sm:text-xs text-secondary tracking-wider">
            ĐANG TẢI ROBOT 3D...
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
