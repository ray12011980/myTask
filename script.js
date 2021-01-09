// ***************************************************** MY CLOCK
setInterval(function(){
  
  
  let clock = document.getElementById('current-time');
  let greetings = document.getElementById('greetings');
  let currentDay = document.getElementById('current-date');
  let currentDate = document.getElementById('current-day');

  let date = new Date();
  let amPm = 'am';
  let greetContent = 'Good Morning';
  
  const weekdays = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
  
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  let myHour = preZero(date.getHours());
    if(myHour == 24) {
      myHour = myHour - 12;
    } else if(myHour <= 23 && myHour >= 18) {
      myHour = myHour - 12;
      amPm = 'pm';
      greetContent = 'Good Evening'
    } else if(myHour <= 17 && myHour >= 13) {
      myHour = myHour - 12;
      amPm = 'pm';
      greetContent = 'Good Afternoon'
    } else if(myHour == 12){
      amPm = 'pm';
      greetContent = 'Good Afternoon'
    }
  let myMin = preZero(date.getMinutes());

  // function
  function preZero(i) {
  if (i < 10) {
    i = "0" + i;
    }
    return i;
  }
  
  // display to UI
  greetings.innerHTML = greetContent + ' Ray';
  
  clock.innerHTML = `
    ${myHour} : ${myMin} ${amPm}
  `;

  currentDate.innerHTML = `
    ${weekdays[date.getDay()]}
  `;

  currentDay.innerHTML = `
    ${months[date.getMonth()]}. ${date.getDate()}, ${date.getFullYear()}
  `;
  
}, 1000);
// ***************************************************** MY CLOCK


// ***************************************************** MY TASK
// get the elements
const taskList = document.querySelector('#task-list');
const taskInput = document.querySelector('#task-input');
const buttonAdd = document.querySelector('.btn-add');
const form = document.querySelector('form');

// define classes
const CHECK = (className = 'task-done');
const UNCHECK = (className = '');

// define variables
let LIST, id;

// get task from local storage
let data = localStorage.getItem('TASK');

// check if data is not empty
if(data){
  LIST = JSON.parse(data);
  id = LIST.length; //set the id to the last one in the list
  loadList(LIST); //function that load list to UI
} else {
  // id data is not empty
  LIST = [];
  id = 0;
}

// load task to user interface
function loadList(array){
  array.forEach(function(item){
    addTask(item.name, item.id, item.done, item.trash);
  })
}

// functions
// 
// add task
function addTask(task, id, done, trash) {

  if(trash){ return; };

  const STATUS = done ? CHECK : UNCHECK;

  const listFormat = `
    <li class="new-task ${STATUS}">
      <span>${task}</span>
      <button class="btn btn-check" id="${id}" job="complete"><i class="fas fa-check"></i></button>
      <button class="btn btn-trash" id="${id}" job="remove"><i class="fas fa-trash"></i></button>
    </li>
  `;

  const position = 'beforeend';

  taskList.insertAdjacentHTML(position, listFormat);

};

// event listener
// 
// input a task
buttonAdd.addEventListener('click', function(e){
  e.preventDefault();

  const task = taskInput.value;
  
  if(task == null || task === ''){
    const reminder = document.createElement('p');
    reminder.className = 'reminder';
    reminder.innerText = 'please enter a task';
    form.appendChild(reminder);
    
    // remove reminder after 2seconds
    setTimeout(() => document.querySelector('.reminder').remove(), 2000);
  } else {
    addTask(task, id, false, false);

    LIST.push({
      name : task,
      id : id,
      done : false,
      trash : false
    });

    // add task to local storage - must be present where LIST is updating
    localStorage.setItem('TASK', JSON.stringify(LIST));

    id++;
  }

  taskInput.value = '';
})

// complete task
function completeTask(element){
  if(element.parentNode.classList.contains(CHECK)){
    element.parentNode.classList.remove(CHECK);
  } 
  else {
    element.parentNode.classList.add(CHECK);
  }

  if(LIST[element.id].done == false){
    LIST[element.id].done = true;
  } else {
    LIST[element.id].done = false;
  }
};

// delete task
function deleteTask(element){
  element.parentElement.classList.add('throw');
  element.parentElement.addEventListener('transitionend', function(){
    element.parentElement.remove(element.parentElement.parentElement);
  })
  LIST[element.id].trash = true;
};

// target the task created dynamically
taskList.addEventListener('click', function(event){
  const element = event.target;

  if(element.classList.contains('btn-check')){
    completeTask(element);
  } else if(element.classList.contains('btn-trash')){
    deleteTask(element);
  }
  
  // add task to local storage - must be present where LIST is updating
  localStorage.setItem('TASK', JSON.stringify(LIST));
});
// ***************************************************** MY TASK

