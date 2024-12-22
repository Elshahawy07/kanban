import style from "./style.module.css";
import type { Task } from "../../types/board";
import { Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../../store";
import { editTask, deleteTask } from "../../store/boardsSlice";

export default function EditTask({
  id,
  task,
  setShowTask,
}: {
  id: string;
  task: Task;
  setShowTask: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();
  return (
    <div
      className={style.container}
      onClick={(event) => {
        // @ts-expect-error target already have classList
        if (event.target.classList.contains(style.container))
          setShowTask(false);
      }}
    >
      <form>
        <div className={style.title}>
          <p>{task.title}</p>
          <i
            className="fa-solid fa-trash"
            onClick={() => {
              dispatch(deleteTask({ boardId: id, task }));
              setShowTask(false);
            }}
          ></i>
        </div>
        <div className={style.description}>{task.description}</div>
        <div className={style.subtasks}>
          <div className={style.title}>
            {`Subtasks ( ${task.subtasks.reduce(
              (count, subtask) => count + Number(subtask.isCompleted),
              0
            )} of ${task.subtasks.length} )`}
          </div>
          {task.subtasks.map((subtask, index) => (
            <div className={style.subtask} key={index}>
              <input
                type="checkbox"
                defaultChecked={subtask.isCompleted}
                onChange={({ target: { checked: isCompleted } }) => {
                  dispatch(
                    editTask({
                      boardId: id,
                      task: {
                        ...task,
                        subtasks: task.subtasks.map((subtask, i) =>
                          i == index ? { ...subtask, isCompleted } : subtask
                        ),
                      },
                    })
                  );
                }}
              />
              <p>{subtask.title}</p>
            </div>
          ))}
        </div>
        <div className={style.inputBox}>
          <label>Current Status</label>
          <select
            onChange={({ target: { value: status } }) => {
              dispatch(editTask({ boardId: id, task: { ...task, status } }));
            }}
            defaultValue={task.status}
          >
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </form>
    </div>
  );
}
