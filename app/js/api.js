const url = 'https://todo-app-back.herokuapp.com/';
export let validToken;


export default {
  register: async () => {   
    let username = document.getElementById("signUp-username").value;
    let email = document.getElementById("signUp-email").value;
    let password = document.getElementById("signUp-password").value;
    
    let token = fetch(`${url}register`, {
      method: 'POST',
      body:
        JSON.stringify({
          "email": email,
          "password": password,
          "username": username,
        }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(res => res.token ? res.token : 'Invalid user!')

    validToken = await token;
    return token;
  },

  login: async () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

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

  authCheck: (token) => {
    return fetch(`${url}me`, {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }).then(res => res.json())
      .then(res => res.token)
      .then(res => res === token ? token : false)
  },

  todosRead: (token) => {
    return fetch(`${url}todos`, {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }).then(res => res.json())
  },

  todosCreate: (token, todoTask) => {
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

  todosUpdate: (token, id, text, bool) => {
    // const todoTask=document.getElementById("new-item-field").value;
    // let id = '5df959b02ea70c0016826ec2';
    const change = {};
    if (text) { change["text"] = text };
    if (bool !== undefined) { change["completed"] = bool };

    return fetch(`${url}todos/${id}`, {
      method: 'PUT',
      body:
        JSON.stringify(change),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then(res => res.json())
      // .then(console.log)
      // .then(res => todosRead())
  },

  todosDelete: (token, id) => {
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

