import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL = "http://localhost:9000";

  constructor(
    private jwtHelper:JwtHelperService,
    private http: HttpClient
    ) { }

    iniciarSesion(from:any){
      return this.http.post(`${this.URL}/login/login`,from);
    }

   isLogin():boolean{

    const token:any = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }

    return true;
   }


   selectUsers(){

    return this.http.get(`${this.URL}/users/selectUsers`);
   }


   comparePassword(form:any){
    return this.http.post(`${this.URL}/login/comparePassword`,form);
   }


}
