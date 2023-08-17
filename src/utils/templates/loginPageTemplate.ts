class CreateLoginPage {
  public block: string = `
  <div class="login">
  <div class="email-wrapper">
      <span>Insert your email </span>
     <input type="text" class="email" id="input" placeholder="email">
     <div class="email-valid-span">
      <span class="not-valid-email"></span>
     </div>
  </div>
  <div class="password-wrapper">
      <span>Insert your password </span>
      <input type="password" class="password" id="input" placeholder="password">
      <button class="toggle-password-button"></button>
      <div class="email-valid-span">
        <span class="not-valid-password"></span>
      </div>
  </div>
  <div class="button-wrapper">
      <button class="login-button">
        Submit
      </button>
  </div>

</div>
`;

}

export default CreateLoginPage;
