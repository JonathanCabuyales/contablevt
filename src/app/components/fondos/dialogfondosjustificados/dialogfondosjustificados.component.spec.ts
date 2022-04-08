import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogfondosjustificadosComponent } from './dialogfondosjustificados.component';

describe('DialogfondosjustificadosComponent', () => {
  let component: DialogfondosjustificadosComponent;
  let fixture: ComponentFixture<DialogfondosjustificadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogfondosjustificadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogfondosjustificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
