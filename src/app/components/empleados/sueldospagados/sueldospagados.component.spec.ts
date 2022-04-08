import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SueldospagadosComponent } from './sueldospagados.component';

describe('SueldospagadosComponent', () => {
  let component: SueldospagadosComponent;
  let fixture: ComponentFixture<SueldospagadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SueldospagadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SueldospagadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
