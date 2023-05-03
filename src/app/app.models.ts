import { RxJsCounterComponent } from './rxjs-counter/rxjs-counter.component';
import { SignalCounterComponent } from './signal-counter/signal-counter.component';
import { ZoneCounterComponent } from './zone-counter/zone-counter.component';

export const log = (
  counter: ZoneCounterComponent | SignalCounterComponent | RxJsCounterComponent,
  by: string,
  num: number
) => {
  console.log(`[${counter.COUNTER_NAME}] changed by "${by}" to ${num}`);
};
