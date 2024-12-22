import { useAppSelector } from "../../store";
import { selectBoards } from "../../store/boardsSlice";
import AddTask from "../addTask/AddTask";
import style from "./style.module.css";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

const Header = ({
  id,
  showSidebar,
  setShowSidebar,
}: {
  id: string;
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}) => {
  const boards = useAppSelector(selectBoards);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isShowTaskForm, setShowTaskForm] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={style.header}>
      <div className={style.box}>
        <div className={style.image}>
          <img
            src={`${
              windowWidth < 480 ? "/logo-mobile.svg" : "/logo-light.svg"
            }`}
            alt=""
          />
        </div>
        {windowWidth > 767 ? (
          <div className={style.name}>{boards.entities[id]?.name}</div>
        ) : (
          <div
            className={style.switch}
            onClick={() => setShowSidebar((isShow) => !isShow)}
          >
            {boards.entities[id]?.name}
            <i
              className={`fa-solid fa-angle-${showSidebar ? "up" : "down"}`}
            ></i>
          </div>
        )}
      </div>
      <div className={style.addTask} onClick={() => setShowTaskForm(true)}>
        <i className="fa-solid fa-plus"></i>
        <p>Add New Task</p>
      </div>
      {isShowTaskForm && <AddTask setShowTaskForm={setShowTaskForm} id={id} />}
    </div>
  );
};

export default Header;
