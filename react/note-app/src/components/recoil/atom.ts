// recoil/atoms.ts
import { atom } from "recoil";

export const notesAtom = atom<{ title: string; description: string }[]>({
  key: "notesAtom",
  default: [],
});
