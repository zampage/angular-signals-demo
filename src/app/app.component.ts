import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ZoneCounterComponent } from './zone-counter/zone-counter.component';
import { SignalCounterComponent } from './signal-counter/signal-counter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ZoneCounterComponent, SignalCounterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
