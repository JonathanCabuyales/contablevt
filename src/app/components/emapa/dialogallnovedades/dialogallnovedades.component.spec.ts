import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogallnovedadesComponent } from './dialogallnovedades.component';

describe('DialogallnovedadesComponent', () => {
  let component: DialogallnovedadesComponent;
  let fixture: ComponentFixture<DialogallnovedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogallnovedadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogallnovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
