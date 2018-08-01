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
import { MerchantService } from './Merchant.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-merchant',
  templateUrl: './Merchant.component.html',
  styleUrls: ['./Merchant.component.css'],
  providers: [MerchantService]
})
export class MerchantComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  currency = new FormControl('', Validators.required);
  participantId = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  valueBal = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  bank = new FormControl('', Validators.required);


  constructor(private serviceMerchant: MerchantService, fb: FormBuilder) {
    this.myForm = fb.group({
      currency: this.currency,
      participantId: this.participantId,
      firstName: this.firstName,
      lastName: this.lastName,
      valueBal: this.valueBal,
      address: this.address,
      bank: this.bank
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceMerchant.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.dispute.mynetwork.Merchant',
      'currency': this.currency.value,
      'participantId': this.participantId.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'valueBal': this.valueBal.value,
      'address': this.address.value,
      'bank': this.bank.value
    };

    this.myForm.setValue({
      'currency': null,
      'participantId': null,
      'firstName': null,
      'lastName': null,
      'valueBal': null,
      'address': null,
      'bank': null
    });

    return this.serviceMerchant.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'currency': null,
        'participantId': null,
        'firstName': null,
        'lastName': null,
        'valueBal': null,
        'address': null,
        'bank': null
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.dispute.mynetwork.Merchant',
      'currency': this.currency.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'valueBal': this.valueBal.value,
      'address': this.address.value,
      'bank': this.bank.value
    };

    return this.serviceMerchant.updateParticipant(form.get('participantId').value, this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceMerchant.deleteParticipant(this.currentId)
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

    return this.serviceMerchant.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'currency': null,
        'participantId': null,
        'firstName': null,
        'lastName': null,
        'valueBal': null,
        'address': null,
        'bank': null
      };

      if (result.currency) {
        formObject.currency = result.currency;
      } else {
        formObject.currency = null;
      }

      if (result.participantId) {
        formObject.participantId = result.participantId;
      } else {
        formObject.participantId = null;
      }

      if (result.firstName) {
        formObject.firstName = result.firstName;
      } else {
        formObject.firstName = null;
      }

      if (result.lastName) {
        formObject.lastName = result.lastName;
      } else {
        formObject.lastName = null;
      }

      if (result.valueBal) {
        formObject.valueBal = result.valueBal;
      } else {
        formObject.valueBal = null;
      }

      if (result.address) {
        formObject.address = result.address;
      } else {
        formObject.address = null;
      }

      if (result.bank) {
        formObject.bank = result.bank;
      } else {
        formObject.bank = null;
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
      'currency': null,
      'participantId': null,
      'firstName': null,
      'lastName': null,
      'valueBal': null,
      'address': null,
      'bank': null
    });
  }
}
