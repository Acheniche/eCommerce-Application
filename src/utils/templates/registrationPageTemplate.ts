class CreateRegistrationPage {
  public block: string = `
  <div class="registration">
    <div class="email-wrapper-registration">
        <span>Insert your email </span>
      <input type="text" class="email" placeholder="email">
      <div class="email-valid-span">
        <span class="not-valid-email"></span>
      </div>
    </div>
    <div class="password-wrapper">
        <span>Insert your password </span>
        <input type="password" class="password" placeholder="password">
        <button class="toggle-password-button"></button>
        <div class="email-valid-span">
          <span class="not-valid-password"></span>
        </div>
    </div>

    <div class="first-name-wrapper">
      <span>Insert your First name</span>
      <input type="text" class="first-name" placeholder="First name">
      <div class="first-name-valid-span">
        <span class="not-valid-first-name"></span>
      </div>
    </div>

    <div class="last-name-wrapper">
      <span>Insert your Last name</span>
      <input type="text" class="last-name" placeholder="Last name">
      <div class="last-name-valid-span">
        <span class="not-valid-last-name"></span>
      </div>
    </div>

    <div class="date-birth-wrapper">
      <span>Insert your Date of birth</span>
      <input type="date" class="date-birth" placeholder="Date of birth">
      <div class="date-birth-valid-span">
        <span class="not-valid-date-birth"></span>
      </div>
    </div>

    <div class="street-wrapper">
      <span>Insert your Street</span>
      <input type="text" class="street" placeholder="Street">
      <div class="street-valid-span">
        <span class="not-valid-street"></span>
      </div>
    </div>

    <div class="city-wrapper">
      <span>Insert your City</span>
      <input type="text" class="city" placeholder="City">
      <div class="city-valid-span">
        <span class="not-valid-city"></span>
      </div>
    </div>

    <div class="postal-wrapper">
      <span>Insert your Postal code</span>
      <input type="number" class="postal-code" placeholder="Postal code">
      <div class="postal-code-valid-span">
        <span class="not-valid-postal-code"></span>
      </div>
    </div>

    <div class="country-wrapper">
      <span>Insert your Country</span>
      <select id="country">
        <option></option>
        <option>USA</option>
        <option>Germany</option>
      </select>
      <div class="country-valid-span">
        <span class="not-valid-country"></span>
      </div>

    </div>

    <div class="button-registration-wrapper">
        <button class="registration-button">
            ENTER
        </button>
    </div>

  </div>
`;

}

export default CreateRegistrationPage;
