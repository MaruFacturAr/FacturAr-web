import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioMoaNoDelegadoComponent } from './servicio-moa-no-delegado.component';

describe('ServicioMoaNoDelegadoComponent', () => {
  let component: ServicioMoaNoDelegadoComponent;
  let fixture: ComponentFixture<ServicioMoaNoDelegadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioMoaNoDelegadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioMoaNoDelegadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
