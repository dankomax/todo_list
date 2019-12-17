const url = 'https://todo-app-back.herokuapp.com/';
let token;

// let email = 'danko@gmail.com';
// let password = '123789';


function register() {    
  // let email = document.getElementById("email").value;
  // let password = document.getElementById("password").value;

  fetch(`${url}register`, {
    method: 'POST',
    body:
      JSON.stringify({
        "email": email,
        "password": password,
        "username": "danko",
      }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(console.log)
    // .then(res => login())
    // .then(res => todosRead())
}


function login() {
  let email = 'dankomaksym@gmail.com';
  let password = '1erk5drsapo';
  // let email = document.getElementById("email").value;
  // let password = document.getElementById("password").value;

  fetch(`${url}login`, {
    method: 'POST',
    body:
      JSON.stringify({
        "email": email,
        "password": password,
      }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(res => token = res.token)
    .then(console.log)
    .then(res => authCheck())
    .then(res => todosRead())
}

function authCheck() {
  fetch(`${url}me`, {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  }).then(res => res.json())
    .then(console.log)
    .then(console.log(Date.now()))
}

function todosRead() {
  fetch(`${url}todos`, {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  }).then(res => res.json())
    .then(console.log)
}

function todosCreate() {
  const todoTask= document.getElementById("new-item-field").value;
  fetch(`${url}todos`, {
    method: 'POST',
    body:
      JSON.stringify({
        "text": todoTask,
        "createDate": Date.now(),
        "completed": "false"
      }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }).then(res => res.json())
    .then(console.log)
    .then(res => todosRead())
}

function todosUpdate() {
  // const todoTask=document.getElementById("new-item-field").value;
  let id = '5df959b02ea70c0016826ec2';
  fetch(`${url}todos/${id}`, {
    method: 'PUT',
    body:
      JSON.stringify({
        "text": "Buy butter",
        "completed": "true"
      }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }).then(res => res.json())
    .then(console.log)
    .then(res => todosRead())
}

function todosDelete() {
  // const todoTask=document.getElementById("new-item-field").value;
  let id = '5df959b02ea70c0016826ec2';
  fetch(`${url}todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }).then(res => res.json())
    .then(console.log)
    .then(res => todosRead())
}