import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogventasComponent } from './dialogventas.component';

describe('DialogventasComponent', () => {
  let component: DialogventasComponent;
  let fixture: ComponentFixture<DialogventasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogventasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
