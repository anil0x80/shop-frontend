import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private http = inject(HttpClient)
  register(username:string, password:string){
    const newUser = {
      username: username,
      password: password
    }
    this.http.post("http://localhost:8080/api/v1/user/create",newUser).subscribe(response=>{
      console.log(response);
    });
  }
}
