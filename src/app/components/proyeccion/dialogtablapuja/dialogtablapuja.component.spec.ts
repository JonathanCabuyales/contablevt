import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogtablapujaComponent } from './dialogtablapuja.component';

describe('DialogtablapujaComponent', () => {
  let component: DialogtablapujaComponent;
  let fixture: ComponentFixture<DialogtablapujaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogtablapujaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogtablapujaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
