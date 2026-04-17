import { Provider, inject } from '@angular/core';
import { provideAppInitializer } from '@angular/core';
import { LinkActionsLoader } from './link-actions.loader';
import { LINK_ACTIONS } from './link-actions.token';
import { LinkActionMap } from './link-actions.types';

// Defaults globales:
export function defaultLinkActionsFactory(): LinkActionMap {
  return {

  };
}

export const DEFAULT_LINK_ACTIONS_PROVIDER: Provider = {
  provide: LINK_ACTIONS,
  useFactory: defaultLinkActionsFactory,
  multi: true,
};

// Initializer para fusionar todos los LINK_ACTIONS registrados
export const linkActionsInitializer = provideAppInitializer(() => {
  inject(LinkActionsLoader).load();
});
