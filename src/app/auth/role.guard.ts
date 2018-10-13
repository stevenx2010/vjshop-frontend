import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';
import { UserRole, Roles } from '../../models/user-role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  roles: number;

  constructor(private cs: CookieService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  	this.roles = next.data.roles;
    return this.checkRole();
  }

  checkRole() {
  	let roles = this.cs.get('roles');

  	if(Number(roles) & this.roles) return true;

  	this.router.navigate(['warning']);

  	return false;
  }
}
