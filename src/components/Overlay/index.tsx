
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import DirectionsIcon from '@mui/icons-material/Directions';
import { useEffect, useState } from "react";
import { MathUtils } from "three";
import { useSnapshot } from "valtio";
import { state, createNewMsg, createEntity } from "@/store";

export const Overlay = () => {

    const [msg, setMsg] = useState('');

    const mess = useSnapshot(state).msgs;

    useEffect(() => {
        console.log(mess);
    }, [mess])

    return <>
        <div id="menu">
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
                        onClick={() => {
                            const messageId = MathUtils.generateUUID()
                            createNewMsg({
                                id: messageId,
                                message: msg,
                                name: `pic ${state.entities.length + 1}`,
                                image: null
                            });
                            createEntity(messageId);
                            setMsg('');
                        }}
                    >
                        <DirectionsIcon />
                    </IconButton>
                </Paper>
            </div>
        </div>
    </>
};