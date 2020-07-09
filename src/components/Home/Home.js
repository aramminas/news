import React, {Component} from "react";
import "./Home.css";
import Layout from "../../Hoc/Layout/Layout";

class Home extends Component {

    render() {
        return (
            <div className={"main-content"}>
                home
            </div>
        );
    };
}

export default Layout(Home);