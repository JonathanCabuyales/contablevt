import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcreatecuentasComponent } from './dialogcreatecuentas.component';

describe('DialogcreatecuentasComponent', () => {
  let component: DialogcreatecuentasComponent;
  let fixture: ComponentFixture<DialogcreatecuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcreatecuentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcreatecuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
