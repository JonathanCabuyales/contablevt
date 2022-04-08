import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogfondosjustificacionComponent } from './dialogfondosjustificacion.component';

describe('DialogfondosjustificacionComponent', () => {
  let component: DialogfondosjustificacionComponent;
  let fixture: ComponentFixture<DialogfondosjustificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogfondosjustificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogfondosjustificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
