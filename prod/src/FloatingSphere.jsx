import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { TweenMax, Expo } from 'gsap';

const FloatingShapes = () => {
  const mountRef = useRef(null);
  const currentShapeRef = useRef(null);
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const shapes = ['sphere', 'icosahedron', 'octahedron'];
  const sceneRef = useRef(new THREE.Scene());

  useEffect(() => {
    const currentMount = mountRef.current;
    const scene = sceneRef.current;
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);

    // Light
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 2, 5);
    light.castShadow = true;
    scene.add(light);

    // Camera Position
    camera.position.z = 5;

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Initialize first shape
    addShape(shapes[currentShapeIndex], scene);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (currentShapeRef.current) {
        currentShapeRef.current.rotation.x += 0.01;
        currentShapeRef.current.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      currentMount.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  const addShape = (shape, scene) => {
    let geometry;
    const material = new THREE.MeshStandardMaterial({ color: 0xff0051, flatShading: true });

    switch (shape) {
      case 'sphere':
        geometry = new THREE.SphereGeometry(1, 8, 8);
        break;
      case 'icosahedron':
        geometry = new THREE.IcosahedronGeometry(1, 0);
        break;
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(1, 0);
        break;
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    if (currentShapeRef.current) {
      scene.remove(currentShapeRef.current);
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    scene.add(mesh);
    currentShapeRef.current = mesh;
  };

  const cycleShapes = () => {
    const nextShapeIndex = (currentShapeIndex + 1) % shapes.length;

    // Move current shape out
    TweenMax.to(currentShapeRef.current.position, 1, {
      x: 15,
      ease: Expo.easeIn,
      onComplete: () => {
        // Remove current shape
        sceneRef.current.remove(currentShapeRef.current);

        // Add next shape
        addShape(shapes[nextShapeIndex], sceneRef.current);

        // Move next shape in
        currentShapeRef.current.position.x = -15;
        TweenMax.to(currentShapeRef.current.position, 1, {
          x: 0,
          ease: Expo.easeOut
        });

        setCurrentShapeIndex(nextShapeIndex);
      }
    });
  };

  return (
    <>
      <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
      <button onClick={cycleShapes} style={{ position: 'absolute', top: '1225px', left: '475px' }}>
       Next World
      </button>
    </>
  );
};

export default FloatingShapes;
