import { useEffect, useState } from "react";
import { BoardModel } from "../../../Models/BoardModel";
import { boardService } from "../../../Services/BoardService";
import { Grid, Layout, Plus, MoreHorizontal } from "lucide-react";
import "./Home.css";
import { Tasks } from "../Tasks/Tasks";

const colorPalette = [
  '#60A5FA', // Blue
  '#F59E0B', // Orange
  '#10B981', // Green
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#F97316', // Dark Orange
  '#6366F1', // Indigo
  '#06B6D4', // Cyan
  '#84CC16'  // Lime
];

function getColumnColor(index: number): string {
  return colorPalette[index % colorPalette.length];
}

export function Home(): JSX.Element {

  const [boards, setBoards] = useState<BoardModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<BoardModel | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const fetchedBoards = await boardService.getAllBoards();
        setBoards(fetchedBoards);
        if (fetchedBoards.length > 0) {
          setSelectedBoardId(fetchedBoards[0]._id);
          setSelectedBoard(fetchedBoards[0]);
        }
        setError(null);
      } catch (err) {
        setError("Failed to fetch boards. Please try again later.");
        console.error("Error fetching boards:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const board = boards.find(b => b._id === selectedBoardId);
    setSelectedBoard(board || null);
  }, [selectedBoardId, boards]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <span>Loading your boards...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="Home">
      <div className="boards-nav">
        <div className="nav-left">
          <h1 className="title">My Boards</h1>
        </div>

        <div className="nav-right">
          <div className="boards-menu">
            {boards.map(board => (
              <button
                key={board._id}
                className={`board-nav-item ${board._id === selectedBoardId ? 'active' : ''}`}
                onClick={() => setSelectedBoardId(board._id)}
              >
                {board.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedBoard && (
        <div className="board-content">
          <div className="boards-columns">
            {selectedBoard.columns
              .sort((a, b) => a.order - b.order)
              .map(column => (
                <div key={column._id} className="column">
                  <div className="column-header">
                    <div className="column-title">
                      <div
                        className="column-color"
                        style={{ backgroundColor: getColumnColor(column.order) }}
                      />
                      <span>{column.name}</span>
                    </div>
                    <button className="column-add-button">
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="tasks-container">
                    <div className="task-placeholder">
                      <div className="task-placeholder-content">
                        <Tasks
                          boardId={selectedBoard._id}
                          columnId={column._id}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {boards.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No Boards Found</h3>
          <p>Create your first board to get started with your projects!</p>
          <button className="create-board-button">
            <Plus size={20} />
            <span>Create Board</span>
          </button>
        </div>
      )}
    </div>
  );
}


