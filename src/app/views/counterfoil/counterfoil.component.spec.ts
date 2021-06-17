import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterfoilComponent } from './counterfoil.component';

describe('CounterfoilComponent', () => {
  let component: CounterfoilComponent;
  let fixture: ComponentFixture<CounterfoilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterfoilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterfoilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
