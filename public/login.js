(async () => {
  const userName = localStorage.getItem('userName');
  if (userName) {
    const usernameEl = document.querySelector('#userName');
    usernameEl.textContent = userName;
    setDisplay('loginControls', 'none');
    setDisplay('postLogin', 'block');
  } else {
    setDisplay('loginControls', 'block');
    setDisplay('postLogin', 'none');
  }
})();

function setDisplay(controlId, display) {
  const loginControlEl = document.querySelector(`#${controlId}`);
  if (loginControlEl) {
    loginControlEl.style.display = display;
  }
}

function login() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("userName", nameEl.value);
    window.location.href = "Garden.html";
  }

function create() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("userName", nameEl.value);
    window.location.href = "Garden.html";
  }

function create() {
  localStorage.removeItem('userName');

  }
  