import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';
import path from 'path';

// Mock FileReader for Node.js GLTFExporter support
class MockFileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onloadend) this.onloadend({ target: this });
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((buf) => {
      const base64 = Buffer.from(buf).toString('base64');
      this.result = `data:${blob.type || 'application/octet-stream'};base64,${base64}`;
      if (this.onloadend) this.onloadend({ target: this });
    });
  }
}
globalThis.FileReader = MockFileReader;

console.log('Building 3D Assistant Robot from reference sheet...');

// -------------------------------------------------------------
// 1. PALETTE & MATERIALS (From Reference Color Palette)
// -------------------------------------------------------------
const matCreamYellow = new THREE.MeshStandardMaterial({
  name: 'Mat_CreamYellow',
  color: 0xf7d47a,
  roughness: 0.38,
  metalness: 0.08
});

const matIvoryWhite = new THREE.MeshStandardMaterial({
  name: 'Mat_IvoryWhite',
  color: 0xf0eee9,
  roughness: 0.32,
  metalness: 0.05
});

const matDarkGrey = new THREE.MeshStandardMaterial({
  name: 'Mat_DarkGrey',
  color: 0x3c3f46,
  roughness: 0.48,
  metalness: 0.22
});

// Low-poly faceted eyes with flat shading as shown in reference
const matFacetedEyes = new THREE.MeshStandardMaterial({
  name: 'Mat_FacetedEyes',
  color: 0x2d3037,
  roughness: 0.25,
  metalness: 0.35,
  flatShading: true
});

// Glowing warm yellow LED
const matYellowLED = new THREE.MeshStandardMaterial({
  name: 'Mat_YellowLED',
  color: 0xffd84b,
  emissive: 0xffd84b,
  emissiveIntensity: 3.2,
  roughness: 0.15,
  metalness: 0.0
});

// Helper for pill-shaped LED lights
function createPillLED(width, height, depth) {
  const group = new THREE.Group();
  const radius = height / 2;
  const cylinderLength = Math.max(0.01, width - height);

  const cylGeo = new THREE.CylinderGeometry(radius, radius, cylinderLength, 16);
  cylGeo.rotateZ(Math.PI / 2);
  const cylMesh = new THREE.Mesh(cylGeo, matYellowLED);
  group.add(cylMesh);

  const sphereGeo = new THREE.SphereGeometry(radius, 16, 16);
  const leftSphere = new THREE.Mesh(sphereGeo, matYellowLED);
  leftSphere.position.x = -cylinderLength / 2;
  group.add(leftSphere);

  const rightSphere = new THREE.Mesh(sphereGeo, matYellowLED);
  rightSphere.position.x = cylinderLength / 2;
  group.add(rightSphere);

  return group;
}

// Helper for small circular dot LEDs
function createDotLED(radius = 0.018) {
  const geo = new THREE.SphereGeometry(radius, 12, 12);
  return new THREE.Mesh(geo, matYellowLED);
}

// -------------------------------------------------------------
// 2. BUILD ROBOT HIERARCHICAL MODEL
// -------------------------------------------------------------
const root = new THREE.Group();
root.name = 'Robot_Assistant';

// BASE / BODY GROUP (Origin at pelvis y = 0.62)
const bodyGroup = new THREE.Group();
bodyGroup.name = 'Body';
bodyGroup.position.set(0, 0.62, 0);
root.add(bodyGroup);

// --- TORSO MESH ---
// Tapered low-poly torso (bucket shape: wider at bottom, narrower at top)
// Reference: top ~ 0.28m, bottom ~ 0.44m, height ~ 0.42m
const torsoGeo = new THREE.CylinderGeometry(0.16, 0.22, 0.42, 16, 1);
// Flatten slightly along Z to match rounded rectangular torso profile
torsoGeo.scale(1.0, 1.0, 0.85);
const torsoMesh = new THREE.Mesh(torsoGeo, matCreamYellow);
torsoMesh.name = 'Body_Torso_Mesh';
torsoMesh.position.set(0, 0.21, 0);
torsoMesh.castShadow = true;
torsoMesh.receiveShadow = true;
bodyGroup.add(torsoMesh);

// Torso Bottom Belt (Ivory collar at bottom)
const beltGeo = new THREE.CylinderGeometry(0.23, 0.24, 0.065, 16);
beltGeo.scale(1.0, 1.0, 0.85);
const beltMesh = new THREE.Mesh(beltGeo, matIvoryWhite);
beltMesh.name = 'Body_Belt';
beltMesh.position.set(0, 0.035, 0);
beltMesh.castShadow = true;
beltMesh.receiveShadow = true;
bodyGroup.add(beltMesh);

// Belt Dot LEDs (6 small circular yellow LEDs along the belt)
const beltLEDPositions = [
  { x: -0.09, z: 0.19 }, { x: 0.09, z: 0.19 },   // Front
  { x: -0.21, z: 0.0 },  { x: 0.21, z: 0.0 },    // Sides
  { x: -0.09, z: -0.19 }, { x: 0.09, z: -0.19 }  // Back
];
beltLEDPositions.forEach((pos, idx) => {
  const dot = createDotLED(0.016);
  dot.name = `Body_Belt_LED_${idx + 1}`;
  dot.position.set(pos.x, 0.035, pos.z);
  bodyGroup.add(dot);
});

// Chest Pill LED (Front horizontal light bar)
const chestLED = createPillLED(0.14, 0.032, 0.02);
chestLED.name = 'LED_Chest';
chestLED.position.set(0, 0.32, 0.155);
bodyGroup.add(chestLED);

// Back Pill LED (Back horizontal light bar)
const backLED = createPillLED(0.14, 0.032, 0.02);
backLED.name = 'LED_Back';
backLED.position.set(0, 0.32, -0.155);
bodyGroup.add(backLED);

// --- NECK & HEAD HIERARCHY ---
const neckJoint = new THREE.Group();
neckJoint.name = 'Joint_Neck';
neckJoint.position.set(0, 0.42, 0); // At top of torso
bodyGroup.add(neckJoint);

// Dark grey neck cylinder
const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.075, 0.08, 16), matDarkGrey);
neckMesh.name = 'Neck_Mesh';
neckMesh.position.set(0, 0.04, 0);
neckMesh.castShadow = true;
neckJoint.add(neckMesh);

// HEAD GROUP (Pivot at neck top: y = 0.08 above neck joint)
const headGroup = new THREE.Group();
headGroup.name = 'Head';
headGroup.position.set(0, 0.08, 0);
neckJoint.add(headGroup);

// Main Head Shell:
// Dimensions from sheet: width ~ 0.8m, height ~ 0.5m, depth ~ 0.62m
// Squircle rounded box
const headMainGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.48, 20, 2);
headMainGeo.scale(1.05, 1.0, 0.82); // W = 0.80m, D = 0.62m, H = 0.48m
const headMainMesh = new THREE.Mesh(headMainGeo, matCreamYellow);
headMainMesh.name = 'Head_Main_Mesh';
headMainMesh.position.set(0, 0.25, 0);
headMainMesh.castShadow = true;
headMainMesh.receiveShadow = true;
headGroup.add(headMainMesh);

// Head Upper White Band (Wrapped around top-mid head)
const headUpperBandGeo = new THREE.CylinderGeometry(0.395, 0.395, 0.065, 20);
headUpperBandGeo.scale(1.05, 1.0, 0.82);
const headUpperBandMesh = new THREE.Mesh(headUpperBandGeo, matIvoryWhite);
headUpperBandMesh.name = 'Head_Upper_Band';
headUpperBandMesh.position.set(0, 0.38, 0);
headUpperBandMesh.castShadow = true;
headGroup.add(headUpperBandMesh);

// Head Upper Band Dot LEDs (Circular yellow dots along the upper ring)
const upperBandLEDPos = [
  { x: -0.16, z: 0.30 }, { x: 0.16, z: 0.30 }, // Front
  { x: -0.39, z: 0.0 }, { x: 0.39, z: 0.0 },   // Sides
  { x: -0.16, z: -0.30 }, { x: 0.16, z: -0.30 } // Back
];
upperBandLEDPos.forEach((pos, idx) => {
  const dot = createDotLED(0.018);
  dot.name = `Head_Upper_LED_${idx + 1}`;
  dot.position.set(pos.x, 0.38, pos.z);
  headGroup.add(dot);
});

// Head Bottom White Collar (Flared rim at base of head)
const headBottomCollarGeo = new THREE.CylinderGeometry(0.40, 0.41, 0.075, 20);
headBottomCollarGeo.scale(1.05, 1.0, 0.82);
const headBottomCollarMesh = new THREE.Mesh(headBottomCollarGeo, matIvoryWhite);
headBottomCollarMesh.name = 'Head_Bottom_Collar';
headBottomCollarMesh.position.set(0, 0.045, 0);
headBottomCollarMesh.castShadow = true;
headGroup.add(headBottomCollarMesh);

// Head Bottom Collar Dot LEDs
const bottomCollarLEDPos = [
  { x: -0.22, z: 0.32 }, { x: 0, z: 0.335 }, { x: 0.22, z: 0.32 }, // Front 3
  { x: -0.40, z: 0 }, { x: 0.40, z: 0 }, // Sides
  { x: -0.22, z: -0.32 }, { x: 0, z: -0.335 }, { x: 0.22, z: -0.32 } // Back 3
];
bottomCollarLEDPos.forEach((pos, idx) => {
  const dot = createDotLED(0.016);
  dot.name = `Head_Bottom_LED_${idx + 1}`;
  dot.position.set(pos.x, 0.045, pos.z);
  headGroup.add(dot);
});

// EYES (Two large faceted dark lenses - Low Poly signature!)
// Reference: Diameter ~ 0.26m, flat-shaded icosahedron hemisphere
function createFacetedEye(name) {
  const eyeGroup = new THREE.Group();
  eyeGroup.name = name;

  // Faceted low poly eye lens
  const eyeGeo = new THREE.IcosahedronGeometry(0.14, 1);
  eyeGeo.scale(1.0, 1.0, 0.7);
  const eyeMesh = new THREE.Mesh(eyeGeo, matFacetedEyes);
  eyeMesh.name = `${name}_Lens`;
  eyeMesh.castShadow = true;
  eyeGroup.add(eyeMesh);

  // Subtle dark eye socket rim
  const rimGeo = new THREE.TorusGeometry(0.13, 0.018, 8, 16);
  const rimMesh = new THREE.Mesh(rimGeo, matDarkGrey);
  rimMesh.name = `${name}_Socket`;
  eyeGroup.add(rimMesh);

  return eyeGroup;
}

const leftEye = createFacetedEye('Eye_Left');
leftEye.position.set(-0.17, 0.26, 0.28);
headGroup.add(leftEye);

const rightEye = createFacetedEye('Eye_Right');
rightEye.position.set(0.17, 0.26, 0.28);
headGroup.add(rightEye);

// EYEBROWS (Two dark slate grey beveled rectangular blocks on top of the head)
function createEyebrow(name, angleZ) {
  const browGeo = new THREE.BoxGeometry(0.16, 0.038, 0.07);
  const browMesh = new THREE.Mesh(browGeo, matDarkGrey);
  browMesh.name = name;
  browMesh.rotation.z = angleZ;
  browMesh.castShadow = true;
  return browMesh;
}

const leftEyebrow = createEyebrow('Eyebrow_Left', 0.06);
leftEyebrow.position.set(-0.19, 0.51, 0.12);
headGroup.add(leftEyebrow);

const rightEyebrow = createEyebrow('Eyebrow_Right', -0.06);
rightEyebrow.position.set(0.19, 0.51, 0.12);
headGroup.add(rightEyebrow);

// EARS / HEADLIGHTS (Circular cylinder ear speaker / light with glowing center)
function createEar(name, sideMultiplier) {
  const earGroup = new THREE.Group();
  earGroup.name = name;

  // Outer ivory ring
  const outerRingGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.045, 20);
  outerRingGeo.rotateZ(Math.PI / 2);
  const outerRingMesh = new THREE.Mesh(outerRingGeo, matIvoryWhite);
  outerRingMesh.name = `${name}_Outer_Ring`;
  outerRingMesh.castShadow = true;
  earGroup.add(outerRingMesh);

  // Recessed dark grey core
  const darkCoreGeo = new THREE.CylinderGeometry(0.088, 0.088, 0.05, 16);
  darkCoreGeo.rotateZ(Math.PI / 2);
  const darkCoreMesh = new THREE.Mesh(darkCoreGeo, matDarkGrey);
  darkCoreMesh.name = `${name}_Dark_Core`;
  earGroup.add(darkCoreMesh);

  // Center glowing yellow LED headlight
  const ledCoreGeo = new THREE.CylinderGeometry(0.068, 0.068, 0.055, 16);
  ledCoreGeo.rotateZ(Math.PI / 2);
  const ledCoreMesh = new THREE.Mesh(ledCoreGeo, matYellowLED);
  ledCoreMesh.name = `${name}_LED_Light`;
  earGroup.add(ledCoreMesh);

  earGroup.position.set(sideMultiplier * 0.405, 0.25, 0);
  return earGroup;
}

const leftEar = createEar('Ear_Left', -1);
headGroup.add(leftEar);

const rightEar = createEar('Ear_Right', 1);
headGroup.add(rightEar);

// --- ARMS & HANDS (Left and Right) ---
function createArm(side) {
  const isLeft = side === 'L';
  const sign = isLeft ? -1 : 1;

  // SHOULDER JOINT (Pivot at torso top corner: x = ±0.22, y = 0.35, z = 0)
  const shoulder = new THREE.Group();
  shoulder.name = `Joint_Shoulder_${side}`;
  shoulder.position.set(sign * 0.22, 0.35, 0);

  // Shoulder dark ball joint & connecting peg
  const shoulderBall = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), matDarkGrey);
  shoulderBall.name = `Shoulder_${side}_Ball`;
  shoulderBall.castShadow = true;
  shoulder.add(shoulderBall);

  // UPPER ARM GROUP
  const upperArm = new THREE.Group();
  upperArm.name = `UpperArm_${side}`;
  shoulder.add(upperArm);

  // Upper arm dark grey rod
  const upperArmRod = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.16, 12), matDarkGrey);
  upperArmRod.name = `UpperArm_${side}_Rod`;
  upperArmRod.position.set(0, -0.08, 0);
  upperArmRod.castShadow = true;
  upperArm.add(upperArmRod);

  // ELBOW JOINT (Pivot at y = -0.16)
  const elbow = new THREE.Group();
  elbow.name = `Joint_Elbow_${side}`;
  elbow.position.set(0, -0.16, 0);
  upperArm.add(elbow);

  const elbowBall = new THREE.Mesh(new THREE.SphereGeometry(0.048, 16, 16), matDarkGrey);
  elbowBall.name = `Elbow_${side}_Ball`;
  elbowBall.castShadow = true;
  elbow.add(elbowBall);

  // FOREARM GROUP (Flared cream yellow gauntlet sleeve)
  const forearm = new THREE.Group();
  forearm.name = `Forearm_${side}`;
  elbow.add(forearm);

  // Tapered cream yellow sleeve (wider at wrist, narrower at elbow)
  const sleeveGeo = new THREE.CylinderGeometry(0.08, 0.055, 0.18, 16);
  const sleeveMesh = new THREE.Mesh(sleeveGeo, matCreamYellow);
  sleeveMesh.name = `Forearm_${side}_Sleeve`;
  sleeveMesh.position.set(0, -0.09, 0);
  sleeveMesh.castShadow = true;
  forearm.add(sleeveMesh);

  // Thick ivory wrist cuff at bottom of forearm
  const wristCuffGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.05, 16);
  const wristCuffMesh = new THREE.Mesh(wristCuffGeo, matIvoryWhite);
  wristCuffMesh.name = `Forearm_${side}_WristCuff`;
  wristCuffMesh.position.set(0, -0.18, 0);
  wristCuffMesh.castShadow = true;
  forearm.add(wristCuffMesh);

  // WRIST JOINT (Pivot at y = -0.21)
  const wrist = new THREE.Group();
  wrist.name = `Joint_Wrist_${side}`;
  wrist.position.set(0, -0.21, 0);
  forearm.add(wrist);

  const wristBall = new THREE.Mesh(new THREE.SphereGeometry(0.038, 14, 14), matDarkGrey);
  wristBall.name = `Wrist_${side}_Ball`;
  wrist.add(wristBall);

  // HAND GROUP (Ivory palm with 4 chunky low-poly fingers)
  const hand = new THREE.Group();
  hand.name = `Hand_${side}`;
  wrist.add(hand);

  // Palm
  const palmGeo = new THREE.BoxGeometry(0.095, 0.065, 0.045);
  const palmMesh = new THREE.Mesh(palmGeo, matIvoryWhite);
  palmMesh.name = `Hand_${side}_Palm`;
  palmMesh.position.set(0, -0.038, 0);
  palmMesh.castShadow = true;
  hand.add(palmMesh);

  // 4 Chunky Fingers (Thumb + 3 main fingers as shown in reference)
  // Fingers: 3 rectangular fingers extending downward
  [-0.03, 0, 0.03].forEach((fx, idx) => {
    const fingerGeo = new THREE.BoxGeometry(0.026, 0.065, 0.026);
    const fingerMesh = new THREE.Mesh(fingerGeo, matIvoryWhite);
    fingerMesh.name = `Hand_${side}_Finger_${idx + 1}`;
    fingerMesh.position.set(fx, -0.095, 0);
    fingerMesh.castShadow = true;
    hand.add(fingerMesh);
  });

  // Thumb
  const thumbGeo = new THREE.BoxGeometry(0.026, 0.045, 0.026);
  const thumbMesh = new THREE.Mesh(thumbGeo, matIvoryWhite);
  thumbMesh.name = `Hand_${side}_Thumb`;
  thumbMesh.position.set(sign * 0.052, -0.055, 0.015);
  thumbMesh.rotation.z = -sign * 0.35;
  thumbMesh.castShadow = true;
  hand.add(thumbMesh);

  return shoulder;
}

const leftArm = createArm('L');
bodyGroup.add(leftArm);

const rightArm = createArm('R');
bodyGroup.add(rightArm);

// Default friendly pose from reference sheet:
// Right arm waving!
rightArm.rotation.z = -Math.PI * 0.45; // Raise arm up
const rightElbow = rightArm.getObjectByName('Joint_Elbow_R');
if (rightElbow) {
  rightElbow.rotation.z = -Math.PI * 0.35; // Bend elbow
}
// Left arm resting naturally at side
leftArm.rotation.z = Math.PI * 0.08;
const leftElbow = leftArm.getObjectByName('Joint_Elbow_L');
if (leftElbow) {
  leftElbow.rotation.z = Math.PI * 0.10;
}

// --- LEGS & FEET (Left and Right) ---
function createLeg(side) {
  const isLeft = side === 'L';
  const sign = isLeft ? -1 : 1;

  // HIP JOINT (Pivot under torso belt: x = ±0.14, y = 0, z = 0)
  const hip = new THREE.Group();
  hip.name = `Joint_Hip_${side}`;
  hip.position.set(sign * 0.14, 0, 0);

  // Dark grey hip ball joint
  const hipBall = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), matDarkGrey);
  hipBall.name = `Hip_${side}_Ball`;
  hipBall.castShadow = true;
  hip.add(hipBall);

  // THIGH (Slender dark grey leg rod)
  const thigh = new THREE.Group();
  thigh.name = `Thigh_${side}`;
  hip.add(thigh);

  const thighRod = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.18, 14), matDarkGrey);
  thighRod.name = `Thigh_${side}_Rod`;
  thighRod.position.set(0, -0.09, 0);
  thighRod.castShadow = true;
  thigh.add(thighRod);

  // KNEE JOINT (Pivot at y = -0.18)
  const knee = new THREE.Group();
  knee.name = `Joint_Knee_${side}`;
  knee.position.set(0, -0.18, 0);
  thigh.add(knee);

  const kneeBall = new THREE.Mesh(new THREE.SphereGeometry(0.048, 16, 16), matDarkGrey);
  kneeBall.name = `Knee_${side}_Ball`;
  kneeBall.castShadow = true;
  knee.add(kneeBall);

  // CALF / LOWER LEG (Cream yellow tapered boot-top sleeve)
  const calf = new THREE.Group();
  calf.name = `Calf_${side}`;
  knee.add(calf);

  // Tapered cream yellow cone (wider at bottom, narrower at knee)
  const calfGeo = new THREE.CylinderGeometry(0.065, 0.10, 0.18, 16);
  const calfMesh = new THREE.Mesh(calfGeo, matCreamYellow);
  calfMesh.name = `Calf_${side}_Sleeve`;
  calfMesh.position.set(0, -0.09, 0);
  calfMesh.castShadow = true;
  calf.add(calfMesh);

  // Ivory ring at bottom of calf
  const calfRingGeo = new THREE.CylinderGeometry(0.102, 0.102, 0.038, 16);
  const calfRingMesh = new THREE.Mesh(calfRingGeo, matIvoryWhite);
  calfRingMesh.name = `Calf_${side}_Ring`;
  calfRingMesh.position.set(0, -0.17, 0);
  calfRingMesh.castShadow = true;
  calf.add(calfRingMesh);

  // ANKLE JOINT (Pivot at y = -0.19)
  const ankle = new THREE.Group();
  ankle.name = `Joint_Ankle_${side}`;
  ankle.position.set(0, -0.19, 0);
  calf.add(ankle);

  const ankleBall = new THREE.Mesh(new THREE.SphereGeometry(0.042, 14, 14), matDarkGrey);
  ankleBall.name = `Ankle_${side}_Ball`;
  ankle.add(ankleBall);

  // FOOT / SHOE GROUP
  // Chunky stylized sci-fi boot:
  // Height ~ 0.15m, Width ~ 0.18m, Length ~ 0.28m
  const foot = new THREE.Group();
  foot.name = `Foot_${side}`;
  ankle.add(foot);

  // Main Ivory Shoe Upper Shell
  const shoeUpperGeo = new THREE.BoxGeometry(0.18, 0.11, 0.26);
  const shoeUpperMesh = new THREE.Mesh(shoeUpperGeo, matIvoryWhite);
  shoeUpperMesh.name = `Foot_${side}_Upper`;
  shoeUpperMesh.position.set(0, -0.08, 0.03);
  shoeUpperMesh.castShadow = true;
  shoeUpperMesh.receiveShadow = true;
  foot.add(shoeUpperMesh);

  // Cream Yellow Heel Accent Block
  const heelAccentGeo = new THREE.BoxGeometry(0.182, 0.085, 0.10);
  const heelAccentMesh = new THREE.Mesh(heelAccentGeo, matCreamYellow);
  heelAccentMesh.name = `Foot_${side}_HeelAccent`;
  heelAccentMesh.position.set(0, -0.065, -0.06);
  heelAccentMesh.castShadow = true;
  foot.add(heelAccentMesh);

  // Dark Grey Bottom Sole Plate
  const soleGeo = new THREE.BoxGeometry(0.19, 0.04, 0.28);
  const soleMesh = new THREE.Mesh(soleGeo, matDarkGrey);
  soleMesh.name = `Foot_${side}_Sole`;
  soleMesh.position.set(0, -0.14, 0.03);
  soleMesh.castShadow = true;
  soleMesh.receiveShadow = true;
  foot.add(soleMesh);

  // Front Toe Glowing Yellow LED Headlight
  const toeLED = createPillLED(0.11, 0.024, 0.02);
  toeLED.name = `LED_Toe_${side}`;
  toeLED.position.set(0, -0.11, 0.165);
  foot.add(toeLED);

  return hip;
}

const leftLeg = createLeg('L');
bodyGroup.add(leftLeg);

const rightLeg = createLeg('R');
bodyGroup.add(rightLeg);

// -------------------------------------------------------------
// 3. CREATE ANIMATION CLIPS (Idle, Wave, Walk)
// -------------------------------------------------------------
const clips = [];

// CLIP 1: IDLE ANIMATION (Subtle breathing, head micro-tilt, arm sway)
{
  const times = [0, 1.2, 2.4];
  
  // Body vertical breathing
  const bodyPosTrack = new THREE.VectorKeyframeTrack(
    'Body.position',
    times,
    [
      0, 0.62, 0,
      0, 0.635, 0,
      0, 0.62, 0
    ]
  );

  // Head subtle nodding
  const qHead0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0));
  const qHead1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.04, 0.02, 0.01));
  const headRotTrack = new THREE.QuaternionKeyframeTrack(
    'Head.quaternion',
    times,
    [
      qHead0.x, qHead0.y, qHead0.z, qHead0.w,
      qHead1.x, qHead1.y, qHead1.z, qHead1.w,
      qHead0.x, qHead0.y, qHead0.z, qHead0.w
    ]
  );

  const idleClip = new THREE.AnimationClip('Idle', 2.4, [bodyPosTrack, headRotTrack]);
  clips.push(idleClip);
}

// CLIP 2: WAVE ANIMATION (Friendly hand waving as shown in reference)
{
  const times = [0, 0.4, 0.8, 1.2, 1.6];
  
  // Right Shoulder
  const qSh0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -1.35));
  const qSh1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -1.50));
  const rShoulderTrack = new THREE.QuaternionKeyframeTrack(
    'Joint_Shoulder_R.quaternion',
    times,
    [
      qSh0.x, qSh0.y, qSh0.z, qSh0.w,
      qSh1.x, qSh1.y, qSh1.z, qSh1.w,
      qSh0.x, qSh0.y, qSh0.z, qSh0.w,
      qSh1.x, qSh1.y, qSh1.z, qSh1.w,
      qSh0.x, qSh0.y, qSh0.z, qSh0.w
    ]
  );

  // Right Wrist / Hand waving
  const qW0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -0.25));
  const qW1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0.35));
  const rWristTrack = new THREE.QuaternionKeyframeTrack(
    'Joint_Wrist_R.quaternion',
    times,
    [
      qW0.x, qW0.y, qW0.z, qW0.w,
      qW1.x, qW1.y, qW1.z, qW1.w,
      qW0.x, qW0.y, qW0.z, qW0.w,
      qW1.x, qW1.y, qW1.z, qW1.w,
      qW0.x, qW0.y, qW0.z, qW0.w
    ]
  );

  // Head tilt cutely while waving
  const qHeadWave0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0.05, 0.08));
  const qHeadWave1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -0.03, 0.03));
  const headWaveTrack = new THREE.QuaternionKeyframeTrack(
    'Head.quaternion',
    times,
    [
      qHeadWave0.x, qHeadWave0.y, qHeadWave0.z, qHeadWave0.w,
      qHeadWave1.x, qHeadWave1.y, qHeadWave1.z, qHeadWave1.w,
      qHeadWave0.x, qHeadWave0.y, qHeadWave0.z, qHeadWave0.w,
      qHeadWave1.x, qHeadWave1.y, qHeadWave1.z, qHeadWave1.w,
      qHeadWave0.x, qHeadWave0.y, qHeadWave0.z, qHeadWave0.w
    ]
  );

  const waveClip = new THREE.AnimationClip('Wave', 1.6, [rShoulderTrack, rWristTrack, headWaveTrack]);
  clips.push(waveClip);
}

// CLIP 3: THUMBS UP
{
  const times = [0, 0.6, 1.2];
  const qTh0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.8, 0, -0.2));
  const qTh1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-1.1, 0, -0.1));
  const rShoulderTrack = new THREE.QuaternionKeyframeTrack(
    'Joint_Shoulder_R.quaternion',
    times,
    [
      qTh0.x, qTh0.y, qTh0.z, qTh0.w,
      qTh1.x, qTh1.y, qTh1.z, qTh1.w,
      qTh0.x, qTh0.y, qTh0.z, qTh0.w
    ]
  );
  const thumbsUpClip = new THREE.AnimationClip('ThumbsUp', 1.2, [rShoulderTrack]);
  clips.push(thumbsUpClip);
}

// CLIP 4: WALKING (Alternating leg stride)
{
  const times = [0, 0.35, 0.7, 1.05, 1.4];
  const qL0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.28, 0, 0));
  const qL1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.28, 0, 0));
  const lHipTrack = new THREE.QuaternionKeyframeTrack(
    'Joint_Hip_L.quaternion',
    times,
    [
      qL0.x, qL0.y, qL0.z, qL0.w,
      qL1.x, qL1.y, qL1.z, qL1.w,
      qL0.x, qL0.y, qL0.z, qL0.w,
      qL1.x, qL1.y, qL1.z, qL1.w,
      qL0.x, qL0.y, qL0.z, qL0.w
    ]
  );
  const rHipTrack = new THREE.QuaternionKeyframeTrack(
    'Joint_Hip_R.quaternion',
    times,
    [
      qL1.x, qL1.y, qL1.z, qL1.w,
      qL0.x, qL0.y, qL0.z, qL0.w,
      qL1.x, qL1.y, qL1.z, qL1.w,
      qL0.x, qL0.y, qL0.z, qL0.w,
      qL1.x, qL1.y, qL1.z, qL1.w
    ]
  );
  const walkClip = new THREE.AnimationClip('Walking', 1.4, [lHipTrack, rHipTrack]);
  clips.push(walkClip);
}

// CLIP 5: DANCE (Joyful rhythm wiggle)
{
  const times = [0, 0.3, 0.6, 0.9, 1.2];
  const qBody0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0.18, 0.05));
  const qBody1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -0.18, -0.05));
  const bodyTrack = new THREE.QuaternionKeyframeTrack(
    'Body.quaternion',
    times,
    [
      qBody0.x, qBody0.y, qBody0.z, qBody0.w,
      qBody1.x, qBody1.y, qBody1.z, qBody1.w,
      qBody0.x, qBody0.y, qBody0.z, qBody0.w,
      qBody1.x, qBody1.y, qBody1.z, qBody1.w,
      qBody0.x, qBody0.y, qBody0.z, qBody0.w
    ]
  );

  const qL0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 1.2));
  const qL1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0.4));
  const lShTrack = new THREE.QuaternionKeyframeTrack(
    'Joint_Shoulder_L.quaternion',
    times,
    [
      qL0.x, qL0.y, qL0.z, qL0.w,
      qL1.x, qL1.y, qL1.z, qL1.w,
      qL0.x, qL0.y, qL0.z, qL0.w,
      qL1.x, qL1.y, qL1.z, qL1.w,
      qL0.x, qL0.y, qL0.z, qL0.w
    ]
  );

  const qR0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -0.4));
  const qR1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -1.2));
  const rShTrack = new THREE.QuaternionKeyframeTrack(
    'Joint_Shoulder_R.quaternion',
    times,
    [
      qR0.x, qR0.y, qR0.z, qR0.w,
      qR1.x, qR1.y, qR1.z, qR1.w,
      qR0.x, qR0.y, qR0.z, qR0.w,
      qR1.x, qR1.y, qR1.z, qR1.w,
      qR0.x, qR0.y, qR0.z, qR0.w
    ]
  );

  const danceClip = new THREE.AnimationClip('Dance', 1.2, [bodyTrack, lShTrack, rShTrack]);
  clips.push(danceClip);
}

// CLIP 6: JUMP (Crouch and leap)
{
  const times = [0, 0.25, 0.55, 0.85, 1.1];
  const bodyJumpTrack = new THREE.VectorKeyframeTrack(
    'Body.position',
    times,
    [
      0, 0.62, 0,
      0, 0.48, 0,
      0, 0.86, 0,
      0, 0.55, 0,
      0, 0.62, 0
    ]
  );

  const jumpClip = new THREE.AnimationClip('Jump', 1.1, [bodyJumpTrack]);
  clips.push(jumpClip);
}

// CLIP 7: SITTING (Sit down and relax)
{
  const times = [0, 0.6, 1.2];
  const bodySitTrack = new THREE.VectorKeyframeTrack(
    'Body.position',
    times,
    [
      0, 0.62, 0,
      0, 0.45, 0,
      0, 0.38, 0
    ]
  );
  const qHipSit = new THREE.Quaternion().setFromEuler(new THREE.Euler(-1.4, 0, 0));
  const qHip0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0));
  const lHipSitTrack = new THREE.QuaternionKeyframeTrack(
    'Joint_Hip_L.quaternion',
    times,
    [
      qHip0.x, qHip0.y, qHip0.z, qHip0.w,
      qHipSit.x, qHipSit.y, qHipSit.z, qHipSit.w,
      qHipSit.x, qHipSit.y, qHipSit.z, qHipSit.w
    ]
  );
  const rHipSitTrack = new THREE.QuaternionKeyframeTrack(
    'Joint_Hip_R.quaternion',
    times,
    [
      qHip0.x, qHip0.y, qHip0.z, qHip0.w,
      qHipSit.x, qHipSit.y, qHipSit.z, qHipSit.w,
      qHipSit.x, qHipSit.y, qHipSit.z, qHipSit.w
    ]
  );
  const sitClip = new THREE.AnimationClip('Sitting', 1.2, [bodySitTrack, lHipSitTrack, rHipSitTrack]);
  clips.push(sitClip);
}

// CLIP 8: PUNCH (Courageous punch forward)
{
  const times = [0, 0.25, 0.5, 0.8];
  const qP0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -0.4));
  const qP1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-1.55, 0, -0.15));
  const rPunchTrack = new THREE.QuaternionKeyframeTrack(
    'Joint_Shoulder_R.quaternion',
    times,
    [
      qP0.x, qP0.y, qP0.z, qP0.w,
      qP1.x, qP1.y, qP1.z, qP1.w,
      qP1.x, qP1.y, qP1.z, qP1.w,
      qP0.x, qP0.y, qP0.z, qP0.w
    ]
  );
  const punchClip = new THREE.AnimationClip('Punch', 0.8, [rPunchTrack]);
  clips.push(punchClip);
}

// -------------------------------------------------------------
// 4. EXPORT TO GLB AND GLTF
// -------------------------------------------------------------
const exporter = new GLTFExporter();

const exportOptions = {
  binary: true,
  animations: clips,
  embedImages: true
};

const outputDir = path.resolve('public/models');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Export GLB
exporter.parse(
  root,
  (glbBuffer) => {
    const glbPath = path.join(outputDir, 'robot.glb');
    const namedGlbPath = path.join(outputDir, 'assistant-robot.glb');
    
    fs.writeFileSync(glbPath, Buffer.from(glbBuffer));
    fs.writeFileSync(namedGlbPath, Buffer.from(glbBuffer));

    console.log(`[SUCCESS] Generated robot.glb (${(glbBuffer.byteLength / 1024).toFixed(1)} KB)`);
    console.log(`[SUCCESS] Generated assistant-robot.glb`);

    // Also export standard JSON GLTF for inspection
    exporter.parse(
      root,
      (gltfJson) => {
        const gltfPath = path.join(outputDir, 'robot.gltf');
        fs.writeFileSync(gltfPath, JSON.stringify(gltfJson, null, 2));
        console.log(`[SUCCESS] Generated robot.gltf (Inspection format)`);
      },
      (err) => console.error('Error exporting GLTF:', err),
      { binary: false, animations: clips }
    );
  },
  (err) => console.error('Error exporting GLB:', err),
  exportOptions
);
