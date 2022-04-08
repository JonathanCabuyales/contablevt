import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogfondosjustificarComponent } from './dialogfondosjustificar.component';

describe('DialogfondosjustificarComponent', () => {
  let component: DialogfondosjustificarComponent;
  let fixture: ComponentFixture<DialogfondosjustificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogfondosjustificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogfondosjustificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
