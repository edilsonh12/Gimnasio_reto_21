import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/servicios/login/login.service';
import { Router } from '@angular/router';

import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {


  constructor(
    private loginService: LoginService,
    private router: Router
  ){

  }

  canActivate(route: ActivatedRouteSnapshot):boolean {

    const expectedRole = route.data['expectedRole'];
    const token:any = localStorage.getItem('token');


    let decodetoken:any = {};
    decodetoken = decode(token);
    const { nombre_rol} = decodetoken;

    if(!this.loginService.isLogin() || expectedRole != nombre_rol){
      console.log('Usuario no autorizado para la vista');
      this.router.navigate(['inicio']);
      return false;
    }
    return true;
  }


}
