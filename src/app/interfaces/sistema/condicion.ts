/**
 * Enum que define los operadores de SQL Server más usados en cláusulas WHERE
 */
export enum OperadorSQL {
  /**
   * Igual a
   */
  Equal = "Equal",

  /**
   * Diferente de
   */
  NotEqual = "NotEqual",

  /**
   * Mayor que
   */
  GreaterThan = "GreaterThan",

  /**
   * Menor que
   */
  LessThan = "LessThan",

  /**
   * Mayor o igual que
   */
  GreaterThanOrEqual = "GreaterThanOrEqual",

  /**
   * Menor o igual que
   */
  LessThanOrEqual = "LessThanOrEqual",

  /**
   * LIKE para búsquedas con patrones
   */
  Like = "Like",

  /**
   * IN para listas de valores
   */
  In = "In",

  /**
   * NOT IN para exclusiones de listas
   */
  NotIn = "NotIn",

  /**
   * BETWEEN para rangos
   */
  Between = "Between",

  /**
   * IS NULL para valores nulos
   */
  IsNull = "IsNull",

  /**
   * IS NOT NULL para valores no nulos
   */
  IsNotNull = "IsNotNull",

  /**
   * NOT LIKE para búsquedas con patrones
   */
  NotLike = "NotLike",

  /**
   * START WITH para búsquedas con patrones
   */
  StartsWith = "StartsWith",

  /**
   * END WITH para búsquedas con patrones
   */
  EndsWith = "EndsWith",

  /**
   * AND para condiciones AND
   */
  And = "And",

  /**
   * OR para condiciones OR
   */
  Or = "Or",
}

export interface Condicion {
  campo?: string;
  valor?: any;
  operador: OperadorSQL;
  condiciones?: Condicion[];
}
