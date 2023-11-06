import { CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if(route.url[0]) {
    if(route.url[0].path === 'login') {
      if(authService.loggedIn()){
        router.navigate(['/'])
        return false
      }else {
        return true
      }
    }
  }

  if(authService.loggedIn()) return true

  router.navigate(['/login'])
  return false
};
