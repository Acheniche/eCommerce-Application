export async function getUserProfile(mail: string) {
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

  const res = await fetch(`https:/api.europe-west1.gcp.commercetools.com/ghpr/customers/?where=email%3D%22${mail}%22`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  /*  const firstName = tr.results.at(-1).firstName;
      const lastName = tr.results.at(-1).lastName;
      const dateOfBirth = tr.results.at(-1).dateOfBirth;
      const postalCod = tr.results.at(-1).addresses.at(-1).postalCode;
      const city = tr.results.at(-1).addresses.at(-1).city;
      const countrys = tr.results.at(-1).addresses.at(-1).country;
      const street = tr.results.at(-1).addresses.at(-1).streetName;
      const email = tr.results.at(-1).email;
      const id = tr.results.at(-1).id;
      const version = tr.results.at(-1).version;*/
  console.log(data);
  return data.results.at(-1);
}
