
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import DirectionsIcon from '@mui/icons-material/Directions';
import { useCallback, useState } from "react";
import { MathUtils } from "three";
import { state, createNewMsg, createEntity, updateMsg } from "@/store";


export const Overlay = () => {

    const [msg, setMsg] = useState('');

    const postMessageHandle = useCallback(() => {
        console.log('postMessageHandle');

        const messageId = MathUtils.generateUUID();

        createNewMsg({
            id: messageId,
            message: msg,
            name: `pic ${state.entities.length + 1}`,
            image: null,
            model: null
        });

        createEntity(messageId);

        setMsg('');

        fetch('/api/text2img', {
            method: 'POST',
            body: JSON.stringify({
                message: msg,
            })
        })
        .then(resp => resp.blob())
        .then((blob) => {
            console.log(blob)
            const url = URL.createObjectURL(blob); 
            updateMsg(messageId, {
                image: url,
            })
        })

    }, [setMsg, msg])

    return <div id="menu">
        <div className="cmdLine">
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                style={{
                    background: 'transparent',
                    boxShadow: 'none'
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Command line"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    value={msg}
                    onChange={e => {
                        console.log(e.target.value);
                        setMsg(e.target.value);
                    }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton 
                    color="primary" 
                    sx={{ p: '10px' }} 
                    aria-label="directions"
                    onClick={() => postMessageHandle()}
                >
                    <DirectionsIcon />
                </IconButton>
            </Paper>
        </div>
     </div>
};