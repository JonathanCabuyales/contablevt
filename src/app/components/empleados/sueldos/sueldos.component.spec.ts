import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SueldosComponent } from './sueldos.component';

describe('SueldosComponent', () => {
  let component: SueldosComponent;
  let fixture: ComponentFixture<SueldosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SueldosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SueldosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
