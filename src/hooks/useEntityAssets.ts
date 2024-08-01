import { state, updateMsg } from "../store";
import { suspend } from "suspend-react";
import { RequestText2ImgType } from "@/helpers/types";

const loadingFn = () => 
    async (id: string) => {

        const { message } = state.msgs[id];

        const request: RequestText2ImgType = {
            message
        }

        return fetch('/api/text2img', {
            method: 'POST',
            body: JSON.stringify(request)
        })
        .then(async (resp: Response) => resp.blob().then(blob => URL.createObjectURL(blob)))

    }

export const useEntityAssets = (entityId: string) => suspend(loadingFn(), [entityId]);