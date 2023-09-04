import { getUserProfile } from './profileInfo';
async function deletAdress(addressId: string, id: string, accessToken:string, version:string) {
  const data = {
    version: version,
    actions: [
      {
        'action': 'removeAddress',
        'addressId': `${addressId}`,
      },
    ],
  };

  await fetch(`https:/api.europe-west1.gcp.commercetools.com/ghpr/customers/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(function (res) {
    if (!res.ok) {
      console.log(res, 'NO');
    }
  });
}

async function getToken(addressId:string, id:string, version:string) {
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
  deletAdress(addressId, id, accessToken, version);
}
export default function deleteProfile(e: Event) {
  const target = e.target as HTMLButtonElement;
  const tr = target.closest('tr') as HTMLTableRowElement;
  const addressId = tr?.querySelector('.adress-id')?.innerHTML;

  if (addressId !== undefined && addressId !== '') { // Проверяем, что addressId не является undefined или пустой строкой
    const email = sessionStorage.getItem('email');
    if (email) {
      getUserProfile(email).then((data) => {
        console.log(addressId, data.id);
        getToken(addressId, data.id, data.version);

      });
    }
  }
}



/*   if (addressId) {
    const email = sessionStorage.getItem('email');
        if (email) {
          getUserProfile(email).then((data) => {
             console.log(String(token), addressId.value, data.id)
            deletAdress(String(token), addressId.value, data.id)
            console.log(addressId.value); // Выводим значение поля .address-id
    })
   }
  } */



