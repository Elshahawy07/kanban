import { Dispatch, SetStateAction, useId } from "react";
import { useAppDispatch } from "../../store";
import { addBoard } from "../../store/boardsSlice";
import style from "./style.module.css";
import { useState } from "react";

const AddBoard = ({
  setShowForm,
}: {
  setShowForm: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const id = useId();

  return (
    <div
      className={style.container}
      onClick={(event) => {
        //@ts-expect-error target already have classList
        if (event.target.classList.contains(style.container))
          setShowForm(false);
      }}
    >
      <form
        action=""
        onClick={() => setShowForm(true)}
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(addBoard({ id, name, tasks: [] }));
          setShowForm(false);
        }}
      >
        <div className={style.title}>Add New Board</div>
        <div className={style.box}>
          <label htmlFor="name">Board Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={({ target: { value } }) => setName(value)}
            required
          />
        </div>
        <input type="submit" value="Create New Board" />
      </form>
    </div>
  );
};
export default AddBoard;
