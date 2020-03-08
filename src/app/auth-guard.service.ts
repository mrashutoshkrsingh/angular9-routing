import { CanActivate, RouterStateSnapshot, Router, ActivatedRouteSnapshot, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{

    constructor(private authService: AuthService, private router: Router){
    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{
        return this.authService.isAuthenticated().then((authenticated: boolean)=>{
            if(authenticated)
            return true;
            else{
                this.router.navigate(['/'])
            }
        })
    }

    canActivateChild(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{
        return this.authService.isAuthenticated().then((authenticated: boolean)=>{
            if(authenticated)
            return true;
            else{
                this.router.navigate(['/'])
            }
        })
    }
}