import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogasignarempleadoComponent } from './dialogasignarempleado.component';

describe('DialogasignarempleadoComponent', () => {
  let component: DialogasignarempleadoComponent;
  let fixture: ComponentFixture<DialogasignarempleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogasignarempleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogasignarempleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
