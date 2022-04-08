import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogrolpagosusuarioComponent } from './dialogrolpagosusuario.component';

describe('DialogrolpagosusuarioComponent', () => {
  let component: DialogrolpagosusuarioComponent;
  let fixture: ComponentFixture<DialogrolpagosusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogrolpagosusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogrolpagosusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
