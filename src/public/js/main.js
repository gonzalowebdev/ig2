const profileLinkButton = document.getElementsByClassName('profileLink')[0]
const profileLinkMenu = document.getElementsByClassName('profileLinkMenu')[0]

profileLinkButton.addEventListener('click', () => {
profileLinkMenu.classList.toggle('active')
});