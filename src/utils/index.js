export const uuid = () =>
  Math.random()
    .toString(16)
    .slice(2);

export const saveStatePlugin = store => {
  store.subscribe((mutation, state) => {
    const board = JSON.stringify(state.board);
    localStorage.setItem('board', board);
  });
};
