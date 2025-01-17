// Tasks.tsx
import { useEffect, useState } from "react";
import "./Tasks.css";
import { TaskModel } from "../../../Models/TaskModel";
import { taskService } from "../../../Services/TaskService";

interface TasksProps {
    boardId: string;
    columnName: string;
}

export function Tasks({ boardId, columnName }: TasksProps): JSX.Element {
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTasks() {
            try {
                setLoading(true);
                const fetchedTasks = await taskService.getTasksByBoard(boardId);
                // Filter tasks for this specific column
                const columnTasks = fetchedTasks.filter(task => task.status.toLowerCase() === columnName.toLowerCase());
                setTasks(columnTasks);
                setError(null);
            } catch (err) {
                console.error("Error fetching tasks:", err);
                setError("Failed to load tasks");
            } finally {
                setLoading(false);
            }
        }

        if (boardId) {
            fetchTasks();
        }
    }, [boardId, columnName]);

    if (loading) {
        return <div className="tasks-loading">Loading tasks...</div>;
    }

    if (error) {
        return <div className="tasks-error">{error}</div>;
    }

    return (
        <div className="Tasks">
            {tasks.map(task => (
                <div key={task._id} className="task-card">
                    <h3 className="task-title">{task.title}</h3>
                    {task.description && (
                        <p className="task-description">{task.description}</p>
                    )}
                    <div className="task-metadata">
                        <span className="task-priority">{task.priority}</span>
                        {task.dueDate && (
                            <span className="task-due-date">
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                    {task.assignees.length > 0 && (
                        <div className="task-assignees">
                            Assignees: {task.assignees.length}
                        </div>
                    )}
                </div>
            ))}
            {tasks.length === 0 && (
                <div className="no-tasks">No tasks in this column</div>
            )}
        </div>
    );
}