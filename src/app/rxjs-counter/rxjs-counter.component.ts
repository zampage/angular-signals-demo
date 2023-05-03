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
  map,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  public doubleCounter$ = this.counter$.pipe(map((n) => n * 2));

  constructor(private http: HttpClient) {
    this.counter$
      .pipe(takeUntilDestroyed())
      .subscribe((n) =>
        console.log(`[${this.COUNTER_NAME}] received new value ${n}`)
      );
  }

  public increment() {
    this.counterIncrement$.next(1);
  }

  public incrementByTwo() {
    this.counterIncrement$.next(2);
  }

  public incrementAfterTimeout() {
    setTimeout(() => {
      this.counterIncrement$.next(1);
    }, this.delayTime);
  }

  public incrementAfterAPICall() {
    this.http
      .get('https://dummyjson.com/products/1')
      .pipe(delay(this.delayTime))
      .subscribe(() => this.counterIncrement$.next(1));
  }

  public reset() {
    this.counterReset$.next();
  }
}
