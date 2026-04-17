import { Injectable } from "@angular/core";
import { CommonService } from "@/app/core/service/common.service";

@Injectable({
  providedIn: "root",
})
export class ServerEnvironmentService extends CommonService {
  constructor() {
    super("server-environment");
  }
}
