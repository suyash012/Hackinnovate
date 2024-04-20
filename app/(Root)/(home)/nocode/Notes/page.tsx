"use client";
import React, { useState } from 'react';



interface Note {
  id: number;
  content: string;
}

const NoteApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [editId, setEditId] = useState<number | null>(null);

  const addNote = () => {
    if (!inputValue.trim()) return;
    const newNote: Note = {
      id: notes.length + 1,
      content: inputValue,
    };
    setNotes([...notes, newNote]);
    setInputValue('');
  };

  const editNote = (id: number) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setInputValue(noteToEdit.content);
      setEditId(id);
    }
  };

  const updateNote = () => {
    if (!inputValue.trim() || editId === null) return;
    const updatedNotes = notes.map((note) =>
      note.id === editId ? { ...note, content: inputValue } : note
    );
    setNotes(updatedNotes);
    setInputValue('');
    setEditId(null);
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4">Note App</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter your note"
        className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
      />
      {editId !== null ? (
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4" onClick={updateNote}>
          Update Note
        </button>
      ) : (
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4" onClick={addNote}>
          Add Note
        </button>
      )}
      <ul>
        {notes.map((note) => (
          <li key={note.id} className="flex items-center justify-between border-b border-gray-300 py-2">
            <span>{note.content}</span>
            <button className="text-blue-500 mr-2" onClick={() => editNote(note.id)}>Edit</button>
            <button className="text-red-500" onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteApp;
