"use client"; 

import { Environment, Grid, OrbitControls, TransformControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Color } from "three";
import { useSnapshot } from "valtio";
import { state } from "@/store";
import { Board } from "../Board";
import { Overlay } from "../Overlay";
import { KeyBoardControll } from "../KeyboardControll";

const Controls = () => {

    const selected = useSnapshot(state).selected;
    const scene = useThree(state => state.scene);

    return (
        <>
            {selected && <TransformControls object={scene.getObjectByName(selected)} />}
            <OrbitControls makeDefault />
            {/* <KeyBoardControll /> */}
        </>
    );
};

export const App = () => {

    const colorRef = useRef(new Color(0.5, 0.5, 1));

    // useEffect(() => { // get
    //     fetch('/api/hello?id=next123')
    //     .then((resp) => {
    //         return resp.json()
    //     })
    //     .then((json) => {
    //         console.log(json)
    //     })
    // }, []);

    // useEffect(() => { // post
    //     fetch('/api/img2mesh', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             data: 'hi'
    //         })
    //     })
    //     .then((resp: Response) => {
    //         return resp.json()
    //     })
    //     .then((json) => {
    //         console.log(json)
    //     })
    // }, []);
    // const { data, error, isLoading } = useSWR('/api/hello', fetcher)

    // useEffect(() => {console.log(data)}, [data])

    return <>
        <Canvas>
            <Controls />
            <Environment background preset="sunset" backgroundBlurriness={0.8} />
            <Grid 
                renderOrder={-1} 
                position={[0, -0.4, 0]} 
                infiniteGrid 
                cellSize={0.6} 
                cellThickness={0.6} 
                sectionSize={3.3} 
                sectionThickness={1.5} 
                sectionColor={colorRef.current} 
                fadeDistance={30} 
            />
            <Board />
        </Canvas>
        <Overlay />
    </>

};