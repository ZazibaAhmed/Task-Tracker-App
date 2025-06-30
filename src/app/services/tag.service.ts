import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TagService {

// Cache for tag names fetched from the API. Prevents repeated network requests.
  private tagCache$ = new BehaviorSubject<string[] | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * Fetches tag names (user names) from JSONPlaceholder API.
   * Returns cached tags if already loaded.
   * On error, caches null and returns null observable so UI can show fallback message.
   */
  getTags() {
    // If tags are already cached, return them as observable.
    if (this.tagCache$.value) return of(this.tagCache$.value);

    const API_URL = 'https://jsonplaceholder.typicode.com/users';

    return this.http.get<any[]>(API_URL).pipe(
      // Take first 10 users, extract the 'name' field for tags.
      map(users => users.slice(0, 10).map(u => u.name)),
      // Cache the fetched tag names for future calls.
      tap(names => this.tagCache$.next(names)),
      // On API error, cache null and return observable with null for UI fallback.
      catchError(_ => {
        this.tagCache$.next(null);
        return of(null); // Signal error to UI
      })
    );
  }
}
