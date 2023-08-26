type User = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  password: string;
  addresses: Array<Addresses>;
};
type Addresses = {
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
    console.log(data);
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
        <button class="edir-profile-button">Edit profile</button>
    </div>
    `;
  }
}
