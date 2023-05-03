import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxJsCounterComponent } from './rxjs-counter.component';

describe('RxJsCounterComponent', () => {
  let component: RxJsCounterComponent;
  let fixture: ComponentFixture<RxJsCounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RxJsCounterComponent],
    });
    fixture = TestBed.createComponent(RxJsCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
