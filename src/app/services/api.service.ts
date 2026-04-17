import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  private getHeaders(): HttpHeaders {
    //const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // if (token) {
    //   headers = headers.set('Authorization', `Bearer ${token}`);
    // }

    return headers;
  }

  get<T>(endpoint: string, options?: { params?: Record<string, any> }): Observable<T> {
    let httpParams = new HttpParams();

    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          httpParams = httpParams.set(key, value);
        }
      });
    }

    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getHeaders(),
      params: httpParams,
    });
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.getHeaders(),
    }).pipe(catchError((error) => this.handleError(error)));
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.getHeaders(),
    }).pipe(catchError((error) => this.handleError(error)));
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getHeaders(),
    }).pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (!navigator.onLine || error.status === 0) {
      this.toastr.error('Revise su conexión a internet', 'Error de red');
      return throwError(() => new Error(errorMessage));
    }else if (error.error instanceof ErrorEvent) {
      errorMessage = `Error de cliente: ${error.error.message}`;
    } else {
      errorMessage = `Error ${error.status}: ${error.message}`;
    }
    if(errorMessage == "Error undefined: undefined"){
      this.toastr.error('Error al procesar la solicitud', 'Error de servidor');
      return throwError(() => new Error(errorMessage));
    }

    this.toastr.error(`${errorMessage}`, 'Error al procesar la solicitud');
    return throwError(() => new Error(errorMessage));
  }
}
