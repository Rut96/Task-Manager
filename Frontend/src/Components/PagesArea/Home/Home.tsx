import { useEffect, useRef, useState } from "react";
import { BoardModel } from "../../../Models/BoardModel";
import { boardService } from "../../../Services/BoardService";
import { Grid, Layout, Plus, MoreHorizontal, FolderPlus, ListPlus, FileEdit } from "lucide-react";
import "./Home.css";
import { Tasks } from "../Tasks/Tasks";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";

const colorPalette = [
  '#60A5FA', '#F59E0B', '#10B981', '#8B5CF6', '#EC4899',
  '#14B8A6', '#F97316', '#6366F1', '#06B6D4', '#84CC16'
];

function getColumnColor(index: number): string {
  return colorPalette[index % colorPalette.length];
}

export function Home(): JSX.Element {

  const boards = useSelector((state: AppState) => state.boards);
  // const [boards, setBoards] = useState<BoardModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<BoardModel | null>(null);
  const [addMenuToggle, setAddMenuToggle] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // Fetch data
    console.log(boards);

    (async () => {
      
      try {
        setLoading(true);
        await boardService.getAllBoards();
        if (boards.length > 0) {
          console.log('default board', boards[0])
          setSelectedBoardId(boards[0]._id);
          setSelectedBoard(boards[0]);
        }
        setError(null);
      } catch (err) {
        setError("Failed to fetch boards. Please try again later.");
        console.error("Error fetching boards:", err);
      } finally {
        setLoading(false);
      }
    })();

    // Click outside handler for add menu
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setAddMenuToggle(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, []);


  useEffect(() => {
    const board = boards.find(b => b._id === selectedBoardId);
    setSelectedBoard(board || null);
  }, [selectedBoardId, boards]);

  // Menu toggle handler
  const handleAddMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent unwanted clicks
    setAddMenuToggle(!addMenuToggle);
  };

  // Menu item handlers
  const handleAddBoard = () => {
    // board logic will be here
    // boardService.addBoard will handle Redux update
    setAddMenuToggle(false);
  };

  const handleAddTask = () => {
    setAddMenuToggle(false);
  };

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

  const sortedColumns = selectedBoard ?
    [...selectedBoard.columns].sort((a, b) => a.order - b.order)
    : [];

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

            <div className="add-item" ref={menuRef}>
              <Plus
                size={20}
                onClick={handleAddMenu}
              />
              {addMenuToggle && (
                <div className="add-menu">
                  <div className="add-menu-item" onClick={handleAddBoard}>
                    <FolderPlus size={16} />
                    <span>New Board</span>
                  </div>
                  <div className="add-menu-divider" />
                  <div className="add-menu-item" onClick={handleAddTask}>
                    <ListPlus size={16} />
                    <span>New Task</span>
                  </div>
                  <div className="add-menu-item">
                    <FileEdit size={16} />
                    <span>Edit Boards</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {selectedBoard && (
        <div className="board-content">

          <div className="boards-columns">
            {/* {selectedBoard.columns
               .sort((a, b) => a.order - b.order)
               .map(column => ( */}

            {sortedColumns.map(column => (
              <div key={column._id} className="column">
                <div className="column-status">
                  <div className="column-header">
                    <div className="column-title">
                      <div
                        className="column-color"
                        style={{ backgroundColor: getColumnColor(column.order) }}
                      />
                      <span>{column.name}</span>
                    </div>
                    <button className="column-add-button" >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>


                <div className="tasks-container">
                  <Tasks
                    boardId={selectedBoard._id}
                    columnId={column._id}
                  />
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


