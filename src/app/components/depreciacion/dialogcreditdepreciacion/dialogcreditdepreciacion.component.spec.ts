import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcreditdepreciacionComponent } from './dialogcreditdepreciacion.component';

describe('DialogcreditdepreciacionComponent', () => {
  let component: DialogcreditdepreciacionComponent;
  let fixture: ComponentFixture<DialogcreditdepreciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcreditdepreciacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcreditdepreciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
