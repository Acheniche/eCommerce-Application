export type User = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  password: string;
  addresses: Array<Addresses>;
  version?: number;
};
export type Addresses = {
  city: string;
  streetName: string;
  postalCode: string;
  country: string;
  id: string;
};

export default class CreateProfilePage {
  public data: User = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    password: '',
    addresses: [],
  };

  constructor(data: User) {
    this.data = data;
  }

  public block() {
    return `
    <div class="profile">
        <div class="profile-firstname-wrapper">
            <h3 class="firstname">Firstname:</h3>
            <h3 class="firstname-value">${this.data.firstName}</h3>
        </div>
        <div class="profile-lastname-wrapper">
            <h3 class="lastname">Lastname:</h3>
            <h3 class="lastname-value">${this.data.lastName}</h3>
        </div>
        <div class="profile-dateOfBirth-wrapper">
            <h3 class="dateOfBirth">Date Of Birth:</h3>
            <h3 class="dateOfBirth-value">${this.data.dateOfBirth}</h3>
        </div>
        <div class="profile-addresses-wrapper" id="table-wrapper">
      
        </div>
        <button class="edit-profile-button">Edit profile</button>
    </div>
    `;
  }

  public editBlock() {
    return `
    <h1>Update user profile</h1>

    <div class="first-name-wrapper">
      <span>First name</span>
      <div class="tooltip">
        <input type="text" class="first-name" id="registration-firstname" placeholder="First name">
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
      <input type="text" class="last-name" id="registration-lastname" placeholder="Last name">
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
    <input type="date" class="date-birth" id="registration-dateOfBirth" placeholder="Date of birth">
    <span class="icon">!</span>
    <span class="tooltip-text">You must be over 13 years old</span>
  </div>
  <div class="date-birth-valid-span">
    <span class="not-valid-date-birth not-valid"></span>
  </div>
</div>

<div class="email-wrapper-registration">
<span>Email </span>
<div class="tooltip">
  <input type="text" class="email" id="registration-email" placeholder="email">
  <span class="icon">!</span>
  <span class="tooltip-text">Email address must be properly formatted
  (e.g., user@example.com).<br> Not contain whitespace.<br>Must contain a
  domain name (e.g., example.com).<br>Must contain an '@' symbol separating local part and domain name</span>
</div>
<div class="email-valid-span">
<span class="not-valid-email not-valid"></span>
</div>
</div>


<div class="button-registration-wrapper">
<div class="tooltip">
    <button class="update-button">
        Update
    </button>
    <span class="tooltip-text">Check if you filled in all the fields correctly?</span>
  </div>
</div>
    `;
  }
}
