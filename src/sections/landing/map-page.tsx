'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MapSidePanel from '@/components/map-side-panel/map-side-panel';
import MapScene from '@/components/map-scene/map-scene';
import { useModelContext } from '@/context/ModelContext';

const CBDViewer: React.FC = () => {
  const { setSelectedModel } = useModelContext(); // Use the context to set the selected model
  const [showLand, setShowLand] = useState(true);
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);

  const toggleLandVisibility = () => {
    setShowLand(!showLand);
  };

  const handleModelSelect = (building: string) => {
    // Normalize building names and set the model accordingly
    const normalizedBuilding = building.replace(/\s+/g, '').toLowerCase();
    if (normalizedBuilding === 'skytower') {
      setSelectedModel('skytower.glb');
    } else if (normalizedBuilding === 'spire') {
      setSelectedModel('spire.glb');
    } else if (normalizedBuilding === 'festival') {
      setSelectedModel('festival.glb');
    }
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
      <div style={{ flex: 4 }}>
        <Canvas
          style={{ height: '100%', width: '100%' }}
          camera={{ position: [100, 100, 100], fov: 50 }}
        >
          <MapScene showLand={showLand} hoveredBuilding={hoveredBuilding} />
          <OrbitControls
            enableDamping={true}
            dampingFactor={0.25}
            screenSpacePanning={true}
            minDistance={5}
            maxDistance={1000}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
      </div>
      <div style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
        <MapSidePanel
          onToggleLandVisibility={toggleLandVisibility}
          setHoveredBuilding={setHoveredBuilding}
        />
      </div>
    </div>
  );
};

export default CBDViewer;
