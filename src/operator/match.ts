
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
 *
 * @example <caption>Show different errors after validation</caption>
 * // external, library or legacy validation code
 * class NoHTTP {};
 * class NoWWW {};
 * class TooShort {
 *    constructor(actualLength) {
 *       this.actualLength = actualLength;
 *    }
 * }
 * function validate(url) {
 *    var errors = [];
 *    if (!url.match(/^http/)) {
 *        errors.push(new NoHTTP)
 *    }
 *    if (!url.match(/www/)) {
 *        errors.push(new NoWWW);
 *    }
 *    if (
 *    return errors;
 * }
 *
 * // form
 * var keyup$ = Rx.Observable.fromEvent(input, 'keyup');
 * var inputValidationErrors$ = keyup$.map(e => e.target.value).mergeMap(validate);
 *
 * var noHTTP$ = inputValidationErros$.match(TooShort);
 * noHTTP$.subscribe(err => console.log('entered url too short. Actual length is ' + err.actualLength + ', but required 10');
 *
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
