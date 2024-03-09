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
    try{
    const response = await fetch('/api/plant', {
      method: 'POST',
      headers: {'content-type': 'text'},
      body: (JSON.stringify(plantType)),
    });
    
    const scores = await response.json();
    console.log(scores)
    localStorage.setItem('plant-type', JSON.stringify(plantType));  
    }catch{    
        console.log("broke")
    }

    localStorage.setItem(localStorage.getItem('plant-type') + "-germination", germinate);
    localStorage.setItem(localStorage.getItem('plant-type') + "-grow-time", JSON.stringify(growSeason));
    window.location.href = "info.html";

}