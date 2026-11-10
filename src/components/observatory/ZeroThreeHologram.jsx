import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useZero } from "../../context/ZeroContext";

export const ZeroThreeHologram = ({ companionState = "idle" }) => {
  const mountRef = useRef(null);
  const { theme, hologramGlow, reducedMotion } = useZero();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 640;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Color conversion from CSS tokens
    const primaryHex = new THREE.Color(theme.accentPrimary || "#00f2fe");
    const secondaryHex = new THREE.Color(theme.accentSecondary || "#9d4edd");
    const goldHex = new THREE.Color(theme.accentTertiary || "#ffd166");

    // 1. Concentric Holographic Ground Dais / Pedestal
    const daisGroup = new THREE.Group();
    daisGroup.position.set(0, -3.2, 0);
    daisGroup.rotation.x = Math.PI * 0.38; // 3D perspective tilt
    scene.add(daisGroup);

    // Tier 1: Outer Celestial Dais Base Ring
    const outerRingGeo = new THREE.RingGeometry(3.6, 3.75, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: goldHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    daisGroup.add(outerRing);

    // Tier 2: Golden Runic Segmented Dais Tier
    const runeTierGeo = new THREE.RingGeometry(2.9, 3.15, 64);
    const runeTierMat = new THREE.MeshBasicMaterial({
      color: goldHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const runeTier = new THREE.Mesh(runeTierGeo, runeTierMat);
    daisGroup.add(runeTier);

    // Tier 3: Electric Cyan Orbit Ring
    const midRingGeo = new THREE.TorusGeometry(2.35, 0.04, 16, 64);
    const midRingMat = new THREE.MeshBasicMaterial({
      color: primaryHex,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const midRing = new THREE.Mesh(midRingGeo, midRingMat);
    daisGroup.add(midRing);

    // Tier 4: Inner Core Violet Energy Ring
    const innerRingGeo = new THREE.RingGeometry(1.5, 1.62, 48);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: secondaryHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    daisGroup.add(innerRing);

    // Tier 5: Innermost Star Rune Ring
    const coreRuneGeo = new THREE.RingGeometry(0.85, 0.95, 32);
    const coreRuneMat = new THREE.MeshBasicMaterial({
      color: goldHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    const coreRune = new THREE.Mesh(coreRuneGeo, coreRuneMat);
    daisGroup.add(coreRune);

    // Tier 6: Glowing Central Dais Starlight Pool
    const daisDiskGeo = new THREE.CircleGeometry(0.82, 32);
    const daisDiskMat = new THREE.MeshBasicMaterial({
      color: primaryHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const daisDisk = new THREE.Mesh(daisDiskGeo, daisDiskMat);
    daisGroup.add(daisDisk);

    // 2. 3D Spiral Stardust Particle Cloud (Floating around character)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 0.8 + Math.random() * 2.2;
      const y = -2.2 + Math.random() * 4.6;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * (radius * 0.6);

      // Gradient color interpolation between primary, secondary, and gold
      const pick = Math.random();
      const col = pick < 0.45 ? primaryHex : pick < 0.8 ? secondaryHex : goldHex;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 5. Lights
    const orbLight = new THREE.PointLight(primaryHex, 2.5, 6);
    orbLight.position.set(0.95, -0.15, 0.4);
    scene.add(orbLight);

    const daisLight = new THREE.PointLight(secondaryHex, 1.8, 5);
    daisLight.position.set(0, -2.5, 0);
    scene.add(daisLight);

    // Mouse tracking variables
    let targetRotY = 0;
    let targetRotX = 0;
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = nx * 0.12;
      targetRotX = -ny * 0.08;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (reducedMotion) {
        renderer.render(scene, camera);
        return;
      }

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera tilt tracking mouse
      camera.position.x += (targetRotY * 3.5 - camera.position.x) * 0.04;
      camera.position.y += (targetRotX * 2.0 - camera.position.y) * 0.04;
      camera.lookAt(0, -0.2, 0);

      // Rotate ground dais rings at different speeds
      outerRing.rotation.z += delta * 0.15;
      midRing.rotation.z -= delta * 0.22;
      innerRing.rotation.z += delta * 0.35;

      // Float particles gently upward in a spiral
      const posAttr = particleGeo.attributes.position;
      const posArray = posAttr.array;
      for (let i = 0; i < particleCount; i++) {
        let py = posArray[i * 3 + 1];
        py += delta * 0.35;
        if (py > 2.4) py = -2.2;
        posArray[i * 3 + 1] = py;
      }
      posAttr.needsUpdate = true;
      particleSystem.rotation.y += delta * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [theme, hologramGlow, reducedMotion, companionState]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center overflow-visible"
      aria-hidden="true"
    />
  );
};
