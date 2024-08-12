import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import MapSidePanel from '@/components/map-side-panel/map-side-panel';
import MapScene from '@/components/map-scene/map-scene';

const CBDViewer: React.FC = () => {
  // State for land visibility and hover state
  const [showLand, setShowLand] = useState(true);
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);

  // Toggle land visibility handler
  const toggleLandVisibility = () => {
    setShowLand(!showLand);
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
