import { environment } from "@/environments/environment";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpContext, HttpParams } from "@angular/common/http";
import { inject, Injectable, Inject } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { ICommonService, IInsertResult, IOptionsCommonService, IOptionsConfigCommonService } from "../interfaces/common-service.interface";
import { SKIP_SPINNER } from "@/app/services/spinner.context";
import { Condicion } from "@/app/interfaces/sistema/condicion";

@Injectable({
  providedIn: "root",
})
export class CommonService<T = any, TKey = number, TNew = any, TUpdate = any> implements ICommonService<T, TKey, TNew, TUpdate> {
  constructor(@Inject("urlBase") urlBase: string) {
    this.urlBase = urlBase;
    this.apiUrl = `${this.urlserver}/${this.urlBase}`;
  }
  protected urlserver: string = environment.apiUrl;
  protected urlBase: string = "";
  protected apiUrl: string = `${this.urlserver}/${this.urlBase}`;
  protected http = inject(HttpClient);
  protected skipSpinner: boolean = false;

  // Headers comunes
  protected getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      // 'Authorization': 'Bearer ' + localStorage.getItem('token') // Si necesitas autenticación
    });
  }

  setSkipSpinner(skipSpinner: boolean) {
    this.skipSpinner = skipSpinner;
  }

  getById<TT = T>(id: TKey): Observable<TT> {
    return this.http.get<TT>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
      context: new HttpContext().set(SKIP_SPINNER, this.skipSpinner),
    });
  }

  getAll<TT = T>(options?: IOptionsCommonService): Observable<TT[]> {
    let httpParams: HttpParams = new HttpParams();

    if (options?.take !== undefined) {
      httpParams = httpParams.set("take", options.take.toString());
    }
    if (options?.skip !== undefined) {
      httpParams = httpParams.set("skip", options.skip.toString());
    }
    if (options?.sort && options.sort.length > 0) {
      httpParams = httpParams.set("sort", encodeURIComponent(JSON.stringify(options.sort)));
    }

    const url = this.apiUrl;

    return this.http.get<TT[]>(url, {
      headers: this.getHeaders(),
      context: new HttpContext().set(SKIP_SPINNER, this.skipSpinner),
      params: httpParams,
    });
  }

  search<TT = T>(conditions: Condicion[], options?: IOptionsCommonService): Observable<TT[]> {
    const stringConditions = encodeURIComponent(JSON.stringify(conditions));
    let httpParams: HttpParams = new HttpParams().set("condiciones", stringConditions);

    if (options?.take !== undefined) {
      httpParams = httpParams.set("take", options.take.toString());
    }
    if (options?.skip !== undefined) {
      httpParams = httpParams.set("skip", options.skip.toString());
    }

    if (options?.sort && options.sort.length > 0) {
      httpParams = httpParams.set("sort", encodeURIComponent(JSON.stringify(options.sort)));
    }

    const url = `${this.apiUrl}/search`;

    return this.http.get<TT[]>(url, {
      headers: this.getHeaders(),
      context: new HttpContext().set(SKIP_SPINNER, this.skipSpinner),
      params: httpParams,
    });
  }

  insert(data: T): Observable<IInsertResult<T>> {
    return this.http
      .post<IInsertResult<T>>(this.apiUrl, data, {
        headers: this.getHeaders(),
      })
      .pipe(catchError((error) => this.handleError(error)));
  }

  delete(id: TKey): Observable<T> {
    return this.http
      .delete<T>(`${this.apiUrl}/${id}`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError((error) => this.handleError(error)));
  }

  update(id: TKey, data: T): Observable<T> {
    return this.http
      .put<T>(`${this.apiUrl}/${id}`, data, {
        headers: this.getHeaders(),
      })
      .pipe(catchError((error) => this.handleError(error)));
  }

  count(conditions?: Condicion[], options?: IOptionsConfigCommonService): Observable<{ count: number }> {
    let params: HttpParams = new HttpParams();
    if (conditions && conditions.length > 0) {
      const stringConditions = encodeURIComponent(JSON.stringify(conditions));
      params = params.set("condiciones", stringConditions);
    }
    return this.http.get<{ count: number }>(`${this.apiUrl}/count`, {
      headers: this.getHeaders(),
      params: params,
      context: new HttpContext().set(SKIP_SPINNER, options?.skipSpinner ?? this.skipSpinner),
    });
  }

  getNextId(): Observable<{ nextId: number }> {
    return this.http.get<{ nextId: number }>(`${this.apiUrl}/getNextId`, {
      headers: this.getHeaders(),
    });
  }

  // Manejo de errores
  protected handleError(error: HttpErrorResponse | string | any) {
    let errorMessage = "Algo salió mal";
    console.log("objeto error tipo", typeof error);
    console.log("objeto error", error);

    if (typeof error === "string") {
      // Si el error ya es un string, usarlo directamente
      errorMessage = error;
    } else if (error instanceof HttpErrorResponse) {
      // Error HTTP estándar
      if (error.error instanceof ErrorEvent) {
        // Error del cliente
        errorMessage = `Error del cliente: ${error.error.message}`;
      } else {
        // Error del servidor
        if (error.error && typeof error.error === "object") {
          console.log("error: ", error.error);
          // Si el servidor devuelve un objeto con mensaje
          if (error.error.mensaje) {
            errorMessage = error.error.mensaje?.error || error.error.mensaje?.error2 || error.error.mensaje?.info || "Error desconocido";
          } else if (error.error.message) {
            errorMessage = error.error.message;
          } else if (error.error.error) {
            errorMessage = error.error.error;
          } else if (error.error.detail) {
            errorMessage = error.error.detail;
          } else {
            errorMessage = `Error del servidor: ${error.status} - ${error.statusText}`;
          }
        } else if (error.error && typeof error.error === "string") {
          // Si el servidor devuelve un string
          errorMessage = error.error;
        } else {
          // Si no hay error.error o está vacío, usar el mensaje por defecto
          errorMessage = `Error del servidor: ${error.status} - ${error.statusText || error.message}`;
        }
      }
    } else {
      // Otro tipo de error
      errorMessage = error?.message || error?.toString() || "Error desconocido";
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Activar un registro (genérico para todos los módulos)
   * POST /api/{entity}/{id}/activate
   */
  activate(id: TKey): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/${id}/activate`, {}, {
        headers: this.getHeaders(),
      })
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Desactivar un registro (genérico para todos los módulos)
   * POST /api/{entity}/{id}/deactivate
   */
  deactivate(id: TKey): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/${id}/deactivate`, {}, {
        headers: this.getHeaders(),
      })
      .pipe(catchError((error) => this.handleError(error)));
  }
}
