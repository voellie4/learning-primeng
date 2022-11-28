import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MessageService} from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Customer, Product } from './model';
import { OrderListComponent } from './order-list/order-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DynamicDialogRef, DialogService, MessageService]
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('dt') dt: Table | undefined;
  title = 'primeng-app';
  
  products: Product[] = [];
  
  loading: boolean = true;
  display: boolean = false;

  constructor(public ref: DynamicDialogRef, public dialogService: DialogService, private messageService: MessageService) {}

  ngOnInit() {
    this.products = [
      {id: 1, name: "watch", price:20, category: "accessories", status: "In Stock", remarks: ""},
      {id: 2, name: "beanie", price:5, category: "accessories", status: "Out of Stock", remarks: ""},
      {id: 3, name: "shirt", price:10, category: "clothing", status: "In Stock", remarks: ""},
      {id: 4, name: "shoe", price:15, category: "shoes", status: "Out of Stock", remarks: ""}
    ];
    this.loading = false;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  show(productId: number) {
    var result = this.products.filter(obj => {
      return obj.id === productId && obj.status === "In Stock";
    });

    var productName = this.products.filter(obj => {
      return obj.id === productId;
    }).at(0)?.name;

    if (result.length === 0) {
      this.display = true;
    }
    else {
      this.ref = this.dialogService.open(OrderListComponent, {
        data: {
          id: productId
        },
        header: productName,
        width: '70%',
        contentStyle: {"overflow": "auto"},
        baseZIndex: 10000,
        maximizable: true,
        dismissableMask: true
      });
  
      // this.ref.onClose.subscribe((customer: Customer) => {
      //   if (customer) {
      //       this.messageService.add({severity:'info', summary: 'Order Selected', detail: customer.orderNumber});
      //   }
      // });

      this.ref.onClose.subscribe((data: any) => {
        if (data) {
            var objIndex = this.products.findIndex((obj => obj.id == data.id));
            this.products[objIndex].remarks = data.remarks;
            this.messageService.add({severity:'info', summary: 'Product Remarks Updated', detail: `${data.id}: ${data.remarks}`});
        }
      });
  
      this.ref.onMaximize.subscribe((value: any) => {
        this.messageService.add({severity: 'info', summary: 'Maximized', detail:  `maximized: ${value.maximized}`});
      });
    }
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
}
