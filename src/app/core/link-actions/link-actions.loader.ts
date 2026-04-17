import { Inject, Injectable } from '@angular/core';
import { LinkActionRegistry } from './link-actions.registry';
import { LINK_ACTIONS } from './link-actions.token';
import { LinkActionMap } from './link-actions.types';

@Injectable({ providedIn: 'root' })
export class LinkActionsLoader {
  constructor(
    private registry: LinkActionRegistry,
    @Inject(LINK_ACTIONS) private maps: LinkActionMap[],
  ) { }

  load(): void {
    for (const m of this.maps) this.registry.registerMany(m);
  }
}
