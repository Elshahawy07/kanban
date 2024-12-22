import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createEntityAdapter } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import type { Board, Task } from "../types/board";
import data from "../../data.json";

const boardsAdapter = createEntityAdapter({
  selectId: (board: Board) => board.id,
  sortComparer: (a: Board, b: Board) => a.name.localeCompare(b.name),
});

const initialState = boardsAdapter.getInitialState<Board[]>(data.boards);
const { addOne, upsertOne, removeOne, setAll } = boardsAdapter;

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: addOne,
    editBoard: upsertOne,
    deleteBoard: removeOne,
    setBoards: (state) => setAll(state, data.boards),
    addTask: (
      state,
      {
        payload: { boardId, task },
      }: PayloadAction<{ boardId: string; task: Task }>
    ) => {
      state.entities[boardId]?.tasks?.push(task);
    },
    editTask: (
      state,
      {
        payload: { boardId, task },
      }: PayloadAction<{ boardId: string; task: Task }>
    ) => {
      const index = state.entities[boardId]?.tasks?.findIndex(
        ({ id }) => id == task.id
      );
      state.entities[boardId].tasks[index] = task;
    },
    deleteTask: (
      state,
      {
        payload: { boardId, task },
      }: PayloadAction<{ boardId: string; task: Task }>
    ) => {
      state.entities[boardId].tasks = state.entities[boardId].tasks.filter(
        ({ id }) => id != task.id
      );
    },
  },
});

export const { setBoards, addBoard, addTask, editTask, deleteTask } =
  boardsSlice.actions;

export const selectBoards = (state: RootState) => state.boards;

export default boardsSlice.reducer;
