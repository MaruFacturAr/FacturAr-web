import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceActionComponent } from './invoice-action.component';

describe('InvoiceActionComponent', () => {
  let component: InvoiceActionComponent;
  let fixture: ComponentFixture<InvoiceActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
