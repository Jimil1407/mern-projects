import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { notesAtom } from "./recoil/atom";
import AddNotes from "./addnotes";
import { useNavigate } from "react-router-dom";

export default function ShowNotes() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [notesState, setNotesState] = useRecoilState(notesAtom);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<{ [id: string]: string }>({});
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  
  const cardColors = [
    "bg-yellow-200",
    "bg-pink-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-purple-200",
    "bg-orange-200",
    "bg-teal-200",
  ];
  const [deletingIds, setDeletingIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Personal', 'Work', 'Fitness', 'Other'];
  
  const getRotation = (idx: number) => {
    const rotations = ['-rotate-2', 'rotate-1', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-3', ''];
    return rotations[idx % rotations.length];
  };

  const handleDeleteNote = async (id: string) => {
    const token = localStorage.getItem('token');
    const previousNotes = notesState;
    setDeletingIds((prev) => [...prev, id]);
    setTimeout(() => {
      setNotesState((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }, 350); 

    try {
      await axios.delete(`http://localhost:3001/delete/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setSuccessMsg('Note deleted successfully!');
      setTimeout(() => setSuccessMsg(''), 2000);
    } catch (error) {
      setNotesState(previousNotes); 
      console.error("Error deleting note:", error);
      alert("Failed to delete note. Please try again.");
    } finally {
      setTimeout(() => {
        setDeletingIds((prev) => prev.filter((delId) => delId !== id));
      }, 400);
    }
  };

  const handleUpdateNote = async (id: string, title: string, description: string) => {
    const token = localStorage.getItem('token');
    try{
      const response = await axios.put(`http://localhost:3001/update/${id}`, { title, description }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      console.log(response.data);
      setNotesState(
          notesState.map((note) =>
            note.id === id ? { ...note, title, description } : note
          )
        );
      setUpdateError((prev) => ({ ...prev, [id]: '' }));
      setSuccessMsg('Note updated successfully!');
      setTimeout(() => setSuccessMsg(''), 2000);
    } catch (error: any) {
      let message = 'Error updating note.';
      if (error.response && error.response.data && error.response.data.error) {
        message = error.response.data.error;
      }
      setUpdateError((prev) => ({ ...prev, [id]: message }));
      setTimeout(() => setUpdateError((prev) => ({ ...prev, [id]: '' })), 3000);
      console.error("Error updating note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const token = localStorage.getItem('token');
    try{
      setLoading(true);
      const response = await axios.get("http://localhost:3001/showNotes", {  
      headers: {
        Authorization: `Bearer ${token}`
      }
      });
      setNotesState(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    // If you store a token in localStorage, clear it here (e.g., localStorage.removeItem('token');)
    localStorage.removeItem('token');
    navigate('/auth');
  };

  // Animation helpers
  const noteRefs = useRef<{ [id: string]: HTMLDivElement | null }>({});

  // Group notes by category
  const groupedNotes = notesState.reduce((acc, note) => {
    if (!acc[note.category]) acc[note.category] = [];
    acc[note.category].push(note);
    return acc;
  }, {} as Record<string, typeof notesState>);

  // Card color and emoji/icon by category
  const cardStyles: Record<string, { color: string; emoji: string }> = {
    Personal: { color: 'bg-yellow-100', emoji: '😊' },
    Work: { color: 'bg-blue-100', emoji: '💼' },
    Fitness: { color: 'bg-green-100', emoji: '💪' },
    Other: { color: 'bg-purple-100', emoji: '✨' },
  };

  return (
    <div className="w-full px-2 sm:px-6 md:px-12 lg:px-24 xl:px-32 bg-white min-h-screen relative">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 drop-shadow-lg">Notes App</h1>
      {/* Floating Add Button */}
      <button
        className="fixed bottom-8 right-8 z-50 p-5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold shadow-lg border-2 border-white text-3xl flex items-center justify-center transition-all duration-200"
        style={{boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)'}}
        onClick={() => setShowAddModal(true)}
        title="Add Note (नोट जोड़ें)"
      >
        +
      </button>
      {/* Add Note Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="relative bg-yellow-100 rounded-3xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center animate-fade-in" style={{boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)'}}>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl font-bold rounded-full bg-yellow-200 p-2 border border-yellow-300 shadow"
              onClick={() => setShowAddModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <AddNotes />
          </div>
        </div>
      )}
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleLogout}>Logout</button>
      <h2 className="text-2xl font-bold mb-6 text-gray-100 mt-2">Your Notes</h2>
      {/* Category Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1 rounded-full border font-semibold transition-all duration-200 text-sm
              ${activeCategory === cat ? 'bg-yellow-300 text-gray-900 border-yellow-400 shadow' : 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-yellow-200 hover:text-gray-900'}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'All' ? '#All' : `#${cat}`}
          </button>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center my-8">
          <svg className="animate-spin h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="ml-2 text-blue-300 font-semibold">Loading notes...</span>
        </div>
      )}
      {successMsg && (
        <div className="mb-4 w-full text-center bg-green-100 text-green-700 border border-green-300 rounded p-2 font-semibold animate-fade-in">
          {successMsg}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
        {/* Grouped and filtered notes */}
        {(activeCategory === 'All'
          ? Object.keys(groupedNotes)
          : [activeCategory]
        ).map((cat) => (
          groupedNotes[cat] && groupedNotes[cat].length > 0 && (
            <div key={cat} className="col-span-full w-full">
              <div className="text-lg font-bold text-gray-400 mb-2 mt-4">#{cat}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
                {groupedNotes[cat].map((note, idx) => (
                  <div
                    key={note.id}
                    ref={el => { noteRefs.current[note.id] = el; }}
                    className={`relative rounded-3xl shadow-lg p-6 min-h-[180px] flex flex-col transition-all duration-300 hover:scale-105 border-2 ${cardStyles[note.category]?.color || 'bg-yellow-100'} ${getRotation(idx)} sticky-note ${deletingIds.includes(note.id) ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 animate-fade-in'}`}
                    style={{
                      boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10), 0 1.5px 6px 0 rgba(0,0,0,0.10)',
                      fontFamily: 'Poppins, Nunito, Inter, sans-serif',
                    }}
                  >
                    {/* Tape effect */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-16 h-4 bg-yellow-200 rounded opacity-80 z-10 border-b-2 border-yellow-300" style={{boxShadow: '0 2px 6px 0 rgba(0,0,0,0.10)'}}></div>
                    {/* Emoji/Icon */}
                    <div className="absolute top-4 right-6 text-2xl select-none opacity-80">
                      {cardStyles[note.category]?.emoji || '📝'}
                    </div>
                    {editingId === note.id ? (
                      <>
                        {updateError[note.id] && (
                          <div className="mb-2 w-full text-center bg-red-100 text-red-700 border border-red-300 rounded p-2 font-semibold animate-fade-in">
                            {updateError[note.id]}
                          </div>
                        )}
                        <label className="text-xs text-gray-500 mb-1" htmlFor={`title-${note.id}`}>Title</label>
                        <input
                          id={`title-${note.id}`}
                          className="border rounded px-2 py-1 mb-2 font-bold text-lg bg-white text-gray-900 border-gray-300"
                          value={note.title}
                          onChange={(e) => {
                            setNotesState(
                              notesState.map((n) =>
                                n.id === note.id ? { ...n, title: e.target.value } : n
                              )
                            );
                            if (updateError[note.id]) setUpdateError((prev) => ({ ...prev, [note.id]: '' }));
                          }}
                        />
                        <label className="text-xs text-gray-500 mb-1" htmlFor={`desc-${note.id}`}>Description</label>
                        <textarea
                          id={`desc-${note.id}`}
                          className="border rounded px-2 py-1 mb-2 resize-none bg-white text-gray-800 border-gray-300"
                          value={note.description}
                          onChange={(e) => {
                            setNotesState(
                              notesState.map((n) =>
                                n.id === note.id ? { ...n, description: e.target.value } : n
                              )
                            );
                            if (updateError[note.id]) setUpdateError((prev) => ({ ...prev, [note.id]: '' }));
                          }}
                        />
                        <div className="flex gap-2 mt-auto">
                          <button
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                            onClick={() => {
                              if (note.title && note.description) {
                                setUpdateError((prev) => ({ ...prev, [note.id]: '' }));
                                handleUpdateNote(note.id, note.title, note.description);
                                setEditingId(null);
                              } else {
                                setUpdateError((prev) => ({ ...prev, [note.id]: 'Title and description are required' }));
                              }
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-700 text-gray-200 px-3 py-1 rounded hover:bg-gray-600"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest">{note.category}</div>
                        </div>
                        <div className="font-extrabold text-2xl mb-1 text-gray-900 leading-tight break-words" style={{fontFamily: 'Poppins, Nunito, Inter, sans-serif'}}>{note.title}</div>
                        <div className="text-xs text-gray-500 mb-2">{new Date((note as any).date || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                        <div className="w-full h-0.5 bg-yellow-200 opacity-60 my-2 rounded" />
                        <div className="text-base text-gray-800 mb-4 flex-1 leading-snug break-words" style={{fontFamily: 'Nunito, Inter, sans-serif'}}>{note.description}</div>
                        <div className="absolute bottom-4 right-4 flex gap-2">
                          <button
                            className="rounded-full p-2 bg-black shadow hover:bg-blue-900/40"
                            onClick={() => setEditingId(note.id)}
                            title="Edit"
                          >
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13z"></path></svg>
                          </button>
                          <button
                            className="rounded-full p-2 bg-black shadow hover:bg-red-900/40"
                            onClick={() => handleDeleteNote(note.id)}
                            title="Delete"
                          >
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
