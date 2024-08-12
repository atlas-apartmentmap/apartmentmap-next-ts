import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const buildingParts = [
  { name: 'ReceptionGround', increment: 0 },
  { name: 'Downtown', increment: 1 },
  { name: 'Uptown', increment: 2 },
  { name: 'Mezanine1', increment: 3 },
  { name: 'Skycity', increment: 4 },
  { name: 'Mezanine2', increment: 5 },
  { name: 'Skyrise', increment: 6 },
  { name: 'HorizonCollection', increment: 7 },
  { name: 'Rooftop', increment: 8 },
];

interface ThreeSceneWithSplitViewProps {
  onObjectClick: (name: string) => void;
  onObjectHover: (name: string | null) => void;
  isSplitView: boolean;
}

const ThreeSceneWithSplitView: React.FC<ThreeSceneWithSplitViewProps> = ({ onObjectClick, onObjectHover, isSplitView }) => {
  const { scene, camera, gl } = useThree();
  const clickableObjects = useRef<THREE.Object3D[]>([]);
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const gltf = useGLTF('/assets/models/model.glb');

  useEffect(() => {
    const { scene: gltfScene } = gltf;
    gltfScene.position.y = -75; // Adjust the position of the building
    gltfScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        clickableObjects.current.push(child);
        (child as THREE.Mesh).userData.originalPosition = child.position.clone();
        (child as THREE.Mesh).castShadow = true;
        (child as THREE.Mesh).receiveShadow = true;
      }
    });
    scene.add(gltfScene);

    return () => {
      scene.remove(gltfScene);
    };
  }, [gltf, scene]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      const canvasBounds = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
      mouse.current.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(clickableObjects.current, true);

      if (intersects.length > 0) {
        const objectName = intersects[0].object.name;
        onObjectClick(objectName);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const canvasBounds = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
      mouse.current.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(clickableObjects.current, true);

      if (intersects.length > 0) {
        const objectName = intersects[0].object.name;
        onObjectHover(objectName);
      } else {
        onObjectHover(null);
      }
    };

    gl.domElement.addEventListener('click', handleClick);
    gl.domElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      gl.domElement.removeEventListener('click', handleClick);
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gl, camera, onObjectClick, onObjectHover]);

  useEffect(() => {
    if (isSplitView) {
      clickableObjects.current.forEach((object) => {
        const part = buildingParts.find(part => object.name.includes(part.name));
        if (part) {
          const newPosition = object.userData.originalPosition.clone();
          newPosition.y += part.increment * 25;
          animateMove(object, newPosition, 1000);
        }
      });
      animateCamera({ x: 0, y: 600, z: 600 }, 1000);
    } else {
      clickableObjects.current.forEach((object) => {
        animateMove(object, object.userData.originalPosition, 1000);
      });
      animateCamera({ x: 0, y: 400, z: 400 }, 1000);
    }
  }, [isSplitView]);

  const animateMove = (object: THREE.Object3D, targetPosition: THREE.Vector3, duration: number) => {
    const startPosition = object.position.clone();
    const startTime = performance.now();

    function animate() {
      const elapsedTime = performance.now() - startTime;
      if (elapsedTime < duration) {
        object.position.lerpVectors(startPosition, targetPosition, elapsedTime / duration);
        requestAnimationFrame(animate);
      } else {
        object.position.copy(targetPosition);
      }
    }

    animate();
  };

  const animateCamera = (targetPosition: { x: number, y: number, z: number }, duration: number) => {
    const startPosition = camera.position.clone();
    const startTime = performance.now();

    function animate() {
      const elapsedTime = performance.now() - startTime;
      if (elapsedTime < duration) {
        camera.position.lerpVectors(startPosition, new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z), elapsedTime / duration);
        requestAnimationFrame(animate);
      } else {
        camera.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
      }
    }

    animate();
  };

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[100, 200, 100]} intensity={1} />
      <directionalLight position={[-100, 200, -100]} intensity={0.5} />
      <primitive object={gltf.scene} />
    </>
  );
};

useGLTF.preload('/assets/models/model.glb');

export default ThreeSceneWithSplitView;
