import { state } from "@/store";
import { useThree } from "@react-three/fiber";
import { useCallback, useEffect } from "react";

const speed = 0.5;


export const KeyBoardControll = () => {

    const camera = useThree(state => state.camera);

    const handleKey = useCallback((e: KeyboardEvent) => {
        switch (e.key) {
            case 'w':
            {
                console.log('w')
                camera.position.setZ(camera.position.z - speed);

            }
            break;
            case 's':
            {
                console.log('s')
                camera.position.setZ(camera.position.z + speed);
            }
            break;     
            case 'a':
            {
                console.log('a')
                camera.position.setX(camera.position.x - speed);
            }
            break; 
            case 'd':
            {
                console.log('d')
                camera.position.setX(camera.position.x + speed);
            }
            break; 
            default:
                break;
        }
    }, [camera])

    useEffect(() => {

        window.addEventListener('keydown', handleKey);
        window.addEventListener('keypress', handleKey);

        return () => {
            window.removeEventListener('keydown', handleKey);
            window.removeEventListener('keypress', handleKey)
        };

    }, [handleKey]);


    return null;
};