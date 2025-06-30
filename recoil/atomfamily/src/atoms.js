import {atom, atomFamily, selectorFamily} from 'recoil';

import {TODOS} from "./todos"
import axios from 'axios';

export const todosAtomFamily = atomFamily({
    key: "todofam",
    default:  selectorFamily({
        key: "todoselectfam",
        get: (id) => async ({get}) => {
            const res = await axios.get(`https://sum-server.100xdevs.com/todo?id=${id}`);
            return res.data.todo;
        },
    })
});