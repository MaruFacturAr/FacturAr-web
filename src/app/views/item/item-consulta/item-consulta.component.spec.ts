import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemConsultaComponent } from './item-consulta.component';

describe('ItemConsultaComponent', () => {
  let component: ItemConsultaComponent;
  let fixture: ComponentFixture<ItemConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
