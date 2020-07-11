import React, {Component} from "react";
import "./MobileSearchModal.css";



class MobileSearchModal extends Component {

    state = {
        search: "",
        empty: false,
    };

    handleChange = (ev) => {
        let value = ev.target.value?.trim();
        this.setState((prevState) => {
            return {...prevState, search: value, empty: false};
        });
    };

    onSubmit = (ev) => {
        ev.preventDefault();
        if(this.state.search !== ""){
            let data = `${this.state.search}`.trim();
            this.props.getArticle(data);
        }else {
            this.setState((prevState) => {
                return {...prevState, empty: true};
            });
        }
    };

    closeModal = (ev) => {
        if(ev.target.className === "search-modal") {
            this.props.toggleSearch();
        }
    }

    render() {
        const {lang, toggleSearch} = this.props;

        return (
            <div className={"search-modal"} onClick={(ev)=> this.closeModal(ev)}>
                <div className="modal-body">
                    <div className={"modal-header"}>
                        <span className={"modal-title ff fw"}>{lang.search_article}</span>
                        <span className="close-icon" onClick={() => toggleSearch()}>&times;</span>
                    </div>
                    <div className={"modal-content search-form-content"}>
                        <form className="mobile-search-form" onSubmit={(ev)=>this.onSubmit(ev)}>
                            <input
                                type="text"
                                className="mobile-search-input"
                                placeholder={lang.search_placeholder}
                                onChange={(ev)=>this.handleChange(ev)}
                            />
                            <button type="submit" className="mobile-search-button">
                                {lang.search}
                            </button>
                        </form>
                        {this.state.empty && <div className={"empty-search-filed-value"}>{lang.warning_search}</div>}
                    </div>
                </div>
            </div>
        );
    };
}

export default MobileSearchModal;