import PopupWindow from '../../utils/templates/popup';
import App from '../app';
import changeDefaultAndTypOfAdress from './changeDefaultAndTypOfAdress';

async function updatePassword(id: string, version: number, accessToken: string) {
  const vers = version;
  const popupWindow = new PopupWindow();
  const passwordTru = 'password-tru';
  const passwordWrong = 'password-wrong';
  const data = {
    id: id,
    version: vers,
    currentPassword: (<HTMLInputElement>document.querySelector('#registration-oldPassword')).value,
    newPassword: (<HTMLInputElement>document.querySelector('#registration-newPassword')).value,
  };
  //console.log(data);
  const res = await fetch('https://api.europe-west1.gcp.commercetools.com/ghpr/customers/password', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (res.status == 400) {
    popupWindow.popupTrue(passwordWrong);
    console.log('wrong');
  } else if (res.status == 200) {
    popupWindow.popupTrue(passwordTru);
    console.log('tru');
  }

}
async function updateData(id: string, version: number, accessToken: string, allAdress: { city: string | null, street: string | null, postalCode: string | null, country: string | null, id: string | null, type: string | null, isDefault: boolean }[]) {
  const data = {
    version: version,
    actions: [
      {
        action: 'setFirstName',
        firstName: (<HTMLInputElement>document.querySelector('#registration-firstname')).value,
      },
      {
        action: 'setLastName',
        lastName: (<HTMLInputElement>document.querySelector('#registration-lastname')).value,
      },
      {
        action: 'changeEmail',
        email: (<HTMLInputElement>document.querySelector('#registration-email')).value,
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth: (<HTMLInputElement>document.querySelector('#registration-dateOfBirth')).value,
      },
      ...allAdress.map(address => ({
        action: address.id == null ? 'addAddress' : 'changeAddress',
        //action: address.type == "Shipping" ? address.isDefault == true? "setDefaultShippingAddress": "addShippingAddressId" : address.isDefault == true? "setDefaultBillingAddress": "addBillingAddressId",
        addressId: address.id == null ? '' : address.id,
        address: {
          streetName: address.street,
          postalCode: address.postalCode,
          city: address.city,
          country: address.country == 'Germany' ? 'DE' : 'US',
        },
      })),
    ],
  };
  console.log(data, 'LOLA');

  await fetch(`https:/api.europe-west1.gcp.commercetools.com/ghpr/customers/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(function (res) {
    if (!res.ok) {
      console.log(res);
    } else if ((<HTMLInputElement>document.querySelector('#registration-oldPassword')).value.length > 0 && (<HTMLInputElement>document.querySelector('#registration-newPassword')).value.length > 0) {
      updatePassword(id, version, accessToken);

    }
    changeDefaultAndTypOfAdress(allAdress)
      .then(() => {
      // выполнение других функций после updateData
        sessionStorage.setItem('email', (<HTMLInputElement>document.querySelector('#registration-email')).value);
        App.renderPage('profile-page');
      })
      .catch(error => {
        console.log(error);
      });

  });
}

export default async function getToken(id: string, version: number, allAdress: { city: string | null, street: string | null, postalCode: string | null, country: string | null, id: string | null, type: string | null, isDefault: boolean }[]) {
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
  updateData(id, version, accessToken, allAdress);
}
















