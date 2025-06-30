import { atom , selector} from "recoil";

export const counter = atom({
    key: "countAtom",
    default: 0
})


export const even = selector({
    key: 'iseven',
    get: ({get}) => {
        const count = get(counter);
        return count % 2 == 0;
    }
})