import { inject } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

export const hasRoleGuard = () => {

    const authService = inject(AuthenticationService)
    const router = inject(Router)
    const route = inject(ActivatedRoute)

    const isAuthorized = authService.loggedUser?.role === route.snapshot.data["role"]

    if(!isAuthorized){       
      router.navigate(['/access/forbidden'])
    }
  
    return isAuthorized
}