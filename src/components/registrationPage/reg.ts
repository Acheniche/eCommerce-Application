import LogoutButton from '../../utils/templates/logout';
import PopupWindow from '../../utils/templates/popup';
import App, { PagesID } from '../app';
import Header from '../header/header';

async function addOnServ(check_billing: string, check_shipping: string) {
  const email = document.getElementById('registration-email') as HTMLInputElement;
  const password = document.getElementById('registration-password') as HTMLInputElement;
  const firstname = document.getElementById('registration-firstname') as HTMLInputElement;
  const lastname = document.getElementById('registration-lastname') as HTMLInputElement;
  const dateOfBirth = document.getElementById('registration-dateOfBirth') as HTMLInputElement;
  const billingStreet = document.getElementById('registration-street_billing') as HTMLInputElement;
  const billingCity = document.getElementById('registration-city_billing') as HTMLInputElement;
  const billingPostal = document.getElementById('registration-postal_billing') as HTMLInputElement;
  const billingCountry = document.getElementById('country_billing') as HTMLInputElement;
  const shippingStreet = document.getElementById('registration-street_shipping') as HTMLInputElement;
  const shippingCity = document.getElementById('registration-city_shipping') as HTMLInputElement;
  const shippingPostal = document.getElementById('registration-postal_shipping') as HTMLInputElement;
  const shippingCountry = document.getElementById('country_shipping') as HTMLInputElement;
  const popupWindow = new PopupWindow();
  const logoutBtn = new Header('header', 'header');
  const logoutBtnListener = new LogoutButton();
  let billingCountryData = '';
  let shippingCountryData = '';
  if (billingCountry.value === 'USA') {
    billingCountryData = 'US';
  } else {
    billingCountryData = 'DE';
  }
  if (shippingCountry.value === 'USA') {
    shippingCountryData = 'US';
  } else {
    shippingCountryData = 'DE';
  }
  const data = {
    email: email.value.toString(),
    firstName: firstname.value.toString(),
    lastName: lastname.value.toString(),
    password: password.value.toString(),
    dateOfBirth: dateOfBirth.value.toString(),
    addresses: [
      {
        country: billingCountryData,
        city: billingCity.value.toString(),
        streetName: billingStreet.value.toString(),
        postalCode: billingPostal.value.toString(),
      },
      {
        country: shippingCountryData,
        city: shippingCity.value.toString(),
        streetName: shippingStreet.value.toString(),
        postalCode: shippingPostal.value.toString(),
      },
    ],
    ...(check_billing === 'true' && { defaultBillingAddress: 0 }),
    ...(check_shipping === 'true' && { defaultShippingAddress: 1 }),
    billingAddresses: [0],
    shippingAddresses: [1],
  };
  const response = await fetch(
    'https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_type=client_credentials',
    {
      method: 'POST',
      headers: {
        Authorization: 'Basic akNVdWl0cXRNRzViRm03a1cwRDY5OGFNOjVMeElVQ2VFeFVsaXJUeEswb2pxWWFxdGtjcWRuVXh3',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  const tokenData = await response.json();
  const accessToken = tokenData.access_token;

  await fetch('https://api.europe-west1.gcp.commercetools.com/ghpr/customers', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(function (res) {
    if (!res.ok) {
      (<HTMLElement>document.querySelector('.not-valid-email')).innerHTML = 'this email already exists';
    } else {
      App.renderPage(PagesID.mainPage);
      location.hash = 'main-page';
      const text = 'registration';
      popupWindow.popupTrue(text);
      logoutBtn.renderHeaderButtonsOkLogin();
      setTimeout(() => {
        logoutBtnListener.logoutBtnListener();
      }, 10);
    }
  });
  await fetch(
    `https://auth.europe-west1.gcp.commercetools.com/oauth/ghpr/customers/token?grant_type=password&username=${email.value.toString()}&password=${password.value.toString()}`,
    {
      method: 'POST',
      headers: {
        Authorization: 'Basic akNVdWl0cXRNRzViRm03a1cwRDY5OGFNOjVMeElVQ2VFeFVsaXJUeEswb2pxWWFxdGtjcWRuVXh3',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
}

function setDefaultAdressBilling() {
  if ((<HTMLInputElement>document.querySelector('.change-check_billing')).checked == false) {
    return false;
  } else {
    return true;
  }
}

function setDefaultAdressShipping() {
  if ((<HTMLInputElement>document.querySelector('.change-check_shipping')).checked == false) {
    return false;
  } else {
    return true;
  }
}

export default function registrationOnServ() {
  (<HTMLInputElement>document.querySelector('.registration-button')).addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    const icons = document.querySelectorAll('.icon');
    let i: number = 0;
    let counter: number = 0;
    while (i < icons.length) {
      if (icons[i].classList.contains('display-active') == false) {
        counter += 1;
      }
      if (counter == 9) {
        const checkBilling = setDefaultAdressBilling();
        const checkShipping = setDefaultAdressShipping();
        addOnServ(String(checkBilling), String(checkShipping));
      }
      i += 1;
    }
  });
}
