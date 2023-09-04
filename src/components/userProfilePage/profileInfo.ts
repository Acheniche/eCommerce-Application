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

  return data.results.at(-1);
}
