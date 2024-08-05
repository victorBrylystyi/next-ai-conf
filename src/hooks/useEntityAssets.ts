import { state, updateMsg } from "../store";
import { suspend } from "suspend-react";
import { RequestText2ImgType } from "@/helpers/types";

const loadingFn = () => 
    async (id: string) => {

        const { message } = state.msgs[id];

        const request: RequestText2ImgType = {
            message
        }

        // const imgUrl = await fetch('/api/text2img', {
        //     method: 'POST',
        //     body: JSON.stringify(request)
        // })
        // .then(async (resp: Response) => resp.blob().then(blob => URL.createObjectURL(blob)))

        return fetch('/api/img2mesh', {
            method: 'POST',
            body: JSON.stringify({
                data: 'hi'
            })
        })
        .then((resp: Response) => {
            console.log(resp)
            return resp.json()
        })
        .then((json) => {
            return json.result as string
        })

    }

export const useEntityAssets = (entityId: string) => suspend(loadingFn(), [entityId]);