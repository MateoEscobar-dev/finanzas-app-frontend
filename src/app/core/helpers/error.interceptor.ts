import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

import { AuthenticationService } from "../service/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<Request>, next: HttpHandler): Observable<HttpEvent<Event>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // Verificar si estamos en la ruta de login
          const isLoginRoute = this.router.url.includes('/login') || this.router.url.includes('/auth');
          if (!isLoginRoute) {
            // Si NO estamos en login, hacer logout y redirigir
            this.authenticationService.logout();
            this.router.navigate(['/login']);
          }
          // Si estamos en login, solo dejar que el error se propague
        }

        // Preservar el objeto HttpErrorResponse completo en lugar de solo el mensaje
        return throwError(() => err);
      })
    );
  }
}
