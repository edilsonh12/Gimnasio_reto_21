import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/servicios/login/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RutasGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router:Router
  ){

  }

  canActivate():boolean {

    if(!this.loginService.isLogin()){
      this.router.navigateByUrl('incio');
      return false;
    }

    return true;
  }

}
