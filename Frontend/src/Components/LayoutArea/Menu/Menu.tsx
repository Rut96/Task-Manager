import { NavLink } from "react-router-dom";
import "./Menu.css";

export function Menu(): JSX.Element {

    return (
        <div className="Menu">

            <NavLink to="/home">Dashboard</NavLink>

        </div>
    );
}
