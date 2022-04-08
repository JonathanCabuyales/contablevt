import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogreconexionesComponent } from './dialogreconexiones.component';

describe('DialogreconexionesComponent', () => {
  let component: DialogreconexionesComponent;
  let fixture: ComponentFixture<DialogreconexionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogreconexionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogreconexionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
