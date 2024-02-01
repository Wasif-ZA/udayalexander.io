import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Carousel3D = () => {
  const mountRef = useRef(null);
  const [carouselGroup, setCarouselGroup] = useState(null); // State to hold the carousel group

  useEffect(() => {
    // Scene setup
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Creating a new carousel group
    const newCarouselGroup = new THREE.Group();

    // Add objects to the carousel
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(Math.sin((i / 5) * Math.PI * 2) * 5, 0, Math.cos((i / 5) * Math.PI * 2) * 5);
      newCarouselGroup.add(cube);
    }
    scene.add(newCarouselGroup);
    setCarouselGroup(newCarouselGroup); // Update the state

    // Position the camera
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (carouselGroup) {
      carouselGroup.rotation.y = rotation;
    }
  }, [carouselGroup, rotation]);

  // Rotate carousel function
  const [rotation, setRotation] = useState(0);
  const rotateCarousel = (direction) => {
    setRotation((prevRotation) => prevRotation + direction * 0.1);
  };

  return (
    <>
      <div ref={mountRef} id="carousel-container" style={{ width: '100%', height: '100vh' }} />
      <button onClick={() => rotateCarousel(-1)}>Rotate Left</button>
      <button onClick={() => rotateCarousel(1)}>Rotate Right</button>
      <div style={{ position: 'absolute', bottom: '50px', width: '100%', textAlign: 'center' }}>
        FICTION/REALITY
      </div>
    </>
  );
};

export default Carousel3D;
