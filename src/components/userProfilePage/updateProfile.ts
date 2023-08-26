async function updateData(id:string, version:number, accessToken:string) {

    const data = {
      'version' : version,
      'actions' : [ /*{
        'action' : 'addAddress',
        'address' : {
          'streetName' : (<HTMLInputElement>document.querySelector('#input-modal10')).value,
          'postalCode' :(<HTMLInputElement>document.querySelector('#input-modal4')).value,
          'city' : (<HTMLInputElement>document.querySelector('#input-modal5')).value,
          'country' : (<HTMLInputElement>document.querySelector('#input-modal6')).value,
        },
      },*/
      {
        'action': 'setFirstName',
        'firstName': (<HTMLInputElement>document.querySelector('#registration-firstname')).value,
      },
      {
        'action': 'setLastName',
        'lastName': (<HTMLInputElement>document.querySelector('#registration-lastname')).value,
      },
      {
        'action': 'changeEmail',
        'email': (<HTMLInputElement>document.querySelector('#registration-email')).value,
      },
      {
        'action': 'setDateOfBirth',
        'dateOfBirth': (<HTMLInputElement>document.querySelector('#registration-dateOfBirth')).value,
      },
      ],
    };

    await fetch(`https:/api.europe-west1.gcp.commercetools.com/ghpr/customers/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  
  
    })
      .then(function (res) {
        if (!res.ok) {
          console.log(res);
        /* else if ((<HTMLInputElement>document.querySelector('#input-modal8')).value.length > 0 &&
      (<HTMLInputElement>document.querySelector('#input-modal9')).value.length > 0 ) {
          console.log('true');*/
       //   updatePassword(id, version, accessToken);
       // }
       } else {
       //   userProfail((<HTMLInputElement>document.querySelector('#input-modal7')).value);
       sessionStorage.setItem('email', (<HTMLInputElement>document.querySelector('#registration-email')).value);
       console.log('all ok');
        }
      });
  }


export default async function getToken(id:string, version:number) {
    const response = await fetch('https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_type=client_credentials',
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
    updateData(id, version, accessToken);
  }