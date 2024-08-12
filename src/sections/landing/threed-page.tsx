import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ThreeSceneWithSplitView from '@/components/three-scene/ThreeSceneWithSplitView';
import ThreeDSidePanel from '@/components/three-scene/ThreeDSidePanel';
import ObjectInfoBox from '@/components/three-scene/ObjectInfoBox';
import { getFloorPlansForObject } from '@/utils/floorplans';

const ThreePage: React.FC = () => {
  const [hoveredObjectName, setHoveredObjectName] = useState<string | null>(null); // Track hovered object
  const [selectedObjectName, setSelectedObjectName] = useState<string | null>(null);
  const [floorPlans, setFloorPlans] = useState<string[]>([]);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<string | null>(null);
  const [overviewMode, setOverviewMode] = useState<boolean>(true);
  const [isSplitView, setIsSplitView] = useState<boolean>(false);

  const handleObjectClick = async (objectName: string) => {
    setSelectedObjectName(objectName);
    setSelectedFloorPlan(null);
    setOverviewMode(false);
    const plans = await getFloorPlansForObject(objectName);
    setFloorPlans(plans);
  };

  const handleObjectHover = (objectName: string | null) => {
    setHoveredObjectName(objectName);
  };

  const toggleSplitView = () => {
    setIsSplitView(!isSplitView);
  };

  return (
    <div className="container" style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <div className="canvas-container" style={{ flex: 1, position: 'relative' }}>
        <Canvas camera={{ position: [0, 400, 800], fov: 50 }} style={{ height: '100%', width: '100%' }}>
          <ThreeSceneWithSplitView 
            onObjectClick={handleObjectClick} 
            onObjectHover={handleObjectHover} // Handle hover event
            isSplitView={isSplitView} 
          />
          <OrbitControls
            enableDamping
            dampingFactor={0.25}
            screenSpacePanning
            minDistance={5}
            maxDistance={1000}
            maxPolarAngle={Math.PI / 2.1}
            target={[0, 25, 0]}
          />
        </Canvas>
        <ObjectInfoBox objectName={hoveredObjectName} /> {/* Show info box for hovered object */}
      </div>
      <div className="side-panel-container" style={{ flex: 1, overflowY: 'auto' }}>
        <ThreeDSidePanel 
          selectedObjectName={selectedObjectName} 
          floorPlans={floorPlans} 
          selectedFloorPlan={selectedFloorPlan} 
          onFloorPlanChange={setSelectedFloorPlan} 
          overviewMode={overviewMode}
          setOverviewMode={setOverviewMode}
          toggleSplitView={toggleSplitView}
          isSplitView={isSplitView}
        />
      </div>
    </div>
  );
};

export default ThreePage;
