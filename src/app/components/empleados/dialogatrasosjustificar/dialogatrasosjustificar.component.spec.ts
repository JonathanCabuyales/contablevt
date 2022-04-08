import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogatrasosjustificarComponent } from './dialogatrasosjustificar.component';

describe('DialogatrasosjustificarComponent', () => {
  let component: DialogatrasosjustificarComponent;
  let fixture: ComponentFixture<DialogatrasosjustificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogatrasosjustificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogatrasosjustificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
