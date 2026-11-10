import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useZero } from "../../context/ZeroContext";

export const ZeroThreeHologram = ({ companionState = "idle" }) => {
  const mountRef = useRef(null);
  const { theme, hologramGlow, reducedMotion } = useZero();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

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
    const goldHex = new THREE.Color(theme.accentTertiary || "#ffd166");

    // 1. Gyroscopic Coordinate Rings Encircling the Cosmic Star Orb at (0, 0.12, 0)
    const orbGroup = new THREE.Group();
    orbGroup.position.set(0, 0.12, 0);
    scene.add(orbGroup);

    const orbRing1Geo = new THREE.TorusGeometry(0.58, 0.007, 16, 48);
    const orbRing1Mat = new THREE.MeshBasicMaterial({
      color: goldHex,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const orbRing1 = new THREE.Mesh(orbRing1Geo, orbRing1Mat);
    orbRing1.rotation.x = Math.PI * 0.32;
    orbGroup.add(orbRing1);

    const orbRing2Geo = new THREE.TorusGeometry(0.68, 0.006, 16, 48);
    const orbRing2Mat = new THREE.MeshBasicMaterial({
      color: primaryHex,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const orbRing2 = new THREE.Mesh(orbRing2Geo, orbRing2Mat);
    orbRing2.rotation.y = Math.PI * 0.36;
    orbGroup.add(orbRing2);

    // 2. Dynamic Interactive Point Light (Radiating from the Cosmic Star Orb)
    const orbLight = new THREE.PointLight(primaryHex, 2.5, 6);
    orbLight.position.set(0, 0.12, 0.6);
    scene.add(orbLight);

    // Mouse tracking variables
    let targetRotY = 0;
    let targetRotX = 0;
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = nx * 0.04;
      targetRotX = -ny * 0.025;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Handle Window Resize
    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId;
    let lastTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (reducedMotion) {
        renderer.render(scene, camera);
        return;
      }

      const now = performance.now();
      const delta = Math.min((now - lastTime) * 0.001, 0.1);
      lastTime = now;

      // Smooth subtle camera parallax tracking mouse
      camera.position.x += (targetRotY * 1.0 - camera.position.x) * 0.04;
      camera.position.y += (targetRotX * 0.6 - camera.position.y) * 0.04;
      camera.lookAt(0, -0.2, 0);

      // Rotate star orb gyroscopic rings
      orbRing1.rotation.z += delta * 0.22;
      orbRing2.rotation.z -= delta * 0.18;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [theme, hologramGlow, reducedMotion, companionState]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full overflow-hidden"
    />
  );
};
