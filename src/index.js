import "./styles/style.css";
import { TaskBoard } from "./components/TaskBoard";
import { Auth } from "./components/Auth";
import { api } from "./components/API";

const appContainer = document.getElementById("app");

const onLoginSucces = async () => {
console.log(`Hello!`);
  appContainer.innerHTML = "";
  const user = await api.getSelf();
  renderAppLayout(user);
};

const auth = new Auth({
  appContainer,
  onLoginSucces,
});

export const taskBoard = new TaskBoard({
  appContainer
})

const renderAppLayout = async (user) => {
  auth.user = user;
  auth.renderHeaderControls();
  taskBoard.renderLayout();

  const taskList = await api.getAllTasks();

  taskList.forEach((task) => taskBoard.addTask(task))
};


const init = async () => {
  const isLoggedIn = api.isLoggedIn();
  if (isLoggedIn) {
    const user = await api.autoLogin();
    renderAppLayout(user);
  } else {
    auth.renderAuthForm();
  }
};

init()
 
