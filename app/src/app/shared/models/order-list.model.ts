import { Order } from './order.model';

export class OrderListStateModel {
  constructor(orders: Order[]) {
    this.orders = orders;
  }

  orders: Order[];
  detailChartId: number;
}
