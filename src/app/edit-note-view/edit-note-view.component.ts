import { Component, OnInit, Inject } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditNoteOpenerComponent } from '../edit-note-opener/edit-note-opener.component';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;



  constructor(private noteService: NotesService,
    private dialogRef: MatDialogRef<EditNoteOpenerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit() {
    this.note = this.noteService.getNoteById(this.data.id);
    this.errMessage = '';
  }

  onSave() {
    this.errMessage = '';
    this.noteService.editNote(this.note).subscribe((editRes) => {
      this.dialogRef.close();
    },
      (error) => {
        console.log(error);
        if (error.status === 403) {
          this.errMessage = error.error.message;
        } else {
          this.errMessage = error.message;
        }
      });

  }


}
