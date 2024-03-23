class Gardener {
    constructor() {

        const userNameEl = document.querySelector('.gardener-name');
        userNameEl.textContent = this.getUserName();
        const user = confirmLogin();
    }
    getUserName() {
        return localStorage.getItem('userName'); 
    }
}

const gardener = new Gardener();
/* could add ability to remove or add cards here*/

async function confirmLogin(){
    const response = await fetch(`/api/user/${localStorage.getItem('userName')}` );
    if(!response.ok){
        const body = await response.json();
        const modalEl = document.querySelector('#msgModal');
        const msgModal = new bootstrap.Modal(modalEl, {});
        msgModal.show();
    }
}
function goBack() {
    window.location.href = 'index.html';
  }


async function setPlant(plantType, germinate, growSeason) {
    const newPlant = {name: plantType, germination: germinate, season: growSeason};
    try{
    const response = await fetch('/api/plant', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: (JSON.stringify(newPlant)),
    });
    localStorage.setItem('plant', JSON.stringify(newPlant));  
    localStorage.setItem('plant-type', JSON.stringify(newPlant.name));  

    }catch{
        console.log("broke")
    }

    localStorage.setItem(JSON.stringify(plantType) + "-germination", germinate);
    localStorage.setItem(JSON.stringify(plantType) + "-grow-time", JSON.stringify(growSeason));
    window.location.href = "info.html";

}