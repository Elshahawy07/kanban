import style from "./style.module.css";
import { Status } from "../../types/board";
import { useAppSelector } from "../../store";
import { selectBoards } from "../../store/boardsSlice";
import TaskSummary from "../task/TaskSummary";
export default function Column({ id, status }: { id: string; status: Status }) {
  const boards = useAppSelector(selectBoards);
  const tasks = boards.entities[id]?.tasks?.filter(
    (task) => task.status === status
  );
  return (
    <div className={style.container}>
      <div className={style.title}>{`${status} (${tasks?.length})`}</div>
      <div className={style.tasks}>
        {tasks?.map((task, index) => (
          <TaskSummary task={task} key={index} id={id} />
        ))}
      </div>
    </div>
  );
}
