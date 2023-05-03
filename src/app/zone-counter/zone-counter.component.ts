import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
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

  private _counter!: number;
  public set counter(n: number) {
    this._counter = n;
    this.doubleCounter = n * 2;
    console.log(`[${this.COUNTER_NAME}] received new value ${n}`);
  }
  public get counter() {
    return this._counter;
  }
  public doubleCounter!: number;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.counter = 0;
  }

  public increment() {
    this.counter += 1;

    if (this.manualChangeDetectionEnabled) this.cdr.markForCheck();
  }

  public incrementByTwo() {
    this.counter += 2;

    if (this.manualChangeDetectionEnabled) this.cdr.markForCheck();
  }

  public incrementAfterTimeout() {
    setTimeout(() => {
      this.counter += 1;

      if (this.manualChangeDetectionEnabled) this.cdr.markForCheck();
    }, this.delayTime);
  }

  public incrementAfterAPICall() {
    this.http
      .get('https://dummyjson.com/products/1')
      .pipe(delay(this.delayTime))
      .subscribe(() => {
        this.counter += 1;

        if (this.manualChangeDetectionEnabled) this.cdr.markForCheck();
      });
  }

  public reset() {
    this.counter = 0;

    if (this.manualChangeDetectionEnabled) this.cdr.markForCheck();
  }

  public detectChanges() {
    this.cdr.detectChanges();
  }
}
