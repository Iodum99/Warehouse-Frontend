import { CanDeactivateFn, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export const pendingChangesGuard: CanDeactivateFn<ComponentCanDeactivate> = (
  component: ComponentCanDeactivate
): Observable<boolean | UrlTree> => {
  return new Observable<boolean | UrlTree>((obs) => {
    // if there are no pending changes, just allow deactivation; else confirm first
    return component.canDeactivate()
      ? obs.next(true)
      :
        obs.next(
          confirm(
            'WARNING: You have unsaved changes. Press Cancel to go continue editing, or OK to proceed without saving.'
          )
        );
  });
};