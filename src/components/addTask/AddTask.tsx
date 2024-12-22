import { useId, useState, Dispatch, SetStateAction } from "react";
import style from "./style.module.css";
import { Task } from "../../types/board";
import { useAppDispatch } from "../../store";
import { addTask } from "../../store/boardsSlice";

const AddTask = ({
  id,
  setShowTaskForm,
}: {
  id: string;
  setShowTaskForm: Dispatch<SetStateAction<boolean>>;
}) => {
  const [task, setTask] = useState<Task>({
    id: useId(),
    title: "",
    description: "",
    status: "Todo",
    subtasks: [],
  });
  const dispatch = useAppDispatch();
  return (
    <div
      className={style.container}
      onClick={(event) => {
        // @ts-expect-error target already have classList
        if (event.target.classList.contains(style.container))
          setShowTaskForm(false);
      }}
    >
      <form
        className={style.addTask}
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(addTask({ boardId: id, task }));
          setShowTaskForm(false);
        }}
      >
        <div className={style.title}>Add New Task</div>
        <div className={style.inputBox}>
          <label>Name</label>
          <input
            type="text"
            required
            value={task.title}
            onChange={({ target: { value: title } }) =>
              setTask((task) => ({ ...task, title }))
            }
          />
        </div>
        <div className={style.inputBox}>
          <label>Description</label>
          <input
            type="text"
            required
            value={task.description}
            onChange={({ target: { value: description } }) =>
              setTask((task) => ({ ...task, description }))
            }
          />
        </div>
        <div className={style.inputBox}>
          <label>Status</label>
          <select
            required
            value={task.status}
            onChange={({ target: { value: status } }) =>
              setTask((task) => ({ ...task, status }))
            }
          >
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className={style.subtasks}>
          <label>Subtasks</label>
          {task.subtasks.map((_, index) => (
            <div className={style.subtask} key={index}>
              <input
                type="text"
                required
                value={task.subtasks[index].title}
                onChange={({ target: { value: title } }) =>
                  setTask((task) => ({
                    ...task,
                    subtasks: task.subtasks.map((subtask, i) =>
                      i == index ? { title, isCompleted: false } : subtask
                    ),
                  }))
                }
              />
              <i
                className="fa-solid fa-xmark"
                onClick={() =>
                  setTask((task) => ({
                    ...task,
                    subtasks: task.subtasks.filter((_, i) => i != index),
                  }))
                }
              ></i>
            </div>
          ))}
        </div>
        <div
          className={style.addSubtask}
          onClick={() =>
            setTask((task) => ({
              ...task,
              subtasks: [...task.subtasks, { title: "", isCompleted: false }],
            }))
          }
        >
          <i className="fa-solid fa-plus"></i>
          <p>Add New Subtask</p>
        </div>
        <input type="submit" value="Create Task" />
      </form>
    </div>
  );
};

export default AddTask;
