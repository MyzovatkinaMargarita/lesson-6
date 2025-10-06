import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Task, makeTask } from "../entities/task";
import { TaskInput } from "../components/task-input";
import { TaskList } from "../components/task-list";

const Wrapper = styled.div`
  padding: ${(p) => p.theme.spacing(4)};
  max-width: 600px;
  margin: 0 auto;
`;

const StatusBar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const ClearCompletedBtn = styled.button`
  margin-left: auto;
  padding: 6px 14px;
  border: 2px dotted #6a5acd;
  background-color: transparent;
  color: #6a5acd;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;

  &:hover:enabled {
    background-color: rgba(106, 90, 205, 0.2);
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

const TASKS_STORAGE_KEY = "tasks";

function loadTasks(): Task[] {
  const saved = localStorage.getItem(TASKS_STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddTask = (title: string) => {
    const newTask = makeTask(title);
    setTasks([newTask, ...tasks]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const activeCount = tasks.length - completedCount;

  const clearCompleted = () => {
    if (completedCount === 0) return;
    setTasks(tasks.filter(t => !t.completed));
  };

  return (
    <Wrapper>
      <h1>TaskLite</h1>
      <TaskInput onAdd={handleAddTask} />
      <TaskList tasks={tasks} onToggle={handleToggleTask} onRemove={handleRemoveTask} />

      <StatusBar>
        <div>
          <b>Задачи:</b> {activeCount} активных / {completedCount} выполненных
        </div>

        <ClearCompletedBtn
          onClick={clearCompleted}
          disabled={completedCount === 0}
          aria-label="Очистить выполненные задачи"
          type="button"
        >
          Очистить выполненные
        </ClearCompletedBtn>
      </StatusBar>
    </Wrapper>
  );
};
