export type Products = {
results: Array<Results>;
};
export type Results = {
  masterData: Staged;
  masterVariant: ImagesPrices;
  name: Lang;
  description: Lang;
  prices: Array<Prices>;
  id: string;
};
export type Staged = {
  staged: MasterVariant;
  current: Name;
};
export type Name = {
name: Lang;
description: Lang;
};
export type Lang = {
  'en-US': string;
};
export type MasterVariant = {
  masterVariant: ImagesPrices;
};
export type ImagesPrices = {
  images: Array<Images>;
  prices: Array<Prices>;
};
export type Images = {
  url: string
};
export type Prices = {
  value: Value;
  discounted: Value;
  centAmount:string;
  currencyCode: string;
};
export type Value = {
  centAmount: string;
  currencyCode: string;
  value: Prices;
};



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

export function createProductsCards(data: Products) {
  const products = document.querySelector('.products');
  if (products) {
    products.innerHTML = '';
  }
  for (let i = 0; i < data.results.length; i++) {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('cardWrapper');
    cardWrapper.setAttribute('id', `${data.results[i].id}`);
    const img = document.createElement('img');
    img.src = `${data.results[i].masterData.staged.masterVariant.images[0].url}`;
    img.alt = 'pic';
    const name = document.createElement('h3');
    name.classList.add('productName');
    name.textContent = `${data.results[i].masterData.current.name['en-US']}`;
    const description = document.createElement('p');
    description.classList.add('productDescription');
    description.textContent = `${data.results[i].masterData.current.description['en-US']}`;
    const price = document.createElement('h3');
    price.classList.add('productPrice');
    const priceValue = `${data.results[i].masterData.staged.masterVariant.prices[0].value.centAmount}`;
    price.textContent = `${(priceValue.slice(0, -2))} ${data.results[i].masterData.staged.masterVariant.prices[0].value.currencyCode}`;

    cardWrapper.append(img);
    cardWrapper.append(name);
    cardWrapper.append(description);
    cardWrapper.append(price);

    if (data.results[i].masterData.staged.masterVariant.prices[0].discounted) {
      price.style.textDecoration = 'line-through';
      const discount = document.createElement('h3');
      discount.classList.add('discount');
      const discountValue = `${data.results[i].masterData.staged.masterVariant.prices[0].discounted.value.centAmount}`;
      discount.textContent = `${discountValue.slice(0, -2)} ${data.results[i].masterData.staged.masterVariant.prices[0].discounted.value.currencyCode}`;
      cardWrapper.append(discount);
    }
    if (products) {
      products.append(cardWrapper);
    }
  }
}

export async function getSubCategoryProduct(id: string) {
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

  const res = await fetch(`https://api.europe-west1.gcp.commercetools.com/ghpr/product-projections/search?filter=categories.id: "${id}"`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}

export function createProductsCardsCategory(data: Products) {
  const products = document.querySelector('.products');
  if (products) {
    products.innerHTML = '';
  }
  for (let i = 0; i < data.results.length; i++) {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('cardWrapper');
    cardWrapper.setAttribute('id', `${data.results[i].id}`);
    const img = document.createElement('img');
    img.src = `${data.results[i].masterVariant.images[0].url}`;
    img.alt = 'pic';
    const name = document.createElement('h3');
    name.classList.add('productName');
    name.textContent = `${data.results[i].name['en-US']}`;
    const description = document.createElement('p');
    description.classList.add('productDescription');
    description.textContent = `${data.results[i].description['en-US']}`;
    const price = document.createElement('h3');
    price.classList.add('productPrice');
    const priceValue = `${data.results[i].masterVariant.prices[0].value.centAmount}`;
    price.textContent = `${(priceValue.slice(0, -2))} ${data.results[i].masterVariant.prices[0].value.currencyCode}`;

    cardWrapper.append(img);
    cardWrapper.append(name);
    cardWrapper.append(description);
    cardWrapper.append(price);

    if (data.results[i].masterVariant.prices[0].discounted) {
      price.style.textDecoration = 'line-through';
      const discount = document.createElement('h3');
      discount.classList.add('discount');
      const discountValue = `${data.results[i].masterVariant.prices[0].discounted.value.centAmount}`;
      discount.textContent = `${discountValue.slice(0, -2)} ${data.results[i].masterVariant.prices[0].discounted.value.currencyCode}`;
      cardWrapper.append(discount);
    }
    if (products) {
      products.append(cardWrapper);
    }
  }
}

export async function nameFilter() {
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
  const id = sessionStorage.getItem('categoryId'); 
  const res = await fetch(`https://api.europe-west1.gcp.commercetools.com/ghpr/product-projections/search?filter=categories.id: "${id}"&sort=name.en-US ASC`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}

export async function mainNameFilter() {
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
  const res = await fetch('https://api.europe-west1.gcp.commercetools.com/ghpr/product-projections/search?sort=name.en-US ASC', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}

export async function priceFilter() {
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
  const id = sessionStorage.getItem('categoryId'); 
  const res = await fetch(`https://api.europe-west1.gcp.commercetools.com/ghpr/product-projections/search?filter=categories.id: "${id}"&sort=price ASC`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}

export async function mainPriceFilter() {
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
  const res = await fetch('https://api.europe-west1.gcp.commercetools.com/ghpr/product-projections/search?sort=price ASC', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}

export async function productSearch(search: string) {
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
  const res = await fetch(`https://api.europe-west1.gcp.commercetools.com/ghpr/product-projections/search?fuzzy=true&fuzzyLevel=1&text.en-US=${search}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}