import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ListOrders, OpenOrderDetail } from './order.actions';
import { OrderListStateModel } from '../../models/order-list.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Order } from '../../models/order.model';

@State<OrderListStateModel>({
  name: 'project',
  defaults: {
    orders: [],
    detailChartId: 0
  }
})
export class OrderState {
  constructor(private http: HttpClient) {}

  @Selector()
  static orders(state: OrderListStateModel) {
    return state.orders;
  }

  @Selector()
  static getOrderDetail(state: OrderListStateModel) {
    console.log(state.orders);
    console.log(state.detailChartId);
    return state.orders.filter(order => order.id === state.detailChartId)[0];
  }

  @Action(ListOrders)
  listOrders(ctx: StateContext<OrderListStateModel>) {
    return this.http.get<Order[]>(`http://localhost:3000/order`).pipe(
      tap((orders: Order[]) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          orders
        });
      })
    );
  }

  @Action(OpenOrderDetail)
  openChart(
    ctx: StateContext<OrderListStateModel>,
    { orderId }: OpenOrderDetail
  ) {
    const state = ctx.getState();
    ctx.setState({ ...state, detailChartId: orderId });
  }
}
