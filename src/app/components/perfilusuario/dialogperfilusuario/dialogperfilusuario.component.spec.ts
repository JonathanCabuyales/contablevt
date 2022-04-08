import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogperfilusuarioComponent } from './dialogperfilusuario.component';

describe('DialogperfilusuarioComponent', () => {
  let component: DialogperfilusuarioComponent;
  let fixture: ComponentFixture<DialogperfilusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogperfilusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogperfilusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
