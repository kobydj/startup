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
async function setPlant(plantType, germinate, growSeason) {
    const response = await fetch('/api/plant', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: (plantType),
    });
    // Store what the service gave us as the high scores
    localStorage.setItem('plant-type', plantType);      
    

    localStorage.setItem(localStorage.getItem('plant-type') + "-germination", germinate);
    localStorage.setItem(localStorage.getItem('plant-type') + "-grow-time", JSON.stringify(growSeason));

}