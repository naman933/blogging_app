import { atom} from "recoil";

export const tokenAtom = atom({
    key: "tokenAtom",
    default: ""
});

export const balanceAtom = atom({
    key: "balanceAtom",
    default: ""
});

export const userfilterAtom = atom({
    key: "userfilterAtom",
    default: ""
});

export const usersAtom = atom({
    key : "usersAtom",
    default: []
});

export const currentAtom = atom({
    key: "currentAtom",
    default: ""
});

export const modalAtom = atom({
    key: "modalAtom",
    default : false
});

export const usermodalAtom = atom({
    key: "usermodalAtom",
    default : {}
});
