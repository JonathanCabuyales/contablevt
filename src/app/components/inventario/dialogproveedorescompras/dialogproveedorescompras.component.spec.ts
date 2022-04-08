import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogproveedorescomprasComponent } from './dialogproveedorescompras.component';

describe('DialogproveedorescomprasComponent', () => {
  let component: DialogproveedorescomprasComponent;
  let fixture: ComponentFixture<DialogproveedorescomprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogproveedorescomprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogproveedorescomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
