import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { CartService } from './cart.service';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private cartService = inject(CartService);

  private userSignal = signal<User | null>(null);
  readonly user = this.userSignal.asReadonly();
  private tokenSignal = signal<string|null>(null);
  readonly token = this.tokenSignal.asReadonly(); 

  public register(username:string, password:string){
    const newUser = {
      username: username,
      password: password
    }

    
  return this.http.post<User>(
    environment.apiUrl + "/api/v1/user/register",
    newUser,
      { observe: 'response' }
    ).pipe(
      tap(response => {
        const authHeader = response.headers.get('Authorization');
        if (authHeader?.startsWith('Bearer ')) {
          const token = authHeader.substring(7);
          this.setToken(token);
        }
      }),
      map(response => response.body as User)
    );
  } 

  public login(username: string, password: string) {
  const loginUser = { username, password };

  return this.http.post<User>(
    environment.apiUrl + "/api/v1/user/login",
    loginUser,
    { observe: 'response' }
  ).pipe(
    tap(response => {
      const authHeader = response.headers.get('Authorization');
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        this.setToken(token);
      }
    }),
    map(response => response.body as User)
  );
}

  setToken(token: string) {
  this.tokenSignal.set(token);
  sessionStorage.setItem('token', token);
}

  logout(): void {
    this.userSignal.set(null);
    this.tokenSignal.set(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this.cartService.clearCartState();
  }

  setUser(user:User){
    this.userSignal.set(user);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

   loadUserFromSession() {
    const stored = sessionStorage.getItem('user');
    if (stored) {
      try {
        const user = JSON.parse(stored) as User;
        this.userSignal.set(user);
      } catch (e) {
        console.error('Invalid session user:', e);
        sessionStorage.removeItem('user');
      }
    }
  }
  loadTokenFromSession() {
  const stored = sessionStorage.getItem('token');
  if (stored) {
    this.tokenSignal.set(stored);
  }
}
}
