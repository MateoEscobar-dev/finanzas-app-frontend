import { Injectable } from "@angular/core";
import { CommonService } from "@/app/core/service/common.service";

@Injectable({
  providedIn: "root",
})
export class RolesService extends CommonService {
  constructor() {
    super("roles");
  }
}
