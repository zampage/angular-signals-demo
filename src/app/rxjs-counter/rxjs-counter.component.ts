import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  Subject,
  delay,
  scan,
  startWith,
  switchMap,
  take,
  shareReplay,
} from 'rxjs';
import { log } from '../app.models';

@Component({
  selector: 'app-rxjs-counter',
  standalone: true,
  imports: [JsonPipe, HttpClientModule, AsyncPipe],
  templateUrl: './rxjs-counter.component.html',
  styleUrls: ['./rxjs-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxJsCounterComponent {
  public COUNTER_NAME = 'RxJSCounter';

  public delayTime = 1000;

  public counterIncrement$ = new Subject<number>();
  public counterReset$ = new Subject<void>();
  public counter$ = this.counterReset$.pipe(
    startWith(null),
    switchMap(() =>
      this.counterIncrement$.pipe(
        startWith(0),
        scan((total, n) => total + n, 0)
      )
    ),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {}

  public increment() {
    this.counterIncrement$.next(1);
    this.counter$.pipe(take(1)).subscribe((n) => log(this, 'increment', n));
  }

  public incrementByTwo() {
    this.counterIncrement$.next(2);
    this.counter$.pipe(take(1)).subscribe((n) => log(this, 'increment', n));
  }

  public incrementAfterTimeout() {
    setTimeout(() => {
      this.counterIncrement$.next(1);
      this.counter$.pipe(take(1)).subscribe((n) => log(this, 'increment', n));
    }, this.delayTime);
  }

  public incrementAfterAPICall() {
    this.http
      .get('https://dummyjson.com/products/1')
      .pipe(delay(this.delayTime))
      .subscribe(() => {
        this.counterIncrement$.next(1);
        this.counter$.pipe(take(1)).subscribe((n) => log(this, 'increment', n));
      });
  }

  public reset() {
    this.counterReset$.next();
    this.counter$.pipe(take(1)).subscribe((n) => log(this, 'reset', n));
  }
}
