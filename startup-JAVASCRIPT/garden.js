class Gardener {
    constructor() {

        const userNameEl = document.querySelector('.gardener-name');
        userNameEl.textContent = this.getUserName();

    }
    getUserName() {
        return localStorage.getItem('userName'); 
    }
}
const gardener = new Gardener();
/* could add ability to remove or add cards here*/
function setPlant(plantType, germinate) {
    localStorage.setItem('plant-type', plantType);
    localStorage.setItem(localStorage.getItem('plant-type') + "-germination", germinate);
}