import { useEffect, useState } from "react";
import "./Tasks.css";
import { TaskModel } from "../../../Models/TaskModel";
import { taskService } from "../../../Services/TaskService";

interface TasksProps {
    boardId: string;
    columnId: string;
}

export function Tasks({ boardId, columnId }: TasksProps): JSX.Element {
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                console.log("Board id: " + boardId);
                console.log("Column id: " + columnId);
                const fetchedTasks = await taskService.getTasksByColumn(boardId, columnId);
                console.log(fetchedTasks);
                setTasks(fetchedTasks);
                setError(null);
            } catch (err) {
                console.error("Error fetching tasks:", err);
                setError("Failed to load tasks");
            } finally {
                setLoading(false);
            }
        })();
    }, [boardId, columnId]);

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