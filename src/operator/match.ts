
import { Observable } from '../Observable';
import { match as higherOrderMatch } from '../operators/match';


interface ClassType<T> {
    new (): T;
}

/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified type.
 *
 * Syntax suggar for [filter](https://github.com/ReactiveX/rxjs/blob/master/src/operator/filter.ts)
 *
 * @example <caption>Router page change switch</caption>
 * class PageList { }
 * class PageDetails {
 *    constructor(id) {
 *      this.itemId = id;
 *    }
 * }
 * var router$ = new ObservableRouter();
 * var listOpened$ = router$.match(PageList);
 * var detailsOpened$ = router$.match(PageDetails);
 * detailsOpened$.subscribe(function(pageDetails) {
 *    console.log('Details page opened with id: ', pageDetails.id);
 * });
 *
 * @param {ClassType<T>} classType A class type by which
 * instanceof checks each value emitted by the source Observable.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method match
 * @owner Observable
 */
export function match<T>(this: Observable<T>, classType: ClassType<T>,
                          thisArg?: any): Observable<T> {
  return higherOrderMatch(classType, thisArg)(this);
}
