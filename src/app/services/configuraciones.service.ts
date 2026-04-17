import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConfiguracionesService {
  public nombreVentana = new BehaviorSubject<string>("");
  public presionaTab = new BehaviorSubject<boolean>(false);
  public usuarioActivo = new BehaviorSubject<string>("");
  public menuIdSistema = new BehaviorSubject<number>(0);
  public menuIdSistemaPantalla = new BehaviorSubject<number>(0);
  public menuNombre = new BehaviorSubject<string>("");
  public menuKeyMap = new Map<string, { menuIdSistema: number, menuIdSistemaPantalla: number, menuNombre: string }>();
  public readonly SYSTEMS_KEY = "erp_systems";

  public activeComponent = new BehaviorSubject<any | null>(null);

  // menu
  private reloadMenuSource = new Subject<void>();
  reloadMenu$ = this.reloadMenuSource.asObservable();

  constructor() { }

  reloadMenu() {
    this.reloadMenuSource.next();
  }

  setMenuKey(key: string, menuIdSistema: number, menuIdSistemaPantalla: number, menuNombre: string) {
    this.menuKeyMap.set(key, { menuIdSistema, menuIdSistemaPantalla, menuNombre });
    // Guardar el mapa en localStorage
    const obj = Object.fromEntries(this.menuKeyMap.entries());
    localStorage.setItem(this.SYSTEMS_KEY, JSON.stringify(obj));
  }

  getMenuKey(key: string) {
    return this.menuKeyMap.get(key);
  }
}
