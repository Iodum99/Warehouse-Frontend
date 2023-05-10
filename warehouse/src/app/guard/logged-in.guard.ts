import { inject } from "@angular/core";
import { AuthenticationService } from "../service/authentication.service";
import { Router } from "@angular/router";
import { tap } from 'rxjs';

export const authGuard = () => {

    const authService = inject(AuthenticationService)
    const router = inject(Router)
    
    return authService.isLoggedIn$.pipe(
        tap((isLoggedIn) => {
          if (!isLoggedIn) {
            router.navigate(['login']);
          }
        })
      );
}