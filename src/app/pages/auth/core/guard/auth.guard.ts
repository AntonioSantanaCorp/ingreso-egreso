import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(AuthService).isAuth.pipe(
    map((state) => (!state ? router.createUrlTree(['/login']) : state))
  );
};

export const authGuardMatch: CanMatchFn = (route, state) => {
  const router = inject(Router);
  
  return inject(AuthService).isAuth.pipe(
    map((state) => (!state ? router.createUrlTree(['/login']) : state))
  );
};
