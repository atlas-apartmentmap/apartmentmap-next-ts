// src/components/Scene.tsx
import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MapScene: React.FC<{ showLand: boolean; hoveredBuilding: string | null }> = ({ showLand, hoveredBuilding }) => {
  const { scene } = useGLTF('/assets/models/brisbanev2.glb');
  const [originalMaterials, setOriginalMaterials] = useState<Map<string, THREE.Material[]>>(new Map());

  useEffect(() => {
    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        if (child.name.toLowerCase() === 'land') {
          child.visible = showLand;
        }
        if (child.name.toLowerCase().includes('skytower')) {
          const mesh = child as THREE.Mesh;

          // Normalize metadata name
          const normalizedMetadataName = 'skytower';

          // Normalize hovered name
          const normalizedHoveredName = hoveredBuilding?.replace(/\s+/g, '').toLowerCase();

          if (normalizedHoveredName === normalizedMetadataName) {
            // Save the original materials if not already saved
            if (!originalMaterials.has(mesh.name)) {
              setOriginalMaterials((prev) => {
                const newMap = new Map(prev);
                newMap.set(mesh.name, Array.isArray(mesh.material) ? mesh.material : [mesh.material]);
                return newMap;
              });
            }

            // Apply highlight material
            mesh.material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
          } else if (originalMaterials.has(mesh.name)) {
            // Restore original materials when not hovered
            const originalMaterial = originalMaterials.get(mesh.name);
            if (originalMaterial) {
              mesh.material = originalMaterial.length === 1 ? originalMaterial[0] : originalMaterial;
            }
          }
        }
      }
    });
  }, [showLand, scene, hoveredBuilding, originalMaterials]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[100, 200, 100]} intensity={1} />
      <directionalLight position={[-100, 200, -100]} intensity={0.5} />
      <primitive object={scene} />
    </>
  );
};

export default MapScene;
