import { Order } from './order.model';
import { TruckWeight } from './truck-weight.model';

export class OrderListStateModel {
  constructor(orders: Order[]) {
    this.orders = orders;
  }

  orders: Order[];
  detailChartId: number;
  truckWeights: TruckWeight[];
}
