import { useEntityAssets } from "@/hooks/useEntityAssets";
import { setSelectedObject, state } from "@/store";
import { Html, useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useSnapshot } from "valtio";

const RsltTexture = (props: {url: string}) => {

    const map = useTexture(props.url);

    return (
        <mesh position={[-15, 0, 0]}>
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial map={map} />
        </mesh>
    );
};

const Model = (props: {url: string}) => {

    const gltf = useLoader(GLTFLoader, props.url);

    return <primitive object={gltf.scene} />
};

const Loading = () => {

    return <Html center>
        LOADING...
    </Html>
};

export const Entity = (props: {id: string}) => {

    const modelUrl = useSnapshot(state).msgs[props.id].model as string;
    // const imgurl = useSnapshot(state).msgs[props.id].image as string;

    return (
        <group>
            {modelUrl ? 
                <Model url={modelUrl} /> : 
                <Loading />
                // <mesh
                //     name={props.id}
                //     onClick={(e) => {
                //         e.stopPropagation();
                //         setSelectedObject(props.id)
                //     }}
                //     onPointerMissed={(e) => e.type === 'click' && setSelectedObject(null)}
                // >
                //     <planeGeometry args={[10, 10]} />
                //     <meshNormalMaterial />
                // </mesh>
            }
            {/* {
                imgurl ? <RsltTexture url={imgurl} /> : null
            } */}
        </group>
    );
    // <mesh
    //     name={props.id}
    //     onClick={(e) => {
    //         e.stopPropagation();
    //         setSelectedObject(props.id)
    //     }}
    //     onPointerMissed={(e) => e.type === 'click' && setSelectedObject(null)}
    // >
    //     <planeGeometry args={[10, 10]} />
    //     <meshBasicMaterial map={texture} />
    // </mesh>;
};
