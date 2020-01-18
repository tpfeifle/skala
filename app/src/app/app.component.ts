import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { SwPush } from '@angular/service-worker';
import { Select, Store } from '@ngxs/store';
import { OrderState } from './shared/store/order/order.state';
import { Observable } from 'rxjs';
import { Order } from './shared/models/order.model';
import { ListTruckWeights } from './shared/store/order/order.actions';
import { TruckWeight } from './shared/models/truck-weight.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SmartCrane';
  readonly VAPID_PUBLIC_KEY =
    'BMOZbIDbrRCtOOPcMX4zulJgsNhGka7i7jsGwr67pLKyinJYGCw_ZObBsaDe7y444ciXBZYdVbiA513Zuj8qN5U';
  @Select(OrderState.truckWeights)
  truckWeights$: Observable<TruckWeight[]>;

  constructor(
    readonly swPush: SwPush,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private store: Store
  ) {
    iconRegistry.addSvgIcon(
      'weight',
      sanitizer.bypassSecurityTrustResourceUrl('assets/weight.svg')
    );
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(sub => {
        console.log(sub);
        //this.newsletterService.addPushSubscriber(sub).subscribe()
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
    this.store.dispatch(new ListTruckWeights());
  }

  // opened = true;
}
