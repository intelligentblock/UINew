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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Transfer', component: TransferComponent },
  { path: 'Merchant', component: MerchantComponent },
  { path: 'CardMember', component: CardMemberComponent },
  { path: 'IssuerBank', component: IssuerBankComponent },
  { path: 'AcquirerBank', component: AcquirerBankComponent },
  { path: 'BankEmployee', component: BankEmployeeComponent },
  { path: 'SampleTransaction', component: SampleTransactionComponent },
  { path: 'IssuerDisputes', component: IssuerDisputesComponent },
  { path: 'AquirerDisputes', component: AquirerDisputesComponent },
  { path: 'MerchantCredit', component: MerchantCreditComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
