import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogempleadosventasComponent } from './dialogempleadosventas.component';

describe('DialogempleadosventasComponent', () => {
  let component: DialogempleadosventasComponent;
  let fixture: ComponentFixture<DialogempleadosventasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogempleadosventasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogempleadosventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
