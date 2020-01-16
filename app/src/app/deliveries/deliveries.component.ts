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

  constructor(private store: Store, private http: HttpClient) {
    this.store.dispatch(new ListOrders());
  }

  ngOnInit() {}
}
