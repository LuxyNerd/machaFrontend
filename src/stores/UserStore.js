class UserStore {
  constructor(initialState) {
    this.state = initialState;
    // listener functions will be stored on UserStore#listeners.
    this.listeners = [];
  }

  setState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  addListener(listener) {
    this.listeners.push(listener);
    const removeListener = () => {
      this.listeners = this.listeners.filter(l => listener !== l);
    };
    return removeListener;
  }

  setState(state) {
    this.state = state;
    for (const listener of this.listeners) {
      listener(state);
    }
  }

  getUserById(id) {
    return this.state.find(user => user.id === id);
  }
}

const userStore = new UserStore([]);
export default userStore;
