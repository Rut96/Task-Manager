import { Search } from "lucide-react";
import "./Header.css";
import { useEffect, useState } from "react";
import { WorkspaceModel } from "../../../Models/WorkspaceModel";
import { workspaceService } from "../../../Services/WorkspaceService";

export function Header(): JSX.Element {

    // const [workspaces, setWorkspaces] = useState<WorkspaceModel[]>();

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             // const fetchedWorkspace = await workspaceService.getAllWorkspaces();
    //             // setWorkspaces(fetchedWorkspace)
    //         } catch (err: any) {
    //             console.log(err);
    //         }
    //     })
    // }, [])
    return (
        <div className="Header">

            <div className="search-bar">
                <Search className="search-icon" />
                <input type="search" placeholder="Search" className="search-input" />
            </div>

            {/* {workspaces &&
                workspaces.map(w => (
                    <div className="workspaces">
                        {w.name}
                    </div>
                ))
            } */}

        </div>
    );
}
