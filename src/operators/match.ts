import { Operator } from '../Operator';
import { Subscriber } from '../Subscriber';
import { Observable } from '../Observable';
import { TeardownLogic } from '../Subscription';
import { OperatorFunction, MonoTypeOperatorFunction } from '../interfaces';


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
export function match<T>(classType: ClassType<T>,
                          thisArg?: any): MonoTypeOperatorFunction<T> {
  return function matchOperatorFunction(source: Observable<T>): Observable<T> {
    return source.lift(new MatchOperator(classType, thisArg));
  };
}

class MatchOperator<T> implements Operator<T, T> {
  constructor(private classType: ClassType<T>,
              private thisArg?: any) {
  }

  call(subscriber: Subscriber<T>, source: any): TeardownLogic {
    return source.subscribe(new MatchSubscriber(subscriber, this.classType, this.thisArg));
  }
}

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class MatchSubscriber<T> extends Subscriber<T> {
  constructor(destination: Subscriber<T>,
              private classType: ClassType<T>,
              private thisArg: any) {
    super(destination);
  }

  // the try catch block below is left specifically for
  // optimization and perf reasons. a tryCatcher is not necessary here.
  protected _next(value: T) {
    let result: any;
    try {
      result = value instanceof this.classType;
    } catch (err) {
      this.destination.error(err);
      return;
    }
    if (result) {
      this.destination.next(value);
    }
  }
}
