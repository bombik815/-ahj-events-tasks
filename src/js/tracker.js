/* eslint-disable max-len */
import Memory from './memory';
import Task from './task';

export default class Tracker {
  constructor(memory) {
    this.memory = memory;
    this.textTask = null;
  }

  init(input) {
    input.addEventListener('input', this.inputValue);
    input.addEventListener('input', this.inputFiltered);
    input.addEventListener('keyup', this.inputEnter);
    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this.renderDom();
      }
    });
  }

  inputFiltered() {
    const allTasks = document.querySelector('.all-tasks');
    const arrayTasks = Array.from(allTasks.children);
    let coincidence = null;
    if (this.textTask !== null) {
      arrayTasks.forEach((elem, index) => {
        arrayTasks[index].style = 'display: none;';
      });
    }
    arrayTasks.forEach((item, index) => {
      if (this.textTask === item.textContent.slice(0, this.textTask.length)) {
        arrayTasks[index].style = null;
        coincidence = (item.style === null);
      } else if (this.textTask === null) {
        allTasks.textContent = 'All Tasks:';
        arrayTasks[index].style = null;
        coincidence = (item.style === null);
      }
    });

    arrayTasks.forEach((item) => {
      if (this.textTask !== item.textContent.slice(0, this.textTask.length) && this.textTask !== null && coincidence === null) {
        allTasks.firstChild.nodeValue = 'All Tasks: "No tasks found"';
      } else {
        allTasks.firstChild.nodeValue = 'All Tasks:';
      }
    });
  }

  inputValue(e) {
    this.textTask = e.target.value;
  }

  inputEnter(e) {
    if (e.key === 'Enter' && this.textTask !== null) {
      Memory.saveTask(new Task(this.textTask, false));
      document.querySelector('.input-text').value = null;
      document.querySelector('.all-tasks').firstChild.nodeValue = 'All Tasks:';
    }
  }

  listCheckboxes(checkboxes) {
    if (checkboxes) {
      for (const i of checkboxes) {
        i.addEventListener('click', () => {
          this.replaceTasks(i);
        });
      }
    }
  }

  replaceTasks(element) {
    const memTasks = this.memory.loadTask();
    const allTasks = document.querySelector('.all-tasks');
    const pinned = document.querySelector('.pinned');
    const elem = element.closest('li');

    if (element.checked === true) {
      element.closest('li').remove();
      document.querySelector('.pinned-text').style = 'display: none';
      pinned.appendChild(elem);
    } else {
      if (pinned.children.length === 2) {
        document.querySelector('.pinned-text').style = null;
      }
      element.closest('li').remove();
      allTasks.appendChild(elem);
    }

    const textTask = elem.textContent;
    memTasks.forEach((item, i) => {
      if (textTask === item.task) {
        memTasks[i].pinned = element.checked;
      }
    });
    this.memory.clearStorage();
    Memory.saveTask(memTasks);
  }

  renderDom() {
    const memTasks = this.memory.loadTask();
    const allTasks = document.querySelector('.all-tasks');
    const pinned = document.querySelector('.pinned');
    const listTasks = document.querySelectorAll('li');
    listTasks.forEach((item) => item.remove());

    if (memTasks && memTasks.length !== 0) {
      memTasks.forEach((elem) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        if (elem.pinned === true) {
          checkbox.setAttribute('type', 'checkbox');
          li.textContent = elem.task;
          checkbox.checked = elem.pinned;
          document.querySelector('.pinned-text').style = 'display: none';
          pinned.appendChild(li);
          li.appendChild(checkbox);
        } else {
          checkbox.setAttribute('type', 'checkbox');
          li.textContent = elem.task;
          checkbox.checked = elem.pinned;
          allTasks.appendChild(li);
          li.appendChild(checkbox);
        }
      });
    }
    this.listCheckboxes(document.querySelectorAll('li > input'));
  }
}
