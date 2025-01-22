import { useEffect, useState } from "react";
import "./Tasks.css";
import { TaskModel } from "../../../Models/TaskModel";
import { taskService } from "../../../Services/TaskService";
import { Calendar, MessageSquare, Paperclip, Tag } from "lucide-react";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";

interface TasksProps {
    boardId: string;
    columnId: string;
}

export function Tasks({ boardId, columnId }: TasksProps): JSX.Element {
    
    const allTasks = useSelector((state: AppState) => state.tasks);
    const tasks = allTasks.filter(task => task.boardId === boardId && task.status === columnId);  // Filter tasks for this column
    
    // const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                // taskService will update Redux store
                await taskService.getTasksByColumn(boardId, columnId);
                setError(null);
            } catch (err) {
                console.error("Error fetching tasks:", err);
                setError("Failed to load tasks");
            } finally {
                setLoading(false);
            }
        })();
    }, [boardId, columnId]);

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };


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
                    {/* Labels */}
                    {task.labels.length > 0 && (
                        <div className="task-labels">
                            {task.labels.map((label,index) => (
                                <span key={index} className="task-label">
                                    <Tag className="label-icon" />
                                    {label}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h3 className="task-title">{task.title}</h3>

                    {/* Description preview */}
                    {task.description && (
                        <p className="task-description">
                            {task.description}
                        </p>
                    )}

                    {/* Priority badge */}
                    <span className={`task-priority task-priority-${task.priority}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </span>

                    {/* Bottom section */}
                    <div className="task-footer">
                        <div className="task-metrics">
                            {/* Due date */}
                            {task.dueDate && (
                                <div className="task-metric">
                                    <Calendar className="metric-icon" />
                                    <span>{formatDate(task.dueDate)}</span>
                                </div>
                            )}

                            {/* Attachments count */}
                            {task.attachments.length > 0 && (
                                <div className="task-metric">
                                    <Paperclip className="metric-icon" />
                                    <span>{task.attachments.length}</span>
                                </div>
                            )}

                            {/* Comments count */}
                            {task.comments.length > 0 && (
                                <div className="task-metric">
                                    <MessageSquare className="metric-icon" />
                                    <span>{task.comments.length}</span>
                                </div>
                            )}
                        </div>

                        {/* Assignees */}
                        {task.assignees.length > 0 && (
                            <div className="task-assignees">
                                {task.assignees.slice(0, 3).map((_, index) => (
                                    <div key={index} className="assignee-avatar">
                                        A{index + 1}
                                    </div>
                                ))}
                                {task.assignees.length > 3 && (
                                    <div className="assignee-avatar assignee-overflow">
                                        +{task.assignees.length - 3}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            ))}
            {tasks.length === 0 && (
                <div className="no-tasks">No tasks in this column</div>
            )}
        </div>
    );
}