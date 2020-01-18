import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import {
  DeleteTruckWeight,
  ListOrders,
  ListTruckWeights,
  UpdateTruckWeight
} from '../shared/store/order/order.actions';
import { OrderState } from '../shared/store/order/order.state';
import { Observable } from 'rxjs';
import { Order } from '../shared/models/order.model';
import { TruckWeight } from '../shared/models/truck-weight.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-unmatched-weights',
  templateUrl: './unmatched-weights.component.html',
  styleUrls: ['./unmatched-weights.component.scss']
})
export class UnmatchedWeightsComponent implements OnInit {
  @Select(OrderState.truckWeights)
  truckWeights$: Observable<TruckWeight[]>;

  @Select(OrderState.orders)
  orders$: Observable<Order[]>;

  panelOpenState = true;
  selected = 'option2';

  constructor(
    private store: Store,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.store.dispatch(new ListOrders());
    this.store.dispatch(new ListTruckWeights());
  }

  deleteTruckWeight(truckWeight: TruckWeight) {
    if (confirm('Really delete this truck weight?')) {
      this.store.dispatch(new DeleteTruckWeight(truckWeight.id));
      this.snackBar.open('Weight removed', '', { duration: 2000 });
    }
  }

  assignOrder(truckWeight: TruckWeight) {
    console.log(truckWeight);
    this.store.dispatch(new UpdateTruckWeight(truckWeight));
    this.store.dispatch(new DeleteTruckWeight(truckWeight.id));
    this.snackBar.open('Weight assigned to order', '', { duration: 2000 });
  }

  ngOnInit() {}
}
