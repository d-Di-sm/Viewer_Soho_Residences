import "./index.css";
import { Suspense, useEffect, useState, useRef } from "react";
import { HomePage } from "./components/HomePage";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Leva, useControls } from "leva";
import { Experience } from "./components/Experience";
import {
  useProgress,
  SoftShadows,
  OrbitControls,
  CameraControls,
} from "@react-three/drei";

import "@mantine/core/styles.css";

// import { getProject } from "@theatre/core";
// import { PerspectiveCamera, SheetProvider, editable as e } from "@theatre/r3f";
// import extension from "@theatre/r3f/dist/extension";
// import studio from "@theatre/studio";
// import projectState from "./assets/MedievalTown.theatre-project-state.json";
import Interface360 from "./components/Interface.jsx";
import { ScreenTransition } from "./components/ScreenTransition.jsx";
import { atom, useAtom } from "jotai";
import { transitionAtom, UI } from "./components/UI.jsx";
import Overlay from "./components/Overlay.jsx";
import { degToRad } from "three/src/math/MathUtils.js";

// LOADING SCREEN
// const LoadingScreen = ({ onLoadingChange }) => {
//   const { progress, active } = useProgress();

//   useEffect(() => {
//     if (onLoadingChange) {
//       onLoadingChange(active);
//     }
//   }, [active, onLoadingChange]);

//   console.log(progress);

//   return (
//     <div className={`loading-screen ${active ? "" : "loading-screen--hidden"}`}>
//       <div className="loading-screen__container">
//         <div className="logo-main">
//           <img src="./logos/Soho_Logo.png" alt="Soho Logo" />
//         </div>
//         <h1 className="loading-screen__title">SOHO RESIDENCES</h1>
//         <div className="progress__container">
//           <div
//             className="progress__bar"
//             style={{
//               width: `${progress}%`,
//             }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// };

//Theatre js
// export const isProd = import.meta.env.MODE === "production";

// if (!isProd) {
//   studio.initialize();
//   studio.extend(extension);
// }
// const project = getProject(
//   "MedievalTown",
//   isProd
//     ? {
//         state: projectState,
//       }
//     : undefined,
// );
// const mainSheet = project.sheet("Main");

// const transitions = {
//   Home: [0, 5],
//   Castle: [6, 12 + 22 / 30],
//   Windmill: [13 + 2 / 30, 17 + 23 / 30],
// };

export const transitionHome = atom(false);

function App() {
  // const [showRecorrido360, setShowRecorrido360] = useState(false);
  const [transitionHomepage, setTransitionHomepage] = useAtom(transitionHome);
  const [returnToMesh, setReturnToMesh] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [transition, setTransition] = useAtom(transitionAtom);
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setTransition(false);
    }
  }, [progress]);

  // const cameraTargetRef = useRef();

  // const [currentScreen, setCurrentScreen] = useState("Intro");
  // const [targetScreen, setTargetScreen] = useState("Home");
  // const isSetup = useRef(false);

  const { backgroundColor } = useControls({
    backgroundColor: "#ffffff",
  });

  const handleTourClick = () => {
    // setReturnToMesh(meshName);
    setShowRecorrido360(true);
  };

  const handleReturnClick = () => {
    setShowRecorrido360(false);
    // Dispatch event to reopen the floating panel after return
    // if (returnToMesh) {
    //   setTimeout(() => {
    //     window.dispatchEvent(
    //       new CustomEvent("return-from-360", {
    //         detail: {
    //           meshName: returnToMesh,
    //         },
    //       }),
    //     );
    //   }, 100);
    // }
  };

  // useEffect(() => {
  //   project.ready.then(() => {
  //     if (currentScreen === targetScreen) {
  //       return;
  //     }
  //     if (isSetup.current && currentScreen === "Intro") {
  //       // Strict mode in development will trigger the useEffect twice, so we need to check if it's already setup
  //       return;
  //     }
  //     isSetup.current = true;
  //     const reverse = targetScreen === "Home" && currentScreen !== "Intro";
  //     const transition = transitions[reverse ? currentScreen : targetScreen];
  //     if (!transition) {
  //       return;
  //     }

  //     mainSheet.sequence
  //       .play({
  //         range: transition,
  //         direction: reverse ? "reverse" : "normal",
  //         rate: reverse ? 2 : 1,
  //       })
  //       .then(() => {
  //         setCurrentScreen(targetScreen);
  //       });
  //   });
  // }, [targetScreen]);

  return (
    <>
      <Leva />
      {/* {!showRecorrido360 ? ( */}
      {!transitionHomepage ? (
        <>
          {/* <HomePage onTourClick={handleTourClick} /> */}
          <HomePage />
        </>
      ) : (
        <>
          {/* <LoadingScreen onLoadingChange={setIsLoading} /> */}

          {/* <UI
            currentScreen={currentScreen}
            onScreenChange={setTargetScreen}
            isAnimating={currentScreen !== targetScreen}
          /> */}
          <UI />
          <div className="fixed inset-0 w-screen h-screen overflow-hidden">
            <Canvas
              dpr={[1, 2]}
              gl={{
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                outputColorSpace: THREE.SRGBColorSpace,
              }}
              camera={{
                fov: 45,
                near: 1,
                far: 1200,
                // position: [75, 75, 150],
                position: [
                  94.88715402309754, 111.6694578807425, 202.37511175736282,
                ],
                target: [
                  2.9744458895296013, -21.885757328439343, 12.500057387505853,
                ],
              }}
              shadows={{
                enabled: true,
                type: "VSMShadowMap",
              }}

              // camera={{ position: [5, 5, 10], fov: 30, near: 1 }}
              // gl={{
              //   preserveDrawingBuffer: true,
              // }}
              // shadows
            >
              {/* <color attach="background" args={[backgroundColor]} /> */}
              {/* <fog attach="fog" args={[backgroundColor, 5, 12]} /> */}

              <ScreenTransition transition={transition} color="#2E3641" />

              {/* <OrbitControls /> */}
              {/* <CameraControls ref={controls} />
            <SoftShadows /> */}

              {/* <SheetProvider sheet={mainSheet}> */}
              {/* <e.fog theatreKey="Fog" attach="fog" args={["#cc7b32", 3, 5]} /> */}
              {/* <PerspectiveCamera
              position={[5, 5, 10]}
              fov={30}
              near={1}
              makeDefault
              theatreKey="Camera"
              lookAt={cameraTargetRef}
            /> */}
              {/* <e.mesh
                theatreKey="Camera Target"
                visible="editor"
                ref={cameraTargetRef}
              >
                <octahedronBufferGeometry args={[0.1, 0]} />
                <meshPhongMaterial color="yellow" />
              </e.mesh> */}

              <Suspense>
                <Experience />
              </Suspense>

              {/* </SheetProvider> */}
            </Canvas>

            <Overlay />

            {/* <Interface360 onReturnClick={handleReturnClick} /> */}

            {/* {!isLoading && (
            <>
              <Interface360 onReturnClick={handleReturnClick} />
            </>
          )} */}

            {/* <Canvas camera={{ position: [0, 1.8, 5], fov: 42 }}>
          <color attach="background" args={[backgroundColor]} />
          <fog attach="fog" args={[backgroundColor, 5, 12]} />
          <ScreenTransition transition={transition} color="#a5b4fc" />
          <Suspense>
            <Experience />
          </Suspense>
        </Canvas> */}
          </div>
        </>
      )}
    </>
  );
}

export default App;
