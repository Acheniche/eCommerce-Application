import { adressBilling, adressShiping } from './innerAdressBuilding';
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
            //console.log(data.shippingAddressIds)
            let i = 0;
            while (i < data.addresses.length) {
              console.log(data.addresses[i].id);
              const containe = document.querySelector('#adress-profail-id3');
              const street = data.addresses[i].streetName;
              const city = data.addresses[i].city;
              const postalCode = data.addresses[i].postalCode;
              const country = data.addresses[i].country;
              if (data.billingAddressIds.includes(data.addresses[i].id)) {
                if (data.addresses[i].id === data.defaultBillingAddressId) {
                  containe?.insertAdjacentHTML('beforeend', adressBilling('check', street, city, postalCode, country));
                } else {
                  containe?.insertAdjacentHTML('beforeend', adressBilling('no', street, city, postalCode, country));
                }
              } else {
                if (data.addresses[i].id === data.defaultShippingAddressId) {
                  console.log('NANANAN');
                  containe?.insertAdjacentHTML('beforeend', adressShiping('check', street, city, postalCode, country));
                } else {
                  console.log('NOOOO');
                  containe?.insertAdjacentHTML('beforeend', adressShiping('no', street, city, postalCode, country));
                }
                //innerAddresBuilding('shiping')
              }
              i++;
            }
            setTimeout(() => {
              addAddress(data);
              validationProfile.buttonListener();
            }, 100);
          });
        }
      });
    }
  }
}
