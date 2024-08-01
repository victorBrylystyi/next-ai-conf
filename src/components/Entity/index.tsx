import { useEntityAssets } from "@/hooks/useEntityAssets";
import { setSelectedObject } from "@/store";
import { useTexture } from "@react-three/drei";

export const Entity = (props: {id: string}) => {

    const url = useEntityAssets(props.id);

    const texture = useTexture(url);

    return <mesh
        name={props.id}
        onClick={(e) => {
            e.stopPropagation();
            setSelectedObject(props.id)
        }}
        onPointerMissed={(e) => e.type === 'click' && setSelectedObject(null)}
    >
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial map={texture} />
    </mesh>;
};
