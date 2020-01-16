import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderState } from '../shared/store/order/order.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Order } from '../shared/models/order.model';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  OpenOrderDetail,
  ListOrders
} from '../shared/store/order/order.actions';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  image: File;
  resData: any;
  selectedFile = null;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  @Select(OrderState.getOrderDetail)
  order$: Observable<Order>;

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new ListOrders());
    this.store.dispatch(new OpenOrderDetail(parseInt(id)));
    console.log(id);

    /*this.store
      .select(OrderState.orders)
      .pipe(
        filter((orders: Order[]) =>
        )
      );*/
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onSubmit() {
    const payload = new FormData();
    //payload.append('name', "testname");
    payload.append('file', this.selectedFile, this.selectedFile.name);
    console.log(this.selectedFile);

    this.http
      .post(`http://localhost:3000/delivery-notice`, payload, {})
      .subscribe((data: any) => {
        this.resData = data;
        console.log(this.resData);
      });
  }
}
