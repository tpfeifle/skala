import { Order } from './order.model';

export class TruckWeight {
  id: number;
  total_weight: number;
  order: Order;
  timestamp: Date;
}
