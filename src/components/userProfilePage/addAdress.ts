import { adressBilling1, adressShiping1 } from './innerAdressBuilding';
function deleteAddressShiping(data: string[]) {
  const allAdressesButtonDelete = document.querySelectorAll('.delete-button-adressShiping');
  const buttonDelete = [...allAdressesButtonDelete];
  buttonDelete.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      if (allAdressesButtonDelete.length > 1) {
        deleteAddressShiping(data);
      } else {
        deleteAddressShiping(data);
      }
    });
  });
}

function deleteAddress(data: string[]) {
  const allAdressesButtonDelete = document.querySelectorAll('.delete-button-adressBilling');
  const buttonDelete = [...allAdressesButtonDelete];
  buttonDelete.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      if (allAdressesButtonDelete.length > 1) {
        deleteAddress(data);
      } else {
        deleteAddress(data);
      }
    });
  });
}

function addAddressShiping(data: string[]) {
  const allAdressesButton = document.querySelectorAll('.add-button-adressShiping');
  const divarray = [...allAdressesButton];
  divarray.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      const container = document.querySelector('#adress-profail-id3');
      container?.insertAdjacentHTML('beforeend', adressShiping1());
      addAddressShiping(data);
    });
  });
}

export default function addAddress(data: string[]) {
  deleteAddress(data);
  addAddressShiping(data);
  deleteAddressShiping(data);
  const allAdressesButton = document.querySelectorAll('.add-button-adressBilling');
  const divarray = [...allAdressesButton];
  divarray.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      const container = document.querySelector('#adress-profail-id3');
      container?.insertAdjacentHTML('beforeend', adressBilling1());
      addAddress(data);
    });
  });
}

//console.log((<HTMLElement>e.target).parentElement?.parentElement?.parentElement)
