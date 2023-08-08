import Component from '../../utils/templates/components';
import { PagesID } from '../app';

const Buttons = [
  {
    id: PagesID.mainPage,
    text: 'Main',
  },
  {
    id: PagesID.registrationPage,
    text: 'Registration',
  },
  {
    id: PagesID.loginPage,
    text: 'Login',
  },
];

export default class Header extends Component {

  renderHeaderButtons() {
    const headerButtons = document.createElement('div');
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      headerButtons.append(buttonHTML);
    });
    this.container.append(headerButtons);
  }

  render() {
    this.renderHeaderButtons();
    return this.container;
  }
}
