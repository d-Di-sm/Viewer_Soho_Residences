import {
  CameraControls,
  ContactShadows,
  Environment,
  Float,
  Html,
  SoftShadows,
} from "@react-three/drei";
import { motion } from "framer-motion";

import Residencial01 from "./Building/Residencial01";
import Residencial02 from "./Building/Residencial02";
import Residencial03 from "./Building/Residencial03";

import Terrain from "./Building/Terrain";
import Amenities from "./Building/Amenities";
import Casona01 from "./Building/Casona01";
import Casona02 from "./Building/Casona02";
import Casona03 from "./Building/Casona03";
import Casona04 from "./Building/Casona04";
import Basamento from "./Building/Basamento";
import Talud from "./Building/Talud";
import Agua from "./Building/Agua";

import TerrenoLineasMultiples from "../Curves.jsx";

import {
  CAKE_TRANSITION_DURATION,
  TRANSITION_DURATION,
  cakeAtom,
  isMobileAtom,
  screenAtom,
  transitionAtom,
  annotation3d,
} from "./UI";
import { atom, useAtom } from "jotai";
import { degToRad } from "three/src/math/MathUtils.js";

import { floatingPanelActive } from "./Overlay.jsx";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import ResidencialAreasA from "./Building/Residencial_Areas_A_Final.jsx";
import ResidencialAreasB from "./Building/Residencial_Areas_B_Final.jsx";
import { button, useControls } from "leva";

export const section = atom(0);

export const sections = atom(["intro", "titanium", "camera", "resi", "casita"]);

const cameraPositions = {
  intro: [
    89.17588943074588, 112.38822054752744, 205.34645416607356,
    2.9744458895296013, -21.885757328439343, 12.500057387505853,
  ],
  titanium: [-14.5, 109.8, 246.1, 3.4, -5.0, 2.5],
  camera: [
    -73.01054000346974, 42.78772159455869, 111.8079878008047,
    -120.47428040136617, 26.304063459044073, 47.131211268837035,
  ],
  resi: [
    -76.51528344358627, 44.70187188086646, 111.63662191958312,
    -99.02479849317754, 8.640329098189241, 41.633122542631476,
  ],
  casita: [
    -35.299270939844504, 28.68401895247473, 96.06585225259698,
    -53.23740010799345, 11.597048851153064, 26.426469667539145,
  ],
};

const cameraPositionsSmallScreen = {
  intro: [
    -321.3561195123034, 258.18734119767726, 126.39247631777911,
    0.9494886774927435, -39.68538612835543, 39.2898573765266,
  ],
  titanium: [
    307.544655088891, 213.2655414739, 135.92488636759083, 5.877448178398372,
    -39.533157985069934, 43.41178072977719,
  ],
  camera: [
    -55.1482234257406, 80.51973318644183, 194.26079704086902,
    -108.54317557353276, -14.08607906922307, 44.60426068278533,
  ],
  resi: [
    -57.27045249359533, 71.64457810965422, 162.14951867107695,
    -96.36063233089962, 9.019852988750673, 40.58095649384126,
  ],
  casita: [
    1.1901121776266876, 24.321244478973043, 114.96227815344739,
    -62.20118713978627, 16.967052580882484, 32.60700671391736,
  ],
};

export const Experience = () => {
  const [screen] = useAtom(screenAtom);
  const [annotation] = useAtom(annotation3d);

  const [transition] = useAtom(transitionAtom);
  const [isMobile] = useAtom(isMobileAtom);

  const handleAnnotationClick = (
    imageName,
    annotationName,
    // meshName = null,
    event,
  ) => {
    event?.stopPropagation?.();
    // setCameraMode(CameraModes.CASITA)

    //Dispatch custom event with image and annotation information
    window.dispatchEvent(
      new CustomEvent("annotation-click", {
        detail: {
          image: imageName,
          annotation: annotationName,
          // meshName: meshName,
          // source: 'annotation'
        },
      }),
    );
  };

  const [sectionCam, setSectionCam] = useAtom(section);

  const controls = useRef();

  const [introFinished, setIntroFinished] = useState(false);

  const intro = async () => {
    controls.current.setLookAt(
      89.17588943074588,
      112.38822054752744,
      205.34645416607356,
      2.9744458895296013,
      -21.885757328439343,
      12.500057387505853,
      false,
    );
    // await controls.current.dolly(3, true);
    // await controls.current.rotate(degToRad(45), degToRad(25), true);

    setIntroFinished(true);
    playTransition();
  };

  const [sectionsArr] = useAtom(sections);

  const playTransition = () => {
    if (!controls.current) return;
    const key = sectionsArr[sectionCam]; // "intro" | "titanium" | ...
    const pose = isMobile
      ? cameraPositionsSmallScreen[key]
      : cameraPositions[key];
    if (!pose) return;
    controls.current.setLookAt(...pose, true);
  };

  // const playTransition = () => {
  //   controls.current.setLookAt(...cameraPositions[sections[section]], true);
  // };

  useControls("Helper", {
    getLookAt: button(() => {
      const position = controls.current.getPosition();
      const target = controls.current.getTarget();
      console.log([...position, ...target]);
    }),
    // toJson: button(() => console.log(controls.current.toJSON())),
  });

  useEffect(() => {
    // intro();
    const raf = requestAnimationFrame(() => controls.current && intro());
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!introFinished) {
      return;
    }
    playTransition();
  }, [sectionCam]);

  return (
    <>
      <group position-y={isMobile ? -0.66 : -1}>
        {/* HOME */}
        <group visible={screen === "home" || screen === "pers"}>
          <CameraControls ref={controls} />
          <SoftShadows />

          <Terrain />

          <Residencial01 />

          <Residencial02 />
          <Residencial02
            rotation={[0, (Math.PI / 180) * 9, 0]}
            position={[34.37, 0, 18.19]}
          />
          <Residencial02
            rotation={[0, (Math.PI / 180) * 15, 0]}
            position={[71.75, 0, 31.1]}
          />
          <Residencial02
            rotation={[0, (Math.PI / 180) * 32, 0]}
            position={[110.58, 0, 34.13]}
          />

          <Residencial03 />

          <Amenities />

          <Casona01 />
          <Casona02 />
          <Casona03 />
          <Casona04 />
          <Casona04 position={[-50.1, 0.15, -16.18]} />

          <Basamento />

          <Talud />
          <Agua />

          <ResidencialAreasA />
          <ResidencialAreasB />

          <TerrenoLineasMultiples />

          <Environment preset="dawn" background blur={4} />
        </group>

        {/* MENU */}
        <group position-y={isMobile ? 0.42 : 0.75} visible={screen === "menu"}>
          <Float scale={isMobile ? 0.75 : 1}>
            <Casona02 />
          </Float>
        </group>
        <ContactShadows opacity={0.42} scale={25} />

        <mesh rotation-x={degToRad(-90)} position-y={-0.001}>
          <planeGeometry args={[40, 40]} />
          <meshBasicMaterial color={"white"} toneMapped={false} />
        </mesh>
      </group>

      {annotation === "amenities" && (
        <>
          <Annotation_3d
            nombre="POOL"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-88, 30, 65]}
            onAnnotationClick={() =>
              handleAnnotationClick("./IMG/AM_AL_HD.png", "POOL")
            }
          />

          <Annotation_3d
            nombre="BAR"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-84, 30, 50]}
            onAnnotationClick={() =>
              handleAnnotationClick("./IMG/ARR_HD.png", "BAR")
            }
          />

          <Annotation_3d
            nombre="TERRACE"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-82.5, 25, 77.4]}
            onAnnotationClick={() =>
              handleAnnotationClick("./IMG/AM_HD.png", "TERRACE")
            }
          />
        </>
      )}

      {annotation === "casita" && (
        <>
          <Annotation_3d
            nombre="POOL HOUSE"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-50, 24.8, 51.5]}
            onAnnotationClick={(event) =>
              handleAnnotationClick(
                "./IMG/C01_AL_HD.png",
                "POOL HOUSE",
                "CA_01",
                event,
              )
            }
          />

          <Annotation_3d
            nombre="TERRACE"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-60, 25, 55.5]}
            onAnnotationClick={(event) =>
              handleAnnotationClick(
                "./IMG/C01_AL_HD.png",
                "TERRACE",
                "CA_01",
                event,
              )
            }
          />

          <Annotation_3d
            nombre="MAIN HOUSE"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-35.8, 22, 56.5]}
            onAnnotationClick={(event) =>
              handleAnnotationClick(
                "./IMG/C01_HD.png",
                "MAIN HOUSE",
                "CA_01",
                event,
              )
            }
          />
        </>
      )}
    </>
  );
};

const Annotation_3d = ({
  children,
  nombre,
  position,
  onAnnotationClick,
  ...props
}) => {
  const [hovered, setHovered] = useState(false);
  const [isFloatingPanelActive] = useAtom(floatingPanelActive);

  const ref = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (ref.current) {
      ref.current.lookAt(camera.position);
    }
  });

  // const handleClick = () => {
  const handleClick = (event) => {
    // Evita que el raycasting continúe hacia los meshes residenciales subyacentes
    event?.stopPropagation?.();

    if (onAnnotationClick) {
      onAnnotationClick();
    }
  };

  // Don't render if floating panel is active
  useEffect(() => {
    if (isFloatingPanelActive) {
      setHovered(false);
    }
  }, [isFloatingPanelActive]);

  if (isFloatingPanelActive) {
    return null;
  }

  return (
    <>
      <group ref={ref} position={position} {...props}>
        <Html transform position={[0, 0, 0]}>
          <div className="annotation-button-wrapper">
            <motion.button
              className={"circle-button-views"}
              onClick={handleClick}
              onPointerEnter={(event) => {
                event?.stopPropagation?.();
                setHovered(true);
              }}
              onPointerLeave={(event) => {
                event?.stopPropagation?.();
                setHovered(false);
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0,
              }}
            />
          </div>
        </Html>
      </group>

      {hovered && (
        <Html
          transform={false}
          position={[position[0] + 0.05, position[1] + 0.1, position[2]]}
        >
          <motion.div
            className="tooltip-3d"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >
            {nombre}
          </motion.div>
        </Html>
      )}
    </>
  );
};
