import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent {

  errMessage: string;
  public note: Note;

  constructor(private notesService: NotesService) {
    this.note = new Note();
  }

  addNote() {
    console.log(this.note);
    if (this.note.title === undefined || this.note.title === '' || this.note.text === undefined
      || this.note.text === '') {
      this.errMessage = 'Title and Text both are required fields';
      return;
    }

    this.errMessage = '';
    this.notesService.addNote(this.note).subscribe(data => {
    },
      error => {
        this.errMessage = error.message;
        console.log('err', error);
      });
    this.note = new Note();
  }

}
