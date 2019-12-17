// function main() {
//   fetch('https://todo-app-back.herokuapp.com/login', {
//     method: 'POST',
//     body:
//       JSON.stringify({
//         "email": 'dankomaksym@gmail.com',
//         "password": '1erk5drsapo',
//       }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
// }

// main();


// fetch('https://todo-app-back.herokuapp.com/me', {
//   method: 'GET',
//   headers: {
//     'Authorization': '****token***'
//   }
// })

const url = 'https://todo-app-back.herokuapp.com/todos';
const auth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkZjhhMzkyMmVhNzBjMDAxNjgyNmQ0ZCIsImVtYWlsIjoiZGFua29tYWtzeW1AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkTTBNMTlZdktyZzNPaVd4WVVnYzQ2ZUxRVWRhbmxQalQvZEhaSEgvZUNsWkVxSkdqa1lMbTYiLCJ1c2VybmFtZSI6ItCc0LDQutGB0LjQvCDQlNCw0L3RjNC60L4iLCJfX3YiOjB9LCJpYXQiOjE1NzY2MDA5Njd9.g0GrJfg19sNypz6zEUJxSi86MFqzQapYAjH85Lf9sPQ';


const response = await fetch(url, {
  method: 'GET',
  headers: {
    'Authorization': auth,
  }
})

const myJson = await response.json();
console.log(JSON.stringify(myJson));