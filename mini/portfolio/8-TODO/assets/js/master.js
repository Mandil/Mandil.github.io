const todoList = document.querySelector('.todo-list');

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}

const control = document.querySelector('.control');

const form = document.querySelector('form.input');

let selectedElementsKeys = [], firstSelected;

const findTodos = () => document.querySelectorAll('input[type="checkbox"]');

let todos = findTodos();

const hideControl = () => {
  control.style.display = 'none';
}

const resetTodoList = () => {
  selectedElementsKeys = [];
  hideControl();
}

const doneButton = document.querySelector('#done');

const done = (element) => {
  element.checked = false;
  element.parentElement.classList.add('done');
}

doneButton.addEventListener('click', () => {
  selectedElementsKeys.forEach(key => {
    done(todos[key]);
  })
  resetTodoList();
})

const undoneButton = document.querySelector('#undone');

const undone = (element) => {
  element.checked = false;
  element.parentElement.classList.remove('done');
}

undoneButton.addEventListener('click', () => {
  selectedElementsKeys.forEach(key => {
    undone(todos[key]);
  })
  resetTodoList();
})

const deleteButton = document.querySelector('#delete');

const deleteTodo = (element) => {
  element.parentElement.remove();
}

deleteButton.addEventListener('click', () => {
  selectedElementsKeys.forEach(key => {
    deleteTodo(todos[key]);
  })
  resetTodoList()
  todos = findTodos();
})

const selectBetween = (key1, key2) => {
  const firstKey = Math.min(key1, key2);
  const secondKey = Math.max(key1, key2);
  for (let key = firstKey ; key <= secondKey; key++) {
    todos[key].checked = true;
    selectedElementsKeys.push(key.toString());
    selectedElementsKeys = Array.from(new Set(selectedElementsKeys)); // to remove doublicate
  }
}

const listenToCheckbox = (e) => {
  if (e.target.matches('input[type="checkbox"]')) {
    let checkedKey = getKeyByValue(todoList, e.target);
    if (e.target.checked) { // checked
      control.style.display = 'block';
      if (e.shiftKey && firstSelected) { // hold shift and checked element
        selectBetween(firstSelected, checkedKey);
        firstSelected = undefined;
      } else {
        selectedElementsKeys.push(checkedKey);
        firstSelected = checkedKey;
      }
    } else { // unchecked
      let index = selectedElementsKeys.indexOf(checkedKey);
      if (index > -1) {
        selectedElementsKeys.splice(index, 1);
        if (selectedElementsKeys.length === 0) {
          hideControl();
        }
      }
      firstSelected = undefined;
    }
  }
}

const addTodo = (e) => {
  e.preventDefault();
  const inputValue = document.querySelector('.input input').value;
  const todo = document.createElement('div');
  todo.classList.add('to-do')
  todo.innerHTML = `<input type="checkbox"/>
                    <div class="label">
                      <label>${inputValue}</label>
                    </div>`

  document.querySelector('form.todo-list').prepend(todo);
  form.reset();
  todos = findTodos();
}

todoList.addEventListener('click', listenToCheckbox, false);
form.addEventListener('submit', addTodo);
