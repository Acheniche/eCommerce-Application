import { addProductToCard, getCartById, getProductsFromCartById, removeProductFromCart } from '../basketPage/createAnonCart';
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

  const res = await fetch(
    `https://api.europe-west1.gcp.commercetools.com/ghpr/products/${window.location.hash.slice(1)}`,
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

  const modalWrapper = document.createElement('div');
  modalWrapper.classList.add('modal-wrapper');
  modalWrapper.classList.add('display-none');

  for (let i = 0; i < data.masterData.staged.masterVariant.images.length; i = i + 1) {
    const img = document.createElement('img');
    img.src = `${data.masterData.staged.masterVariant.images[i].url}`;
    img.alt = 'pic';
    sliderLine.append(img);
    img.addEventListener('click', () => {
      modalWrapper.classList.remove('display-none');
    });
  }
  slider.append(sliderLine);
  carouselWrapper.append(slider);
  slider.addEventListener('click', () => {
    modalWrapper.classList.remove('display-none');
  });
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
  const buttonBasket = document.createElement('button');
  buttonBasket.textContent = '➕ 🛒';
  buttonBasket.classList.add('button-basket');
  buttonBasket.disabled = true;

  const buttonRemoveFromBasket = document.createElement('button');
  buttonRemoveFromBasket.textContent = '-- 🛒';
  buttonRemoveFromBasket.classList.add('button-removeFromBasket');
  buttonRemoveFromBasket.disabled = true;

  const cartId = sessionStorage.getItem('cartId');
  if (cartId) {
  getProductsFromCartById(cartId).then((Data) => {
    if (Data.lineItems.length === 0) {
      buttonBasket.disabled = false;
      buttonRemoveFromBasket.disabled = true;
    }
    for (let i = 0; i < Data.lineItems.length; i++) {
      if (Data.lineItems[i].productId != data.id) {
        buttonBasket.disabled = false;
        buttonRemoveFromBasket.disabled = true;
      } else {
        buttonBasket.disabled = true;
        buttonRemoveFromBasket.disabled = false;
      }
    }
  });
  }

  cardWrapper.append(carouselWrapper);
  cardWrapper.append(name);
  cardWrapper.append(description);
  cardWrapper.append(price);
  cardWrapper.append(buttonBasket);
  cardWrapper.append(buttonRemoveFromBasket);

  const modalWindow = document.createElement('div');
  modalWindow.classList.add('modal-window');
  modalWrapper.append(modalWindow);

  const modalСarouselWrapper = document.createElement('div');
  modalСarouselWrapper.classList.add('modal-container');
  const modalSlider = document.createElement('div');
  modalSlider.classList.add('modal-slider');
  const modalSliderLine = document.createElement('div');
  modalSliderLine.classList.add('modal-slider-line');

  const modalButtonNext = document.createElement('button');
  modalButtonNext.classList.add('modal-slider-next');
  modalButtonNext.innerText = 'Next';

  const modalButtonPrev = document.createElement('button');
  modalButtonPrev.classList.add('modal-slider-next');
  modalButtonPrev.classList.add('modal-inactive');
  modalButtonPrev.innerText = 'Prev';

  const exitButton = document.createElement('button');
  exitButton.classList.add('exit-button');
  exitButton.innerText = 'Exit';
  modalСarouselWrapper.append(exitButton);

  modalСarouselWrapper.append(modalButtonPrev);
  modalСarouselWrapper.append(modalButtonNext);

  exitButton.addEventListener('click', () => {
    modalWrapper.classList.add('display-none');
  });
  modalWrapper.addEventListener('click', () => {
    modalWrapper.classList.add('display-none');
  });

  for (let i = 0; i < data.masterData.staged.masterVariant.images.length; i = i + 1) {
    const img = document.createElement('img');
    img.src = `${data.masterData.staged.masterVariant.images[i].url}`;
    img.alt = 'pic';
    modalSliderLine.append(img);
  }
  modalSlider.append(modalSliderLine);
  modalСarouselWrapper.append(modalSlider);

  modalWindow.append(modalСarouselWrapper);

  cardWrapper.append(modalWrapper);

  buttonBasket.addEventListener('click', (e) => {
    e.stopPropagation();
    buttonBasket.disabled = true;
    buttonRemoveFromBasket.disabled = false;
    const cardId = sessionStorage.getItem('productId');
    if (cartId && cardId) {
      getCartById(cartId).then((version) => {
        addProductToCard(cardId, version, cartId);
      });
    }
  });

  buttonRemoveFromBasket.addEventListener('click', (e) => {
    e.stopPropagation();
    buttonBasket.disabled = false;
    buttonRemoveFromBasket.disabled = true;
    const cardId = sessionStorage.getItem('productId');
    if (cartId && cardId) {
      getCartById(cartId).then((version) => {
        getProductsFromCartById(cartId).then((Data) => {
        for (let i = 0; i < Data.lineItems.length; i++) {
          if (Data.lineItems[i].productId === data.id) {
            removeProductFromCart(version, cartId, Data.lineItems[i].id);
          }
        }
      });
      });
    }
  });

  let offset: number = 0;
  let modalOffset: number = 0;

  modalSlider.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  buttonNext.addEventListener('click', function () {
    if (offset < 512) {
      offset = offset + 256;
      sliderLine.style.left = -offset + 'px';
      buttonPrev.classList.remove('inactive');
      if (offset == 512) {
        buttonNext.classList.add('inactive');
      }
    }
    if (modalOffset < 1024) {
      modalOffset = modalOffset + 512;
      modalSliderLine.style.left = -modalOffset + 'px';
      modalButtonPrev.classList.remove('modal-inactive');
      if (modalOffset == 1024) {
        modalButtonNext.classList.add('modal-inactive');
      }
    }
  });

  buttonPrev.addEventListener('click', function () {
    if (offset > 0) {
      offset = offset - 256;
      sliderLine.style.left = -offset + 'px';
      buttonNext.classList.remove('inactive');
      if (offset == 0) {
        buttonPrev.classList.add('inactive');
      }
    }
    if (modalOffset > 0) {
      modalOffset = modalOffset - 512;
      modalSliderLine.style.left = -modalOffset + 'px';
      modalButtonNext.classList.remove('modal-inactive');
      if (modalOffset == 0) {
        modalButtonPrev.classList.add('modal-inactive');
      }
    }
  });

  modalButtonNext.addEventListener('click', function (event) {
    if (modalOffset < 1024) {
      modalOffset = modalOffset + 512;
      modalSliderLine.style.left = -modalOffset + 'px';
      modalButtonPrev.classList.remove('modal-inactive');
      if (modalOffset == 1024) {
        modalButtonNext.classList.add('modal-inactive');
      }
    }
    if (offset < 512) {
      offset = offset + 256;
      sliderLine.style.left = -offset + 'px';
      buttonPrev.classList.remove('inactive');
      if (offset == 512) {
        buttonNext.classList.add('inactive');
      }
    }
    event.stopPropagation();
  });

  modalButtonPrev.addEventListener('click', function (event) {
    if (modalOffset > 0) {
      modalOffset = modalOffset - 512;
      modalSliderLine.style.left = -modalOffset + 'px';
      modalButtonNext.classList.remove('modal-inactive');
      if (modalOffset == 0) {
        modalButtonPrev.classList.add('modal-inactive');
      }
    }
    if (offset > 0) {
      offset = offset - 256;
      sliderLine.style.left = -offset + 'px';
      buttonNext.classList.remove('inactive');
      if (offset == 0) {
        buttonPrev.classList.add('inactive');
      }
    }
    event.stopPropagation();
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
