import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditLocationComponent } from './modal-edit-location.component';

describe('ModalUserComponent', () => {
  let component: ModalEditLocationComponent;
  let fixture: ComponentFixture<ModalEditLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
