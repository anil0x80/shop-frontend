import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { UserResponse } from '../models/user.response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)

  private userSignal = signal<UserResponse | null>(null);
  readonly user = this.userSignal.asReadonly();

  public register(username:string, password:string){
    const newUser = {
      username: username,
      password: password
    }

    return this.http.post<UserResponse>(environment.apiUrl,newUser);
  } 

  logout(): void {
    this.userSignal.set(null);
  }

  setUser(user:UserResponse){
    this.userSignal.set(user);
  }

}
