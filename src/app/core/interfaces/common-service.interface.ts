import { Condicion } from "@/app/interfaces/sistema/condicion";
import { Observable } from "rxjs";

export interface ICommonService<T, TKey, TNew, TUpdate> {
  insert(data: T): Observable<IInsertResult<T>>;
  update(id: TKey, data: T): Observable<T>;
  delete(id: TKey): Observable<T>;
  getById<TT = T>(id: TKey): Observable<TT>;
  getAll<TT = T>(options?: IOptionsCommonService): Observable<TT[]>;
  search<TT = T>(conditions: Condicion[], options?: IOptionsCommonService): Observable<TT[]>;
  count(conditions?: Condicion[]): Observable<{ count: number }>;
  setSkipSpinner(skipSpinner: boolean): void;
}

export interface IInsertResult<T> {
  success: boolean;
  mensaje: { info: string; id: any };
  data?: T;
}

export interface ISortItem {
  selector: string;
  desc: boolean;
}
export interface IOptionsCommonService extends IOptionsConfigCommonService {
  take?: number;
  skip?: number;
  sort?: ISortItem[];
}

export interface IOptionsConfigCommonService {
  skipSpinner?: boolean;
}
