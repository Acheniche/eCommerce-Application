import CreateProfilePage from '../../utils/templates/profilePageTemplates';
import { getUserProfile } from './profileInfo';
import ValidationProfile from './validationProfile';

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

            setTimeout(() => {
                validationProfile.buttonListener();
              }, 100);
            });
            }
          });
        }
      }
}