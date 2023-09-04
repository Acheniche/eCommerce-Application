import Page from '../../utils/templates/page';
import CreateProfilePage from '../../utils/templates/profilePageTemplates';
import './style.css';
import App from '../app';
import { getUserProfile } from '../../components/userProfilePage/profileInfo';
import EditProfilePage from './editProfile';

class ProfilePage extends Page {
  static TextObject = {
    MainTitle: 'Profile',
  };

  render(): HTMLElement {
    if (App.isLogin === true) {
      const title = this.createHeaderTitle(ProfilePage.TextObject.MainTitle);
      this.container.classList.add('ProfileWrapper');
      this.container.append(title);
      const email = sessionStorage.getItem('email');
      if (email) {
        getUserProfile(email).then((data) => {
          const editProfile = new EditProfilePage();
          const profile = new CreateProfilePage(data);
          this.container.insertAdjacentHTML('beforeend', profile.block());
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
          Td6.appendChild(document.createTextNode(''));
          Row.appendChild(Td1);
          Row.appendChild(Td2);
          Row.appendChild(Td3);
          Row.appendChild(Td4);
          Row.appendChild(Td5);
          Row.appendChild(Td6);
          table.appendChild(Row);

          for (let i = 0; i < data.addresses.length; i++) {
            const row = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.appendChild(document.createTextNode(data.addresses[i].city));
            const td2 = document.createElement('td');
            td2.appendChild(document.createTextNode(data.addresses[i].streetName));
            const td3 = document.createElement('td');
            td3.appendChild(document.createTextNode(data.addresses[i].postalCode));
            const td4 = document.createElement('td');
            td4.appendChild(document.createTextNode(data.addresses[i].country));
            const td5 = document.createElement('td');
            td5.appendChild(document.createTextNode(data.addresses[i].id));
            const td6 = document.createElement('td');
            if (data.addresses[i].id == data.defaultBillingAddressId) {
              td6.appendChild(document.createTextNode('Default Billing'));
            } else if (data.addresses[i].id == data.defaultShippingAddressId) {
              td6.appendChild(document.createTextNode('Default Shipping'));
            } else {
              td6.appendChild(document.createTextNode(''));
            }
            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);
            row.appendChild(td4);
            row.appendChild(td5);
            row.appendChild(td6);
            table.appendChild(row);
          }
          const div = document.getElementById('table-wrapper');
          div?.append(table);

          setTimeout(() => {
            editProfile.buttonListener();
          }, 100);
        });
      }
    }
    return this.container;
  }
}

export default ProfilePage;
