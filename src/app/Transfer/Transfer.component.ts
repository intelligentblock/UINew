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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TransferService } from './Transfer.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-transfer',
  templateUrl: './Transfer.component.html',
  styleUrls: ['./Transfer.component.css'],
  providers: [TransferService]
})
export class TransferComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  assetId = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);
  value = new FormControl('', Validators.required);
  merchant = new FormControl('', Validators.required);
  cardmember = new FormControl('', Validators.required);
  transactionDetails = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  cardDetails = new FormControl('', Validators.required);
  inquirystatus = new FormControl('', Validators.required);
  issuerbank = new FormControl('', Validators.required);
  acquirerbank = new FormControl('', Validators.required);

  constructor(private serviceTransfer: TransferService, fb: FormBuilder) {
    this.myForm = fb.group({
      assetId: this.assetId,
      owner: this.owner,
      value: this.value,
      merchant: this.merchant,
      cardmember: this.cardmember,
      transactionDetails: this.transactionDetails,
      status: this.status,
      cardDetails: this.cardDetails,
      inquirystatus: this.inquirystatus,
      issuerbank: this.issuerbank,
      acquirerbank: this.acquirerbank
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceTransfer.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.dispute.mynetwork.Transfer',
      'assetId': this.assetId.value,
      'owner': this.owner.value,
      'value': this.value.value,
      'merchant': this.merchant.value,
      'cardmember': this.cardmember.value,
      'transactionDetails': this.transactionDetails.value,
      'status': this.status.value,
      'cardDetails': this.cardDetails.value,
      'inquirystatus': this.inquirystatus.value,
      'issuerbank': this.issuerbank.value,
      'acquirerbank': this.acquirerbank.value
    };

    this.myForm.setValue({
      'assetId': null,
      'owner': null,
      'value': null,
      'merchant': null,
      'cardmember': null,
      'transactionDetails': null,
      'status': null,
      'cardDetails': null,
      'inquirystatus': null,
      'issuerbank': null,
      'acquirerbank': null
    });

    return this.serviceTransfer.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'assetId': null,
        'owner': null,
        'value': null,
        'merchant': null,
        'cardmember': null,
        'transactionDetails': null,
        'status': null,
        'cardDetails': null,
        'inquirystatus': null,
        'issuerbank': null,
        'acquirerbank': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.dispute.mynetwork.Transfer',
      'owner': this.owner.value,
      'value': this.value.value,
      'merchant': this.merchant.value,
      'cardmember': this.cardmember.value,
      'transactionDetails': this.transactionDetails.value,
      'status': this.status.value,
      'cardDetails': this.cardDetails.value,
      'inquirystatus': this.inquirystatus.value,
      'issuerbank': this.issuerbank.value,
      'acquirerbank': this.acquirerbank.value
    };

    return this.serviceTransfer.updateAsset(form.get('assetId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceTransfer.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceTransfer.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'assetId': null,
        'owner': null,
        'value': null,
        'merchant': null,
        'cardmember': null,
        'transactionDetails': null,
        'status': null,
        'cardDetails': null,
        'inquirystatus': null,
        'issuerbank': null,
        'acquirerbank': null
      };

      if (result.assetId) {
        formObject.assetId = result.assetId;
      } else {
        formObject.assetId = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      if (result.value) {
        formObject.value = result.value;
      } else {
        formObject.value = null;
      }

      if (result.merchant) {
        formObject.merchant = result.merchant;
      } else {
        formObject.merchant = null;
      }

      if (result.cardmember) {
        formObject.cardmember = result.cardmember;
      } else {
        formObject.cardmember = null;
      }

      if (result.transactionDetails) {
        formObject.transactionDetails = result.transactionDetails;
      } else {
        formObject.transactionDetails = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.cardDetails) {
        formObject.cardDetails = result.cardDetails;
      } else {
        formObject.cardDetails = null;
      }

      if (result.inquirystatus) {
        formObject.inquirystatus = result.inquirystatus;
      } else {
        formObject.inquirystatus = null;
      }

      if (result.issuerbank) {
        formObject.issuerbank = result.issuerbank;
      } else {
        formObject.issuerbank = null;
      }

      if (result.acquirerbank) {
        formObject.acquirerbank = result.acquirerbank;
      } else {
        formObject.acquirerbank = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'assetId': null,
      'owner': null,
      'value': null,
      'merchant': null,
      'cardmember': null,
      'transactionDetails': null,
      'status': null,
      'cardDetails': null,
      'inquirystatus': null,
      'issuerbank': null,
      'acquirerbank': null
      });
  }

}
