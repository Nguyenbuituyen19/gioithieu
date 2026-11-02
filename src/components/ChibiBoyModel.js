import * as THREE from 'three';

/**
 * Creates a high-fidelity 3D Chibi Cartoon Boy Developer Character
 * Inspired by 3D Pixar / Pop Mart blind-box figurines (chibi boy developer
 * with stylized anime hair, glasses, white shirt, blazer, sneakers, and laptop).
 * Engineered with proper bone/joint hierarchy, convex eye geometries, and
 * seamless PBR materials to ensure ZERO clipping, zero z-fighting, and 60fps animations.
 */
export function createChibiBoyCharacter() {
  const root = new THREE.Group();
  root.name = 'ChibiBoyCharacter';

  // ==========================================
  // 1. PALETTES & MATERIALS
  // ==========================================
  const skinColor = 0xfcdac2;      // Warm peach anime skin tone
  const blushColor = 0xff9c9c;     // Soft cheek blush
  const hairColor = 0x1f1e28;      // Rich charcoal anime hair
  const eyeWhite = 0xffffff;       // Crisp eye sclera
  const eyeIrisColor = 0x181418;   // Deep espresso iris
  const eyeCatch = 0xffffff;       // Specular eye catchlights
  const browColor = 0x1a1924;      // Eyebrows
  const mouthColor = 0xa34444;     // Smile
  const blazerColor = 0x1a1b28;    // Midnight tailored blazer
  const lapelColor = 0x25273b;     // Blazer lapels
  const shirtColor = 0xf8faff;     // White collared shirt
  const tieColor = 0x00eefc;       // Cyan tie accent
  const pantsColor = 0x161722;     // Dark joggers
  const sneakerSole = 0xffffff;    // White sole
  const sneakerBody = 0x232536;    // Sneaker upper
  const sneakerAccent = 0x00eefc;  // Sneaker cyan trim
  const glassesColor = 0x1e202c;   // Dark metal frames
  const laptopChassis = 0x1d1e27;  // Space grey laptop
  const laptopScreen = 0x0a0f1d;   // Dark IDE display

  const skinMat = new THREE.MeshStandardMaterial({
    color: skinColor,
    roughness: 0.50,
    metalness: 0.02
  });

  const blushMat = new THREE.MeshBasicMaterial({
    color: blushColor,
    transparent: true,
    opacity: 0.35
  });

  const hairMat = new THREE.MeshStandardMaterial({
    color: hairColor,
    roughness: 0.42,
    metalness: 0.10
  });

  const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: eyeWhite });
  const eyeIrisMat = new THREE.MeshStandardMaterial({
    color: eyeIrisColor,
    roughness: 0.20,
    metalness: 0.05
  });
  const eyePupilMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
  const eyeCatchMat = new THREE.MeshBasicMaterial({ color: eyeCatch });
  const eyebrowMat = new THREE.MeshBasicMaterial({ color: browColor });
  const mouthMat = new THREE.MeshBasicMaterial({ color: mouthColor });

  const glassesMat = new THREE.MeshStandardMaterial({
    color: glassesColor,
    roughness: 0.25,
    metalness: 0.85
  });

  const blazerMat = new THREE.MeshStandardMaterial({
    color: blazerColor,
    roughness: 0.60,
    metalness: 0.08
  });

  const lapelMat = new THREE.MeshStandardMaterial({
    color: lapelColor,
    roughness: 0.52,
    metalness: 0.10
  });

  const shirtMat = new THREE.MeshStandardMaterial({
    color: shirtColor,
    roughness: 0.65,
    metalness: 0.02
  });

  const tieMat = new THREE.MeshStandardMaterial({
    color: tieColor,
    roughness: 0.40,
    metalness: 0.25
  });

  const pantsMat = new THREE.MeshStandardMaterial({
    color: pantsColor,
    roughness: 0.70,
    metalness: 0.05
  });

  const sneakerSoleMat = new THREE.MeshStandardMaterial({
    color: sneakerSole,
    roughness: 0.45,
    metalness: 0.05
  });

  const sneakerBodyMat = new THREE.MeshStandardMaterial({
    color: sneakerBody,
    roughness: 0.45,
    metalness: 0.08
  });

  const sneakerAccentMat = new THREE.MeshBasicMaterial({
    color: sneakerAccent
  });

  const laptopMat = new THREE.MeshStandardMaterial({
    color: laptopChassis,
    roughness: 0.30,
    metalness: 0.85
  });

  const screenMat = new THREE.MeshBasicMaterial({ color: laptopScreen });
  const codePurple = new THREE.MeshBasicMaterial({ color: 0xc084fc });
  const codeGreen = new THREE.MeshBasicMaterial({ color: 0x4ade80 });
  const codeCyan = new THREE.MeshBasicMaterial({ color: 0x00eefc });
  const codeYellow = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
  const logoCyan = new THREE.MeshBasicMaterial({ color: 0x00eefc });

  // ==========================================
  // 2. ROOT BODY CONTAINER & SCALING
  // Bottom of sneaker sole is at Y = -0.815 relative to characterGroup.
  // With BASE_Y = -0.385, feet touch pedestal disc at Y = -1.20 exactly.
  // ==========================================
  const BASE_Y = -0.385;
  const characterGroup = new THREE.Group();
  characterGroup.name = 'CharacterGroup';
  characterGroup.position.y = BASE_Y;
  root.add(characterGroup);

  // ==========================================
  // 3. LEGS & CHUNKY DESIGNER SNEAKERS
  // ==========================================
  const legsGroup = new THREE.Group();
  legsGroup.name = 'LegsGroup';
  characterGroup.add(legsGroup);

  const createLeg = (isLeft) => {
    const leg = new THREE.Group();
    const side = isLeft ? 1 : -1;
    leg.position.x = side * 0.20;
    leg.position.y = -0.55;

    // Slim Pants / Joggers
    const legGeo = new THREE.CylinderGeometry(0.12, 0.10, 0.54, 18);
    const legMesh = new THREE.Mesh(legGeo, pantsMat);
    legMesh.position.y = 0.08;
    leg.add(legMesh);

    // Chunky Designer Sneaker
    const shoe = new THREE.Group();
    shoe.position.set(0, -0.22, 0.06);

    // Thick White Rubber Sole
    const soleGeo = new THREE.BoxGeometry(0.24, 0.09, 0.42);
    const soleMesh = new THREE.Mesh(soleGeo, sneakerSoleMat);
    shoe.add(soleMesh);

    // Sneaker Upper Body
    const upperGeo = new THREE.BoxGeometry(0.22, 0.13, 0.36);
    const upperMesh = new THREE.Mesh(upperGeo, sneakerBodyMat);
    upperMesh.position.set(0, 0.09, -0.01);
    shoe.add(upperMesh);

    // Rounded Front Toe Cap
    const toeGeo = new THREE.SphereGeometry(0.11, 16, 16);
    toeGeo.scale(1.0, 0.72, 1.25);
    const toeMesh = new THREE.Mesh(toeGeo, sneakerSoleMat);
    toeMesh.position.set(0, 0.07, 0.11);
    shoe.add(toeMesh);

    // Neon Accent Stripe
    const stripeGeo = new THREE.BoxGeometry(0.018, 0.032, 0.20);
    const stripeMesh = new THREE.Mesh(stripeGeo, sneakerAccentMat);
    stripeMesh.position.set(side * 0.115, 0.09, 0);
    shoe.add(stripeMesh);

    leg.add(shoe);
    return leg;
  };

  legsGroup.add(createLeg(true));
  legsGroup.add(createLeg(false));

  // ==========================================
  // 4. TORSO & BLAZER (Tailored Modern IT Suit)
  // ==========================================
  const torsoGroup = new THREE.Group();
  torsoGroup.name = 'TorsoGroup';
  torsoGroup.position.y = -0.15;
  characterGroup.add(torsoGroup);

  // Pelvis / Waist
  const waistGeo = new THREE.CylinderGeometry(0.26, 0.25, 0.16, 20);
  const waistMesh = new THREE.Mesh(waistGeo, pantsMat);
  waistMesh.position.y = -0.12;
  torsoGroup.add(waistMesh);

  // Main Blazer Torso
  const blazerGeo = new THREE.CylinderGeometry(0.31, 0.28, 0.48, 24);
  const blazerMesh = new THREE.Mesh(blazerGeo, blazerMat);
  blazerMesh.position.y = 0.18;
  torsoGroup.add(blazerMesh);

  // Inner White Shirt Panel
  const shirtGeo = new THREE.BoxGeometry(0.16, 0.30, 0.04);
  const shirtMesh = new THREE.Mesh(shirtGeo, shirtMat);
  shirtMesh.position.set(0, 0.22, 0.28);
  torsoGroup.add(shirtMesh);

  // Blazer Lapels
  const lapelLGeo = new THREE.BoxGeometry(0.07, 0.32, 0.035);
  const lapelL = new THREE.Mesh(lapelLGeo, lapelMat);
  lapelL.position.set(-0.11, 0.22, 0.30);
  lapelL.rotation.z = -0.22;
  torsoGroup.add(lapelL);

  const lapelRGeo = new THREE.BoxGeometry(0.07, 0.32, 0.035);
  const lapelR = new THREE.Mesh(lapelRGeo, lapelMat);
  lapelR.position.set(0.11, 0.22, 0.30);
  lapelR.rotation.z = 0.22;
  torsoGroup.add(lapelR);

  // Cyber Cyan Tie
  const tieGeo = new THREE.ConeGeometry(0.04, 0.22, 4);
  const tieMesh = new THREE.Mesh(tieGeo, tieMat);
  tieMesh.rotation.x = Math.PI;
  tieMesh.position.set(0, 0.19, 0.31);
  torsoGroup.add(tieMesh);

  // Tech Badge on Left Chest
  const badgeGeo = new THREE.BoxGeometry(0.06, 0.03, 0.015);
  const badgeMesh = new THREE.Mesh(badgeGeo, sneakerAccentMat);
  badgeMesh.position.set(0.18, 0.26, 0.27);
  badgeMesh.rotation.y = 0.25;
  torsoGroup.add(badgeMesh);

  // ==========================================
  // 5. NECK & COLLAR
  // ==========================================
  const neckGeo = new THREE.CylinderGeometry(0.12, 0.13, 0.16, 18);
  const neckMesh = new THREE.Mesh(neckGeo, skinMat);
  neckMesh.position.y = 0.46;
  torsoGroup.add(neckMesh);

  // Collar Points
  const collarLGeo = new THREE.ConeGeometry(0.065, 0.10, 3);
  const collarL = new THREE.Mesh(collarLGeo, shirtMat);
  collarL.position.set(-0.09, 0.44, 0.15);
  collarL.rotation.set(0.3, 0.2, 0.5);
  torsoGroup.add(collarL);

  const collarRGeo = new THREE.ConeGeometry(0.065, 0.10, 3);
  const collarR = new THREE.Mesh(collarRGeo, shirtMat);
  collarR.position.set(0.09, 0.44, 0.15);
  collarR.rotation.set(0.3, -0.2, -0.5);
  torsoGroup.add(collarR);

  // ==========================================
  // 6. HEAD (Interactive Mouse Tracking Pivot)
  // ==========================================
  const headGroup = new THREE.Group();
  headGroup.name = 'HeadGroup';
  headGroup.position.set(0, 0.94, 0);
  characterGroup.add(headGroup);

  // Cute Chibi Head Shell
  const headGeo = new THREE.SphereGeometry(0.48, 36, 30);
  headGeo.scale(1.04, 0.98, 1.02);
  const headMesh = new THREE.Mesh(headGeo, skinMat);
  headGroup.add(headMesh);

  // Cute Chubby Cheeks
  const cheekGeo = new THREE.SphereGeometry(0.18, 16, 16);
  cheekGeo.scale(1.0, 0.75, 1.0);
  
  const cheekL = new THREE.Mesh(cheekGeo, skinMat);
  cheekL.position.set(-0.30, -0.09, 0.28);
  headGroup.add(cheekL);

  const cheekR = new THREE.Mesh(cheekGeo, skinMat);
  cheekR.position.set(0.30, -0.09, 0.28);
  headGroup.add(cheekR);

  // Soft Cheek Blush (Slightly curved sphere patches that sit smoothly on skin)
  const blushGeo = new THREE.SphereGeometry(0.085, 14, 14);
  blushGeo.scale(1.0, 0.6, 0.25);

  const blushL = new THREE.Mesh(blushGeo, blushMat);
  blushL.position.set(-0.29, -0.08, 0.38);
  blushL.rotation.y = -0.35;
  headGroup.add(blushL);

  const blushR = new THREE.Mesh(blushGeo, blushMat);
  blushR.position.set(0.29, -0.08, 0.38);
  blushR.rotation.y = 0.35;
  headGroup.add(blushR);

  // Cute Ears
  const createEar = (isLeft) => {
    const ear = new THREE.Group();
    const side = isLeft ? 1 : -1;
    ear.position.set(side * 0.49, -0.02, -0.02);

    const outerGeo = new THREE.SphereGeometry(0.11, 16, 16);
    outerGeo.scale(0.35, 1.0, 0.7);
    const outer = new THREE.Mesh(outerGeo, skinMat);
    ear.add(outer);

    const innerGeo = new THREE.SphereGeometry(0.07, 12, 12);
    innerGeo.scale(0.25, 0.8, 0.5);
    const inner = new THREE.Mesh(innerGeo, blushMat);
    inner.position.set(side * 0.02, 0, 0.02);
    ear.add(inner);

    return ear;
  };
  headGroup.add(createEar(true));
  headGroup.add(createEar(false));

  // ==========================================
  // 7. 3D CONVEX ANIME EYES (Zero clipping / zero Z-fighting)
  // ==========================================
  const eyesGroup = new THREE.Group();
  eyesGroup.name = 'EyesGroup';
  headGroup.add(eyesGroup);

  const createEye = (isLeft) => {
    const eye = new THREE.Group();
    const side = isLeft ? 1 : -1;
    // Positioned naturally on the front curvature of the chibi skull
    eye.position.set(side * 0.19, 0.04, 0.44);
    eye.rotation.y = side * 0.18;

    // Sclera (White Eye - 3D Convex curved dome protruding seamlessly)
    const scleraGeo = new THREE.SphereGeometry(0.105, 20, 20);
    scleraGeo.scale(1.0, 1.25, 0.45);
    const scleraMesh = new THREE.Mesh(scleraGeo, eyeWhiteMat);
    eye.add(scleraMesh);

    // Large Glossy Iris
    const irisGeo = new THREE.SphereGeometry(0.082, 18, 18);
    irisGeo.scale(1.0, 1.05, 0.30);
    const irisMesh = new THREE.Mesh(irisGeo, eyeIrisMat);
    irisMesh.position.set(0, -0.005, 0.028);
    eye.add(irisMesh);

    // Deep Black Pupil
    const pupilGeo = new THREE.SphereGeometry(0.048, 16, 16);
    pupilGeo.scale(1.0, 1.0, 0.32);
    const pupilMesh = new THREE.Mesh(pupilGeo, eyePupilMat);
    pupilMesh.position.set(0, -0.005, 0.038);
    eye.add(pupilMesh);

    // Twinkling Anime Double Catchlights
    const catch1Geo = new THREE.SphereGeometry(0.022, 12, 12);
    catch1Geo.scale(1.0, 1.0, 0.4);
    const catch1 = new THREE.Mesh(catch1Geo, eyeCatchMat);
    catch1.position.set(0.024, 0.026, 0.048);
    eye.add(catch1);

    const catch2Geo = new THREE.SphereGeometry(0.013, 10, 10);
    catch2Geo.scale(1.0, 1.0, 0.4);
    const catch2 = new THREE.Mesh(catch2Geo, eyeCatchMat);
    catch2.position.set(-0.022, -0.024, 0.048);
    eye.add(catch2);

    // Upper Anime Eyelid Contour
    const lidGeo = new THREE.TorusGeometry(0.095, 0.016, 8, 20, Math.PI * 0.7);
    lidGeo.rotateZ(Math.PI * 0.15);
    const lidMesh = new THREE.Mesh(lidGeo, eyebrowMat);
    lidMesh.position.set(0, 0.055, 0.038);
    eye.add(lidMesh);

    return eye;
  };

  eyesGroup.add(createEye(true));
  eyesGroup.add(createEye(false));

  // Friendly Curved Eyebrows
  const browLGeo = new THREE.BoxGeometry(0.15, 0.032, 0.025);
  const browL = new THREE.Mesh(browLGeo, eyebrowMat);
  browL.position.set(0.19, 0.20, 0.42);
  browL.rotation.set(-0.1, 0.15, -0.12);
  headGroup.add(browL);

  const browRGeo = new THREE.BoxGeometry(0.15, 0.032, 0.025);
  const browR = new THREE.Mesh(browRGeo, eyebrowMat);
  browR.position.set(-0.19, 0.20, 0.42);
  browR.rotation.set(-0.1, -0.15, 0.12);
  headGroup.add(browR);

  // Cute Button Nose
  const noseGeo = new THREE.SphereGeometry(0.040, 16, 16);
  noseGeo.scale(1, 0.9, 1.2);
  const noseMesh = new THREE.Mesh(noseGeo, skinMat);
  noseMesh.position.set(0, -0.05, 0.485);
  headGroup.add(noseMesh);

  // Cheerful Confident Smile
  const smileGeo = new THREE.TorusGeometry(0.075, 0.015, 8, 24, Math.PI * 0.65);
  smileGeo.rotateX(Math.PI * 0.12);
  smileGeo.rotateZ(-Math.PI * 0.825);
  const smileMesh = new THREE.Mesh(smileGeo, mouthMat);
  smileMesh.position.set(0, -0.16, 0.465);
  headGroup.add(smileMesh);

  // ==========================================
  // 8. STYLISH DESIGNER GLASSES (Properly Offset)
  // ==========================================
  const glassesGroup = new THREE.Group();
  glassesGroup.name = 'GlassesGroup';
  glassesGroup.position.set(0, 0.04, 0.51); // Cleanly in front of eyes & nose
  headGroup.add(glassesGroup);

  // Left Rim
  const rimLGeo = new THREE.TorusGeometry(0.13, 0.015, 12, 32);
  const rimL = new THREE.Mesh(rimLGeo, glassesMat);
  rimL.position.x = 0.19;
  glassesGroup.add(rimL);

  // Right Rim
  const rimRGeo = new THREE.TorusGeometry(0.13, 0.015, 12, 32);
  const rimR = new THREE.Mesh(rimRGeo, glassesMat);
  rimR.position.x = -0.19;
  glassesGroup.add(rimR);

  // Nose Bridge
  const bridgeGeo = new THREE.CylinderGeometry(0.013, 0.013, 0.13, 8);
  bridgeGeo.rotateZ(Math.PI / 2);
  const bridgeMesh = new THREE.Mesh(bridgeGeo, glassesMat);
  bridgeMesh.position.y = 0.015;
  glassesGroup.add(bridgeMesh);

  // Left Temple Arm
  const templeLGeo = new THREE.CylinderGeometry(0.011, 0.011, 0.44, 8);
  templeLGeo.rotateX(Math.PI / 2);
  const templeL = new THREE.Mesh(templeLGeo, glassesMat);
  templeL.position.set(0.32, 0.015, -0.22);
  templeL.rotation.y = -0.18;
  glassesGroup.add(templeL);

  // Right Temple Arm
  const templeRGeo = new THREE.CylinderGeometry(0.011, 0.011, 0.44, 8);
  templeRGeo.rotateX(Math.PI / 2);
  const templeR = new THREE.Mesh(templeRGeo, glassesMat);
  templeR.position.set(-0.32, 0.015, -0.22);
  templeR.rotation.y = 0.18;
  glassesGroup.add(templeR);

  // ==========================================
  // 9. SMOOTH STYLIZED ANIME HAIR (Zero Cones / Seamless Sculpt)
  // ==========================================
  const hairGroup = new THREE.Group();
  hairGroup.name = 'HairGroup';
  headGroup.add(hairGroup);

  // Main Hair Volume (Full volumetric sculpt covering head smoothly)
  const hairMainGeo = new THREE.SphereGeometry(0.51, 32, 24);
  hairMainGeo.scale(1.06, 1.10, 1.05);
  const hairMain = new THREE.Mesh(hairMainGeo, hairMat);
  hairMain.position.set(0, 0.06, -0.04);
  hairGroup.add(hairMain);

  // Helper for smooth curved hair clusters (using smooth capsule-like spheres)
  const createHairCluster = (x, y, z, sx, sy, sz, rx = 0, ry = 0, rz = 0) => {
    const geo = new THREE.SphereGeometry(0.16, 18, 16);
    geo.scale(sx, sy, sz);
    const mesh = new THREE.Mesh(geo, hairMat);
    mesh.position.set(x, y, z);
    mesh.rotation.set(rx, ry, rz);
    return mesh;
  };

  // Volumetric Crown Tufts (Soft anime layers on top)
  hairGroup.add(createHairCluster(0, 0.52, -0.02, 1.3, 0.9, 1.4, -0.2, 0, 0));
  hairGroup.add(createHairCluster(0.18, 0.50, 0.06, 1.1, 0.85, 1.2, -0.3, 0.2, -0.2));
  hairGroup.add(createHairCluster(-0.18, 0.50, 0.06, 1.1, 0.85, 1.2, -0.3, -0.2, 0.2));
  hairGroup.add(createHairCluster(0.30, 0.40, -0.06, 0.9, 0.8, 1.1, -0.2, 0.4, -0.4));
  hairGroup.add(createHairCluster(-0.30, 0.40, -0.06, 0.9, 0.8, 1.1, -0.2, -0.4, 0.4));

  // Front Bangs (Naturally resting above eyebrows)
  hairGroup.add(createHairCluster(-0.06, 0.32, 0.36, 1.2, 0.75, 0.9, 0.5, -0.2, 0.1));
  hairGroup.add(createHairCluster(0.14, 0.30, 0.37, 1.1, 0.7, 0.9, 0.55, 0.25, -0.15));
  hairGroup.add(createHairCluster(-0.25, 0.24, 0.33, 0.95, 0.7, 0.85, 0.4, -0.4, 0.3));
  hairGroup.add(createHairCluster(0.26, 0.24, 0.33, 0.95, 0.7, 0.85, 0.4, 0.4, -0.3));

  // Sideburns in front of ears
  hairGroup.add(createHairCluster(-0.46, 0.04, 0.16, 0.75, 1.2, 0.7, 0.2, 0, 0.3));
  hairGroup.add(createHairCluster(0.46, 0.04, 0.16, 0.75, 1.2, 0.7, 0.2, 0, -0.3));

  // Back of neck hair tufts
  hairGroup.add(createHairCluster(0, -0.18, -0.44, 1.2, 0.8, 0.9, -0.6, 0, 0));
  hairGroup.add(createHairCluster(-0.20, -0.15, -0.42, 1.0, 0.75, 0.85, -0.5, -0.3, 0.2));
  hairGroup.add(createHairCluster(0.20, -0.15, -0.42, 1.0, 0.75, 0.85, -0.5, 0.3, -0.2));

  // ==========================================
  // 10. HIERARCHICAL ARMS & HANDS (No detached meshes!)
  // ==========================================
  const armsGroup = new THREE.Group();
  armsGroup.name = 'ArmsGroup';
  torsoGroup.add(armsGroup);

  // Left Arm Chain: leftShoulder -> leftUpperArm -> leftElbow -> leftForearm -> leftHand
  const leftShoulder = new THREE.Group();
  leftShoulder.position.set(0.35, 0.24, 0.02);
  armsGroup.add(leftShoulder);

  const lUpperGeo = new THREE.CylinderGeometry(0.085, 0.075, 0.28, 16);
  lUpperGeo.translate(0, -0.14, 0);
  const lUpperMesh = new THREE.Mesh(lUpperGeo, blazerMat);
  lUpperMesh.rotation.set(0.4, 0, -0.25);
  leftShoulder.add(lUpperMesh);

  const leftElbow = new THREE.Group();
  leftElbow.position.set(0.07, -0.25, 0.11);
  leftShoulder.add(leftElbow);

  const lForearmGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.25, 16);
  lForearmGeo.translate(0, -0.125, 0);
  const lForearmMesh = new THREE.Mesh(lForearmGeo, blazerMat);
  lForearmMesh.rotation.set(1.4, -0.3, 0.2);
  leftElbow.add(lForearmMesh);

  const leftWrist = new THREE.Group();
  leftWrist.position.set(0.04, -0.22, 0.12);
  leftElbow.add(leftWrist);

  const lHandGeo = new THREE.SphereGeometry(0.068, 16, 16);
  lHandGeo.scale(1.0, 0.8, 1.1);
  const lHand = new THREE.Mesh(lHandGeo, skinMat);
  leftWrist.add(lHand);

  // Right Arm Chain: rightShoulder -> rightUpperArm -> rightElbow -> rightForearm -> rightHand
  const rightShoulder = new THREE.Group();
  rightShoulder.position.set(-0.35, 0.24, 0.02);
  armsGroup.add(rightShoulder);

  const rUpperGeo = new THREE.CylinderGeometry(0.085, 0.075, 0.28, 16);
  rUpperGeo.translate(0, -0.14, 0);
  const rUpperMesh = new THREE.Mesh(rUpperGeo, blazerMat);
  rUpperMesh.rotation.set(0.4, 0, 0.25);
  rightShoulder.add(rUpperMesh);

  const rightElbow = new THREE.Group();
  rightElbow.position.set(-0.07, -0.25, 0.11);
  rightShoulder.add(rightElbow);

  const rForearmGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.25, 16);
  rForearmGeo.translate(0, -0.125, 0);
  const rForearmMesh = new THREE.Mesh(rForearmGeo, blazerMat);
  rForearmMesh.rotation.set(1.4, 0.3, -0.2);
  rightElbow.add(rForearmMesh);

  const rightWrist = new THREE.Group();
  rightWrist.position.set(-0.04, -0.22, 0.12);
  rightElbow.add(rightWrist);

  const rHandGeo = new THREE.SphereGeometry(0.068, 16, 16);
  rHandGeo.scale(1.0, 0.8, 1.1);
  const rHand = new THREE.Mesh(rHandGeo, skinMat);
  rightWrist.add(rHand);

  // ==========================================
  // 11. 3D TECH LAPTOP PROP
  // ==========================================
  const laptopGroup = new THREE.Group();
  laptopGroup.name = 'LaptopGroup';
  laptopGroup.position.set(0, -0.06, 0.40);
  laptopGroup.rotation.x = 0.12;
  torsoGroup.add(laptopGroup);

  // Laptop Base Deck
  const laptopBaseGeo = new THREE.BoxGeometry(0.46, 0.022, 0.32);
  const laptopBaseMesh = new THREE.Mesh(laptopBaseGeo, laptopMat);
  laptopGroup.add(laptopBaseMesh);

  // Keyboard Recess
  const kbRecessGeo = new THREE.BoxGeometry(0.40, 0.006, 0.17);
  const kbRecessMesh = new THREE.Mesh(kbRecessGeo, screenMat);
  kbRecessMesh.position.set(0, 0.014, -0.03);
  laptopGroup.add(kbRecessMesh);

  // Backlit Keyboard Glow
  const kbGlowGeo = new THREE.PlaneGeometry(0.38, 0.15);
  kbGlowGeo.rotateX(-Math.PI / 2);
  const kbGlowMat = new THREE.MeshBasicMaterial({
    color: 0x00eefc,
    transparent: true,
    opacity: 0.35
  });
  const kbGlowMesh = new THREE.Mesh(kbGlowGeo, kbGlowMat);
  kbGlowMesh.position.set(0, 0.018, -0.03);
  laptopGroup.add(kbGlowMesh);

  // Laptop Open Screen Lid
  const screenGroup = new THREE.Group();
  screenGroup.position.set(0, 0.01, -0.15);
  screenGroup.rotation.x = -1.90; // ~110 degrees open
  laptopGroup.add(screenGroup);

  // Screen Lid Chassis
  const lidGeo = new THREE.BoxGeometry(0.46, 0.30, 0.016);
  lidGeo.translate(0, 0.15, 0);
  const lidMesh = new THREE.Mesh(lidGeo, laptopMat);
  screenGroup.add(lidMesh);

  // Display Screen
  const displayGeo = new THREE.PlaneGeometry(0.42, 0.26);
  displayGeo.translate(0, 0.15, 0.009);
  const displayMesh = new THREE.Mesh(displayGeo, screenMat);
  screenGroup.add(displayMesh);

  // Miniature Syntax Highlighted Code Lines (Properly spaced to prevent Z-fighting)
  const createCodeLine = (x, y, w, colorMat) => {
    const lineGeo = new THREE.PlaneGeometry(w, 0.016);
    const lineMesh = new THREE.Mesh(lineGeo, colorMat);
    lineMesh.position.set(x, y + 0.15, 0.012);
    return lineMesh;
  };

  screenGroup.add(createCodeLine(-0.08, 0.09, 0.18, codePurple));
  screenGroup.add(createCodeLine(0.08, 0.09, 0.13, codeGreen));
  screenGroup.add(createCodeLine(-0.05, 0.05, 0.22, codeCyan));
  screenGroup.add(createCodeLine(0.02, 0.01, 0.25, codeYellow));
  screenGroup.add(createCodeLine(-0.13, -0.03, 0.08, codePurple));
  screenGroup.add(createCodeLine(0.05, -0.07, 0.23, codeCyan));

  // Glowing Tech Logo on Back of Lid
  const backLogoGeo = new THREE.CircleGeometry(0.040, 24);
  const backLogoMesh = new THREE.Mesh(backLogoGeo, logoCyan);
  backLogoMesh.position.set(0, 0.15, -0.010);
  backLogoMesh.rotation.y = Math.PI;
  screenGroup.add(backLogoMesh);

  // ==========================================
  // 12. ANIMATION & GESTURE CONTROLLER
  // ==========================================
  let currentAction = 'code';
  let glassesVisible = true;

  const update = (delta, elapsedTime, pointerPos = { x: 0, y: 0 }) => {
    // 1. Gentle Idle Breathing
    const breath = Math.sin(elapsedTime * 2.4);
    torsoGroup.position.y = -0.15 + breath * 0.010;
    headGroup.position.y = 0.94 + breath * 0.012;

    // 2. Smooth Head & Eye Cursor Tracking
    const targetHeadX = -pointerPos.y * 0.32;
    const targetHeadY = pointerPos.x * 0.40;
    headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, targetHeadX, 0.08);
    headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, targetHeadY, 0.08);

    // 3. Gesture Actions
    if (currentAction === 'code') {
      // Active typing on laptop keyboard
      const typeL = Math.sin(elapsedTime * 14) * 0.04;
      const typeR = Math.cos(elapsedTime * 14) * 0.04;
      leftElbow.rotation.x = 0 + typeL;
      rightElbow.rotation.x = 0 + typeR;
      rightShoulder.rotation.set(0, 0, 0);
      leftShoulder.rotation.set(0, 0, 0);

      // Gentle head nod
      headGroup.position.x = Math.sin(elapsedTime * 7) * 0.006;
      laptopGroup.position.y = -0.06 + Math.sin(elapsedTime * 7) * 0.004;

    } else if (currentAction === 'wave') {
      // Cheerful natural wave
      rightShoulder.rotation.z = THREE.MathUtils.lerp(rightShoulder.rotation.z, 2.1, 0.1);
      rightShoulder.rotation.x = THREE.MathUtils.lerp(rightShoulder.rotation.x, -0.3, 0.1);
      rightElbow.rotation.z = Math.sin(elapsedTime * 9) * 0.35;
      leftShoulder.rotation.set(0, 0, 0);
      leftElbow.rotation.set(0, 0, 0);

    } else if (currentAction === 'think') {
      // Hand to chin, thoughtful gaze
      rightShoulder.rotation.x = THREE.MathUtils.lerp(rightShoulder.rotation.x, 0.8, 0.1);
      rightShoulder.rotation.z = THREE.MathUtils.lerp(rightShoulder.rotation.z, -0.5, 0.1);
      rightElbow.rotation.x = THREE.MathUtils.lerp(rightElbow.rotation.x, 0.6, 0.1);
      headGroup.rotation.z = Math.sin(elapsedTime * 2) * 0.06;
      headGroup.rotation.x = targetHeadX - 0.15; // Gazing upward

    } else if (currentAction === 'cheer') {
      // Playful bounce on pedestal
      const bounce = Math.abs(Math.sin(elapsedTime * 5)) * 0.08;
      characterGroup.position.y = BASE_Y + bounce;
      rightShoulder.rotation.z = THREE.MathUtils.lerp(rightShoulder.rotation.z, 1.8, 0.1);
      leftShoulder.rotation.z = THREE.MathUtils.lerp(leftShoulder.rotation.z, -1.8, 0.1);
    }
  };

  const setAction = (actionName) => {
    currentAction = actionName;
    if (actionName !== 'cheer') {
      characterGroup.position.y = BASE_Y;
    }
    rightShoulder.rotation.set(0, 0, 0);
    leftShoulder.rotation.set(0, 0, 0);
    rightElbow.rotation.set(0, 0, 0);
    leftElbow.rotation.set(0, 0, 0);
    headGroup.rotation.z = 0;
  };

  const toggleGlasses = () => {
    glassesVisible = !glassesVisible;
    glassesGroup.visible = glassesVisible;
    return glassesVisible;
  };

  const setGlasses = (visible) => {
    glassesVisible = visible;
    glassesGroup.visible = glassesVisible;
    return glassesVisible;
  };

  const dispose = () => {
    root.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      }
    });
  };

  return {
    root,
    update,
    setAction,
    toggleGlasses,
    setGlasses,
    getGlassesVisible: () => glassesVisible,
    dispose
  };
}
