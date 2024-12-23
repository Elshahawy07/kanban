import SideBar from "./components/sidebar/SideBar.js";
import Board from "./components/board/Board.js";
import { useAppDispatch, useAppSelector } from "./store";
import { selectBoards, setBoards } from "./store/boardsSlice";
import style from "./app.module.css";
import { useEffect, useState } from "react";
import Header from "./components/header/Header.js";
import Auth from "./components/auth/Auth.js";

const App = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector(selectBoards);
  const [boardActive, setBoardActive] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    dispatch(setBoards());
  }, [dispatch]);

  useEffect(() => {
    setBoardActive(boards.ids[0]);
  }, [boards]);

  return !isAuthed ? (
    <Auth setIsAuthed={setIsAuthed} />
  ) : (
    <div className={style.app}>
      <Header
        id={boardActive}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <SideBar
        boardActive={boardActive}
        setBoardActive={setBoardActive}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <Board id={boardActive} showSidebar={showSidebar} />
    </div>
  );
};

export default App;
