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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for LoginAnu', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be LoginAnu', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('LoginAnu');
    })
  });

  it('network-name should be dispute@0.0.3-deploy.25',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('dispute@0.0.3-deploy.25.bna');
    });
  });

  it('navbar-brand should be LoginAnu',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('LoginAnu');
    });
  });

  
    it('Transfer component should be loadable',() => {
      page.navigateTo('/Transfer');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Transfer');
      });
    });

    it('Transfer table should have 12 columns',() => {
      page.navigateTo('/Transfer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(12); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Merchant component should be loadable',() => {
      page.navigateTo('/Merchant');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Merchant');
      });
    });

    it('Merchant table should have 8 columns',() => {
      page.navigateTo('/Merchant');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('CardMember component should be loadable',() => {
      page.navigateTo('/CardMember');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CardMember');
      });
    });

    it('CardMember table should have 8 columns',() => {
      page.navigateTo('/CardMember');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('IssuerBank component should be loadable',() => {
      page.navigateTo('/IssuerBank');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('IssuerBank');
      });
    });

    it('IssuerBank table should have 6 columns',() => {
      page.navigateTo('/IssuerBank');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('AcquirerBank component should be loadable',() => {
      page.navigateTo('/AcquirerBank');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AcquirerBank');
      });
    });

    it('AcquirerBank table should have 6 columns',() => {
      page.navigateTo('/AcquirerBank');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('BankEmployee component should be loadable',() => {
      page.navigateTo('/BankEmployee');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('BankEmployee');
      });
    });

    it('BankEmployee table should have 7 columns',() => {
      page.navigateTo('/BankEmployee');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('SampleTransaction component should be loadable',() => {
      page.navigateTo('/SampleTransaction');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SampleTransaction');
      });
    });
  
    it('IssuerDisputes component should be loadable',() => {
      page.navigateTo('/IssuerDisputes');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('IssuerDisputes');
      });
    });
  
    it('AquirerDisputes component should be loadable',() => {
      page.navigateTo('/AquirerDisputes');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AquirerDisputes');
      });
    });
  
    it('MerchantCredit component should be loadable',() => {
      page.navigateTo('/MerchantCredit');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('MerchantCredit');
      });
    });
  

});