import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialognuevomedidorComponent } from './dialognuevomedidor.component';

describe('DialognuevomedidorComponent', () => {
  let component: DialognuevomedidorComponent;
  let fixture: ComponentFixture<DialognuevomedidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialognuevomedidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialognuevomedidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
