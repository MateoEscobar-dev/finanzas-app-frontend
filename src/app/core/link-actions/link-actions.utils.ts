import { inject } from '@angular/core';
import { LinkActionRegistry, LinkActionContext } from '@/app/core/link-actions/link-actions.registry';

/**
 * Ejecuta una acción de link global, usando el injector de Angular.
 * Debe llamarse dentro de un contexto de inyección (por ejemplo, dentro de un método de instancia de un componente o servicio).
 */
export function runLinkAction(key: string, ctx: LinkActionContext, registry?: LinkActionRegistry) {
  // Permite inyectar manualmente el registry para test o casos especiales
  const linkActions = registry ?? inject(LinkActionRegistry);
  return linkActions.run(key, ctx);
}
