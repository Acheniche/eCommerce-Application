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
  const billing_street = document.getElementById('registration-street_billing') as HTMLInputElement;
  const billing_city = document.getElementById('registration-city_billing') as HTMLInputElement;
  const billing_postal = document.getElementById('registration-postal_billing') as HTMLInputElement;
  const billing_country = document.getElementById('country_billing') as HTMLInputElement;
  const shipping_street = document.getElementById('registration-street_shipping') as HTMLInputElement;
  const shipping_city = document.getElementById('registration-city_shipping') as HTMLInputElement;
  const shipping_postal = document.getElementById('registration-postal_shipping') as HTMLInputElement;
  const shipping_country = document.getElementById('country_shipping') as HTMLInputElement;
  const popupWindow = new PopupWindow();
  const logoutBtn = new Header('header', 'header');
  const logoutBtnListener = new LogoutButton();
  let billing_countryData = '';
  let shipping_countryData = '';
  if (billing_country.value === 'USA') {
    billing_countryData = 'US';
  } else {
    billing_countryData = 'DE';
  }
  if (shipping_country.value === 'USA') {
    shipping_countryData = 'US';
  } else {
    shipping_countryData = 'DE';
  }
  const data = {
    email: email.value.toString(),
    firstName: firstname.value.toString(),
    lastName: lastname.value.toString(),
    password: password.value.toString(),
    dateOfBirth: dateOfBirth.value.toString(),
      addresses: [
      {
        country: billing_countryData,
        city: billing_city.value.toString(),
        streetName: billing_street.value.toString(),
        postalCode: billing_postal.value.toString(),
      },
      {
        country: shipping_countryData,
        city: shipping_city.value.toString(),
        streetName: shipping_street.value.toString(),
        postalCode: shipping_postal.value.toString(),
      },
    ],
    ...(check_billing === "true" && {defaultBillingAddress: 0}),
    ...(check_shipping === "true" && {defaultShippingAddress: 1}),
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

function setDefaultAdress_billing() {
  if ((<HTMLInputElement>document.querySelector('.change-check_billing')).checked == false) {
    return false;
  } else {
    return true;
  }
}

function setDefaultAdress_shipping() {
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
        const check_billing = setDefaultAdress_billing();
        const check_shipping = setDefaultAdress_shipping();
        addOnServ(String(check_billing), String(check_shipping));
      }
      i += 1;
    }
  });
}