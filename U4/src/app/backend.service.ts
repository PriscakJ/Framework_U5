import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  login(email: string, password: string): Observable<{ Token: string } | { error: string }> {
    return this.http.post<{ Token?: string, error?: string }>('http://localhost:3000/login', { email, password }, this.httpOptions)
      .pipe(
        map(response => {
          if (response.Token) {
            this.token = response.Token;
            localStorage.setItem('authToken', this.token);
            return { Token: response.Token };
          } else {
            return { error: response.error || 'Invalid credentials' };
          }
        }),
        catchError(this.handleError<{ Token: string } | { error: string }>('login'))
      );
  }

  update(score: any): Observable<any> {
    const token = this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? token : ''
      })
    };
    return this.http.put('http://localhost:3000/highscores/1', { score }, httpOptions)
      .pipe(
        tap(response => console.log('Highscore updated:', response)),
        catchError(this.handleError<any>('update'))
      );
  }

  private getToken(): string | null {
    return this.token || localStorage.getItem('authToken');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
