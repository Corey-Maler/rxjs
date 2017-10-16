import { Observable } from '../../Observable';
import { match } from '../../operator/match';

Observable.prototype.match = match;

declare module '../../Observable' {
  interface Observable<T> {
    match: typeof match;
  }
}
