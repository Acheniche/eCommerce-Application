export default function aboutUsInfo(firstName:string, lastName:string, dataOfBerth:string, email:string, role:string, photo:string, information:string, gitProfail:string) {
  return `
  <div class="profile-user">
    <div class="userImfo">
        <div class="fest-and-last-name">
          <h3 class="fest-and-last-name-info">${firstName} ${lastName}</h3>
        </div>
        <div class="data-of-berth">
          <p class="data-of-berth-info">${dataOfBerth}</p>
        </div>
        <div class="email-about-us">
          <p class="email-info">${email}</p>
        </div>
        <div class="brief-information">
          <p class="brief-info">About me: ${information}</p>
        </div>
        <div class="rol-about-us">
          <p class="roll-about-us">Role: ${role}</p>
        </div>
        <div class="git-about-us">
          <p class="git-info-about-us"><a href="${gitProfail}">Here is my GitHub profile</a></p>
        </div>


    </div>
    <div class=foto-of-user>
        <img class="img-about-us" src="${photo}" alt="photo"></img>
    </div>
  </div>
  `;
}
