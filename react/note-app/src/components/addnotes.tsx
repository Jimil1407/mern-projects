import axios from "axios"
import { notesAtom } from "./recoil/atom"
import { useState } from "react"
import { useRecoilState } from "recoil"

export default function AddNotes() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [notesState, setNotesState] = useRecoilState(notesAtom)

    const handleAddNote = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:3001/submit', { title, description }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const fetchResponse = await axios.get('http://localhost:3001/showNotes', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setNotesState(fetchResponse.data);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };
    return (
        <div className="flex flex-col justify-center items-center w-full h-full min-h-[220px] bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">Add a Note</h2>
            <div className="w-full flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1 w-full">
                    <label className="text-xs text-gray-400 mb-1 block" htmlFor="add-title">Title</label>
                    <input
                        id="add-title"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-2"
                    />
                </div>
                <div className="flex-1 w-full">
                    <label className="text-xs text-gray-400 mb-1 block" htmlFor="add-description">Description</label>
                    <input
                        id="add-description"
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-2"
                    />
                </div>
                <button
                    onClick={handleAddNote}
                    className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition mt-6 sm:mt-0"
                >
                    Add Note
                </button>
            </div>
        </div>
    )
}
    