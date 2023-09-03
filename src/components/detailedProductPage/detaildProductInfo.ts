import { Results } from '../catalogProductPage/products';

export default class Carousel {
  public renderCarouselWrapper() {
    return `
    <div class="container">

      <div class="slider">
          <div class="slider-line">
              <img src="./images/elephant.png" alt="">
              <img src="./images/gorilla.png" alt="">
              <img src="./images/home.png" alt="">
              <img src="./images/ice_cream.png" alt="">
          </div>
      </div>
      <button class="slider-prev">Prev</button>
      <button class="slider-next">Next</button>
    </div>
    `;
  }

  public renderCarouselItem(url: string) {
    return `
    <div class="item">
      <div class="cards" id="id1">
        <img src="${url}"cards__img" alt="pic" />
      </div>
    </div>
    `;
  }
}

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

  const res = await fetch(
    `https://api.europe-west1.gcp.commercetools.com/ghpr/products/${sessionStorage.getItem('productId')}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
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
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('container');
  const slider = document.createElement('div');
  slider.classList.add('slider');
  const sliderLine = document.createElement('div');
  sliderLine.classList.add('slider-line');

  const buttonNext = document.createElement('button');
  buttonNext.classList.add('slider-next');
  buttonNext.innerText = 'Next';

  const buttonPrev = document.createElement('button');
  buttonPrev.classList.add('slider-next');
  buttonPrev.classList.add('inactive');

  buttonPrev.innerText = 'Prev';

  carouselWrapper.append(buttonPrev);
  carouselWrapper.append(buttonNext);

  for (let i = 0; i < data.masterData.staged.masterVariant.images.length; i = i + 1) {

    const img = document.createElement('img');
    img.src = `${data.masterData.staged.masterVariant.images[i].url}`;
    img.alt = 'pic';
    sliderLine.append(img);

  }
  slider.append(sliderLine);
  carouselWrapper.append(slider);

  const name = document.createElement('h3');
  name.classList.add('detailedName');
  name.textContent = `${data.masterData.current.name['en-US']}`;
  const description = document.createElement('p');
  description.classList.add('detailedDescription');
  description.textContent = `${data.masterData.current.description['en-US']}`;
  const price = document.createElement('h3');
  price.classList.add('detailedPrice');
  const priceValue = `${data.masterData.staged.masterVariant.prices[0].value.centAmount}`;
  price.textContent = `${priceValue.slice(0, -2)} ${data.masterData.staged.masterVariant.prices[0].value.currencyCode}`;

  cardWrapper.append(carouselWrapper);
  cardWrapper.append(name);
  cardWrapper.append(description);
  cardWrapper.append(price);

  let offset = 0;

  // if (offset == 0) {
  //   buttonPrev.classList.add('inactive');
  // }
  buttonNext.addEventListener('click', function () {
    if (offset < 512) {
      offset = offset + 256;
      sliderLine.style.left = -offset + 'px';
      if (offset == 512) {
        buttonNext.classList.add('inactive');
        buttonPrev.classList.remove('inactive');
      }
    }

  });

  buttonPrev.addEventListener('click', function () {
    if (offset > 0) {
      offset = offset - 256;
      sliderLine.style.left = -offset + 'px';
      if (offset == 0) {
        buttonPrev.classList.add('inactive');
        buttonNext.classList.remove('inactive');
      }
    }

  });

  if (data.masterData.staged.masterVariant.prices[0].discounted) {
    price.style.textDecoration = 'line-through';
    const discount = document.createElement('h3');
    discount.classList.add('detaileddiscount');
    const discountValue = `${data.masterData.staged.masterVariant.prices[0].discounted.value.centAmount}`;
    discount.textContent = `${discountValue.slice(0, -2)} ${
      data.masterData.staged.masterVariant.prices[0].discounted.value.currencyCode
    }`;
    cardWrapper.append(discount);
  }
  if (DetailedProductWrapper) {
    DetailedProductWrapper.append(cardWrapper);
  }
}
