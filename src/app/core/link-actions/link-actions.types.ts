export type LinkActionContext = {
  field: string;
  value: any;
  display?: string;
  formData?: any;
  extra?: any;
  idMovimientocxpAbono?: number;
  idMovimientocxpCargo?: number;
  idOrigenEnlace?: number;
  idMovimientoEnlace?: number;
  searchSvc?: any;
  translationService?: any;
};

export type Handler = (ctx: LinkActionContext) => void | Promise<void>;
export type LinkActionMap = Record<string, Handler>;
