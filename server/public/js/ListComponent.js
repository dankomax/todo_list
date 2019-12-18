import Component from "./component.js";
import store from "./store/index.js";
import api from "./api.js";
import { validToken } from "./api.js"

export default class ListComponent extends Component {
  constructor(app) {
    const template = document.getElementById('list').content.cloneNode(true);
    app.append(template);
    super(
      store, 
      document.querySelector('.js-items')
    );

    api.todosRead(validToken)
      .then(res => res.map(task => store.dispatch('addItem', task)))
      // .then(console.log)
    // const todoArr = todoList.map(task => task);
    // console.log(todoList[1]);
    // console.log(todoArr);

    const input = document.querySelector('.c-input-field');
    const submit = document.querySelector('.c-button');
    // const form = document.getElementById('add-new-item-form');
    const handleClick = event => {
      event.preventDefault();
      let value = input.value.trim();

      console.log(validToken);

      if (value.length > 4) {
        console.log(value);
        api.todosCreate(validToken, value)
          .then(res => store.dispatch('addItem', res));

        input.focus();
      } else {
        alert('task shoud be at least 5 letters long');
      }
      // form.reset();
      input.value = '';
    };

    submit.addEventListener('click', handleClick);

    

    // const list = new ListComponent();
    // list.render();
  }

  render() {
    if (store.state.todo.length === 0) {
      this.anchor.innerHTML = `No todo's`;
      return;
    }

    this.anchor.innerHTML = `
      <ul>
        ${ 
          store.state.todo.map(todoItem => 
            `<li>
              <span>${todoItem.text}</span> 
              <button type="button">delete</button>
            </li>`
          ).join('') 
        }
      </ul>
    `;

    this.anchor.querySelectorAll('button').forEach((button, id) =>
      button.addEventListener('click', () => {
        api.todosDelete(validToken, store.state.todo[id]._id)
        store.dispatch('removeItem', { id })
      })
    )

    this.anchor.querySelectorAll('span').forEach((item, id) =>
      item.addEventListener('click', () => {
        let bool; 
        store.state.todo[id].completed ? bool = false : bool = true;       
        api.todosUpdate(validToken, store.state.todo[id]._id, bool);
        store.state.todo[id].completed = bool;
        bool ? item.style.textDecoration = 'line-through' : item.style.textDecoration = 'none';
      })
    )
  }
}