import style from "./style.module.css";
import Column from "../column/Column";

export default function Board({
  id,
  showSidebar,
}: {
  id: string;
  showSidebar: boolean;
}) {
  const statuses = ["Todo", "Doing", "Done"];
  return (
    <div
      className={style.container}
      style={{
        width: showSidebar ? "calc(100% - 250px)" : "100%",
        left: showSidebar ? "250px" : "0px",
      }}
    >
      {statuses.map((status, index) => (
        <Column status={status} id={id} key={index} />
      ))}
    </div>
  );
}
