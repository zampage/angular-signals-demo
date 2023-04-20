import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneCounterComponent } from './zone-counter.component';

describe('ZoneCounterComponent', () => {
  let component: ZoneCounterComponent;
  let fixture: ComponentFixture<ZoneCounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ZoneCounterComponent]
    });
    fixture = TestBed.createComponent(ZoneCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
