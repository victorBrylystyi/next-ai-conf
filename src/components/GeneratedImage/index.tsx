import { setSelectedObject } from "@/store";
import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { DoubleSide, ShaderMaterial, Texture, Vector2 } from "three";

type PropsType = {
    url: string
    id: string
}

type MaterialProps = {
    map: Texture
}

const vs = `

    // varying vec2 vUv;

    void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;

        gl_Position = projectedPosition;
        // vUv = uv;
    }
`;
const fs = `
    // varying vec2 vUv;

    uniform sampler2D map;
    uniform sampler2D flowMap;
    uniform float u_time;
    uniform vec2 resolution;

    void main() {

        vec2 vUv = gl_FragCoord.xy / resolution.xy;

        float intensity = 2.;
        float timescale = .174;

        vec4 colorA = texture2D(map, vUv);
        vec4 colorB = texture2D(flowMap, vUv);

        // vec3 color = mix(colorA.xyz, colorB.xyz, gl_FragCoord.y);

        vec2 distortion = (vUv - .5) * intensity;  // calculated normal map (sinkhole towards center)
    
        //float scaletime = (u_time) * timescale  + texture2D(iChannel0, vUv).r;   //I can't tell which one's "correct",
        float scaletime = (u_time  + texture2D(flowMap, vUv).r) * timescale; // but this looks cooler with my calculated normals
        float flow_t0 = fract(scaletime);
        float flow_t1 = fract(scaletime + .5);
        float alternate = abs((flow_t0 -.5) * 2.);

        vec4 samp0 = texture(map, vUv + distortion * flow_t0); 
        vec4 samp1 = texture(map, vUv + distortion * flow_t1);

        gl_FragColor = mix(samp0, samp1, alternate);
    }
`;

const CustomMaterial = (props: MaterialProps) => {

    const { map } = props; 

    const mRef = useRef<ShaderMaterial>(null);

    const flowMap = useTexture('./flowMap.png');

    const size = useThree(state => state.size);

    useEffect(() => {
        console.log(size)

        if (mRef.current) {
            (mRef.current.uniforms.resolution.value as Vector2).set(size.width, size.height);
        }

    }, [size]);

    useFrame(({clock}) => {

        if (mRef.current) {
            mRef.current.uniforms.u_time.value = clock.getElapsedTime();
        }


    })

    return (
        <shaderMaterial 
            ref={mRef}
            side={DoubleSide}
            vertexShader={vs}
            fragmentShader={fs}
            uniforms={{
                u_time: { value: 0 },
                resolution: { value: new Vector2(size.width, size.height) },
                map: { value: map },
                flowMap: { value: flowMap }
            }}
        />
        // <meshBasicMaterial map={map} />
    );
};

export const GeneratedImage = (props: PropsType) => {

    const { url, id } = props;

    const map = useTexture(url);

    return (
        <mesh 
            name={id}
            position={[0, 0, 0]}
            onClick={(e) => {
                e.stopPropagation();
                setSelectedObject(id)
            }}
            onPointerMissed={(e) => e.type === 'click' && setSelectedObject(null)}
            // rotation={[Math.PI/2, 0, 0]}
        >
            <planeGeometry args={[10, 10, 32, 32]} />
            <CustomMaterial map={map} />
            {/* <meshBasicMaterial map={map} /> */}
        </mesh>
    );
};

useTexture.preload('./flowMap.png');