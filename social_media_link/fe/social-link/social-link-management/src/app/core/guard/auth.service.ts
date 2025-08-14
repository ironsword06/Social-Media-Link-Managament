import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Store } from '@ngxs/store';
import { SetIsAuthenticated } from '../../shared/states/actions/user.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private store: Store, private router: Router) {
    this.loadToken(); 
  }

  public checkTokenValidity(): void {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const isValid = this.isTokenValid(decoded);

        if (isValid) {
          this.store.dispatch(new SetIsAuthenticated(true));
        } else {
          this.logout();
        }
      } catch (error) {
        console.error('Error decoding token', error);
        this.logout();
      }
    } else {
      this.store.dispatch(new SetIsAuthenticated(false)); 
    }
  }


  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        this.tokenSubject.next(response.token);
        this.store.dispatch(new SetIsAuthenticated(true));
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.store.dispatch(new SetIsAuthenticated(false));
    this.router.navigate(['/login'])
  }

  private verifyToken(token: string): void {
    try {
      const decoded: any = jwtDecode(token);
      const isValid = this.isTokenValid(decoded);
      this.store.dispatch(new SetIsAuthenticated(isValid));
    } catch (error) {
      console.error('Error decoding token', error);
      this.store.dispatch(new SetIsAuthenticated(false));
    }
  }

  private isTokenValid(decoded: any): boolean {
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp && decoded.exp > currentTime;
  }

  private handleError(error: any): Observable<never> {
    throw error;
  }
  getToken(): string | null {
    return this.tokenSubject.value || localStorage.getItem('token');
  }

  private loadToken(): void {
    const token = localStorage.getItem('token');
    this.tokenSubject.next(token);
  }

  getUserIdFromToken(): number {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        return Number(decoded.id);
      } catch (error) {
        console.error('Error decoding token', error);
        throw new Error('Invalid token');
      }
    }
    throw new Error('Token not found');
  }

  getUserRole(): number {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        return Number(decoded.role);
      } catch (error) {
        console.error('Error decoding token', error);
        throw new Error('Invalid token');
      }
    }
    throw new Error('Token not found');
  }
}
