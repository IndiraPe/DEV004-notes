import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private firestore: Firestore) { }

  addNote(note: any) {
    const notesRef = collection(this.firestore, 'notes');
    return addDoc(notesRef, note);
  }
}
