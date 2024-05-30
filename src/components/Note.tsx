import React, { useState } from 'react';
import '../styles/Note.css';

const Note: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [currentNote, setCurrentNote] = useState<string>('');

  const handleSaveNote = () => {
    if (currentNote.trim() !== '') {
      setNotes([...notes, currentNote]);
      setCurrentNote('');
    }
  };

  const handleDeleteNote = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div className='noteContainer'>
      <h2>Add Note</h2>
      <textarea value={currentNote} onChange={(e) => setCurrentNote(e.target.value)} />
      <button onClick={handleSaveNote} disabled={currentNote.trim() === ''}>Save</button>
      <h2>Notes</h2>
      <ul>
        {notes.map((note, index) => (
          <li id='notes' key={index}>
            {note}
            <button onClick={() => handleDeleteNote(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Note;
