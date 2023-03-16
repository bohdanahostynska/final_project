import { Form } from "./Form";
import { Input } from "./Input";
import { Task } from "./Task";
import { taskConfig } from "./formConfigs";
import { api } from "./API";

const getTaskForm = (onTaskCreated) =>
  new Form({
    title: "Add task",
    inputs: taskConfig.map((input) => new Input(input)),
    submitBtnText: "Add",
    onSubmit: async (data) => {
      const createdTask = await api.createTask(data);
      onTaskCreated(createdTask);
    },
  });

export class TaskBoard {
  constructor({ appContainer }) {
    this.appContainer = appContainer;
    this.taskForm = getTaskForm(this.addTask.bind(this));
    this.tasksContainer = document.createElement("div");
  }

  renderLayout() {
    const board = document.createElement("div");
    const formContainer = document.createElement("div");

    board.classList.add("board");
    formContainer.classList.add("task-form");
    this.tasksContainer.classList.add("task-cards");

    board.append(formContainer, this.tasksContainer);
    this.taskForm.render(formContainer);

    this.appContainer.append(board);
  }

  addTask(taskData) {
    console.log(`this`, this);
    const task = new Task(taskData);

    task.renderCard(this.tasksContainer);
  }

  logout() {
    this.tasksContainer.innerHTML = "";
  }
}