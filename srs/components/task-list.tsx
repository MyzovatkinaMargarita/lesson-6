import styled from "@emotion/styled";
import type { Task } from "../entities/task";
import { TaskItem } from "./task-item";

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

const List = styled.ul`
  margin-top: ${(p) => p.theme.spacing(2)};
  list-style: none;
  padding: 0;
`;

export const TaskList = (p: TaskListProps) => {
  return (
    <List>
      {p.tasks.map((t) => (
        <TaskItem
          key={t.id} // ключ обязателен
          task={t}
          onToggle={p.onToggle}
          onRemove={p.onRemove}
        />
      ))}
    </List>
  );
};
