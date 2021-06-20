import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespointComponent } from './salespoint.component';

describe('SalespointComponent', () => {
  let component: SalespointComponent;
  let fixture: ComponentFixture<SalespointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalespointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalespointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
