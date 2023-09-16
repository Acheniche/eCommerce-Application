import App from '../app';

export async function getToken() {
  if (App.isLogin === true) {
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
    return accessToken;
  } else {
    const response = await fetch(
      'https://auth.europe-west1.gcp.commercetools.com/oauth/ghpr/anonymous/token?grant_type=client_credentials',
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
    return accessToken;
  }
}

export async function createCart() {
  const body = {
    currency: 'EUR',
  };
  const accessToken = await getToken();
  const res = await fetch('https://api.europe-west1.gcp.commercetools.com/ghpr/me/carts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  sessionStorage.setItem('cartId', data.id);
  return data;
}

export async function getCartById(cartId: string) {
  const accessToken = await getToken();
  const res = await fetch(`https://api.europe-west1.gcp.commercetools.com/ghpr/carts/${cartId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  return result.version;
}

export async function addProductToCard(productId: string, version: number, cartId: string) {
  const accessToken = await getToken();
  const data = {
    version: version,
    actions: [
      {
        action: 'addLineItem',
        productId: productId,
      },
    ],
  };
  const res = await fetch(`https://api.europe-west1.gcp.commercetools.com/ghpr/carts/${cartId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
}

export async function setCustomerId(cartId: string, version: number, customerId: string) {
  const accessToken = await getToken();
  const data = {
    version: version,
    actions: [
      {
        action: 'setCustomerId',
        customerId: customerId,
      },
    ],
  };
  const res = await fetch(`https://api.europe-west1.gcp.commercetools.com/ghpr/carts/${cartId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
}

export async function getCartByCustomerId(customerId: string) {
  const accessToken = await getToken();
  const res = await fetch(`https://api.europe-west1.gcp.commercetools.com/ghpr/carts/customer-id=${customerId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  return result;
}

export async function getProductsFromCartById(cartId: string) {
  const accessToken = await getToken();
  const res = await fetch(`https://api.europe-west1.gcp.commercetools.com/ghpr/carts/${cartId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  return result;
}

export async function removeProductFromCart(version: string, cartId: string, cardId: string) {
  const accessToken = await getToken();
  const data = {
    version: version,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId: cardId,
      },
    ],
  };
  const res = await fetch(`https://api.europe-west1.gcp.commercetools.com/ghpr/carts/${cartId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
}

export async function deleteAllProductsFromCart(cartId: string) {
  const data = await getProductsFromCartById(cartId);
  for (let i = 0; i < data.lineItems.length; i++) {
    const Data = await getProductsFromCartById(cartId);
    await removeProductFromCart(Data.version, cartId, data.lineItems[i].id);
  }
  App.renderPage('basket-page');
}

export async function changeLineItem(version: string, cartId: string, cardId: string, quantity: number) {
  const accessToken = await getToken();
  const data = {
    version: version,
    actions: [
      {
        action: 'changeLineItemQuantity',
        lineItemId: cardId,
        quantity: quantity,
      },
    ],
  };
  const res = await fetch(`https://api.europe-west1.gcp.commercetools.com/ghpr/carts/${cartId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
}
