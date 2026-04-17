import { InjectionToken } from '@angular/core';
import { LinkActionMap } from './link-actions.types';

export const LINK_ACTIONS = new InjectionToken<LinkActionMap[]>('LINK_ACTIONS', {
  factory: () => [],
  providedIn: 'root',
});
