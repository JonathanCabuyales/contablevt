import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmapadashComponent } from './emapadash.component';

describe('EmapadashComponent', () => {
  let component: EmapadashComponent;
  let fixture: ComponentFixture<EmapadashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmapadashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmapadashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
