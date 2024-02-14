import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDealerComponent } from './delete-dealer.component';

describe('DeleteDealerComponent', () => {
  let component: DeleteDealerComponent;
  let fixture: ComponentFixture<DeleteDealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDealerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
