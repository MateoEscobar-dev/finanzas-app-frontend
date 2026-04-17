import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable, finalize } from "rxjs";
import { SpinnerService } from "../services/spinner.service";
import { SKIP_SPINNER } from "../services/spinner.context";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Verificar si se debe omitir el spinner
    const skipSpinner = req.context.get(SKIP_SPINNER);

    if (!skipSpinner) {
      this.spinnerService.show();
    }

    return next.handle(req).pipe(
      finalize(() => {
        if (!skipSpinner) {
          this.spinnerService.hide();
        }
      })
    );
  }
}
