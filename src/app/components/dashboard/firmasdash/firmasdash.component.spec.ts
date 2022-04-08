import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmasdashComponent } from './firmasdash.component';

describe('FirmasdashComponent', () => {
  let component: FirmasdashComponent;
  let fixture: ComponentFixture<FirmasdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmasdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmasdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
