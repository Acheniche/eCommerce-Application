export function adressShiping(typ: string, street: string, city: string, postalCode: string, country: string) {
  return `
  <div class="address-shipping">
  <h3>Shipping address</h3>
  <div class="street-wrapper_shipping">
    <span>Street</span>
    <div class="tooltip">
      <input type="text" class="street_shipping" id="profil-street-billing" placeholder="Street" value="${street}">
      <span class="icon">!</span>
      <span class="tooltip-text">Write your street, this field should not be left empty</span>
    </div>
    <div class="street-valid-span">
      <span class="not-valid-street_shipping not-valid"></span>
    </div>


  <div class="city-wrapper_shipping">
    <span>City</span>
    <div class="tooltip">
      <input type="text" class="city_shipping" id="registration-city_shipping" placeholder="City" value="${city}">
      <span class="icon">!</span>
      <span class="tooltip-text">City must not contain: special characters or numbers</span>
    </div>
    <div class="city-valid-span">
      <span class="not-valid-city_shipping not-valid"></span>
    </div>
  </div>

  <div class="postal-wrapper_shipping">
    <span>Postal code</span>
    <div class="tooltip">
      <input type="number" class="postal-code_shipping" id="registration-postal_shipping" placeholder="Postal code" value="${postalCode}">
      <span class="icon">!</span>
      <span class="tooltip-text">Postal code must be 5 digits</span>
    </div>
    <div class="postal-code-valid-span">
      <span class="not-valid-postal-code_shipping not-valid"></span>
    </div>
  </div>

  <div class="country-wrapper_shipping">
    <span>Country</span>
    <div class="tooltip">
      <select id="country_shipping">
        <option>${country == 'DE' ? 'Germany' : 'USA'}</option>
        <option>USA</option>
        <option>Germany</option>
      </select>
      <span class="icon">!</span>
    <span class="tooltip-text">Choose a country</span>
    </div>
    <div class="country-valid-span">
      <span class="not-valid-country_shipping not-valid"></span>
    </div>
  </div>

  <div>
  <span id="checkbox-ios-text2">Set default shipping address</span>
  <label class="checkbox-ios">
  <input type="checkbox" class="change-check_shipping" ${typ == 'check' ? 'checked="checked"' : ''}>
  <span class="checkbox-ios-switch"></span>
  </label>
</div>
<div>
<button class="add-button-adressShiping">add new adress</button>
<button class="delete-button-adressShiping">delete adress</button>

</div>
</div>
</div>
  `;
}

export function adressBilling(typ: string, street: string, city: string, postalCode: string, country: string) {
  return `
  <div class="address-wrapper_billing">
  <div class="street-wrapper">
  <h3>Billing address</h3>
    <span>Street</span>
    <div class="tooltip">
      <input type="text" class="street" id="registration-street_billing" placeholder="Street" value="${street}">
      <span class="icon">!</span>
      <span class="tooltip-text">Write your street, this field should not be left empty</span>
    </div>
    <div class="street-valid-span">
      <span class="not-valid-street not-valid"></span>
    </div>
  </div>

  <div class="city-wrapper">
    <span>City</span>
    <div class="tooltip">
      <input type="text" class="city" id="registration-city_billing" placeholder="City" value="${city}">
      <span class="icon">!</span>
      <span class="tooltip-text">City must not contain: special characters or numbers</span>
    </div>
    <div class="city-valid-span">
      <span class="not-valid-city not-valid"></span>
    </div>
  </div>

  <div class="postal-wrapper">
    <span>Postal code</span>
    <div class="tooltip">
      <input type="number" class="postal-code" id="registration-postal_billing" placeholder="Postal code" value="${postalCode}">
      <span class="icon">!</span>
      <span class="tooltip-text">Postal code must be 5 digits</span>
    </div>
    <div class="postal-code-valid-span">
      <span class="not-valid-postal-code not-valid"></span>
    </div>
  </div>

  <div class="country-wrapper">
    <span>Country</span>
    <div class="tooltip">
      <select id="country_billing" >
        <option>${country == 'DE' ? 'Germany' : 'USA'}</option>
        <option>USA</option>
        <option>Germany</option>
      </select>
      <span class="icon">!</span>
    <span class="tooltip-text">Choose a country</span>
    </div>
    <div class="country-valid-span">
      <span class="not-valid-country not-valid"></span>
    </div>
  </div>
  <div>
<span id="checkbox-ios-text2">Set default billing address</span>
  <label class="checkbox-ios">

  <input type="checkbox" class="change-check_billing" ${typ == 'check' ? 'checked="checked"' : ''}>
  <span class="checkbox-ios-switch"></span>
  </label>
  <div>
  <button class="add-button-adressBilling">add new adress</button>
  <button class="delete-button-adressBilling">delete adress</button>

  </div>

</div>
  </div>`;
}

export function adressShiping1() {
  return `
  <div class="address-shipping">
  <h3>Shipping address</h3>
  <div class="street-wrapper_shipping">
    <span>Street</span>
    <div class="tooltip">
      <input type="text" class="street_shipping" id="registration-street_shipping" placeholder="Street">
      <span class="icon">!</span>
      <span class="tooltip-text">Write your street, this field should not be left empty</span>
    </div>
    <div class="street-valid-span">
      <span class="not-valid-street_shipping not-valid"></span>
    </div>


  <div class="city-wrapper_shipping">
    <span>City</span>
    <div class="tooltip">
      <input type="text" class="city_shipping" id="registration-city_shipping" placeholder="City">
      <span class="icon">!</span>
      <span class="tooltip-text">City must not contain: special characters or numbers</span>
    </div>
    <div class="city-valid-span">
      <span class="not-valid-city_shipping not-valid"></span>
    </div>
  </div>

  <div class="postal-wrapper_shipping">
    <span>Postal code</span>
    <div class="tooltip">
      <input type="number" class="postal-code_shipping" id="registration-postal_shipping" placeholder="Postal code">
      <span class="icon">!</span>
      <span class="tooltip-text">Postal code must be 5 digits</span>
    </div>
    <div class="postal-code-valid-span">
      <span class="not-valid-postal-code_shipping not-valid"></span>
    </div>
  </div>

  <div class="country-wrapper_shipping">
    <span>Country</span>
    <div class="tooltip">
      <select id="country_shipping">
        <option></option>
        <option>USA</option>
        <option>Germany</option>
      </select>
      <span class="icon">!</span>
    <span class="tooltip-text">Choose a country</span>
    </div>
    <div class="country-valid-span">
      <span class="not-valid-country_shipping not-valid"></span>
    </div>
  </div>

  <div>
  <span id="checkbox-ios-text2">Set default shipping address</span>
  <label class="checkbox-ios">
  <input type="checkbox" class="change-check_shipping">
  <span class="checkbox-ios-switch"></span>
  </label>
</div>
<button class="add-button-adressShiping">add new adress</button>
<button class="delete-button-adressShiping">delete adress</button>
<div>
</div>
</div>
</div>
  `;
}

export function adressBilling1() {
  return `
  <div class="address-wrapper_billing">
<div class="street-wrapper">
<h3>Billing address</h3>
  <span>Street</span>
  <div class="tooltip">
    <input type="text" class="street" id=registration-street_billing" placeholder="Street">
    <span class="icon">!</span>
    <span class="tooltip-text">Write your street, this field should not be left empty</span>
  </div>
  <div class="street-valid-span">
    <span class="not-valid-street not-valid"></span>
  </div>
</div>

<div class="city-wrapper">
  <span>City</span>
  <div class="tooltip">
    <input type="text" class="city" id="registration-city_billing" placeholder="City">
    <span class="icon">!</span>
    <span class="tooltip-text">City must not contain: special characters or numbers</span>
  </div>
  <div class="city-valid-span">
    <span class="not-valid-city not-valid"></span>
  </div>
</div>

<div class="postal-wrapper">
  <span>Postal code</span>
  <div class="tooltip">
    <input type="number" class="postal-code" id="registration-postal_billing" placeholder="Postal code">
    <span class="icon">!</span>
    <span class="tooltip-text">Postal code must be 5 digits</span>
  </div>
  <div class="postal-code-valid-span">
    <span class="not-valid-postal-code not-valid"></span>
  </div>
</div>

<div class="country-wrapper">
  <span>Country</span>
  <div class="tooltip">
    <select id="country_billing">
      <option></option>
      <option>USA</option>
      <option>Germany</option>
    </select>
    <span class="icon">!</span>
  <span class="tooltip-text">Choose a country</span>
  </div>
  <div class="country-valid-span">
    <span class="not-valid-country not-valid"></span>
  </div>
</div>
<div>
<span id="checkbox-ios-text2">Set default billing address</span>
<label class="checkbox-ios">



<input type="checkbox" class="change-check_billing">
<span class="checkbox-ios-switch"></span>
</label>


</div>

<div>
<button class="delete-button-adressBilling">
  delete this address
</button>
<button class="add-button-adressBilling">
add new address
</button>
</div>
</div>


</div>
</div>`;
}

/* export default function innerAddres(data:ResponseType) {
  let i:number = 0;
  while (i < data.addresses.length) {
    console.log(data.addresses[i].id);
    const container = document.querySelector('#adress-profail-id3');
    const street = data.addresses[i].streetName;
    const city = data.addresses[i].city;
    const postalCode = data.addresses[i].postalCode;
    const country = data.addresses[i].country;
    if (data.billingAddressIds.includes(data.addresses[i].id)) {
      if (data.addresses[i].id === data.defaultBillingAddressId) {
        container?.insertAdjacentHTML('beforeend', adressBilling('check', street, city, postalCode, country));
      } else {
        container?.insertAdjacentHTML('beforeend', adressBilling('no', street, city, postalCode, country));
      }
    } else {
      if (data.addresses[i].id === data.defaultShippingAddressId) {
        console.log('NANANAN');
        container?.insertAdjacentHTML('beforeend', adressShiping('check', street, city, postalCode, country));
      } else {
        console.log('NOOOO');
        container?.insertAdjacentHTML('beforeend', adressShiping('no', street, city, postalCode, country));
      }
      //innerAddresBuilding('shiping')
    }
    i++;
  }
} */
