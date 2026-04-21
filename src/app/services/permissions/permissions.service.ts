import { Injectable } from '@angular/core'
import { CommonService } from '@/app/core/service/common.service'
import { IPermission } from '@/app/interfaces/system/configuration/permission.interface'

@Injectable({
  providedIn: 'root',
})
export class PermissionsService extends CommonService<IPermission> {
  constructor() {
    super('permissions')
  }
}
