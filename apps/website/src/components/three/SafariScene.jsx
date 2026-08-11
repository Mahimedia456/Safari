import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
} from "@react-three/drei";

function PlaceholderPhone() {
  return (
    <Float
      speed={1.15}
      rotationIntensity={0.15}
      floatIntensity={0.3}
    >
      <mesh
        rotation={[
          -0.06,
          -0.35,
          -0.03,
        ]}
      >
        <boxGeometry
          args={[
            2.25,
            4.7,
            0.22,
          ]}
        />

        <meshStandardMaterial
          color="#111111"
          roughness={0.28}
          metalness={0.58}
        />
      </mesh>

      <mesh
        position={[0, 0, 0.125]}
        rotation={[
          -0.06,
          -0.35,
          -0.03,
        ]}
      >
        <planeGeometry
          args={[
            2.04,
            4.43,
          ]}
        />

        <meshStandardMaterial
          color="#f2f0e8"
          roughness={0.7}
        />
      </mesh>
    </Float>
  );
}

export default function SafariScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{
        position: [0, 0, 7],
        fov: 42,
      }}
    >
      <ambientLight intensity={1.2} />

      <directionalLight
        position={[4, 6, 5]}
        intensity={3}
      />

      <directionalLight
        position={[-4, -3, 2]}
        intensity={1}
      />

      <PlaceholderPhone />

      <Environment preset="city" />
    </Canvas>
  );
}