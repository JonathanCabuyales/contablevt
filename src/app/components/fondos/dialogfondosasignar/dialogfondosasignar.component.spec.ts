import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogfondosasignarComponent } from './dialogfondosasignar.component';

describe('DialogfondosasignarComponent', () => {
  let component: DialogfondosasignarComponent;
  let fixture: ComponentFixture<DialogfondosasignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogfondosasignarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogfondosasignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
