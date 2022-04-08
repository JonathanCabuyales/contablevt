import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogregistroappComponent } from './dialogregistroapp.component';

describe('DialogregistroappComponent', () => {
  let component: DialogregistroappComponent;
  let fixture: ComponentFixture<DialogregistroappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogregistroappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogregistroappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
