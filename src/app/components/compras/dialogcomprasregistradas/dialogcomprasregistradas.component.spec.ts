import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcomprasregistradasComponent } from './dialogcomprasregistradas.component';

describe('DialogcomprasregistradasComponent', () => {
  let component: DialogcomprasregistradasComponent;
  let fixture: ComponentFixture<DialogcomprasregistradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcomprasregistradasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcomprasregistradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
