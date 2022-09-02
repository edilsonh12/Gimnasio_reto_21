import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/servicios/login/login.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

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

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Para acceder a este espacio primero debes iniciar sesión.'
      }).then(response => {

        window.location.reload();

      });


      return false;
    }

    return true;
  }

}
