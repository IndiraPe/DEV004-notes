import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';
import { Note } from 'src/app/shared/interface/notes';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit{

  @Output() noteForEdit: EventEmitter<Note>;
  arrayNotes:Array<Note>

  constructor(
    private notesService: NotesService,
    ) {
    this.arrayNotes = [];
    this.noteForEdit = new EventEmitter();
  }

  ngOnInit(): void {
    this.notesService.getNotes().subscribe({
      next: (data) => {
        const copyData = [...data]
        this.arrayNotes = copyData.sort((a:any, b:any):any => new Date(a.date) > new Date(b.date) ? -1 : new Date(a.date) < new Date(b.date) ? 1 : 0)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  editingNote(event: Event, note:Note) {
    if(note.id){
      event.stopPropagation();
      this.noteForEdit.emit(note)
      // this.notesService.getNoteByID(note.id).subscribe({
      //   next: (data) => {
      //     console.log(data);

      //     this.noteForEdit.emit(data)
      //   },
      //   error: (error) => {
      //     console.log(error);
      //   }
      // })

    }

  }

  deletingNote(note:Note) {
    this.notesService.deleteNotes(note)
      .then(() => console.log('eliminado'))
      .catch((error)=>console.log(error));
  }

}
