import { Injectable } from "@angular/core";

export type LinkActionContext = {
  field: string,
  value: any,
  display?: string,
  formData?: any,
  extra?: any;
  idMovimientocxpAbono?: number;
  idMovimientocxpCargo?: number;
  idOrigenEnlace?: number;
  idMovimientoEnlace?: number;
  searchSvc?: any;
  translationService?: any;
};

type Handler = (ctx: LinkActionContext) => void | Promise<void>;

@Injectable({ providedIn: 'root' })
export class LinkActionRegistry {
  private map = new Map<string, Handler>();

  register(key: string, handler: Handler) { this.map.set(key, handler); }
  registerMany(entries: Record<string, Handler>) {
    for (const [k, h] of Object.entries(entries)) this.register(k, h);
  }
  async run(key: string, ctx: LinkActionContext) { const h = this.map.get(key); if (h) await h(ctx); }

  async runByType(key: string, type: number, ctx: LinkActionContext) {
    const typeKey = `${key}_${type}`;
    const h = this.map.get(typeKey) ?? this.map.get(key);
    if (h) await h(ctx);
  }
}
