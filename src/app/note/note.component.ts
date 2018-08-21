import { Component } from '@angular/core';
import { Note } from '../note';
import { Input } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input()
  note: Note;

  constructor(private routerService: RouterService) {
    this.note = new Note();
  }

  edit() {
    console.log('note', this.note);
    this.routerService.routeToEditNoteView(this.note.id);
  }


}
