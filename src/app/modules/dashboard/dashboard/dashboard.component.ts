import { Component } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';
import { Note } from 'src/app/shared/interface/notes';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  noteForm: FormGroup;
  nameUser:string;
  note:Note;
  statusNoteTittle:boolean;
  statusNoteBody:boolean;
  statusButtonSave:boolean;
  statusButtonEdit:boolean;
  onePost:Note;

  constructor(
    private notesService: NotesService,
    private fb: FormBuilder,
    ) {
    this.noteForm = this.fb.group({
      tittle : ['', [Validators.required]],
      body : ['', [Validators.required]]
    });

    this.nameUser = this.getNameUser()
    this.note = {tittle: '', body: '', user: '', uid: '', date: ''}
    this.onePost = {tittle: '', body: '', user: '', uid: '', date: '', id: ''}
    this.statusNoteTittle = false;
    this.statusNoteBody = false;
    this.statusButtonSave = true;
    this.statusButtonEdit = false;

  }

  getNameUser():string{
    const nameUserLS = localStorage.getItem('email') as string;
    const nameSymbol = nameUserLS.search('@');
    return nameUserLS.slice(0, nameSymbol);
  }

  onNoteForEdit($event:Note) {
    this.noteForm.reset()
    this.noteForm.patchValue({
      tittle: $event.tittle,
      body: $event.body
    });
    this.onePost = $event;
    this.statusButtonSave = false;
    this.statusButtonEdit = true;

  }

  saveNote() {
    this.note = {
      tittle: this.note.tittle,
      body: this.note.body,
      user: localStorage.getItem('email') as string,
      uid: localStorage.getItem('uid') as string,
      date: new Date().toString()
    }
    if(this.note.tittle === '' && this.note.body === ''){
      this.statusNoteTittle = true;
      this.statusNoteBody = true;
    }else if(this.note.tittle === ''){
      this.statusNoteTittle = true;
    }else if(this.note.body === ''){
      this.statusNoteBody = true;
    }else{
      this.notesService.addNote(this.note)
      .then(() => this.noteForm.reset())
      .catch((error)=>console.log(error));
    }

  }

  editPost(event:Event) {
    event.preventDefault()
    const bodyNote = {
      tittle: this.note.tittle,
      body: this.note.body,
    }
    if(this.note.tittle === '' && this.note.body === ''){
      this.statusNoteTittle = true;
      this.statusNoteBody = true;
    }else if(this.note.tittle === ''){
      this.statusNoteTittle = true;
    }else if(this.note.body === ''){
      this.statusNoteBody = true;
    }else{
      this.notesService.editNote(this.onePost, bodyNote.tittle, bodyNote.body )
      .then(() => {
        this.noteForm.reset()
        this.statusButtonSave = true;
        this.statusButtonEdit = false;
      })
      .catch((error)=>console.log(error));
    }
  }

  cancelTheEdition() {
    this.noteForm.reset()
    this.statusButtonSave = true;
    this.statusButtonEdit = false;
  }

}
