export default class Memory {
  constructor() {
    this.storage = localStorage;
  }

  static saveTask(task) {
    const arrayTasks = [];
    if (localStorage.length !== 0) {
      const storage = JSON.parse(localStorage.getItem('task'));
      storage.push(task);
      localStorage.setItem('task', JSON.stringify(storage));
    } else if (!task.length) {
      arrayTasks.push(task);
      localStorage.setItem('task', JSON.stringify(arrayTasks));
    } else {
      localStorage.setItem('task', JSON.stringify(task));
    }
  }

  loadTask() {
    try {
      return JSON.parse(this.storage.getItem('task'));
    } catch (e) {
      throw new Error('Invalid task');
    }
  }

  clearStorage() {
    this.storage.clear();
  }
}
