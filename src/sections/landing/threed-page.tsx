import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import Box from "@mui/material/Box";
import { alpha, useTheme } from "@mui/material/styles";

import ObjectInfoBox from "@/components/three-scene/ObjectInfoBox";
import SidePanel from "@/components/three-scene/SidePanel";
import { BuildingPart } from "@/components/three-scene/types";

const buildingParts: BuildingPart[] = [
  { name: "ReceptionGround", increment: 0 },
  { name: "Downtown", increment: 1 },
  { name: "Uptown", increment: 2 },
  { name: "Mezanine1", increment: 3 },
  { name: "Skycity", increment: 4 },
  { name: "Mezanine2", increment: 5 },
  { name: "Skyrise", increment: 6 },
  { name: "HorizonCollection", increment: 7 },
  { name: "Rooftop", increment: 8 },
];

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hoveredObjectName, setHoveredObjectName] = useState<string | null>(
    null
  );
  const [clickedObjectName, setClickedObjectName] = useState<string | null>(
    null
  );
  const [floorPlans, setFloorPlans] = useState<string[]>([]);
  const clickableObjects: THREE.Object3D[] = [];
  let hoveredObject: THREE.Mesh | null = null;

  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let raycaster: THREE.Raycaster;
  let mouse: THREE.Vector2;
  let controls: OrbitControls;

  useEffect(() => {
    // Initialize the scene, camera, renderer, and controls
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      75,
      (window.innerWidth * 0.7) / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 400, 400);
    camera.lookAt(0, 200, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth * 0.7, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current?.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = true;
    controls.minDistance = 100;
    controls.maxDistance = 2000;
    controls.maxPolarAngle = Math.PI / 2;

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    const ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(100, 200, 100);
    directionalLight1.castShadow = true;
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-100, 200, -100);
    directionalLight2.castShadow = true;
    scene.add(directionalLight2);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load("/assets/models/model.glb", (gltf) => {
      console.log("Model loaded:", gltf);

      gltf.scene.position.set(0, 0, 0);
      gltf.scene.scale.set(1, 1, 1);
      scene.add(gltf.scene);
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          clickableObjects.push(child);
          child.userData.originalColor = child.material.color.clone();
          child.userData.originalPosition = child.position.clone();
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    });

    const onWindowResize = () => {
      camera.aspect = (window.innerWidth * 0.7) / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * 0.7, window.innerHeight);
    };

    const onDocumentMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      mouse.x = (event.clientX / (window.innerWidth * 0.7)) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickableObjects);

      if (intersects.length > 0) {
        const object = intersects[0].object as THREE.Mesh;
        if (hoveredObject && hoveredObject !== object) {
          const previousMaterial =
            hoveredObject.material as THREE.MeshStandardMaterial;
          previousMaterial.color.copy(hoveredObject.userData.originalColor);
          previousMaterial.needsUpdate = true;
        }
        hoveredObject = object;
        const currentMaterial = object.material as THREE.MeshStandardMaterial;
        currentMaterial.color.setHex(0x6a5acd);
        currentMaterial.needsUpdate = true;

        setHoveredObjectName(object.name);
      } else {
        if (hoveredObject) {
          const previousMaterial =
            hoveredObject.material as THREE.MeshStandardMaterial;
          previousMaterial.color.copy(hoveredObject.userData.originalColor);
          previousMaterial.needsUpdate = true;
        }
        hoveredObject = null;
        setHoveredObjectName(null);
      }
    };

    const onDocumentClick = (event: MouseEvent) => {
      event.preventDefault();
      mouse.x = (event.clientX / (window.innerWidth * 0.7)) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickableObjects);

      if (intersects.length > 0) {
        const object = intersects[0].object as THREE.Mesh;
        console.log("Clicked on", object.name);
        setClickedObjectName(object.name);

        // Load floor plans for the clicked object (assuming they are named based on object names)
        const plans = loadFloorPlans(object.name);
        setFloorPlans(plans);
      }
    };

    const loadFloorPlans = (objectName: string): string[] => {
      // Example function to load floor plans based on object name
      // Replace this with actual logic to load floor plans from your assets folder
      return [`${objectName}_plan1.png`, `${objectName}_plan2.png`];
    };

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    window.addEventListener("resize", onWindowResize);
    document.addEventListener("mousemove", onDocumentMouseMove);
    document.addEventListener("click", onDocumentClick);

    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("mousemove", onDocumentMouseMove);
      document.removeEventListener("click", onDocumentClick);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const theme = useTheme();

  return (
    <div
      ref={mountRef}
      style={{ position: "relative", width: "100%", height: "100vh" }}
    >
      <ObjectInfoBox objectName={hoveredObjectName} />
      <SidePanel objectName={clickedObjectName} floorPlans={floorPlans} />
    </div>
  );
};

export default ThreeScene;
