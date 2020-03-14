<template>
  <div class="board"></div>
</template>

<style>
.task {
  align-items: center;
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  color: #4a5568;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  text-decoration: none;
}

.column {
  background-color: #f7fafc;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-right: 1rem;
  min-width: 350px;
  padding: 0.5rem;
  text-align: left;
}

.board {
  padding: 1rem;
  background-color: #4fd1c5;
  height: 100%;
  overflow: auto;
}

.task-bg {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
