import * as THREE from 'three';

/**
 * Creates a high-fidelity 3D Chibi Cartoon Boy Developer Character
 * Inspired by 3D Pixar/Pop Mart/blind-box figurines, specifically matching
 * the reference image (stylish chibi boy developer with anime spikey hair,
 * glasses, black blazer, white shirt, trendy sneakers, holding a glowing laptop).
 */
export function createChibiBoyCharacter() {
  const root = new THREE.Group();
  root.name = 'ChibiBoyCharacter';

  // ==========================================
  // 1. PALETTES & MATERIALS
  // ==========================================
  const skinColor = 0xffdfc4;      // Warm anime skin tone
  const blushColor = 0xffa0a0;     // Soft cheek blush
  const hairColor = 0x1c1b26;      // Deep stylish charcoal black
  const eyeIrisColor = 0x1f1610;   // Dark espresso iris
  const blazerColor = 0x1a1b26;    // Midnight cyber blazer
  const lapelColor = 0x242638;     // Blazer lapel accent
  const shirtColor = 0xf5f7fc;     // Crisp white collared shirt
  const tieColor = 0x00eefc;       // Cyber cyan tie / accent
  const pantsColor = 0x15161f;     // Dark slim joggers
  const sneakerSole = 0xffffff;    // Clean white sneaker soles
  const sneakerBody = 0x202230;    // Sneaker upper
  const sneakerAccent = 0x00eefc;  // Sneaker cyan accents
  const laptopChassis = 0x181920;  // Matte space grey laptop
  const laptopScreen = 0x0b111e;   // IDE screen dark background

  const skinMat = new THREE.MeshStandardMaterial({
    color: skinColor,
    roughness: 0.52,
    metalness: 0.04
  });

  const blushMat = new THREE.MeshBasicMaterial({
    color: blushColor,
    transparent: true,
    opacity: 0.38
  });

  const hairMat = new THREE.MeshStandardMaterial({
    color: hairColor,
    roughness: 0.38,
    metalness: 0.12
  });

  const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const eyeIrisMat = new THREE.MeshStandardMaterial({
    color: eyeIrisColor,
    roughness: 0.25,
    metalness: 0.1
  });
  const eyePupilMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
  const eyeCatchlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const eyebrowMat = new THREE.MeshBasicMaterial({ color: 0x16151f });
  const mouthMat = new THREE.MeshBasicMaterial({ color: 0x8a3a3a });

  const glassesFrameMat = new THREE.MeshStandardMaterial({
    color: 0x1e2029,
    roughness: 0.25,
    metalness: 0.85
  });

  const blazerMat = new THREE.MeshStandardMaterial({
    color: blazerColor,
    roughness: 0.65,
    metalness: 0.08
  });

  const lapelMat = new THREE.MeshStandardMaterial({
    color: lapelColor,
    roughness: 0.55,
    metalness: 0.1
  });

  const shirtMat = new THREE.MeshStandardMaterial({
    color: shirtColor,
    roughness: 0.7,
    metalness: 0.02
  });

  const tieMat = new THREE.MeshStandardMaterial({
    color: tieColor,
    roughness: 0.4,
    metalness: 0.3
  });

  const pantsMat = new THREE.MeshStandardMaterial({
    color: pantsColor,
    roughness: 0.72,
    metalness: 0.05
  });

  const sneakerSoleMat = new THREE.MeshStandardMaterial({
    color: sneakerSole,
    roughness: 0.5,
    metalness: 0.05
  });

  const sneakerBodyMat = new THREE.MeshStandardMaterial({
    color: sneakerBody,
    roughness: 0.45,
    metalness: 0.1
  });

  const sneakerAccentMat = new THREE.MeshBasicMaterial({
    color: sneakerAccent
  });

  const laptopChassisMat = new THREE.MeshStandardMaterial({
    color: laptopChassis,
    roughness: 0.28,
    metalness: 0.88
  });

  const laptopScreenMat = new THREE.MeshBasicMaterial({
    color: laptopScreen
  });

  const cyanCodeMat = new THREE.MeshBasicMaterial({ color: 0x00eefc });
  const purpleCodeMat = new THREE.MeshBasicMaterial({ color: 0xc084fc });
  const greenCodeMat = new THREE.MeshBasicMaterial({ color: 0x4ade80 });
  const yellowCodeMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
  const glowingLogoMat = new THREE.MeshBasicMaterial({ color: 0x00eefc });

  // ==========================================
  // 2. ROOT BODY CONTAINER & SCALING
  // Bottom of sneaker sole is at Y = -0.815 relative to characterGroup.
  // When characterGroup is at Y = -0.385, bottom of sole touches pedestal at Y = -1.20!
  // ==========================================
  const BASE_Y = -0.385;
  const characterGroup = new THREE.Group();
  characterGroup.name = 'CharacterGroup';
  characterGroup.position.y = BASE_Y;
  root.add(characterGroup);

  // ==========================================
  // 3. LEGS & FEET (Pants + Chunky Sneakers)
  // ==========================================
  const legsGroup = new THREE.Group();
  legsGroup.name = 'LegsGroup';
  characterGroup.add(legsGroup);

  const createLeg = (isLeft) => {
    const leg = new THREE.Group();
    const side = isLeft ? 1 : -1;
    leg.position.x = side * 0.21;
    leg.position.y = -0.55;

    // Thigh & Calf (Stylish slim jogger trousers)
    const legGeo = new THREE.CylinderGeometry(0.125, 0.105, 0.55, 18);
    const legMesh = new THREE.Mesh(legGeo, pantsMat);
    legMesh.position.y = 0.08;
    leg.add(legMesh);

    // Chunky Designer Sneaker
    const shoeGroup = new THREE.Group();
    shoeGroup.position.set(0, -0.22, 0.06);

    // Sole
    const soleGeo = new THREE.BoxGeometry(0.25, 0.09, 0.44);
    const soleMesh = new THREE.Mesh(soleGeo, sneakerSoleMat);
    shoeGroup.add(soleMesh);

    // Sneaker Upper
    const upperGeo = new THREE.BoxGeometry(0.23, 0.14, 0.38);
    const upperMesh = new THREE.Mesh(upperGeo, sneakerBodyMat);
    upperMesh.position.set(0, 0.09, -0.01);
    shoeGroup.add(upperMesh);

    // Rounded Toe Cap
    const toeGeo = new THREE.SphereGeometry(0.115, 16, 16);
    toeGeo.scale(1, 0.75, 1.3);
    const toeMesh = new THREE.Mesh(toeGeo, sneakerSoleMat);
    toeMesh.position.set(0, 0.07, 0.12);
    shoeGroup.add(toeMesh);

    // Neon Accent Stripe on Side
    const stripeGeo = new THREE.BoxGeometry(0.02, 0.035, 0.22);
    const stripeMesh = new THREE.Mesh(stripeGeo, sneakerAccentMat);
    stripeMesh.position.set(side * 0.12, 0.09, 0);
    shoeGroup.add(stripeMesh);

    leg.add(shoeGroup);
    return leg;
  };

  const leftLeg = createLeg(true);
  const rightLeg = createLeg(false);
  legsGroup.add(leftLeg);
  legsGroup.add(rightLeg);

  // ==========================================
  // 4. TORSO & BLAZER (IT Developer Look)
  // ==========================================
  const torsoGroup = new THREE.Group();
  torsoGroup.name = 'TorsoGroup';
  torsoGroup.position.y = -0.15;
  characterGroup.add(torsoGroup);

  // Pelvis / Waist
  const waistGeo = new THREE.CylinderGeometry(0.28, 0.26, 0.16, 20);
  const waistMesh = new THREE.Mesh(waistGeo, pantsMat);
  waistMesh.position.y = -0.12;
  torsoGroup.add(waistMesh);

  // Main Blazer Body (Slightly tapered at waist, broad shoulders)
  const blazerGeo = new THREE.CylinderGeometry(0.32, 0.29, 0.48, 24);
  const blazerMesh = new THREE.Mesh(blazerGeo, blazerMat);
  blazerMesh.position.y = 0.18;
  torsoGroup.add(blazerMesh);

  // Inner White Shirt (V-opening in front of blazer)
  const shirtVGeo = new THREE.PlaneGeometry(0.18, 0.32);
  const shirtVMesh = new THREE.Mesh(shirtVGeo, shirtMat);
  shirtVMesh.position.set(0, 0.22, 0.305);
  torsoGroup.add(shirtVMesh);

  // Lapel Left
  const lapelLGeo = new THREE.BoxGeometry(0.08, 0.34, 0.04);
  const lapelLMesh = new THREE.Mesh(lapelLGeo, lapelMat);
  lapelLMesh.position.set(-0.13, 0.22, 0.31);
  lapelLMesh.rotation.z = -0.22;
  torsoGroup.add(lapelLMesh);

  // Lapel Right
  const lapelRGeo = new THREE.BoxGeometry(0.08, 0.34, 0.04);
  const lapelRMesh = new THREE.Mesh(lapelRGeo, lapelMat);
  lapelRMesh.position.set(0.13, 0.22, 0.31);
  lapelRMesh.rotation.z = 0.22;
  torsoGroup.add(lapelRMesh);

  // Cyber Cyan Tie
  const tieGeo = new THREE.ConeGeometry(0.045, 0.24, 4);
  const tieMesh = new THREE.Mesh(tieGeo, tieMat);
  tieMesh.rotation.x = Math.PI;
  tieMesh.position.set(0, 0.18, 0.32);
  torsoGroup.add(tieMesh);

  // Tech Badge on Left Chest
  const badgeGeo = new THREE.BoxGeometry(0.065, 0.035, 0.015);
  const badgeMesh = new THREE.Mesh(badgeGeo, sneakerAccentMat);
  badgeMesh.position.set(0.19, 0.27, 0.28);
  badgeMesh.rotation.y = 0.25;
  torsoGroup.add(badgeMesh);

  // ==========================================
  // 5. NECK & COLLAR
  // ==========================================
  const neckGeo = new THREE.CylinderGeometry(0.13, 0.14, 0.16, 20);
  const neckMesh = new THREE.Mesh(neckGeo, skinMat);
  neckMesh.position.y = 0.46;
  torsoGroup.add(neckMesh);

  // Crisp White Shirt Collar Points
  const collarLGeo = new THREE.ConeGeometry(0.07, 0.11, 3);
  const collarLMesh = new THREE.Mesh(collarLGeo, shirtMat);
  collarLMesh.position.set(-0.10, 0.43, 0.16);
  collarLMesh.rotation.set(0.3, 0.2, 0.5);
  torsoGroup.add(collarLMesh);

  const collarRGeo = new THREE.ConeGeometry(0.07, 0.11, 3);
  const collarRMesh = new THREE.Mesh(collarRGeo, shirtMat);
  collarRMesh.position.set(0.10, 0.43, 0.16);
  collarRMesh.rotation.set(0.3, -0.2, -0.5);
  torsoGroup.add(collarRMesh);

  // ==========================================
  // 6. HEAD & CUTE CHIBI FACE (Interactive Pivot!)
  // ==========================================
  const headGroup = new THREE.Group();
  headGroup.name = 'HeadGroup';
  headGroup.position.set(0, 0.94, 0);
  characterGroup.add(headGroup);

  // Base Chibi Head (Cute pear/chubby cheeks shape)
  const headGeo = new THREE.SphereGeometry(0.48, 36, 32);
  headGeo.scale(1.05, 0.98, 1.02);
  const headMesh = new THREE.Mesh(headGeo, skinMat);
  headGroup.add(headMesh);

  // Chubby Cheeks
  const cheekLGeo = new THREE.SphereGeometry(0.20, 16, 16);
  const cheekL = new THREE.Mesh(cheekLGeo, skinMat);
  cheekL.position.set(-0.34, -0.10, 0.22);
  headGroup.add(cheekL);

  const cheekRGeo = new THREE.SphereGeometry(0.20, 16, 16);
  const cheekR = new THREE.Mesh(cheekRGeo, skinMat);
  cheekR.position.set(0.34, -0.10, 0.22);
  headGroup.add(cheekR);

  // Soft Cheek Blush (Cute Anime Blushing)
  const blushLGeo = new THREE.CircleGeometry(0.09, 20);
  const blushL = new THREE.Mesh(blushLGeo, blushMat);
  blushL.position.set(-0.31, -0.09, 0.42);
  blushL.rotation.y = -0.35;
  headGroup.add(blushL);

  const blushRGeo = new THREE.CircleGeometry(0.09, 20);
  const blushR = new THREE.Mesh(blushRGeo, blushMat);
  blushR.position.set(0.31, -0.09, 0.42);
  blushR.rotation.y = 0.35;
  headGroup.add(blushR);

  // Ears
  const createEar = (isLeft) => {
    const earGroup = new THREE.Group();
    const side = isLeft ? 1 : -1;
    earGroup.position.set(side * 0.49, -0.02, -0.02);

    const earOuterGeo = new THREE.SphereGeometry(0.12, 16, 16);
    earOuterGeo.scale(0.4, 1.0, 0.7);
    const earOuter = new THREE.Mesh(earOuterGeo, skinMat);
    earGroup.add(earOuter);

    const earInnerGeo = new THREE.SphereGeometry(0.08, 12, 12);
    earInnerGeo.scale(0.3, 0.8, 0.5);
    const earInner = new THREE.Mesh(earInnerGeo, blushMat);
    earInner.position.set(side * 0.02, 0, 0.02);
    earGroup.add(earInner);

    return earGroup;
  };
  headGroup.add(createEar(true));
  headGroup.add(createEar(false));

  // ==========================================
  // 7. BIG EXPRESSIVE ANIME EYES & CATCHLIGHTS
  // ==========================================
  const eyesGroup = new THREE.Group();
  eyesGroup.name = 'EyesGroup';
  headGroup.add(eyesGroup);

  const createEye = (isLeft) => {
    const eye = new THREE.Group();
    const side = isLeft ? 1 : -1;
    eye.position.set(side * 0.19, 0.04, 0.43);
    eye.rotation.y = side * 0.12;

    // Sclera (White eye background)
    const scleraGeo = new THREE.SphereGeometry(0.11, 20, 20);
    scleraGeo.scale(1.0, 1.25, 0.55);
    const scleraMesh = new THREE.Mesh(scleraGeo, eyeWhiteMat);
    eye.add(scleraMesh);

    // Large Iris (Rich dark chocolate with subtle highlight)
    const irisGeo = new THREE.CircleGeometry(0.088, 24);
    const irisMesh = new THREE.Mesh(irisGeo, eyeIrisMat);
    irisMesh.position.set(0, -0.01, 0.055);
    eye.add(irisMesh);

    // Deep Black Pupil
    const pupilGeo = new THREE.CircleGeometry(0.052, 20);
    const pupilMesh = new THREE.Mesh(pupilGeo, eyePupilMat);
    pupilMesh.position.set(0, -0.01, 0.058);
    eye.add(pupilMesh);

    // Signature Anime Catchlights (Twinkling Double Reflections!)
    const catch1Geo = new THREE.CircleGeometry(0.026, 16);
    const catch1 = new THREE.Mesh(catch1Geo, eyeCatchlightMat);
    catch1.position.set(0.025, 0.028, 0.062);
    eye.add(catch1);

    const catch2Geo = new THREE.CircleGeometry(0.014, 12);
    const catch2 = new THREE.Mesh(catch2Geo, eyeCatchlightMat);
    catch2.position.set(-0.025, -0.028, 0.062);
    eye.add(catch2);

    // Upper Anime Eyelid / Lash Contour
    const lidGeo = new THREE.TorusGeometry(0.10, 0.018, 8, 24, Math.PI * 0.7);
    lidGeo.rotateZ(Math.PI * 0.15);
    const lidMesh = new THREE.Mesh(lidGeo, eyebrowMat);
    lidMesh.position.set(0, 0.06, 0.055);
    eye.add(lidMesh);

    return eye;
  };

  const leftEye = createEye(true);
  const rightEye = createEye(false);
  eyesGroup.add(leftEye);
  eyesGroup.add(rightEye);

  // Confident Friendly Eyebrows
  const browLGeo = new THREE.BoxGeometry(0.16, 0.035, 0.03);
  const browL = new THREE.Mesh(browLGeo, eyebrowMat);
  browL.position.set(0.20, 0.22, 0.44);
  browL.rotation.set(-0.1, 0.15, -0.12);
  headGroup.add(browL);

  const browRGeo = new THREE.BoxGeometry(0.16, 0.035, 0.03);
  const browR = new THREE.Mesh(browRGeo, eyebrowMat);
  browR.position.set(-0.20, 0.22, 0.44);
  browR.rotation.set(-0.1, -0.15, 0.12);
  headGroup.add(browR);

  // Cute Button Nose
  const noseGeo = new THREE.SphereGeometry(0.042, 16, 16);
  noseGeo.scale(1, 0.9, 1.2);
  const noseMesh = new THREE.Mesh(noseGeo, skinMat);
  noseMesh.position.set(0, -0.05, 0.49);
  headGroup.add(noseMesh);

  // Cheerful Confident Smile
  const smileGeo = new THREE.TorusGeometry(0.08, 0.018, 8, 24, Math.PI * 0.65);
  smileGeo.rotateX(Math.PI * 0.1);
  smileGeo.rotateZ(-Math.PI * 0.825);
  const smileMesh = new THREE.Mesh(smileGeo, mouthMat);
  smileMesh.position.set(0, -0.16, 0.45);
  headGroup.add(smileMesh);

  // ==========================================
  // 8. STYLISH DESIGNER GLASSES (From Reference!)
  // ==========================================
  const glassesGroup = new THREE.Group();
  glassesGroup.name = 'GlassesGroup';
  glassesGroup.position.set(0, 0.04, 0.48);
  headGroup.add(glassesGroup);

  // Left Rim
  const rimLGeo = new THREE.TorusGeometry(0.135, 0.016, 12, 32);
  const rimL = new THREE.Mesh(rimLGeo, glassesFrameMat);
  rimL.position.x = 0.20;
  glassesGroup.add(rimL);

  // Right Rim
  const rimRGeo = new THREE.TorusGeometry(0.135, 0.016, 12, 32);
  const rimR = new THREE.Mesh(rimRGeo, glassesFrameMat);
  rimR.position.x = -0.20;
  glassesGroup.add(rimR);

  // Nose Bridge
  const bridgeGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.14, 8);
  bridgeGeo.rotateZ(Math.PI / 2);
  const bridgeMesh = new THREE.Mesh(bridgeGeo, glassesFrameMat);
  bridgeMesh.position.y = 0.02;
  glassesGroup.add(bridgeMesh);

  // Left Temple Arm
  const templeLGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.42, 8);
  templeLGeo.rotateX(Math.PI / 2);
  const templeL = new THREE.Mesh(templeLGeo, glassesFrameMat);
  templeL.position.set(0.33, 0.02, -0.20);
  templeL.rotation.y = -0.15;
  glassesGroup.add(templeL);

  // Right Temple Arm
  const templeRGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.42, 8);
  templeRGeo.rotateX(Math.PI / 2);
  const templeR = new THREE.Mesh(templeRGeo, glassesFrameMat);
  templeR.position.set(-0.33, 0.02, -0.20);
  templeR.rotation.y = 0.15;
  glassesGroup.add(templeR);

  // ==========================================
  // 9. STYLIZED SPIKEY ANIME HAIR (Signature!)
  // ==========================================
  const hairGroup = new THREE.Group();
  hairGroup.name = 'HairGroup';
  headGroup.add(hairGroup);

  // Base Scalp Cap (Fitting snugly around head)
  const scalpGeo = new THREE.SphereGeometry(0.51, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.65);
  const scalpMesh = new THREE.Mesh(scalpGeo, hairMat);
  scalpMesh.position.set(0, 0.02, -0.03);
  hairGroup.add(scalpMesh);

  // Helper to create tapered spike hair clumps
  const createHairSpike = (x, y, z, rx, ry, rz, scaleX = 1, scaleY = 1, scaleZ = 1) => {
    const spikeGeo = new THREE.ConeGeometry(0.12 * scaleX, 0.38 * scaleY, 6);
    spikeGeo.translate(0, 0.19 * scaleY, 0);
    const spikeMesh = new THREE.Mesh(spikeGeo, hairMat);
    spikeMesh.position.set(x, y, z);
    spikeMesh.rotation.set(rx, ry, rz);
    spikeMesh.scale.z = scaleZ;
    return spikeMesh;
  };

  // Top Spikes (Energetic Anime Crown!)
  hairGroup.add(createHairSpike(0, 0.48, -0.05, -0.2, 0, 0, 1.2, 1.3));
  hairGroup.add(createHairSpike(0.16, 0.46, 0.02, -0.3, 0.2, -0.3, 1.1, 1.2));
  hairGroup.add(createHairSpike(-0.16, 0.46, 0.02, -0.3, -0.2, 0.3, 1.1, 1.2));
  hairGroup.add(createHairSpike(0.28, 0.38, -0.12, -0.2, 0.5, -0.6, 1.0, 1.1));
  hairGroup.add(createHairSpike(-0.28, 0.38, -0.12, -0.2, -0.5, 0.6, 1.0, 1.1));
  hairGroup.add(createHairSpike(0, 0.44, -0.26, 0.4, 0, 0, 1.1, 1.1));

  // Front Bangs (Layered across forehead)
  hairGroup.add(createHairSpike(-0.06, 0.36, 0.36, 0.8, -0.2, 0.15, 1.1, 0.95, 1.3));
  hairGroup.add(createHairSpike(0.12, 0.34, 0.38, 0.85, 0.25, -0.2, 1.05, 0.9, 1.3));
  hairGroup.add(createHairSpike(-0.24, 0.28, 0.34, 0.7, -0.4, 0.4, 0.95, 0.9, 1.2));
  hairGroup.add(createHairSpike(0.26, 0.28, 0.34, 0.7, 0.4, -0.4, 0.95, 0.9, 1.2));

  // Sideburns framing the cheeks
  hairGroup.add(createHairSpike(-0.46, 0.08, 0.18, 0.2, 0, 0.35, 0.9, 0.8));
  hairGroup.add(createHairSpike(0.46, 0.08, 0.18, 0.2, 0, -0.35, 0.9, 0.8));

  // Back of head tufts
  hairGroup.add(createHairSpike(0, -0.15, -0.45, -0.8, 0, 0, 1.2, 1.0));
  hairGroup.add(createHairSpike(-0.22, -0.12, -0.42, -0.7, -0.3, 0.3, 1.0, 0.9));
  hairGroup.add(createHairSpike(0.22, -0.12, -0.42, -0.7, 0.3, -0.3, 1.0, 0.9));

  // ==========================================
  // 10. ARMS & HANDS (Holding Laptop Prop)
  // ==========================================
  const armsGroup = new THREE.Group();
  armsGroup.name = 'ArmsGroup';
  characterGroup.add(armsGroup);

  // Left Arm
  const leftArmGroup = new THREE.Group();
  leftArmGroup.name = 'LeftArmGroup';
  leftArmGroup.position.set(0.36, 0.02, 0.02);
  armsGroup.add(leftArmGroup);

  const lUpperGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.32, 16);
  lUpperGeo.translate(0, -0.14, 0);
  const lUpperMesh = new THREE.Mesh(lUpperGeo, blazerMat);
  lUpperMesh.rotation.z = -0.35;
  lUpperMesh.rotation.x = 0.55;
  leftArmGroup.add(lUpperMesh);

  const lForearmGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.28, 16);
  lForearmGeo.translate(0, -0.12, 0);
  const lForearmMesh = new THREE.Mesh(lForearmGeo, blazerMat);
  lForearmMesh.position.set(0.10, -0.26, 0.16);
  lForearmMesh.rotation.set(1.4, -0.4, 0.3);
  leftArmGroup.add(lForearmMesh);

  // Left Hand
  const lHandGeo = new THREE.SphereGeometry(0.07, 16, 16);
  lHandGeo.scale(1, 0.8, 1.1);
  const lHand = new THREE.Mesh(lHandGeo, skinMat);
  lHand.position.set(0.18, -0.24, 0.40);
  leftArmGroup.add(lHand);

  // Right Arm (Animated during coding/waving!)
  const rightArmGroup = new THREE.Group();
  rightArmGroup.name = 'RightArmGroup';
  rightArmGroup.position.set(-0.36, 0.02, 0.02);
  armsGroup.add(rightArmGroup);

  const rUpperGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.32, 16);
  rUpperGeo.translate(0, -0.14, 0);
  const rUpperMesh = new THREE.Mesh(rUpperGeo, blazerMat);
  rUpperMesh.rotation.z = 0.35;
  rUpperMesh.rotation.x = 0.55;
  rightArmGroup.add(rUpperMesh);

  const rForearmGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.28, 16);
  rForearmGeo.translate(0, -0.12, 0);
  const rForearmMesh = new THREE.Mesh(rForearmGeo, blazerMat);
  rForearmMesh.position.set(-0.10, -0.26, 0.16);
  rForearmMesh.rotation.set(1.4, 0.4, -0.3);
  rightArmGroup.add(rForearmMesh);

  // Right Hand
  const rHandGeo = new THREE.SphereGeometry(0.07, 16, 16);
  rHandGeo.scale(1, 0.8, 1.1);
  const rHand = new THREE.Mesh(rHandGeo, skinMat);
  rHand.position.set(-0.18, -0.24, 0.40);
  rightArmGroup.add(rHand);

  // ==========================================
  // 11. 3D TECH LAPTOP PROP (In Hands!)
  // ==========================================
  const laptopGroup = new THREE.Group();
  laptopGroup.name = 'LaptopGroup';
  laptopGroup.position.set(0, -0.24, 0.46);
  laptopGroup.rotation.x = 0.15;
  characterGroup.add(laptopGroup);

  // Laptop Base Deck
  const laptopBaseGeo = new THREE.BoxGeometry(0.48, 0.024, 0.34);
  const laptopBaseMesh = new THREE.Mesh(laptopBaseGeo, laptopChassisMat);
  laptopGroup.add(laptopBaseMesh);

  // Keyboard Recess & Keys
  const kbRecessGeo = new THREE.BoxGeometry(0.42, 0.006, 0.18);
  const kbRecessMesh = new THREE.Mesh(kbRecessGeo, laptopScreenMat);
  kbRecessMesh.position.set(0, 0.015, -0.03);
  laptopGroup.add(kbRecessMesh);

  // Glowing Keyboard Backlight Accent
  const kbGlowGeo = new THREE.PlaneGeometry(0.40, 0.16);
  kbGlowGeo.rotateX(-Math.PI / 2);
  const kbGlowMesh = new THREE.Mesh(kbGlowGeo, cyanCodeMat);
  kbGlowMesh.position.set(0, 0.019, -0.03);
  kbGlowMesh.material.transparent = true;
  kbGlowMesh.material.opacity = 0.35;
  laptopGroup.add(kbGlowMesh);

  // Trackpad
  const trackpadGeo = new THREE.BoxGeometry(0.14, 0.005, 0.09);
  const trackpadMesh = new THREE.Mesh(trackpadGeo, lapelMat);
  trackpadMesh.position.set(0, 0.015, 0.10);
  laptopGroup.add(trackpadMesh);

  // Laptop Open Screen (Angled up toward character)
  const screenGroup = new THREE.Group();
  screenGroup.position.set(0, 0.01, -0.16);
  screenGroup.rotation.x = -1.95; // Opened ~110 degrees
  laptopGroup.add(screenGroup);

  // Lid Bezel
  const lidGeo = new THREE.BoxGeometry(0.48, 0.32, 0.018);
  lidGeo.translate(0, 0.16, 0);
  const lidMesh = new THREE.Mesh(lidGeo, laptopChassisMat);
  screenGroup.add(lidMesh);

  // Display Screen
  const displayGeo = new THREE.PlaneGeometry(0.44, 0.28);
  displayGeo.translate(0, 0.16, 0.01);
  const displayMesh = new THREE.Mesh(displayGeo, laptopScreenMat);
  screenGroup.add(displayMesh);

  // Miniature Glowing Code Lines on Display!
  const createCodeLine = (x, y, w, colorMat) => {
    const lineGeo = new THREE.PlaneGeometry(w, 0.018);
    const lineMesh = new THREE.Mesh(lineGeo, colorMat);
    lineMesh.position.set(x, y + 0.16, 0.012);
    return lineMesh;
  };

  screenGroup.add(createCodeLine(-0.08, 0.10, 0.18, purpleCodeMat)); // 'const dev ='
  screenGroup.add(createCodeLine(0.08, 0.10, 0.14, greenCodeMat));   // '"Tuyển";'
  screenGroup.add(createCodeLine(-0.06, 0.06, 0.22, cyanCodeMat));    // 'function code() {'
  screenGroup.add(createCodeLine(0.02, 0.02, 0.26, yellowCodeMat));   // '  return 3D_Magic;'
  screenGroup.add(createCodeLine(-0.14, -0.02, 0.08, purpleCodeMat)); // '}'
  screenGroup.add(createCodeLine(0.05, -0.06, 0.24, cyanCodeMat));    // '// Ready to ship'

  // Glowing Tech Logo on Back of Laptop Lid (Facing the camera/viewer!)
  const backLogoGeo = new THREE.CircleGeometry(0.045, 24);
  const backLogoMesh = new THREE.Mesh(backLogoGeo, glowingLogoMat);
  backLogoMesh.position.set(0, 0.16, -0.011);
  backLogoMesh.rotation.y = Math.PI;
  screenGroup.add(backLogoMesh);

  // ==========================================
  // 12. ANIMATION & INTERACTION STATE
  // ==========================================
  let currentAction = 'code';
  let glassesVisible = true;

  // Animation update function called every frame in requestAnimationFrame
  const update = (delta, elapsedTime, pointerPos = { x: 0, y: 0 }) => {
    // 1. Gentle Idle Breathing / Floating
    const breath = Math.sin(elapsedTime * 2.5);
    torsoGroup.position.y = -0.15 + breath * 0.012;
    headGroup.position.y = 0.94 + breath * 0.015;

    // 2. Mouse / Touch Parallax Tracking
    const targetHeadX = -pointerPos.y * 0.35;
    const targetHeadY = pointerPos.x * 0.45;
    headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, targetHeadX, 0.08);
    headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, targetHeadY, 0.08);

    // 3. Gesture Actions
    if (currentAction === 'code') {
      // Active typing animation on keyboard
      const typeL = Math.sin(elapsedTime * 14) * 0.035;
      const typeR = Math.cos(elapsedTime * 14) * 0.035;
      leftArmGroup.position.y = 0.02 + typeL;
      rightArmGroup.position.y = 0.02 + typeR;
      rightArmGroup.rotation.set(0, 0, 0);

      // Gentle head nod to code
      headGroup.position.x = Math.sin(elapsedTime * 7) * 0.008;
      laptopGroup.position.y = -0.24 + Math.sin(elapsedTime * 7) * 0.005;

    } else if (currentAction === 'wave') {
      // Cheerful wave to visitor
      rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, 2.3, 0.1);
      rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -0.3, 0.1);
      rForearmMesh.rotation.z = Math.sin(elapsedTime * 9) * 0.4;
      leftArmGroup.position.y = 0.02;

    } else if (currentAction === 'think') {
      // Hand on chin, thoughtful upward glance
      rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, 0.9, 0.1);
      rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, -0.6, 0.1);
      headGroup.rotation.z = Math.sin(elapsedTime * 2) * 0.08;
      headGroup.rotation.x = targetHeadX - 0.15; // Gazing slightly up

    } else if (currentAction === 'cheer') {
      // Playful bounce on pedestal!
      const bounce = Math.abs(Math.sin(elapsedTime * 5)) * 0.09;
      characterGroup.position.y = BASE_Y + bounce;
      rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, 2.0, 0.1);
      leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, -2.0, 0.1);
    }
  };

  const setAction = (actionName) => {
    currentAction = actionName;
    if (actionName !== 'cheer') {
      characterGroup.position.y = BASE_Y;
      leftArmGroup.rotation.set(0, 0, 0);
      rightArmGroup.rotation.set(0, 0, 0);
    }
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
