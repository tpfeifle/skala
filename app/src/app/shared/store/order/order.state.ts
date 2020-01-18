import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  ListOrders,
  OpenOrderDetail,
  CompleteOrder,
  ListTruckWeights,
  DeleteTruckWeight,
  UpdateTruckWeight
} from './order.actions';
import { OrderListStateModel } from '../../models/order-list.model';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Order } from '../../models/order.model';
import { TruckWeight } from '../../models/truck-weight.model';

@State<OrderListStateModel>({
  name: 'project',
  defaults: {
    orders: [],
    detailChartId: 0,
    truckWeights: []
  }
})
export class OrderState {
  constructor(private http: HttpClient) {}

  @Selector()
  static orders(state: OrderListStateModel) {
    return state.orders;
  }

  @Selector()
  static truckWeights(state: OrderListStateModel) {
    return state.truckWeights;
  }

  @Selector()
  static getOrderDetail(state: OrderListStateModel) {
    console.log(state.orders);
    console.log(state.detailChartId);
    return state.orders.filter(order => order.id === state.detailChartId)[0];
  }

  @Action(ListOrders)
  listOrders(ctx: StateContext<OrderListStateModel>) {
    return this.http.get<Order[]>(`http://172.20.10.13:3000/order`).pipe(
      tap((orders: Order[]) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          orders
        });
      })
    );
  }

  @Action(ListTruckWeights)
  listTruckWeights(ctx: StateContext<OrderListStateModel>) {
    return this.http
      .get<TruckWeight[]>(`http://172.20.10.13:3000/match-weights`)
      .pipe(
        tap((truckWeights: TruckWeight[]) => {
          const state = ctx.getState();
          ctx.setState({
            ...state,
            truckWeights
          });
        })
      );
  }

  getWithCompleted(order: Order) {
    order.status = 'PAY';
    return order;
  }

  @Action(CompleteOrder)
  completeOrder(ctx: StateContext<OrderListStateModel>, { orderId }) {
    return this.http
      .put<Order>(
        `http://172.20.10.13:3000/order`,
        this.getWithCompleted(
          ctx.getState().orders.filter(order => order.id === orderId)[0]
        )
      )
      .pipe(
        tap((order: Order) => {
          const state = ctx.getState();
          let orders = state.orders;
          orders.filter(order => order.id == orderId)[0].status = 'PAY';
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

  @Action(DeleteTruckWeight)
  deleteTruckWeight(
    ctx: StateContext<OrderListStateModel>,
    { truckWeightId }: DeleteTruckWeight
  ) {
    return this.http
      .delete(`http://172.20.10.13:3000/match-weights/${truckWeightId}`)
      .pipe(
        tap(() => {
          const state = ctx.getState();
          ctx.setState({
            ...state,
            truckWeights: [
              ...state.truckWeights.filter(
                truckWeight => truckWeight.id !== truckWeightId
              )
            ]
          });
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  getWithFullOrder(
    truckWeight: TruckWeight,
    ctx: StateContext<OrderListStateModel>
  ) {
    // @ts-ignore
    truckWeight.order = ctx
      .getState()
      .orders.filter(order => order.id === parseInt(truckWeight.order, 10))[0];
    return truckWeight;
  }

  @Action(UpdateTruckWeight)
  updateTruckWeight(
    ctx: StateContext<OrderListStateModel>,
    { truckWeight }: UpdateTruckWeight
  ) {
    return this.http.put<TruckWeight>(
      `http://172.20.10.13:3000/match-weights`,
      this.getWithFullOrder(truckWeight, ctx)
    );
    /*.pipe(
        tap(() => {
          const state = ctx.getState();
          const truckWeights = state.truckWeights;
          truckWeights.filter(tW => tW.id === truckWeight.id)[0] = truckWeight;
          ctx.setState({
            ...state,
            truckWeights
          });
        })
      );*/
  }
}
