import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  DeliveriesComponent,
  SearchPipe
} from './deliveries/deliveries.component';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { OrderState } from './shared/store/order/order.state';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatChipsModule,
  MatExpansionModule,
  MatSelectModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { UnmatchedWeightsComponent } from './unmatched-weights/unmatched-weights.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    AppComponent,
    DeliveriesComponent,
    OrderDetailComponent,
    UnmatchedWeightsComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatSelectModule,
    MatChipsModule,
    MatSidenavModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSliderModule,
    HttpClientModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([OrderState]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
