import { state } from "@/store";
import { useSnapshot } from "valtio";
import { GeneratedImage } from "../GeneratedImage";
import { Html } from "@react-three/drei";
import { DoubleSide, ShaderMaterial } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Loading = () => {

    return <Html center>
        LOADING...
    </Html>
};

const vs = `

    uniform float u_time;

    varying vec2 vUv;

    void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        modelPosition.z += sin(modelPosition.x * 4.0 + u_time * 2.0) * 0.2;
        
        // Uncomment the code and hit the refresh button below for a more complex effect 🪄
        modelPosition.y += sin(modelPosition.z * 6.0 + u_time * 2.0) * 0.1;

        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;

        gl_Position = projectedPosition;
    }
`;
const fs = `
    varying vec2 vUv;

    vec3 colorA = vec3(0.008,0.895,0.940);
    vec3 colorB = vec3(0.129,0.299,1.000);

    void main() {
        vec2 normalizedPixel = gl_FragCoord.xy/500.0;
        vec3 color = mix(colorA, colorB, normalizedPixel.x);

        gl_FragColor = vec4(color,1.0);
    }
`;

const CustomMaterial = () => {

    const mRef = useRef<ShaderMaterial>(null);


    useFrame(({clock}) => {

        if (mRef.current) {
            mRef.current.uniforms.u_time.value = clock.getElapsedTime();
        }

    });

    return (
        <shaderMaterial 
            ref={mRef}
            side={DoubleSide}
            vertexShader={vs}
            fragmentShader={fs}
            wireframe
            uniforms={{
                u_time: { value: 0 },
            }}
        />
    );
};

export const Entity = (props: {id: string}) => {

    const { id } = props;

    const imgurl = useSnapshot(state).msgs[props.id].image as string;

    return (
        <group>
            { imgurl ? <GeneratedImage id={id} url={imgurl} /> : 
                <>
                    <Loading />
                    <mesh position={[0, 0, 0]}>
                        <planeGeometry args={[10, 10, 32, 32]} />
                        <CustomMaterial />
                    </mesh> 
                </>                
            }
        </group>
    );
};
