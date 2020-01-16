export class Order {
  constructor(
    id: number,
    total_weight: number,
    cost: number,
    timestamp: Date,
    title: string
  ) {
    this.id = id;
    this.total_weight = total_weight;
    this.cost = cost;
    this.timestamp = timestamp;
    this.title = title;
  }
  id: number;
  total_weight: number;
  cost: number;
  timestamp: Date;
  title: string;
}
