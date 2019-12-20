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


    const input = document.querySelector('.c-input-field');
    const submit = document.querySelector('.c-button');
    
    const handleClick = event => {
      event.preventDefault();
      let value = input.value.trim();

      if (value.length > 4) {
        console.log(value);
        api.todosCreate(validToken, value)
          .then(res => store.dispatch('addItem', res));
        input.focus();
      } else {
        alert('task shoud be at least 5 letters long');
      }
      
      input.value = '';
    };

    submit.addEventListener('click', handleClick);


    const filterList = (displayTodo, displayDone) => {
      const liTodo = document.getElementsByClassName('todo');
      for(let i=0; i < liTodo.length; i++) {
        liTodo[i].style.display = displayTodo;
      }
      const liDone = document.getElementsByClassName('done');
      for(let i=0; i < liDone.length; i++) {
        liDone[i].style.display = displayDone;
      }
    };

    document.getElementById('done_filter').addEventListener('click', () => filterList('none', 'block'));
    document.getElementById('todo_filter').addEventListener('click', () => filterList('block', 'none'));
    document.getElementById('total_filter').addEventListener('click', () => filterList('block', 'block'));


  }



  render() {
    if (store.state.todo.length === 0) {
      this.anchor.innerHTML = `No tasks todo yet :)`;
      return;
    }

    let numOfTasks = store.state.todo.length;
    document.getElementById('total_count').innerHTML = numOfTasks;
    const arrDoneTasks = store.state.todo.filter(obj => obj.completed === true);
    let numOfDoneTasks = arrDoneTasks.length;
    document.getElementById('done_count').innerHTML = numOfDoneTasks;
    let numOfToDoTasks = numOfTasks - numOfDoneTasks;
    document.getElementById('todo_count').innerHTML = numOfToDoTasks;



    this.anchor.innerHTML = `
      <ul class="app__items">
        ${ 
          
          store.state.todo.map((todoItem, i) => 
            `<li class=${todoItem.completed ? 'done' : 'todo'} ">
              <button type="button" class="del_mark" id="delBtn_${i}">x</button>
              <button type="button" class="check_mark" id="chkBtn_${i}">&#10003</button>              
              <span id="task_${i}">${todoItem.text}</span>  
            </li>`
          ).reverse().join('') 
        }
      </ul>
    `;

    this.anchor.querySelectorAll('.check_mark').forEach(button =>
      button.addEventListener('click', () => {
        let bool;
        let id = button.id.slice(7)*1;
        store.state.todo[id].completed ? bool = false : bool = true;       
        api.todosUpdate(validToken, store.state.todo[id]._id, bool);
        store.state.todo[id].completed = bool;
        this.render();
      })
    )

    this.anchor.querySelectorAll('.del_mark').forEach(button =>
      button.addEventListener('click', () => {
        let id = button.id.slice(7)*1;
        api.todosDelete(validToken, store.state.todo[id]._id);
        store.dispatch('removeItem', { id });
      })
    )

    this.anchor.querySelectorAll('span').forEach(task =>
      task.addEventListener('click', () => {
        let bool; 
        let id =task.id.slice(5)*1;
        store.state.todo[id].completed ? bool = false : bool = true;       
        api.todosUpdate(validToken, store.state.todo[id]._id, bool);
        store.state.todo[id].completed = bool;
        this.render();
      })
    )

  }
}