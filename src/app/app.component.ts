import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ZoneCounterComponent } from './zone-counter/zone-counter.component';
import { SignalCounterComponent } from './signal-counter/signal-counter.component';
import { RxJsCounterComponent } from './rxjs-counter/rxjs-counter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ZoneCounterComponent, SignalCounterComponent, RxJsCounterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
