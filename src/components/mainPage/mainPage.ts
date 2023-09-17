import MainPromoCard from '../../utils/templates/mainPromoCard';
import Page from '../../utils/templates/page';
import './style.css';

export default class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Main',
  };

  render() {
    const promoCard = new MainPromoCard();
    const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    const promoDiv = document.createElement('div');
    promoDiv.classList.add('promo-div');
    this.container.classList.add('MainWrapper');
    this.container.append(title);
    promoDiv.insertAdjacentHTML('beforeend', promoCard.createPromoCard('WEEKEND', '-30%'));
    promoDiv.insertAdjacentHTML('beforeend', promoCard.createPromoCard('QWERTY', '-20%'));
    this.container.append(promoDiv);
    return this.container;
  }
}
