import { Order } from '../../models/order.model';
import { TruckWeight } from '../../models/truck-weight.model';

export class ListOrders {
  static readonly type = '[Order] List Orders';

  constructor() {}
}

export class OpenOrderDetail {
  static readonly type = '[Order] Open Detail';

  constructor(public orderId: number) {}
}

export class CompleteOrder {
  static readonly type = '[Order] Complete Order';

  constructor(public orderId: number) {}
}

export class ListTruckWeights {
  static readonly type = '[Order] List TruckWeights';

  constructor() {}
}

export class DeleteTruckWeight {
  static readonly type = '[Order] Delete TruckWeight';

  constructor(public truckWeightId: number) {}
}

export class UpdateTruckWeight {
  static readonly type = '[Order] Update TruckWeight';

  constructor(public truckWeight: TruckWeight) {}
}
