import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import { log } from '../app.models';

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

  constructor(private http: HttpClient) {}

  public increment() {
    this.counter.update((c) => c + 1);
    log(this, 'increment', this.counter());
  }

  public incrementByTwo() {
    this.counter.update((c) => c + 2);
    log(this, 'increment', this.counter());
  }

  public incrementAfterTimeout() {
    setTimeout(() => {
      this.counter.update((c) => c + 1);
      log(this, 'incrementAfterTimeout', this.counter());
    }, this.delayTime);
  }

  public incrementAfterAPICall() {
    this.http
      .get('https://dummyjson.com/products/1')
      .pipe(delay(this.delayTime))
      .subscribe(() => {
        this.counter.update((c) => c + 1);
        log(this, 'incrementAfterAPICall', this.counter());
      });
  }

  public reset() {
    this.counter.set(0);
    log(this, 'reset', this.counter());
  }
}
