export type Status = "Todo" | "Doing" | "Done" | string;

export interface SubTask {
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  subtasks: SubTask[];
}

export interface Board {
  id: string;
  name: string;
  tasks: Task[];
}
