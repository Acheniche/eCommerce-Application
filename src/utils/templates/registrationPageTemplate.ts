class CreateRegistrationPage {
  public block: string = `
  <div class="registration">
    <div class="email-wrapper-registration">
        <span>Email </span>
        <div class="tooltip">
          <input type="text" class="email" id="input" placeholder="email">
          <span class="icon">!</span>
          <span class="tooltip-text">Email address must be properly formatted
          (e.g., user@example.com).<br> Not contain whitespace.<br>Must contain a
          domain name (e.g., example.com).<br>Must contain an '@' symbol separating local part and domain name</span>
        </div>
      <div class="email-valid-span">
        <span class="not-valid-email not-valid"></span>
      </div>
    </div>
    <div class="password-wrapper">
        <span>Password </span>
        <div class="tooltip">
          <input type="password" class="password" id="input" placeholder="password">
          <span class="icon">!</span>
          <span class="tooltip-text">Password must contain: minimum 8 characters,
          at least 1 uppercase letter, 1 lowercase letter, and 1 number</span>
        </div>
        <button class="toggle-password-button"></button>
        <div class="email-valid-span">
          <span class="not-valid-password not-valid"></span>
        </div>
    </div>

    <div class="first-name-wrapper">
      <span>First name</span>
      <div class="tooltip">
        <input type="text" class="first-name" id="input" placeholder="First name">
        <span class="icon">!</span>
        <span class="tooltip-text">First name must contain:
         at least one character and no special characters or numbers</span>
      </div>
      <div class="first-name-valid-span">
        <span class="not-valid-first-name not-valid"></span>
      </div>
    </div>

    <div class="last-name-wrapper">
      <span>Last name</span>
      <div class="tooltip">
        <input type="text" class="last-name" id="input" placeholder="Last name">
        <span class="icon">!</span>
        <span class="tooltip-text">Last name must contain:
        at least one character and no special characters or numbers</span>
      </div>
      <div class="last-name-valid-span">
        <span class="not-valid-last-name not-valid"></span>
      </div>
    </div>

    <div class="date-birth-wrapper">
      <span>Date of birth</span>
      <div class="tooltip">
        <input type="date" class="date-birth" id="input" placeholder="Date of birth">
        <span class="icon">!</span>
        <span class="tooltip-text">You must be over 13 years old</span>
      </div>
      <div class="date-birth-valid-span">
        <span class="not-valid-date-birth not-valid"></span>
      </div>
    </div>

    <div class="street-wrapper">
      <span>Street</span>
      <div class="tooltip">
        <input type="text" class="street" id="input" placeholder="Street">
        <span class="icon">!</span>
        <span class="tooltip-text">Write your street, this field should not be left empty</span>
      </div>
      <div class="street-valid-span">
        <span class="not-valid-street not-valid"></span>
      </div>
    </div>

    <div class="city-wrapper">
      <span>City</span>
      <div class="tooltip">
        <input type="text" class="city" id="input" placeholder="City">
        <span class="icon">!</span>
        <span class="tooltip-text">City must not contain: special characters or numbers</span>
      </div>
      <div class="city-valid-span">
        <span class="not-valid-city not-valid"></span>
      </div>
    </div>

    <div class="postal-wrapper">
      <span>Postal code</span>
      <div class="tooltip">
        <input type="number" class="postal-code" id="input" placeholder="Postal code">
        <span class="icon">!</span>
        <span class="tooltip-text">Postal code must be 5 digits</span>
      </div>
      <div class="postal-code-valid-span">
        <span class="not-valid-postal-code not-valid"></span>
      </div>
    </div>

    <div class="country-wrapper">
      <span>Country</span>
      <div class="tooltip">
        <select id="country">
          <option></option>
          <option>USA</option>
          <option>Germany</option>
        </select>
        <span class="icon">!</span>
      <span class="tooltip-text">Choose a country</span>
      </div>
      <div class="country-valid-span">
        <span class="not-valid-country not-valid"></span>
      </div>
    </div>


    <div class="button-registration-wrapper">
    <div class="tooltip">
        <button class="registration-button">
            Submit
        </button>
        <span class="tooltip-text">Check if you filled in all the fields correctly?</span>
      </div>
    </div>

  </div>
`;

}

export default CreateRegistrationPage;
