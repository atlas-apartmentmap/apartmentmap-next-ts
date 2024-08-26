import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeSceneWithSplitViewProps {
  modelPath: string;
  onObjectClick: (name: string) => void;
  onObjectHover: (name: string | null) => void;
  isSplitView: boolean;
  hoveredStack: string | null;
  selectedStack: string | null;
}

const ThreeSceneWithSplitView: React.FC<ThreeSceneWithSplitViewProps> = ({
  modelPath,
  onObjectClick,
  onObjectHover,
  isSplitView,
  hoveredStack,
  selectedStack,
}) => {
  const { scene, camera, gl } = useThree();
  const clickableObjects = useRef<THREE.Object3D[]>([]);
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const originalColors = useRef<Map<string, THREE.Color>>(new Map()); // Store original colors
  const clonedMaterials = useRef<Map<string, THREE.Material>>(new Map()); // Store cloned materials
  const gltf = useGLTF(modelPath); // Load the selected model

  // Load and process model
  useEffect(() => {
    const { scene: gltfScene } = gltf;
    gltfScene.position.y = -75; // Adjust the position of the building

    gltfScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        clickableObjects.current.push(child);

        const mesh = child as THREE.Mesh;
        if (mesh.material instanceof THREE.MeshStandardMaterial || mesh.material instanceof THREE.MeshBasicMaterial) {
          originalColors.current.set(mesh.name, mesh.material.color.clone()); // Store original color
        }

        (child as THREE.Mesh).userData.originalPosition = child.position.clone();
        (child as THREE.Mesh).castShadow = true;
        (child as THREE.Mesh).receiveShadow = true;

        // Log object names to verify structure
        console.log(`Loaded Object: ${mesh.name}`);
      }
    });
    scene.add(gltfScene);

    return () => {
      scene.remove(gltfScene);
    };
  }, [gltf, scene]);

  // Handle object clicking
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

    gl.domElement.addEventListener('click', handleClick);

    return () => {
      gl.domElement.removeEventListener('click', handleClick);
    };
  }, [gl, camera, onObjectClick]);

  // Handle object hovering
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const canvasBounds = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
      mouse.current.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(clickableObjects.current, true);

      if (intersects.length > 0) {
        const objectName = intersects[0].object.name;
        onObjectHover(objectName); // Call hover event
      } else {
        onObjectHover(null); // Reset hover if no object intersected
      }
    };

    gl.domElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gl, camera, onObjectHover]);

  // Highlighting logic for selected and hovered stacks
  useEffect(() => {
    // Reset all objects to their original color
    clickableObjects.current.forEach((object) => {
      const mesh = object as THREE.Mesh;
      if (mesh.material instanceof THREE.MeshStandardMaterial || mesh.material instanceof THREE.MeshBasicMaterial) {
        const originalColor = originalColors.current.get(mesh.name);
        if (originalColor) {
          mesh.material.color.copy(originalColor); // Restore the original color
        }
      }
    });

    const highlightStack = (stack: string | null, color: number) => {
      if (stack) {
        clickableObjects.current.forEach((object) => {
          const objectName = object.name;
          const regex = new RegExp(`^Unit_\\d{1,3}${stack}$`); // Match the unit naming convention

          if (regex.test(objectName)) {
            const mesh = object as THREE.Mesh;

            // Clone the material if not already cloned
            if (!clonedMaterials.current.has(mesh.name)) {
              const clonedMaterial = (mesh.material as THREE.Material).clone();
              mesh.material = clonedMaterial;
              clonedMaterials.current.set(mesh.name, clonedMaterial);
            }

            console.log(`Highlighting Object: ${objectName} with color: ${color.toString(16)}`); // Log objects being highlighted

            if (mesh.material instanceof THREE.MeshStandardMaterial || mesh.material instanceof THREE.MeshBasicMaterial) {
              mesh.material.color.setHex(color); // Apply highlight color
            }
          }
        });
      }
    };

    // Highlight selected stack in yellow
    highlightStack(selectedStack, 0xffff00);

    // Highlight hovered stack in yellow (but not if it's the selected stack)
    if (hoveredStack !== selectedStack) {
      highlightStack(hoveredStack, 0xffff00);
    }
  }, [hoveredStack, selectedStack]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[100, 200, 100]} intensity={1} />
      <directionalLight position={[-100, 200, -100]} intensity={0.5} />
      <primitive object={gltf.scene} />
    </>
  );
};

export default ThreeSceneWithSplitView;
