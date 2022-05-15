import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmaximumcomprasComponent } from './dialogmaximumcompras.component';

describe('DialogmaximumcomprasComponent', () => {
  let component: DialogmaximumcomprasComponent;
  let fixture: ComponentFixture<DialogmaximumcomprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogmaximumcomprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogmaximumcomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
