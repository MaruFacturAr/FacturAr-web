import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceConsultaComponent } from './invoice-consulta.component';

describe('InvoiceConsultaComponent', () => {
  let component: InvoiceConsultaComponent;
  let fixture: ComponentFixture<InvoiceConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
