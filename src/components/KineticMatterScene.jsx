import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function KineticMatterScene() {
  const mountRef = useRef(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Check WebGL availability
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebGLSupported(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    let animationFrameId;
    let isVisible = true;
    let isTabActive = true;

    // Dimensions
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Three.js Core Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.12);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Root Transform Group
    const rootGroup = new THREE.Group();
    // Responsive placement for optimal contrast with typography
    if (width < 768) {
      rootGroup.position.set(0, -0.55, 0);
      rootGroup.scale.set(0.68, 0.68, 0.68);
    } else if (width < 1024) {
      rootGroup.position.set(0.45, 0, 0);
      rootGroup.scale.set(0.85, 0.85, 0.85);
    } else {
      rootGroup.position.x = 1.35;
      rootGroup.scale.set(1.0, 1.0, 1.0);
    }
    scene.add(rootGroup);

    // -------------------------------------------------------------
    // 2. KINETIC MATTER GEOMETRY: Sculptural Toroidal Ribbon
    // -------------------------------------------------------------
    const tubeRadius = 1.18;
    const tubeWidth = 0.32;
    const radialSegments = 160;
    const tubularSegments = 320;
    const p = 3; // Windings
    const q = 4; // Windings

    const knotGeometry = new THREE.TorusKnotGeometry(tubeRadius, tubeWidth, tubularSegments, radialSegments, p, q);

    // Custom Metallic Monochrome Shader Material
    const customMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uPointerVelocity: { value: 0 },
        uScrollProgress: { value: 0 },
        uLightPos: { value: new THREE.Vector3(2.5, 3.5, 4.0) }
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uPointer;
        uniform float uPointerVelocity;
        uniform float uScrollProgress;
        
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vWorldPosition;
        varying float vDisplacement;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          
          vec3 pos = position;
          
          // Kinetic Wave Equations across surface
          float harmonic1 = sin(pos.x * 2.8 + uTime * 1.4) * cos(pos.y * 2.5 + uTime * 1.1);
          float harmonic2 = sin(pos.z * 3.2 + uTime * 0.9) * 0.5;
          
          // Pointer proximity tension
          float pointerDist = length(pos.xy - uPointer * 1.8);
          float pointerPull = smoothstep(1.8, 0.0, pointerDist) * (0.12 + uPointerVelocity * 0.25);
          
          // Scroll morphing factor: stretches along z and relaxes radial tension
          float morphZ = sin(uScrollProgress * 3.14159) * 0.35;
          pos.z += morphZ * sin(pos.x * 3.0);
          
          float totalDisplacement = (harmonic1 + harmonic2) * 0.08 + pointerPull;
          vDisplacement = totalDisplacement;
          
          pos += normal * totalDisplacement;
          
          vec4 worldPos = modelMatrix * vec4(pos, 1.0);
          vWorldPosition = worldPos.xyz;
          
          vec4 mvPosition = viewMatrix * worldPos;
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uLightPos;
        uniform float uScrollProgress;
        
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vWorldPosition;
        varying float vDisplacement;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);
          vec3 lightDir = normalize(uLightPos - vWorldPosition);
          
          // Diffuse Gunmetal Lighting
          float diff = max(dot(normal, lightDir), 0.0);
          
          // Silver Specular Glint
          vec3 halfVector = normalize(lightDir + viewDir);
          float spec = pow(max(dot(normal, halfVector), 0.0), 38.0);
          
          // Fresnel Edge Highlight (Platinum sheen on grazing angles)
          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.2);
          
          // Dark Monochrome Palette
          vec3 voidBlack = vec3(0.02, 0.022, 0.028);     // Deep ambient shadow
          vec3 graphite = vec3(0.12, 0.125, 0.14);       // Mid body
          vec3 gunmetal = vec3(0.24, 0.25, 0.28);       // Illuminated surface
          vec3 silverSpecular = vec3(0.92, 0.94, 0.98); // High-specular glint
          
          // Combine lighting with dynamic ripple highlight
          vec3 surfaceColor = mix(voidBlack, graphite, diff * 0.85);
          surfaceColor = mix(surfaceColor, gunmetal, diff * 0.45);
          
          // Specular + Fresnel Silver Highlights
          vec3 finalColor = surfaceColor + silverSpecular * (spec * 0.85 + fresnel * 0.65);
          
          // Micro-ripple highlight
          finalColor += silverSpecular * abs(vDisplacement) * 0.9;
          
          gl_FragColor = vec4(finalColor, 0.94);
        }
      `,
      transparent: true,
      wireframe: false
    });

    const matterMesh = new THREE.Mesh(knotGeometry, customMaterial);
    rootGroup.add(matterMesh);

    // -------------------------------------------------------------
    // 3. FINE METALLIC FILAMENTS: Architectural Spline Strands
    // -------------------------------------------------------------
    const filamentCount = 28;
    const pointsPerFilament = 140;
    const filamentGroup = new THREE.Group();
    rootGroup.add(filamentGroup);

    const filamentLines = [];

    for (let f = 0; f < filamentCount; f++) {
      const curvePoints = [];
      const phase = (f / filamentCount) * Math.PI * 2;
      const radiusOffset = 1.4 + (f % 4) * 0.18;

      for (let i = 0; i < pointsPerFilament; i++) {
        const t = (i / pointsPerFilament) * Math.PI * 2 * 3;
        const x = (radiusOffset + 0.3 * Math.cos(4 * t + phase)) * Math.cos(3 * t);
        const y = (radiusOffset + 0.3 * Math.cos(4 * t + phase)) * Math.sin(3 * t);
        const z = 0.5 * Math.sin(4 * t + phase);
        curvePoints.push(new THREE.Vector3(x, y, z));
      }

      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const curveMat = new THREE.LineBasicMaterial({
        color: f % 2 === 0 ? 0xc5c8d4 : 0x75788a,
        transparent: true,
        opacity: f % 3 === 0 ? 0.45 : 0.22,
        blending: THREE.AdditiveBlending
      });

      const line = new THREE.Line(curveGeo, curveMat);
      line.userData = { initialPositions: curvePoints, phase: phase };
      filamentGroup.add(line);
      filamentLines.push(line);
    }

    // -------------------------------------------------------------
    // 4. MICRO-NODES: Bioluminescent Silver Points
    // -------------------------------------------------------------
    const nodeCount = 420;
    const nodeGeo = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      const r = 1.35 + (Math.random() - 0.5) * 0.4;
      nodePositions[i * 3] = (r + 0.35 * Math.cos(3 * u)) * Math.cos(2 * u) + (Math.random() - 0.5) * 0.15;
      nodePositions[i * 3 + 1] = (r + 0.35 * Math.cos(3 * u)) * Math.sin(2 * u) + (Math.random() - 0.5) * 0.15;
      nodePositions[i * 3 + 2] = 0.45 * Math.sin(3 * u) + (Math.random() - 0.5) * 0.15;
    }

    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

    const nodeMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.038,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    rootGroup.add(nodePoints);

    // -------------------------------------------------------------
    // 5. INTERACTION & PHYSICS STATE
    // -------------------------------------------------------------
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, lastX: 0, lastY: 0, velocity: 0 };
    let scrollY = 0;
    let targetScrollY = 0;

    const handleWindowMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
      
      const dx = mouse.targetX - mouse.lastX;
      const dy = mouse.targetY - mouse.lastY;
      mouse.velocity = Math.min(1.0, Math.sqrt(dx * dx + dy * dy) * 4.0);
      mouse.lastX = mouse.targetX;
      mouse.lastY = mouse.targetY;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // Tab Visibility
    const handleVisibilityChange = () => {
      isTabActive = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Intersection Observer
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.02 });
    observer.observe(container);

    // Clock
    const clock = new THREE.Clock();

    // -------------------------------------------------------------
    // 6. ANIMATION & EVOLUTION LOOP
    // -------------------------------------------------------------
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || !isTabActive) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;
      mouse.velocity *= 0.92;
      scrollY += (targetScrollY - scrollY) * 0.06;

      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = totalDocHeight > 0 ? scrollY / totalDocHeight : 0;

      // Update shader uniforms
      customMaterial.uniforms.uTime.value = elapsedTime;
      customMaterial.uniforms.uPointer.value.set(mouse.x, mouse.y);
      customMaterial.uniforms.uPointerVelocity.value = mouse.velocity;
      customMaterial.uniforms.uScrollProgress.value = scrollProgress;

      // Sculptural Motion: Resting organic breath + cursor deflection
      rootGroup.rotation.y = elapsedTime * 0.16 + mouse.x * 0.55 + scrollProgress * 1.8;
      rootGroup.rotation.x = Math.sin(elapsedTime * 0.14) * 0.18 + mouse.y * 0.45 + scrollProgress * 0.8;
      rootGroup.rotation.z = Math.cos(elapsedTime * 0.12) * 0.12;

      // Dynamic Positioning based on Scroll Stage
      // In Hero: slightly right-centered on desktop
      // In Projects: shifts down and scales into an optical horizon
      if (window.innerWidth > 1024) {
        const heroOffset = 1.35;
        const targetPosX = heroOffset * (1.0 - Math.min(1.0, scrollProgress * 2.5));
        const targetPosY = -scrollProgress * 1.8;
        rootGroup.position.x += (targetPosX - rootGroup.position.x) * 0.05;
        rootGroup.position.y += (targetPosY - rootGroup.position.y) * 0.05;
      } else {
        const baseY = window.innerWidth < 768 ? -0.55 : 0;
        rootGroup.position.x = 0;
        rootGroup.position.y = baseY - scrollProgress * 1.2;
      }

      // Filaments wave deformation
      filamentGroup.rotation.y = -elapsedTime * 0.22 - mouse.x * 0.4;
      filamentGroup.rotation.z = Math.sin(elapsedTime * 0.2) * 0.15;

      // Micro-node glint pulsing
      nodePoints.rotation.y = elapsedTime * 0.1 + mouse.x * 0.2;
      const nodePulse = 1.0 + Math.sin(elapsedTime * 2.2) * 0.035;
      nodePoints.scale.set(nodePulse, nodePulse, nodePulse);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();

      knotGeometry.dispose();
      customMaterial.dispose();
      filamentLines.forEach(line => {
        line.geometry.dispose();
        line.material.dispose();
      });
      nodeGeo.dispose();
      nodeMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGLSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-80 h-80 rounded-full border border-monochrome-subtle bg-gradient-to-tr from-graphite/40 via-transparent to-steel/20 blur-2xl animate-pulse-subtle" />
      </div>
    );
  }

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full relative pointer-events-none select-none flex items-center justify-center"
      aria-hidden="true"
    />
  );
}
