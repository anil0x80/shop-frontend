import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstallmentService } from '../../services/installment-service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

interface PayState {
  processing: boolean;
  success: boolean;
  error: string | null;
}

@Component({
  selector: 'app-pay-installment',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pay-installment.html',
  styleUrl: './pay-installment.css'
})
export class PayInstallment implements OnInit {
  private route = inject(ActivatedRoute);
  private installmentService = inject(InstallmentService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  installmentId: string | null = null;
  state: PayState = { processing: false, success: false, error: null };
  cardForm = this.fb.group({
    cardName: ['', [Validators.required, Validators.minLength(3)]],
    cardNumber: ['', [Validators.required, Validators.pattern(/^\d{13,19}$/)]],
    expiration: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/(\d{2})$/)]],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
  });

  ngOnInit(): void {
    this.installmentId = this.route.snapshot.paramMap.get('installmentId');
  }

  pay(){
    if(!this.installmentId || this.state.processing) return;
    // if(this.cardForm.invalid){
    //   this.cardForm.markAllAsTouched();
    //   return;
    // }
    this.state = { processing: true, success: false, error: null };
    this.installmentService.payInstallment(this.installmentId).subscribe({
      next: _ => { this.state.processing = false; this.state.success = true; },
      error: err => { console.error(err); this.state.processing = false; this.state.error = 'Payment failed'; }
    });
  }

  backToOrders(){
    this.router.navigate(['/order/history']);
  }
}
