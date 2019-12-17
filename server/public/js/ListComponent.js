import Component from "./component.js";
import store from "./store/index.js";


export default class ListComponent extends Component {
  constructor(app) {
    const template = document.getElementById('list').content.cloneNode(true);
    app.append(template);
    super(
      store, 
      document.querySelector('.js-items')
    );

    const input = document.querySelector('.c-input-field');
    const submit = document.querySelector('.c-button');
    const handleClick = event => {
      event.preventDefault();
      let value = input.value.trim();

      if (value.length) {
        store.dispatch('addItem', value);
        input.focus();
      }
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
            `<li>${todoItem} <button type="button">delete</button></li>`
          ).join('') 
        }
      </ul>
    `;

    this.anchor.querySelectorAll('button').forEach((button, id) =>
      button.addEventListener('click', () => 
        store.dispatch('removeItem', { id })
      )
    )
  }
}