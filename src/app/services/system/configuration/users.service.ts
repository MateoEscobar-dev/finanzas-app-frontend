import { Injectable } from "@angular/core";
import { CommonService } from "@/app/core/service/common.service";

@Injectable({
  providedIn: "root",
})
export class UserService extends CommonService {
  constructor() {
    super("user");
  }

  setUserLanguage(userId: any, lang: string) {
    return this.http.post(`${this.apiUrl}/${userId}/language`, { lang }, { headers: this.getHeaders() });
  }
}
