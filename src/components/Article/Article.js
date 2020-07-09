import React, {Component} from "react";
import Layout from "../../Hoc/Layout/Layout";

class Article extends Component {

    render() {
        return (
            <div className={"main-content"}>
                Article
            </div>
        );
    };
}

export default Layout(Article);