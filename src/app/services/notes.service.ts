import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  constructor(private httpClient: HttpClient,
    private authService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject([]);

  }

  fetchNotesFromServer() {
    const token = this.authService.getBearerToken();
    this.httpClient.get<Note[]>('http://localhost:3000/api/v1/notes', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).subscribe(resp => {
      this.notes = resp;
      this.notesSubject.next(this.notes);
    });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    const token = this.authService.getBearerToken();
    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).pipe(
      tap(res => {
        this.notes.push(res);
        this.notesSubject.next(this.notes);
      })
    );
  }

  editNote(note: Note): Observable<Note> {
    const token = this.authService.getBearerToken();
    return this.httpClient.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).pipe(
      tap(res => {
        const enote = this.notes.find(n => n.id === res.id);
        Object.assign(enote, res);
        this.notesSubject.next(this.notes);
      })
    );
  }

  getNoteById(noteId): Note {
    return this.notes.find(note => note.id === parseInt(noteId, 10));
  }
}
