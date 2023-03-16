
export const TOKEN_KEY = "token";

class ApiError extends Error {
  constructor({ message, status, data }) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

class API {
  constructor() {
    this.baseUrl = "https://byte-tasks.herokuapp.com/api";
    this.headers = {
      Authorization: null,
      "Content-Type": "application/json",
    };
  }

  async handleErrors(response) {
    if (!response.ok) {
      throw new ApiError({
        message: `Error! ${response.statusText}`,
        status: response.status,
        data: await response.json(),
      });
    }
  }

  async login(data) {
    const res = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: this.headers,
    });

    await this.handleErrors(res);

    const { token } = await res.json();
    this.headers.Authorization = `Bearer ${token}`;
    localStorage.setItem(TOKEN_KEY, token);
  }

  isLoggedIn() {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  }

  async autoLogin() {
    const localToken = localStorage.getItem(TOKEN_KEY);
    this.headers.Authorization = `Bearer ${localToken}`;
    return this.getSelf();
  }

  async register(data) {
    const res = await fetch(`${this.baseUrl}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: this.headers,
    });

    await this.handleErrors(res);

    const registeredUser = await res.json();
    return registeredUser;
  }

  async getSelf() {
    const res = await fetch(`${this.baseUrl}/auth/user/self`, {
      method: "GET",
      headers: this.headers,
    });

    this.handleErrors(res);
    return await res.json();
  }

  async getAllTasks() {
    const res = await fetch(`${this.baseUrl}/task`, {
      method: "GET",
      headers: this.headers,
    });

    this.handleErrors(res);
    return await res.json();
  }

  async createTask(data) {
    const res = await fetch(`${this.baseUrl}/task`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: this.headers,
    });

    this.handleErrors(res);

    return res.json();
  }

  async deleteTask(id) {
    const res = await fetch(`${this.baseUrl}/task/${id}`, {
      method: "DELETE",
      headers: this.headers,
    });

    this.handleErrors(res);

    return res;
  }

  async editTask(id, data) {
    const res = await fetch(`${this.baseUrl}/task/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: this.headers,
    });

    this.handleErrors(res);

    return res.json();
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export const api = new API();
