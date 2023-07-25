import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Note } from '../shared/interface/notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private firestore: Firestore) { }

  addNote(note: Note) {
    const notesRef = collection(this.firestore, 'notes');
    return addDoc(notesRef, note);
  }

  getNotes(): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef, { idField: 'id' }) as Observable<Note[]>;
  }

  deleteNotes(note: Note) {
    const noteRef = doc(this.firestore, `notes/${note.id}`);
    return deleteDoc(noteRef);
  }

  getNoteByID(id: string) {
    const noteRef = doc(this.firestore, `notes/${id}`);
    return docData(noteRef, { idField: 'id' }) as Observable<Note>;
  }

  editNote(note: Note, tittle: string, body: string) {
    const noteRef = doc(this.firestore, `notes/${note.id}`);
    return updateDoc(noteRef, {tittle: tittle, body: body, date: (new Date).toString()});
  }
}
