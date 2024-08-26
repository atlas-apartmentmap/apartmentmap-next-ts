import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ThreeSceneWithSplitView from '@/components/three-scene/ThreeSceneWithSplitView';
import ThreeDSidePanel from '@/components/three-scene/ThreeDSidePanel';
import ObjectInfoBox from '@/components/three-scene/ObjectInfoBox';
import { getFloorPlansForObject } from '@/utils/floorplans';
import { Box } from '@mui/material';
import { useModelContext } from '@/context/ModelContext';

const ThreePage: React.FC = () => {
  const { selectedModel, setSelectedModel } = useModelContext();
  const [hoveredObjectName, setHoveredObjectName] = useState<string | null>(null);
  const [selectedObjectName, setSelectedObjectName] = useState<string | null>(null);
  const [floorPlans, setFloorPlans] = useState<string[]>([]);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<string | null>(null);
  const [overviewMode, setOverviewMode] = useState<boolean>(true);
  const [isSplitView, setIsSplitView] = useState<boolean>(false);
  const [hoveredStack, setHoveredStack] = useState<string | null>(null); // New state for hovered stack
  const [canvasKey, setCanvasKey] = useState<number>(0); // Force Canvas to reset

  // Set default model to Sky Tower if no model is selected
  useEffect(() => {
    if (!selectedModel) {
      setSelectedModel('spire.glb');
    }
  }, [selectedModel, setSelectedModel]);

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedObjectName(null);
    setFloorPlans([]);
    setSelectedFloorPlan(null);
    setOverviewMode(true); 
    setCanvasKey(prevKey => prevKey + 1); // Force Canvas to re-render
  };

  const handleObjectClick = async (objectName: string) => {
    if (selectedModel) {
      setSelectedObjectName(objectName);
      setSelectedFloorPlan(null);
      setOverviewMode(false);
      const plans = await getFloorPlansForObject(selectedModel.split('.')[0], objectName);
      setFloorPlans(plans);
    }
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
        <Canvas
          key={canvasKey} // Use the key prop to force a remount
          camera={{ position: [0, 400, 800], fov: 50 }}
          style={{ height: '100%', width: '100%' }}
        >
          <ThreeSceneWithSplitView 
            modelPath={`/assets/models/${selectedModel}`}  // Pass the selected model path
            onObjectClick={handleObjectClick} 
            onObjectHover={handleObjectHover}
            isSplitView={isSplitView} 
            hoveredStack={hoveredStack}  // Pass the hovered stack state
            selectedStack={hoveredStack}  // Pass the selected stack state
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
          selectedModel={selectedModel}
          onModelChange={handleModelChange}  
          setHoveredStack={setHoveredStack}  // Correctly pass the setter for hovered stack
          setSelectedStack={setHoveredStack}  // Pass the setter for selected stack
        />
      </div>
    </div>
  );
};

export default ThreePage;
