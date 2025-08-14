import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayInstallment } from './pay-installment';

describe('PayInstallment', () => {
  let component: PayInstallment;
  let fixture: ComponentFixture<PayInstallment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayInstallment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayInstallment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
