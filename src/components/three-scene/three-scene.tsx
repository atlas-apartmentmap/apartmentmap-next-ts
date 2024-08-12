// src/components/three-scene/ThreeScene.tsx

import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ThreeSceneProps {
  onObjectClick: (objectName: string) => void;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ onObjectClick }) => {
  const { scene } = useGLTF('/assets/models/model.glb');
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const { camera, gl } = useThree();

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    const canvasBounds = gl.domElement.getBoundingClientRect();
    mouse.current.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
    mouse.current.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const objectName = intersects[0].object.name;
      onObjectClick(objectName);
    }
  };

  useEffect(() => {
    gl.domElement.addEventListener('click', handleClick);
    return () => {
      gl.domElement.removeEventListener('click', handleClick);
    };
  }, [gl]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[100, 200, 100]} intensity={1} />
      <directionalLight position={[-100, 200, -100]} intensity={0.5} />
      <primitive object={scene} />
    </>
  );
};

export default ThreeScene;
