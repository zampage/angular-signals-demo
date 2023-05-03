import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';

@Component({
  selector: 'app-signal-counter',
  standalone: true,
  imports: [JsonPipe, HttpClientModule],
  templateUrl: './signal-counter.component.html',
  styleUrls: ['./signal-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalCounterComponent {
  public COUNTER_NAME = 'SignalCounter';

  public delayTime = 1000;

  public counter = signal<number>(0);
  public doubleCounter = computed(() => this.counter() * 2);

  constructor(private http: HttpClient) {
    effect(() =>
      console.log(`[${this.COUNTER_NAME}] received new value ${this.counter()}`)
    );
  }

  public increment() {
    this.counter.update((c) => c + 1);
  }

  public incrementByTwo() {
    this.counter.update((c) => c + 2);
  }

  public incrementAfterTimeout() {
    setTimeout(() => {
      this.counter.update((c) => c + 1);
    }, this.delayTime);
  }

  public incrementAfterAPICall() {
    this.http
      .get('https://dummyjson.com/products/1')
      .pipe(delay(this.delayTime))
      .subscribe(() => this.counter.update((c) => c + 1));
  }

  public reset() {
    this.counter.set(0);
  }
}
