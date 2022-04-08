import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoregistroempleadosComponent } from './dialoregistroempleados.component';

describe('DialoregistroempleadosComponent', () => {
  let component: DialoregistroempleadosComponent;
  let fixture: ComponentFixture<DialoregistroempleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialoregistroempleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoregistroempleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
