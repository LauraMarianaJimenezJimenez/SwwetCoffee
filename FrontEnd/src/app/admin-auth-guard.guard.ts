import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardGuard implements CanActivate {
  canActivate() {
    var admin = localStorage.getItem('admin');
    if(!admin)
    {
      return false;
    }
    return true;
  }
  
}
