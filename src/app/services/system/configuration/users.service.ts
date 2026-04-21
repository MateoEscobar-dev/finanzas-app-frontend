import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonService } from '@/app/core/service/common.service'
import { IUser } from '@/app/interfaces/system/configuration/user.interface'

@Injectable({
  providedIn: 'root',
})
export class UserService extends CommonService<IUser> {
  constructor() {
    super('users')
  }

  getUserPermissions(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/permissions`, {
      headers: this.getHeaders(),
    })
  }

  syncUserPermissions(id: number, permissions: string[]): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiUrl}/${id}/permissions`,
        { permissions },
        { headers: this.getHeaders() }
      )
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (source) => source
      )
  }
}
