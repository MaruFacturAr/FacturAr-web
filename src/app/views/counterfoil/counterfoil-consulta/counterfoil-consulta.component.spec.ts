import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterfoilConsultaComponent } from './counterfoil-consulta.component';

describe('CounterfoilConsultaComponent', () => {
  let component: CounterfoilConsultaComponent;
  let fixture: ComponentFixture<CounterfoilConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterfoilConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterfoilConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
