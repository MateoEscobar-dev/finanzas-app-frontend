import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonService } from '@/app/core/service/common.service'
import { IRole } from '@/app/interfaces/system/configuration/role.interface'

@Injectable({
  providedIn: 'root',
})
export class RolesService extends CommonService<IRole> {
  constructor() {
    super('roles')
  }

  syncPermissions(id: number, permissions: string[]): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiUrl}/${id}/permissions`,
        { permissions },
        { headers: this.getHeaders() }
      )
      .pipe((source) => source)
  }
}
