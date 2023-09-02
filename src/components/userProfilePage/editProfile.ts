// import { adressBilling, adressShiping } from './innerAdressBuilding';
import CreateProfilePage from '../../utils/templates/profilePageTemplates';
import { getUserProfile } from './profileInfo';
import ValidationProfile from './validationProfile';
import addAddress from './addAdress';

export default class EditProfilePage {
  public clearProfilePage() {
    const container = document.querySelector('.ProfileWrapper');
    if (container) {
      container.innerHTML = '';
    }
  }

  private cityInput(city: string) {
    return `
    <div class="city-wrapper">
    <div class="tooltip">
      <input type="text" class="city" id="registration-city_billing" placeholder="City" value="${city}">
      <span class="icon">!</span>
      <span class="tooltip-text">City must not contain: special characters or numbers</span>
    </div>
    <div class="city-valid-span">
      <span class="not-valid-city not-valid"></span>
    </div>
  </div>
    `;
  }

  private streetInput(street: string): string {
    return `
      <div class="street-wrapper">
        <div class="tooltip">
          <input type="text" class="street" id="registration-street_billing" placeholder="Street" value="${street}">
          <span class="icon">!</span>
          <span class="tooltip-text">Write your street, this field should not be left empty</span>
        </div>
        <div class="street-valid-span">
          <span class="not-valid-street not-valid"></span>
        </div>
      </div>
      `;
  }

  private postalInput(postalCode: string): string {
    return `
    <div class="postal-wrapper">
    <div class="tooltip">
      <input type="number" class="postal-code" id="registration-postal_billing" placeholder="Postal code" value="${postalCode}">
      <span class="icon">!</span>
      <span class="tooltip-text">Postal code must be 5 digits</span>
    </div>
    <div class="postal-code-valid-span">
      <span class="not-valid-postal-code not-valid"></span>
    </div>
  </div>
    `;
  }

  private createNewAddress() {
    const table = document.querySelector('table');
    const row = document.createElement('tr');
    const td1 = document.createElement('td');

    td1.insertAdjacentHTML('beforeend', this.cityInput(''));
    const td2 = document.createElement('td');
    td2.insertAdjacentHTML('beforeend', this.streetInput(''));
    const td3 = document.createElement('td');
    td3.insertAdjacentHTML('beforeend', this.postalInput(''));
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    td5.appendChild(document.createTextNode(''));
    const td6 = document.createElement('td');
    const td7 = document.createElement('td');
    const buttonDelete = document.createElement('button');
    td7.appendChild(buttonDelete);
    buttonDelete.innerText = 'Delete';
    buttonDelete.classList.add('button-DeleteProfile');
    td7.appendChild(buttonDelete);
    const selectElement = document.createElement('select');
    selectElement.id = 'country_billing';


    const option1 = document.createElement('option');
    option1.textContent = '';
    const option2 = document.createElement('option');
    option2.textContent = 'USA';
    const option3 = document.createElement('option');
    option3.textContent = 'Germany';

    selectElement.appendChild(option1);
    selectElement.appendChild(option2);
    selectElement.appendChild(option3);

    td4.appendChild(selectElement);

    const selectElement1 = document.createElement('select');
    selectElement1.id = 'address_billing';
    const option11 = document.createElement('option');
    const option22 = document.createElement('option');
    option22.textContent = 'Billing';
    const option33 = document.createElement('option');
    option33.textContent = 'Shipping';
    option11.textContent = '';
    selectElement1.appendChild(option11);
    selectElement1.appendChild(option22);
    selectElement1.appendChild(option33);

    td6.appendChild(selectElement1);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
    row.appendChild(td6);
    row.appendChild(td7);
    table?.appendChild(row);
    setTimeout(() => {
      this.deleteButtonListener();
    }, 10);
  }

  private deleteButtonListener() {
    const deleteButtons = document.querySelectorAll('.button-DeleteProfile');


    deleteButtons.forEach((button) => {
      button.addEventListener('click', () => {

        const row = button.closest('tr');

        if (row) {
          row.remove();
        }
      });
    });
  }

  public buttonListener(): void {
    const editButton: HTMLButtonElement | null = document.querySelector('.edit-profile-button');
    if (editButton) {
      editButton.addEventListener('click', () => {
        this.clearProfilePage();

        const email = sessionStorage.getItem('email');
        if (email) {
          getUserProfile(email).then((data) => {
            const validationProfile = new ValidationProfile();
            const profile = new CreateProfilePage(data);
            const container = document.querySelector('.ProfileWrapper');
            container?.insertAdjacentHTML('beforeend', profile.editBlock());
            (<HTMLInputElement>document.getElementById('registration-firstname')).value = data.firstName;
            (<HTMLInputElement>document.getElementById('registration-lastname')).value = data.lastName;
            (<HTMLInputElement>document.getElementById('registration-dateOfBirth')).value = data.dateOfBirth;
            (<HTMLInputElement>document.getElementById('registration-email')).value = data.email;

            const table = document.createElement('table');
            const Row = document.createElement('tr');
            const Td1 = document.createElement('th');
            Td1.appendChild(document.createTextNode('City'));
            const Td2 = document.createElement('th');
            Td2.appendChild(document.createTextNode('Street'));
            const Td3 = document.createElement('th');
            Td3.appendChild(document.createTextNode('Postal Code'));
            const Td4 = document.createElement('th');
            Td4.appendChild(document.createTextNode('Country'));
            const Td5 = document.createElement('th');
            Td5.appendChild(document.createTextNode('Id'));
            const Td6 = document.createElement('td');
            Td6.innerText = 'B/S Addresses';
            const Td7 = document.createElement('th');
            const buttonAddAddress = document.createElement('button');
            Td7.appendChild(buttonAddAddress);
            buttonAddAddress.innerText = 'Add Address';
            buttonAddAddress.classList.add('button-AddAddressProfile');
            Row.appendChild(Td1);
            Row.appendChild(Td2);
            Row.appendChild(Td3);
            Row.appendChild(Td4);
            Row.appendChild(Td5);
            Row.appendChild(Td6);
            Row.appendChild(Td7);
            table.appendChild(Row);


            for (let i = 0; i < data.addresses.length; i++) {
              const row = document.createElement('tr');
              const td1 = document.createElement('td');

              // td1.appendChild(document.createTextNode(data.addresses[i].city));
              td1.insertAdjacentHTML('beforeend', this.cityInput(data.addresses[i].city));
              const td2 = document.createElement('td');
              // td2.appendChild(document.createTextNode(data.addresses[i].streetName));
              td2.insertAdjacentHTML('beforeend', this.streetInput(data.addresses[i].streetName));
              const td3 = document.createElement('td');
              // td3.appendChild(document.createTextNode(data.addresses[i].postalCode));
              td3.insertAdjacentHTML('beforeend', this.postalInput(data.addresses[i].postalCode));
              const td4 = document.createElement('td');
              // td4.appendChild(document.createTextNode(data.addresses[i].country));
              const td5 = document.createElement('td');
              td5.appendChild(document.createTextNode(data.addresses[i].id));
              const td6 = document.createElement('td');
              const selectElement = document.createElement('select');
              selectElement.id = 'country_billing';

              const td7 = document.createElement('td');
              const buttonDelete = document.createElement('button');
              td7.appendChild(buttonDelete);
              buttonDelete.innerText = 'Delete';
              buttonDelete.classList.add('button-DeleteProfile');
              td7.appendChild(buttonDelete);


              const option1 = document.createElement('option');
              option1.textContent = data.addresses[i].country == 'DE' ? 'Germany' : 'USA';
              const option2 = document.createElement('option');
              option2.textContent = 'USA';
              const option3 = document.createElement('option');
              option3.textContent = 'Germany';

              selectElement.appendChild(option1);
              selectElement.appendChild(option2);
              selectElement.appendChild(option3);

              td4.appendChild(selectElement);
              console.log('data.addresses[i].id', data.addresses[i].id);
              console.log('data.defaultBillingAddressId', data.defaultBillingAddressId);
              const selectElement1 = document.createElement('select');
              selectElement1.id = 'address_billing';
              const option11 = document.createElement('option');
              const option22 = document.createElement('option');
              option22.textContent = 'Billing';
              const option33 = document.createElement('option');
              option33.textContent = 'Shipping';
              if (data.billingAddressIds.includes(data.addresses[i].id)) {

                if (data.addresses[i].id === data.defaultBillingAddressId) {
                  option11.textContent = 'Billing';
                  selectElement1.appendChild(option11);
                  selectElement1.appendChild(option22);
                  selectElement1.appendChild(option33);
                  td6.appendChild(selectElement1);
                } else {
                  option11.textContent = 'Billing';
                  selectElement1.appendChild(option11);
                  selectElement1.appendChild(option22);
                  selectElement1.appendChild(option33);
                  td6.appendChild(selectElement1);
                }
              } else {
                if (data.addresses[i].id === data.defaultShippingAddressId) {
                  option11.textContent = 'Shipping';
                  selectElement1.appendChild(option11);
                  selectElement1.appendChild(option22);
                  selectElement1.appendChild(option33);
                  td6.appendChild(selectElement1);
                } else {
                  option11.textContent = 'Shipping';
                  selectElement1.appendChild(option11);
                  selectElement1.appendChild(option22);
                  selectElement1.appendChild(option33);
                  td6.appendChild(selectElement1);
                }
              }
              row.appendChild(td1);
              row.appendChild(td2);
              row.appendChild(td3);
              row.appendChild(td4);
              row.appendChild(td5);
              row.appendChild(td6);
              row.appendChild(td7);
              table.appendChild(row);
            }
            const div = document.getElementById('table-wrapper');
            div?.append(table);

            setTimeout(() => {
              this.deleteButtonListener();

              addAddress(data);
              validationProfile.buttonListener();
              buttonAddAddress.addEventListener('click', () => {
                this.createNewAddress();
              });
            }, 100);
          });
        }
      });
    }
  }
}
