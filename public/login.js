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

async function login() {
  loginOrCreate(`/api/auth/login`)
}

async function create() {
  loginOrCreate(`/api/auth/create`)
}

async function loginOrCreate(endpoint) {
  const userName = document.querySelector('#name')?.value;
  const password = document.querySelector('#password')?.value;
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ userName: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  
  if (response.ok) {
    localStorage.setItem('userName', userName);
    console.log("logged in now")
    window.location.href = 'garden.html';
  } else {
    console.log("there was an error")

    const body = await response.json();
    const modalEl = document.querySelector('#msgModal');
    modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
  }
}

function logout() {
  localStorage.removeItem('userName');
  }
  