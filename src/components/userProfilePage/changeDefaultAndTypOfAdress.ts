import { getUserProfile } from './profileInfo';
async function updateData(
  version: string,
  kod: number,
  accessToken: string,
  dataAdress: { id: string }[],
  allAdress: {
    city: string | null;
    street: string | null;
    postalCode: string | null;
    country: string | null;id: string | null;
    type: string | null;
    isDefault: boolean;
  }[],
) {
  try {
    const actions = [];
    let index = 0;
    let postData = {};
    while (index < allAdress.length) {
      const address = allAdress[index];
      const action =
        address.type == 'Shipping' ? address.isDefault == true ? 'setDefaultShippingAddress' : 'addShippingAddressId' : address.isDefault == true ? 'setDefaultBillingAddress' : 'addBillingAddressId';
      console.log(address.type, dataAdress[index].id, address.isDefault, 'FACK');
      const addressId = dataAdress[index].id;
      const data = {
        action: action,
        addressId: addressId,
      };
      actions.push(data);
      index++;
    }

    postData = {
      version: version,
      actions: actions,
    };
    console.log(postData, 'POSTA');

    const response = await fetch(`https:/api.europe-west1.gcp.commercetools.com/ghpr/customers/${kod}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      console.log(response);
    } else {
      const element = document.querySelector('.profile-addresses-wrapper');
      if (element instanceof HTMLDivElement) {
        element.innerHTML = '';
      }
    }
  } catch (error) {
    console.log(error);
  }
}
async function getToke(version: string, kod: number, dataAdress: { id: string }[], allAdress: { city: string | null, street: string | null, postalCode: string | null, country: string | null, id: string | null, type: string | null, isDefault: boolean }[]) {
  try {
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
    await updateData(version, kod, accessToken, dataAdress, allAdress);
  } catch (error) {
    console.log(error);
  }
}
export default async function changeDefaultAndTypOfAdress(allAdress: { city: string | null, street: string | null, postalCode: string | null, country: string | null, id: string | null, type: string | null, isDefault: boolean }[]) {
  try {
    const email = sessionStorage.getItem('email');
    console.log('TASSS');
    if (email) {
      const data = await getUserProfile(email);
      console.log(data.addresses, 'FARA');
      console.log('FARARRRR', data);
      await getToke(data.version, data.id, data.addresses, allAdress);
    }
  } catch (error) {
    console.log(error);
  }
}




