import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeliveriesComponent } from './deliveries/deliveries.component';
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
  MatChipsModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { UnmatchedWeightsComponent } from './unmatched-weights/unmatched-weights.component';

@NgModule({
  declarations: [
    AppComponent,
    DeliveriesComponent,
    OrderDetailComponent,
    UnmatchedWeightsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSliderModule,
    HttpClientModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([OrderState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
