import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import { log } from '../app.models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-zone-counter',
  standalone: true,
  imports: [JsonPipe, HttpClientModule, FormsModule],
  templateUrl: './zone-counter.component.html',
  styleUrls: ['./zone-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoneCounterComponent {
  public COUNTER_NAME = 'ZoneCounter';

  public delayTime = 1000;

  public manualChangeDetectionEnabled: boolean = false;

  public counter: number = 0;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  public increment() {
    this.counter += 1;
    log(this, 'increment', this.counter);

    if (this.manualChangeDetectionEnabled) this.cdr.markForCheck();
  }

  public incrementByTwo() {
    this.counter += 2;
    log(this, 'increment', this.counter);

    if (this.manualChangeDetectionEnabled) this.cdr.markForCheck();
  }

  public incrementAfterTimeout() {
    setTimeout(() => {
      this.counter += 1;
      log(this, 'incrementAfterTimeout', this.counter);

      if (this.manualChangeDetectionEnabled) this.cdr.markForCheck();
    }, this.delayTime);
  }

  public incrementAfterAPICall() {
    this.http
      .get('https://dummyjson.com/products/1')
      .pipe(delay(this.delayTime))
      .subscribe(() => {
        this.counter += 1;
        log(this, 'incrementAfterAPICall', this.counter);

        if (this.manualChangeDetectionEnabled) this.cdr.markForCheck();
      });
  }

  public reset() {
    this.counter = 0;
    log(this, 'reset', this.counter);

    if (this.manualChangeDetectionEnabled) this.cdr.markForCheck();
  }

  public detectChanges() {
    this.cdr.detectChanges();
  }
}
