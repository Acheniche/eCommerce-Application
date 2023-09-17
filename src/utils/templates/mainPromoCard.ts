export default class MainPromoCard {


  public createPromoCard(promoCode: string, discount: string) {
    return `
    <div class="promo-card_wrapper">
      <h2>Promo code</h2>
      <h3>${promoCode}</h3>
      <p>Enter this promotional code in the shopping cart section and get a discount</p>
      <h3>${discount}</h3>
      </div>
    `;
  }
}
