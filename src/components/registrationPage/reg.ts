import LogoutButton from '../../utils/templates/logout';
import PopupWindow from '../../utils/templates/popup';
import App, { PagesID } from '../app';
import Header from '../header/header';

async function addOnServ(check: string) {
  const email = document.getElementById('registration-email') as HTMLInputElement;
  const password = document.getElementById('registration-password') as HTMLInputElement;
  const firstname = document.getElementById('registration-firstname') as HTMLInputElement;
  const lastname = document.getElementById('registration-lastname') as HTMLInputElement;
  const dateOfBirth = document.getElementById('registration-dateOfBirth') as HTMLInputElement;
  const street = document.getElementById('registration-street') as HTMLInputElement;
  const city = document.getElementById('registration-city') as HTMLInputElement;
  const postal = document.getElementById('registration-postal') as HTMLInputElement;
  const country = document.getElementById('country') as HTMLInputElement;
  const popupWindow = new PopupWindow();
  const logoutBtn = new Header('header', 'header');
  const logoutBtnListener = new LogoutButton();
  let countryData = '';
  if (country.value === 'USA') {
    countryData = 'US';
  } else {
    countryData = 'DE';
  }
  const data = {
    email: email.value.toString(),
    firstName: firstname.value.toString(),
    lastName: lastname.value.toString(),
    password: password.value.toString(),
    dateOfBirth: dateOfBirth.value.toString(),
    action: check == 'true' ? 'setDefaultBillingAddress' : 'addAddress',
    AddressID:
      check == 'true'
        ? [
            {
              country: countryData,
              city: city.value.toString(),
              street: street.value.toString(),
              postalCode: postal.value.toString(),
            },
          ]
        : '',
    addresses: [
      {
        country: countryData,
        city: city.value.toString(),
        street: street.value.toString(),
        postalCode: postal.value.toString(),
      },
    ],
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
function setDefaultAdress() {
  if ((<HTMLInputElement>document.querySelector('.change-check')).checked == false) {
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
        const check = setDefaultAdress();
        addOnServ(String(check));
      }
      i += 1;
    }
  });
}

