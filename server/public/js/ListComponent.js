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
    // const form = document.getElementById('add-new-item-form');
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
      // form.reset();
      input.value = '';
    };

    submit.addEventListener('click', handleClick);




    document.getElementById('done_count').addEventListener('click', () => {
      const liTodo = document.getElementsByClassName('todo');
      for(let i=0; i < liTodo.length; i++) {
        liTodo[i].style.display = 'none';
      }
      const liDone = document.getElementsByClassName('done');
      for(let i=0; i < liDone.length; i++) {
        liDone[i].style.display = 'block';
      }
      // console.log(liDone)
      // this.render();
    });

    document.getElementById('todo_count').addEventListener('click', () => {
      const liTodo = document.getElementsByClassName('todo');
      for(let i=0; i < liTodo.length; i++) {
        liTodo[i].style.display = 'block';
      }
      const liDone = document.getElementsByClassName('done');
      for(let i=0; i < liDone.length; i++) {
        liDone[i].style.display = 'none';
      }
    });

    document.getElementById('total_count').addEventListener('click', () => {
      const liTodo = document.getElementsByClassName('todo');
      for(let i=0; i < liTodo.length; i++) {
        liTodo[i].style.display = 'block';
      }
      const liDone = document.getElementsByClassName('done');
      for(let i=0; i < liDone.length; i++) {
        liDone[i].style.display = 'block';
      }
    });

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
    // <button type="button" class="check_mark">&#10003</button>

    
    // console.log(storeLength);
    // const cloneTodo = [...store.state.todo];

    this.anchor.innerHTML = `
      <ul class="app__items">
        ${ 
          
          store.state.todo.map((todoItem, i) => 
            `<li class=${todoItem.completed ? 'done' : 'todo'} ">
              
              <button type="button" class="del_mark" id="delBtn_${i}">&#215;</button>
              <span id="task_${i}">${todoItem.text}</span>  
            </li>`
          ).reverse().join('') 
        }
      </ul>
    `;

    // const deleteTask = (id) => {
    //   api.todosDelete(validToken, store.state.todo[id]._id)
    //   store.dispatch('removeItem', { id })
    //   console.log(id);
    // } 

    // let delBtnList = this.anchor.getElementsByClassName('del_mark');
    // for (let i=0; i<delBtnList.length; i++) {
    //   delBtnList[i].addEventListener('click', () => {
    //     api.todosDelete(validToken, store.state.todo[i]._id)
    //     store.dispatch('removeItem', { i })
    //   })
    //   console.log(i);
    //   console.log(delBtnList[i]);
    // }

    this.anchor.querySelectorAll('button').forEach(button =>
      button.addEventListener('click', () => {
        let id =button.id.slice(7)*1;
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
        // bool ? item.style.textDecoration = 'line-through' : item.style.textDecoration = 'none';
        this.render();
      })
    )
  }
}