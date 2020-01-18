import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, Select } from '@ngxs/store';
import { ListOrders } from '../shared/store/order/order.actions';
import { OrderListStateModel } from '../shared/models/order-list.model';
import { OrderState } from '../shared/store/order/order.state';
import { Observable } from 'rxjs';
import { Order } from '../shared/models/order.model';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit {
  @Select(OrderState.orders)
  orders$: Observable<Order[]>;
  filterString: string;

  constructor(private store: Store, private http: HttpClient) {
    this.store.dispatch(new ListOrders());
    this.filterString = 'All';
  }

  ngOnInit() {}
}

import { Pipe, PipeTransform } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'LockFilter'
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter(function(item) {
      if (args == 'open') {
        return item.status == 'OPEN';
      } else if (args == 'weighted') {
        return item.status == 'WEIGHTED';
      } else if (args == 'complete') {
        return item.status == 'PAY';
      } else {
        return item;
      }
    });
  }
}
