

export type Txt2ImgResp = string | Blob | undefined | null
export type Img2ModelResp = undefined | null | string

export type PromptType = {
    id: string
    message: string
    image: Txt2ImgResp
    name: string
    model: Img2ModelResp
}

export type MsgsCacheType = {
    [key: string]: PromptType
}

export type StoreType = {
    // currentMsg: string
    selected: string | null
    msgs: MsgsCacheType
    entities: string[]
}

export type RequestText2ImgType = {
    message: string
}

export type RequestImg2MeshType = {
    message: string
}