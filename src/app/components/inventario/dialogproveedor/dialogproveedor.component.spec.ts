import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogproveedorComponent } from './dialogproveedor.component';

describe('DialogproveedorComponent', () => {
  let component: DialogproveedorComponent;
  let fixture: ComponentFixture<DialogproveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogproveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogproveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
