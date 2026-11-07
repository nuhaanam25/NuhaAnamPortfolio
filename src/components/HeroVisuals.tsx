"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function HeroVisuals() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.08);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Primary Pink Accent Light
    const pinkLight = new THREE.PointLight(0xff91a9, 4.5, 14);
    pinkLight.position.set(2.5, 1.8, 3.2);
    scene.add(pinkLight);

    // Secondary Pink Soft Fill
    const fillLight = new THREE.PointLight(0xffb1c1, 2.0, 10);
    fillLight.position.set(-2.8, -1.5, 2.5);
    scene.add(fillLight);

    // Top Rim Light
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(0, 5, 2);
    scene.add(rimLight);

    // Root Group for Mouse Parallax
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // -------------------------------------------------------------
    // 1. FLOATING DARK METALLIC LAPTOP WITH PINK SCREEN GLOW
    // -------------------------------------------------------------
    const laptopGroup = new THREE.Group();

    // Metallic Base Material
    const metallicMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181c,
      metalness: 0.9,
      roughness: 0.25,
      envMapIntensity: 1.0,
    });

    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x303030,
      metalness: 0.8,
      roughness: 0.4,
    });

    // Laptop Base Chassis
    const baseGeo = new THREE.BoxGeometry(2.4, 0.08, 1.6);
    const laptopBase = new THREE.Mesh(baseGeo, metallicMaterial);
    laptopGroup.add(laptopBase);

    // Trackpad
    const trackpadGeo = new THREE.PlaneGeometry(0.75, 0.5);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: 0x222226,
      metalness: 0.8,
      roughness: 0.3,
    });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.rotation.x = -Math.PI / 2;
    trackpad.position.set(0, 0.042, 0.45);
    laptopGroup.add(trackpad);

    // Keyboard Bed
    const keyboardGeo = new THREE.PlaneGeometry(2.1, 0.8);
    const keyboardMat = new THREE.MeshStandardMaterial({
      color: 0x0f0f12,
      metalness: 0.6,
      roughness: 0.6,
    });
    const keyboardBed = new THREE.Mesh(keyboardGeo, keyboardMat);
    keyboardBed.rotation.x = -Math.PI / 2;
    keyboardBed.position.set(0, 0.042, -0.22);
    laptopGroup.add(keyboardBed);

    // Laptop Screen Assembly
    const screenAssembly = new THREE.Group();
    screenAssembly.position.set(0, 0.04, -0.8);

    // Lid Backing
    const lidGeo = new THREE.BoxGeometry(2.4, 1.55, 0.05);
    const lidMesh = new THREE.Mesh(lidGeo, metallicMaterial);
    lidMesh.position.set(0, 0.775, 0);
    screenAssembly.add(lidMesh);

    // Screen Texture (IDE Code Editor Canvas)
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 1024;
    screenCanvas.height = 640;
    const sCtx = screenCanvas.getContext("2d");
    if (sCtx) {
      // Dark IDE Background
      sCtx.fillStyle = "#0c0d12";
      sCtx.fillRect(0, 0, 1024, 640);

      // Top Window Controls Bar
      sCtx.fillStyle = "#15161c";
      sCtx.fillRect(0, 0, 1024, 48);

      // Traffic Lights
      sCtx.fillStyle = "#FF91A9";
      sCtx.beginPath();
      sCtx.arc(32, 24, 7, 0, Math.PI * 2);
      sCtx.fill();

      sCtx.fillStyle = "#FFB1C1";
      sCtx.beginPath();
      sCtx.arc(56, 24, 7, 0, Math.PI * 2);
      sCtx.fill();

      sCtx.fillStyle = "#404040";
      sCtx.beginPath();
      sCtx.arc(80, 24, 7, 0, Math.PI * 2);
      sCtx.fill();

      // Tab Title
      sCtx.font = "bold 18px monospace";
      sCtx.fillStyle = "#A5A5A5";
      sCtx.fillText("NuhaAnam.tsx", 120, 31);

      // Code Lines
      sCtx.font = "20px monospace";
      const codeLines = [
        { text: "// Crafting Exceptional Digital Experiences", color: "#666677" },
        { text: "import { CreativeEngine } from '@nuha/core';", color: "#FF91A9" },
        { text: "", color: "" },
        { text: "export const NuhaAnam = {", color: "#F5F3F3" },
        { text: "  role: 'Web Developer & AI Enthusiast',", color: "#FFB1C1" },
        { text: "  mission: 'Designing & Developing Experiences',", color: "#FF91A9" },
        { text: "  skills: ['Next.js', 'React', 'Three.js', 'GSAP'],", color: "#F5F3F3" },
        { text: "  availability: 'Open for Select Projects',", color: "#FF91A9" },
        { text: "  build: () => return MeaningfulImpact();", color: "#A5A5A5" },
        { text: "};", color: "#F5F3F3" },
      ];

      codeLines.forEach((line, index) => {
        sCtx.fillStyle = line.color || "#F5F3F3";
        sCtx.fillText(line.text, 36, 100 + index * 36);
      });

      // Subtle glow line at bottom
      sCtx.fillStyle = "#FF91A9";
      sCtx.fillRect(0, 636, 1024, 4);
    }

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.anisotropy = 4;

    const screenGeo = new THREE.PlaneGeometry(2.26, 1.42);
    const screenMat = new THREE.MeshStandardMaterial({
      map: screenTexture,
      emissive: 0xff91a9,
      emissiveIntensity: 0.16,
      roughness: 0.2,
      metalness: 0.1,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.775, 0.027);
    screenAssembly.add(screenMesh);

    // Screen Angle (open lid ~115 degrees)
    screenAssembly.rotation.x = 0.42;
    laptopGroup.add(screenAssembly);

    // Initial Laptop Transform
    laptopGroup.position.set(isMobile ? 0 : 1.3, isMobile ? -0.8 : -0.3, 0.2);
    laptopGroup.rotation.set(0.35, -0.42, 0.08);
    laptopGroup.scale.setScalar(isMobile ? 0.75 : 0.95);
    masterGroup.add(laptopGroup);

    // -------------------------------------------------------------
    // 2. FLOATING BROWSER WINDOW SHOWING MODERN WEBSITE INTERFACE
    // -------------------------------------------------------------
    const browserGroup = new THREE.Group();

    // Browser Canvas Interface
    const browserCanvas = document.createElement("canvas");
    browserCanvas.width = 800;
    browserCanvas.height = 540;
    const bCtx = browserCanvas.getContext("2d");
    if (bCtx) {
      // Sleek Dark Background
      bCtx.fillStyle = "#111116";
      bCtx.fillRect(0, 0, 800, 540);

      // Header Bar
      bCtx.fillStyle = "#181820";
      bCtx.fillRect(0, 0, 800, 52);

      // Window dots
      bCtx.fillStyle = "#FF91A9";
      bCtx.beginPath();
      bCtx.arc(30, 26, 6, 0, Math.PI * 2);
      bCtx.fill();

      bCtx.fillStyle = "#555560";
      bCtx.beginPath();
      bCtx.arc(52, 26, 6, 0, Math.PI * 2);
      bCtx.fill();

      bCtx.fillStyle = "#33333d";
      bCtx.beginPath();
      bCtx.arc(74, 26, 6, 0, Math.PI * 2);
      bCtx.fill();

      // Address Bar
      bCtx.fillStyle = "#22222c";
      bCtx.beginPath();
      bCtx.roundRect(110, 12, 380, 28, 14);
      bCtx.fill();

      bCtx.font = "13px monospace";
      bCtx.fillStyle = "#FF91A9";
      bCtx.fillText("🔒 https://nuhaanam.dev/experience", 130, 31);

      // UI Layout - Hero banner block
      bCtx.fillStyle = "#1c1c24";
      bCtx.beginPath();
      bCtx.roundRect(36, 80, 728, 160, 12);
      bCtx.fill();

      // Accent gradient header in mockup
      bCtx.fillStyle = "#FF91A9";
      bCtx.font = "bold 26px sans-serif";
      bCtx.fillText("NEXT-GEN DIGITAL PRODUCTS", 60, 135);

      bCtx.fillStyle = "#A5A5A5";
      bCtx.font = "16px sans-serif";
      bCtx.fillText("High-performance Web Experiences & AI Integration", 60, 170);

      bCtx.fillStyle = "#FF91A9";
      bCtx.beginPath();
      bCtx.roundRect(60, 195, 120, 28, 6);
      bCtx.fill();

      // Two UI Dashboard Cards
      bCtx.fillStyle = "#17171e";
      bCtx.beginPath();
      bCtx.roundRect(36, 265, 350, 230, 10);
      bCtx.fill();
      bCtx.strokeStyle = "#303038";
      bCtx.stroke();

      bCtx.fillStyle = "#FFB1C1";
      bCtx.font = "bold 16px sans-serif";
      bCtx.fillText("Interactive Three.js Systems", 56, 305);

      // Mini decorative chart
      bCtx.strokeStyle = "#FF91A9";
      bCtx.lineWidth = 3;
      bCtx.beginPath();
      bCtx.moveTo(56, 420);
      bCtx.bezierCurveTo(120, 370, 180, 460, 240, 360);
      bCtx.lineTo(340, 390);
      bCtx.stroke();

      // Second UI Card
      bCtx.fillStyle = "#17171e";
      bCtx.beginPath();
      bCtx.roundRect(414, 265, 350, 230, 10);
      bCtx.fill();
      bCtx.strokeStyle = "#303038";
      bCtx.stroke();

      bCtx.fillStyle = "#F5F3F3";
      bCtx.font = "bold 16px sans-serif";
      bCtx.fillText("Fluid GSAP Orchestration", 434, 305);

      bCtx.fillStyle = "#303030";
      bCtx.beginPath();
      bCtx.roundRect(434, 340, 310, 16, 6);
      bCtx.roundRect(434, 370, 260, 16, 6);
      bCtx.roundRect(434, 400, 280, 16, 6);
      bCtx.fill();
    }

    const browserTexture = new THREE.CanvasTexture(browserCanvas);
    browserTexture.anisotropy = 4;

    const browserMeshGeo = new THREE.PlaneGeometry(2.0, 1.35);
    const browserMat = new THREE.MeshStandardMaterial({
      map: browserTexture,
      roughness: 0.15,
      metalness: 0.1,
      transparent: true,
      opacity: 0.96,
    });
    const browserMesh = new THREE.Mesh(browserMeshGeo, browserMat);
    browserGroup.add(browserMesh);

    // Browser Window Beveled Back Frame
    const frameGeo = new THREE.BoxGeometry(2.05, 1.4, 0.04);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f24,
      metalness: 0.85,
      roughness: 0.25,
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.z = -0.025;
    browserGroup.add(frameMesh);

    // Initial Browser Transform
    browserGroup.position.set(isMobile ? -0.4 : -1.8, isMobile ? 1.0 : 0.8, -0.6);
    browserGroup.rotation.set(0.12, 0.38, -0.06);
    browserGroup.scale.setScalar(isMobile ? 0.65 : 0.88);
    masterGroup.add(browserGroup);

    // -------------------------------------------------------------
    // 3. ABSTRACT AI-INSPIRED 3D OBJECT WITH GLOWING PINK CORE
    // -------------------------------------------------------------
    const aiCoreGroup = new THREE.Group();

    // Central Glowing Faceted Icosahedron Core
    const coreGeo = new THREE.IcosahedronGeometry(0.55, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xff91a9,
      emissive: 0xff91a9,
      emissiveIntensity: 0.95,
      roughness: 0.15,
      metalness: 0.85,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    aiCoreGroup.add(coreMesh);

    // Outer Geometric Wireframe Cage
    const cageGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0xffb1c1,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    aiCoreGroup.add(cageMesh);

    // Orbital Ring 1
    const ring1Geo = new THREE.TorusGeometry(1.1, 0.015, 16, 80);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xff91a9,
      emissive: 0xff91a9,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.9,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 3.2;
    ring1Mesh.rotation.y = Math.PI / 6;
    aiCoreGroup.add(ring1Mesh);

    // Orbital Ring 2
    const ring2Geo = new THREE.TorusGeometry(1.3, 0.012, 16, 80);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffb1c1,
      emissiveIntensity: 0.4,
      roughness: 0.4,
      metalness: 0.9,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.x = -Math.PI / 2.6;
    ring2Mesh.rotation.z = Math.PI / 4;
    aiCoreGroup.add(ring2Mesh);

    // Subtle Orbiting Halo Particles (60 particles)
    const particleCount = isMobile ? 24 : 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.0 + Math.random() * 0.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xff91a9,
      size: 0.045,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const orbitalParticles = new THREE.Points(particleGeo, particleMat);
    aiCoreGroup.add(orbitalParticles);

    // Initial AI Core Transform
    aiCoreGroup.position.set(isMobile ? 0.3 : 2.1, isMobile ? 1.2 : 1.3, 0.1);
    aiCoreGroup.scale.setScalar(isMobile ? 0.65 : 0.85);
    masterGroup.add(aiCoreGroup);

    setIsLoaded(true);

    // -------------------------------------------------------------
    // MOUSE PARALLAX & ANIMATION LOOP
    // -------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      targetRotationY = normX * 0.14;
      targetRotationX = -normY * 0.10;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth Mouse Parallax Lerping
      masterGroup.rotation.y += (targetRotationY - masterGroup.rotation.y) * 0.05;
      masterGroup.rotation.x += (targetRotationX - masterGroup.rotation.x) * 0.05;

      if (!prefersReducedMotion) {
        // 1. Laptop Floating & Gentle Sway
        laptopGroup.position.y = (isMobile ? -0.8 : -0.3) + Math.sin(elapsedTime * 1.2) * 0.07;
        laptopGroup.rotation.y = -0.42 + Math.sin(elapsedTime * 0.8) * 0.03;
        laptopGroup.rotation.z = 0.08 + Math.cos(elapsedTime * 0.9) * 0.02;

        // 2. Browser Floating & Gentle Wave
        browserGroup.position.y = (isMobile ? 1.0 : 0.8) + Math.cos(elapsedTime * 1.4 + 1.2) * 0.08;
        browserGroup.rotation.y = 0.38 + Math.sin(elapsedTime * 0.7 + 1.0) * 0.04;
        browserGroup.rotation.x = 0.12 + Math.cos(elapsedTime * 0.9 + 0.5) * 0.02;

        // 3. AI Core Rotation & Orbital Motion
        aiCoreGroup.position.y = (isMobile ? 1.2 : 1.3) + Math.sin(elapsedTime * 1.6 + 2.0) * 0.09;
        coreMesh.rotation.y += 0.012;
        coreMesh.rotation.x += 0.008;

        cageMesh.rotation.y -= 0.007;
        cageMesh.rotation.z += 0.005;

        ring1Mesh.rotation.z += 0.015;
        ring2Mesh.rotation.y += 0.012;

        orbitalParticles.rotation.y += 0.006;
        orbitalParticles.rotation.x += 0.004;

        // Core Pulse
        const pulse = 0.85 + Math.sin(elapsedTime * 3.5) * 0.2;
        coreMat.emissiveIntensity = pulse;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1 : 2));
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Dispose Geometries and Materials
      baseGeo.dispose();
      trackpadGeo.dispose();
      keyboardGeo.dispose();
      lidGeo.dispose();
      screenGeo.dispose();
      browserMeshGeo.dispose();
      frameGeo.dispose();
      coreGeo.dispose();
      cageGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      particleGeo.dispose();

      metallicMaterial.dispose();
      edgeMaterial.dispose();
      trackpadMat.dispose();
      keyboardMat.dispose();
      screenMat.dispose();
      screenTexture.dispose();
      browserMat.dispose();
      browserTexture.dispose();
      frameMat.dispose();
      coreMat.dispose();
      cageMat.dispose();
      ring1Mat.dispose();
      ring2Mat.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[450px] sm:h-[550px] lg:h-[680px] transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      aria-label="3D Interactive Technology Composition"
    >
      {/* Decorative ambient pink lighting behind the 3D stage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full bg-[#FF91A9]/10 blur-[100px] pointer-events-none -z-10" />
    </div>
  );
}
