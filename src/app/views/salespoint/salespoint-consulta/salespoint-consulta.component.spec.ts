import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespointConsultaComponent } from './salespoint-consulta.component';

describe('SalespointConsultaComponent', () => {
  let component: SalespointConsultaComponent;
  let fixture: ComponentFixture<SalespointConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalespointConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalespointConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
