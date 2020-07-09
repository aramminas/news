import React, {Component} from "react";
import Layout from "../../Hoc/Layout/Layout";

class Category extends Component{

    render() {
        return (
            <div className={"main-content"}>
                Category
            </div>
        );
    };
}

export default Layout(Category);