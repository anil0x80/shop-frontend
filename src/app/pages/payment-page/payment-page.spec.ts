import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPage } from './payment-page';

describe('PaymentPage', () => {
  let component: PaymentPage;
  let fixture: ComponentFixture<PaymentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
