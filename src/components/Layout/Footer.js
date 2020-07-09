import React, {Component} from "react";

class Footer extends Component {

    render() {
        const {lang} = this.props;
        let date = new Date();
        date = date.getFullYear();

        return (
            <footer className={"footer-main-content"}>
                <div className="grid-container">
                    <div className="grid-x">
                        <div className="cell">
                            <div className={"fw"}>&#9400; {lang.company_name} {date}</div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    };
}

export default Footer;