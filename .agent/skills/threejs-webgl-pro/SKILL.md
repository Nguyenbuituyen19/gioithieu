---
name: threejs-webgl-pro
description: >-
  Professional 3D Web & Three.js engineering: PBR realism, IBL/RoomEnvironment,
  shadow mapping & contact shadows, DRACO/GLTF optimization, animation blending,
  performance 60FPS tuning, responsive camera & touch control. Triggers on:
  '3d', 'threejs', 'three.js', 'webgl', 'mô hình 3d', 'làm 3d', 'nâng cấp 3d', 'tối ưu 3d'.
---

# Three.js & WebGL Production Guidelines

This skill provides production-grade architectural patterns and visual standards for interactive 3D Web experiences built with Three.js or React Three Fiber (R3F).

---

## 1. Core Visual Realism Checklist (The PBR Standard)

When rendering 3D models (GLTF/GLB) in browser viewports:

### 1.1. Image-Based Lighting (IBL) & Environment Map
Never rely solely on directional/ambient lights. Without an environment map, PBR metallic and roughness materials look plastic and flat.
```javascript
import { PMREMGenerator } from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const pmremGenerator = new PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();
const roomEnv = new RoomEnvironment();
scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
```

### 1.2. Color Management & Tone Mapping
Always configure modern color space and exposure:
```javascript
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
```

### 1.3. Realistic Shadows & Grounding (Contact Shadows)
Never let models float. Use two layers of shadows:
1. **Directional Soft Shadows**:
   ```javascript
   renderer.shadowMap.enabled = true;
   renderer.shadowMap.type = THREE.PCFSoftShadowMap;

   const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
   keyLight.castShadow = true;
   keyLight.shadow.mapSize.set(1024, 1024);
   keyLight.shadow.bias = -0.0001;
   keyLight.shadow.radius = 2;
   ```
2. **Contact Shadow Mesh / Pedestal**:
   Place a subtle radial-gradient dark plane right underneath feet to firmly anchor the model to the ground plane regardless of light position.

### 1.4. Material & Emissive Glow Tuning
Traverse loaded meshes to unlock emissive and highlight capabilities:
```javascript
model.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;
    child.receiveShadow = true;
    if (child.material) {
      child.material.envMapIntensity = 1.2;
      // If mesh has emissive or light strips, boost intensity
      if (child.material.emissive && child.material.emissive.getHex() > 0) {
        child.material.emissiveIntensity = 2.5;
      }
    }
  }
});
```

---

## 2. Animation & Lifelike Interactivity

### 2.1. Smooth Crossfading
When switching actions, always crossfade smoothly (avoid abrupt jumps):
```javascript
const fadeToAction = (name, duration = 0.25) => {
  const previousAction = activeAction;
  const nextAction = actions[name];
  if (!nextAction) return;
  if (previousAction !== nextAction) {
    previousAction?.fadeOut(duration);
  }
  nextAction.reset().fadeIn(duration).play();
};
```

### 2.2. Interactive Head/Body Pointer Tracking
Track mouse or touch movement and lerp bone/head rotation so characters feel intelligent and reactive:
```javascript
const targetRotationY = (pointerX * 0.4);
const targetRotationX = (-pointerY * 0.2);
headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, targetRotationY, 0.08);
```

### 2.3. Micro-Breathing Motion
In idle states, apply subtle trigonometric bobbing to mimic breathing and organic life:
```javascript
const breathOffset = Math.sin(clock.getElapsedTime() * 2.0) * 0.015;
model.position.y = baseY + breathOffset;
```

---

## 3. Performance & Mobile Optimization (60 FPS)

1. **Pixel Ratio Clamping**: Always clamp pixel ratio to max 2:
   ```javascript
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
   ```
2. **Touch-Action**: Prevent mobile gesture locking:
   ```jsx
   <canvas style={{ touchAction: 'pan-y' }} />
   ```
3. **Visibility Observer**: Pause rendering loop when offscreen:
   ```javascript
   const observer = new IntersectionObserver(([entry]) => {
     isVisible = entry.isIntersecting;
   }, { threshold: 0.1 });
   ```
4. **Memory Disposal**: Always dispose geometries, materials, textures, loaders, and renderers in cleanup functions to prevent WebGL memory leaks.
