export default function checkButton() {
  const allCheck = document.querySelectorAll('.change-check') as NodeListOf<HTMLInputElement>;

  function removeEvery(allElem: NodeListOf<HTMLInputElement>, param: string) {
    allElem.forEach((e) => {
      e.classList.remove(param);
      e.checked = false;
    });
  }
  allCheck.forEach((check) => {
    check.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      const target = e.target as HTMLInputElement;
      const tr = target.closest('tr') as HTMLTableRowElement; // Найти ближайший родительский элемент <tr>
      const addressBillingSelect = tr?.querySelector('#address_billing') as HTMLSelectElement;
      const addressBillingValue = addressBillingSelect?.value;

      if (target.classList.contains('billing') || target.classList.contains('shipping')) {
        target.classList.remove('billing');
        target.classList.remove('shipping');
      } else if (addressBillingValue == '') {
        target.checked = false;
      } else if (addressBillingValue == 'Billing') {
        const allBilling = document.querySelectorAll('.billing') as NodeListOf<HTMLInputElement>;
        removeEvery(allBilling, 'billing');
        target.classList.add('billing');
      } else if (addressBillingValue == 'Shipping') {
        const allShipping = document.querySelectorAll('.shipping') as NodeListOf<HTMLInputElement>;
        removeEvery(allShipping, 'shipping');
        target.classList.add('shipping');
      }
    });
  });
}

// console.log((e.target as HTMLElement).parentElement?.parentElement?.previousSibling?.previousSibling?.firstChild)
/*       if(allCheck[i].classList.contains('billing')){
        console.log("1")
      }else if(allCheck[i].classList.contains('billing'))
  */
