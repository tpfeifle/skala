import { Order } from '../../models/order.model';

export class ListOrders {
  static readonly type = '[Order] List Orders';
  constructor() {}
}

export class OpenOrderDetail {
  static readonly type = '[Order] Open ChartDetail';
  constructor(public orderId: number) {}
}
