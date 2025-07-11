// recoil/atoms.ts
import { atom } from "recoil";

export const notesAtom = atom<{ id: string; title: string; description: string }[]>({
  key: "notesAtom",
  default: [],
});
