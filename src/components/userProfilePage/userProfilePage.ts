import Page from '../../utils/templates/page';
import './style.css';


class ProfilePage extends Page {

  static TextObject = {
    MainTitle: 'Profile',
  };

  render(): HTMLElement {
    const title = this.createHeaderTitle(ProfilePage.TextObject.MainTitle);
    // const login = new CreateLoginPage();
    this.container.classList.add('LoginWrapper');
    this.container.append(title);
    // this.container.insertAdjacentHTML('beforeend', login.block);

    return this.container;
  }
}

export default ProfilePage;
