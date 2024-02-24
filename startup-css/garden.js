class Garden {
    constructor() {

        const userNameEl = document.querySelector('.gardener-name');
        userNameEl.textContent = this.getUserName();

    }
    getUserName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }
}