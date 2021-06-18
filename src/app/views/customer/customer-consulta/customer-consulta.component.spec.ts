import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerConsultaComponent } from './customer-consulta.component';

describe('CustomerConsultaComponent', () => {
  let component: CustomerConsultaComponent;
  let fixture: ComponentFixture<CustomerConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
