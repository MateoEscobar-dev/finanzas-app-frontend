import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class TranslationService {
  constructor(private translateService: TranslateService) {}

  instant(key: string, defaultValue: string = ""): string {
    return this.translateService.instant(key) || defaultValue;
  }

  get(key: string, defaultValue: string = ""): string {
    return this.instant(key, defaultValue);
  }
}
