import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherConsultaComponent } from './voucher-consulta.component';

describe('VoucherConsultaComponent', () => {
  let component: VoucherConsultaComponent;
  let fixture: ComponentFixture<VoucherConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
