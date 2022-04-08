import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogdepreciacionComponent } from './dialogdepreciacion.component';

describe('DialogdepreciacionComponent', () => {
  let component: DialogdepreciacionComponent;
  let fixture: ComponentFixture<DialogdepreciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogdepreciacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogdepreciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
