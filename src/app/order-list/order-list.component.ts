import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Customer } from '../model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  customers: Customer[] = [
    {id: 1, productId: 1, orderNumber: "A01", customerName: "CK", quantity:1, totalPrice: 20},
    {id: 2, productId: 1, orderNumber: "A02", customerName: "AJ", quantity:2, totalPrice: 40},
    {id: 3, productId: 1, orderNumber: "A03", customerName: "OA", quantity:3, totalPrice: 60},
    {id: 4, productId: 3, orderNumber: "A04", customerName: "JK", quantity:4, totalPrice: 40},
    {id: 5, productId: 3, orderNumber: "A05", customerName: "AN", quantity:1, totalPrice: 10},
  ];

  result: Customer[] = [];
  productId: number = 0;
  public myForm: FormGroup | any;
  enabledSubmit: boolean = false;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private fb: FormBuilder) { }

  ngOnInit() {
    this.productId = this.config.data.id;
    this.result = this.customers.filter(obj => {
        return obj.productId === this.config.data.id;
    });
    this.myForm = this.fb.group({
      remarks: ["", Validators.required]
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Remarks', form.value.remarks);
    this.ref.close({id: this.productId, remarks: form.value.remarks});
  }

  // selectOrder(order: Customer) {
  //     this.ref.close(order);
  // }
}
