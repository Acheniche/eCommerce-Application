export async function getProducts() {
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

    const res = await fetch('https://api.europe-west1.gcp.commercetools.com/ghpr/products?&limit=100', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      return data;
}
