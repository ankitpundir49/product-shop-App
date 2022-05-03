import React,{Component}from"react";
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";
class NavBar extends Component
{   render()
    {   return(
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">
                Market
            </Link>
            <div className="">
                <ul className="navbar-nav mr-auto nav-menu">
                    <li className="nav-link">
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" className="btn-lg">
                        Shops
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Link className="dropdown-item" to={`/shops`}>View</Link>
                            <Link className="dropdown-item" to={`/shops/add`}>Add</Link>
                        </Dropdown.Menu>
                    </Dropdown>
                    </li>
                    <li className="nav-link">
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" className="btn-lg">
                        Products
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Link className="dropdown-item" to={`/products`}>View</Link>
                            <Link  className="dropdown-item" to={`/products/add`}>Add</Link>
                        </Dropdown.Menu>
                    </Dropdown>
                    </li>
                    <li className="nav-link">
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" className="btn-lg">
                        Purchases
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Link className="dropdown-item" to={`/purchases`}>View</Link>
                            <Link  className="dropdown-item" to={`/purchases/add`}>Add</Link>
                        </Dropdown.Menu>
                    </Dropdown>
                    </li>
                </ul>
            </div>
        </nav>)
    }

}export default NavBar;