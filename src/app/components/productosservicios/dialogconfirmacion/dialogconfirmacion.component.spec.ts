import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogconfirmacionComponent } from './dialogconfirmacion.component';

describe('DialogconfirmacionComponent', () => {
  let component: DialogconfirmacionComponent;
  let fixture: ComponentFixture<DialogconfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogconfirmacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogconfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
