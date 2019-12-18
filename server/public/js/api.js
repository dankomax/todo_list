const url = 'https://todo-app-back.herokuapp.com/';
export let validToken;

// let email = 'danko@gmail.com';
// let password = '123789';

export default {
  register: async () => {    
    // let email = document.getElementById("email").value;
    // let password = document.getElementById("password").value;
    return fetch(`${url}register`, {
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
  },

  login: async () => {
    let email = 'dankomaksym@gmail.com';
    let password = '1erk5drsapo';
    // let email = document.getElementById("email").value;
    // let password = document.getElementById("password").value;

    let token = fetch(`${url}login`, {
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
      .then(res => res.token ? res.token : 'Invalid user!')

    validToken = await token;
    return token;
  },

  authCheck: async (token) => {
    return await fetch(`${url}me`, {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }).then(res => res.json())
      .then(res => res.token)
      .then(res => res === token ? token : false)
  },

  todosRead: async (token) => {
    return fetch(`${url}todos`, {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }).then(res => res.json())
  },

  todosCreate: async (token, todoTask) => {
    // const todoTask= document.getElementById("new-item-field").value;
    return fetch(`${url}todos`, {
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
  },

  todosUpdate: async (token, id, bool) => {
    // const todoTask=document.getElementById("new-item-field").value;
    // let id = '5df959b02ea70c0016826ec2';
    return fetch(`${url}todos/${id}`, {
      method: 'PUT',
      body:
        JSON.stringify({
          "completed": bool
        }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then(res => res.json())
      // .then(console.log)
      // .then(res => todosRead())
  },

  todosDelete: async (token, id) => {
    // const todoTask=document.getElementById("new-item-field").value;
    // let id = '5df959b02ea70c0016826ec2';
    return fetch(`${url}todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then(res => res.json())
      // .then(console.log)
      // .then(res => todosRead())
  }
}

