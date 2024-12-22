import style from "./style.module.css";
import type { Task } from "../../types/board";
import EditTask from "../editTask/EditTask";
import { useState } from "react";

export default function TaskSummary({ id, task }: { id: string; task: Task }) {
  const [isShowTask, setShowTask] = useState<boolean>(false);

  return (
    <>
      <div className={style.container} onClick={() => setShowTask(true)}>
        <div className={style.task}>
          <div className={style.title}>{task.title}</div>
          <div className={style.done}>{`${task.subtasks.reduce(
            (count, subtask) => count + Number(subtask.isCompleted),
            0
          )} of ${task.subtasks.length} subtasks`}</div>
        </div>
      </div>
      {isShowTask && <EditTask id={id} task={task} setShowTask={setShowTask} />}
    </>
  );
}
