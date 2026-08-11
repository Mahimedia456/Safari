import { useGLTF } from "@react-three/drei";

export default function PhoneModel(props) {
  const { scene } = useGLTF(
    "/models/phone/safari-phone.glb",
  );

  return (
    <primitive
      object={scene}
      {...props}
    />
  );
}

useGLTF.preload(
  "/models/phone/safari-phone.glb",
);