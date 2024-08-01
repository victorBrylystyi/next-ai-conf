import { PromptType, StoreType } from "@/helpers/types";
import { proxy } from "valtio";

export const state = proxy<StoreType>({
    // currentMsg: '',
    selected: null,
    msgs: {},
    entities: []
});

let a = 1;

export const createEntity = (id:string) => {
    state.entities.push(id);
};

export const createNewMsg = (newMsg:PromptType) => {
    state.msgs[newMsg.id] = {
        ...newMsg
    };
};

export const updateMsg = (id: string, props: Partial<PromptType>) => {
    const currentMsg = state.msgs[id];
    state.msgs[id] = {
        ...currentMsg,
        ...props
    };
};

export const setSelectedObject = (objectId: string | null) => {
    state.selected = objectId;
};



