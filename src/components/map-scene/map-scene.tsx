'use client';
import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface MapSceneProps {
  showLand: boolean;
  hoveredBuilding: string | null;
}

const normalizeName = (name: string | null): string => {
  return name ? name.replace(/\s+/g, '').toLowerCase() : '';
};

const MapScene: React.FC<MapSceneProps> = ({ showLand, hoveredBuilding }) => {
  const { scene } = useGLTF('/assets/models/brisbanev4.glb');
  const [originalMaterials, setOriginalMaterials] = useState<Map<string, THREE.Material[]>>(new Map());

  useEffect(() => {
    const normalizedHoveredName = normalizeName(hoveredBuilding);

    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const meshName = normalizeName(mesh.name);

        if (meshName === 'land') {
          mesh.visible = showLand;
        }

        if (['skytower', 'spire', 'festival'].includes(meshName)) {
          if (meshName === normalizedHoveredName) {
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
