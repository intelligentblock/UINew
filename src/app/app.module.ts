/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { TransferComponent } from './Transfer/Transfer.component';

import { MerchantComponent } from './Merchant/Merchant.component';
import { CardMemberComponent } from './CardMember/CardMember.component';
import { IssuerBankComponent } from './IssuerBank/IssuerBank.component';
import { AcquirerBankComponent } from './AcquirerBank/AcquirerBank.component';
import { BankEmployeeComponent } from './BankEmployee/BankEmployee.component';

import { SampleTransactionComponent } from './SampleTransaction/SampleTransaction.component';
import { IssuerDisputesComponent } from './IssuerDisputes/IssuerDisputes.component';
import { AquirerDisputesComponent } from './AquirerDisputes/AquirerDisputes.component';
import { MerchantCreditComponent } from './MerchantCredit/MerchantCredit.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TransferComponent,
    MerchantComponent,
    CardMemberComponent,
    IssuerBankComponent,
    AcquirerBankComponent,
    BankEmployeeComponent,
    SampleTransactionComponent,
    IssuerDisputesComponent,
    AquirerDisputesComponent,
    MerchantCreditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
