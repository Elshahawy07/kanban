import { useState, Dispatch, SetStateAction } from "react";
import { useAppSelector } from "../../store/index.js";
import { selectBoards } from "../../store/boardsSlice.js";
import style from "./style.module.css";
import AddBoard from "../addBoard/AddBoard.js";

const SideBar = ({
  boardActive: id,
  setBoardActive,
  showSidebar,
  setShowSidebar,
}: {
  boardActive: string;
  showSidebar: boolean;
  setBoardActive: Dispatch<SetStateAction<string>>;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}) => {
  const boards = useAppSelector(selectBoards);
  const [showForm, setShowForm] = useState(false);
  return (
    <div
      className={style.container}
      onClick={(event) => {
        //@ts-expect-error target already have classList
        if (event.target.classList.contains(style.container))
          setShowSidebar(false);
      }}
      style={{ width: showSidebar ? "100vw" : "0px" }}
    >
      <div
        className={style.sidebar}
        style={{ width: showSidebar ? "250px" : "0px" }}
      >
        <div className={style.count}>{`ALL BOARDS (${boards.ids.length})`}</div>
        <div className={style.boards}>
          {boards.ids.map((boardId) => (
            <div
              className={`${style.board} ${id == boardId ? style.active : ""}`}
              key={boardId}
              onClick={() => setBoardActive(boardId)}
            >
              <i className="fa-solid fa-bars-progress"></i>
              <div className={style.name}>{boards.entities[boardId].name}</div>
            </div>
          ))}
        </div>
        <div className={style.board} onClick={() => setShowForm(true)}>
          <i className="fa-solid fa-bars-progress"></i>
          <div className={style.name}>
            <i className="fa-solid fa-plus"></i>New Board
          </div>
        </div>
        <div className={style.hideBar} onClick={() => setShowSidebar(false)}>
          <i className="fa-solid fa-eye-slash"></i>
          <p>Hide Sidebar</p>
        </div>
        {showForm && <AddBoard setShowForm={setShowForm} />}
      </div>
      <div className={style.showBar} onClick={() => setShowSidebar(true)}>
        <i className="fa-solid fa-eye"></i>
      </div>
    </div>
  );
};
export default SideBar;
