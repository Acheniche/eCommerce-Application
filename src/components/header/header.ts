import Component from "../../utils/templates/components";
import { PagesID } from "../app";

const Buttons = [
    {
        id: PagesID.MainPage,
        text: 'Main',
    },
    {
        id: PagesID.RegistrationPage,
        text: 'Registration',
    },
    {
        id: PagesID.LoginPage,
        text: 'Login',
    },
];

export default class Header extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

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