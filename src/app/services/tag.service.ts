import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TagService {

  private tagCache$ = new BehaviorSubject<string[] | null>(null);

  constructor(private http: HttpClient) {}

  getTags() {
    if (this.tagCache$.value) return of(this.tagCache$.value);

    const API_URL = 'https://jsonplaceholder.typicode.com/users';

    return this.http.get<any[]>(API_URL).pipe(
      map(users => users.slice(0, 10).map(u => u.name)),
      tap(names => this.tagCache$.next(names)),
      catchError(_ => {
        this.tagCache$.next(null);
        return of(null); // Signal error
      })
    );
  }
}
