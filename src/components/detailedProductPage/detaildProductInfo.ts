import { Results } from '../catalogProductPage/products';

export async function getProduct() {
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

    const res = await fetch(`https://api.europe-west1.gcp.commercetools.com/ghpr/products/${sessionStorage.getItem('productId')}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      return data;
}

export function createProductsCards(data: Results) {
    const DetailedProductWrapper = document.querySelector('.DetailedProductWrapper');
    if (DetailedProductWrapper) {
    DetailedProductWrapper.innerHTML = '';
    }
      const cardWrapper = document.createElement('div');
      cardWrapper.classList.add('detailedWrapper');
      cardWrapper.setAttribute('id', `${data.id}`);
      const img = document.createElement('img');
      img.src = `${data.masterData.staged.masterVariant.images[0].url}`;
      img.alt = 'pic';
      const name = document.createElement('h3');
      name.classList.add('detailedName');
      name.textContent = `${data.masterData.current.name['en-US']}`;
      const description = document.createElement('p');
      description.classList.add('detailedDescription');
      description.textContent = `${data.masterData.current.description['en-US']}`;
      const price = document.createElement('h3');
      price.classList.add('detailedPrice');
      const priceValue = `${data.masterData.staged.masterVariant.prices[0].value.centAmount}`;
      price.textContent = `${(priceValue.slice(0, -2))} ${data.masterData.staged.masterVariant.prices[0].value.currencyCode}`;
  
      cardWrapper.append(img);
      cardWrapper.append(name);
      cardWrapper.append(description);
      cardWrapper.append(price);
  
      if (data.masterData.staged.masterVariant.prices[0].discounted) {
        price.style.textDecoration = 'line-through';
        const discount = document.createElement('h3');
        discount.classList.add('detaileddiscount');
        const discountValue = `${data.masterData.staged.masterVariant.prices[0].discounted.value.centAmount}`;
        discount.textContent = `${discountValue.slice(0, -2)} ${data.masterData.staged.masterVariant.prices[0].discounted.value.currencyCode}`;
        cardWrapper.append(discount);
      }
      if (DetailedProductWrapper) {
        DetailedProductWrapper.append(cardWrapper);
      }
  }
  