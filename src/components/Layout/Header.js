import React, {Component} from "react";
import {MenuRounded, CloseRounded} from '@material-ui/icons';
import {NavLink} from 'react-router-dom';
import ContactUsModal from "../ContactUsModal/ContactUsModal";
import "./Button.css";

class Header extends Component {

    state = {
        mobileMenu: false,
        toggleModal: false,
    };

    toggleMenu = () => {
        this.setState((prevState)=>{
            return {...prevState, mobileMenu: !this.state.mobileMenu};
        });
    };

    toggleContacts = () => {
        this.setState((prevState)=>{
            return {...prevState, toggleModal: !this.state.toggleModal};
        });
    };

    render() {
        const {lang} = this.props;

        return (
            <header className="top-bar header-main-content">
                <div className="grid-container full header-content">
                    <div className="grid-x align-middle">
                        <div className="cell small">
                            <NavLink to="/" className="logo">
                                <figure>
                                    <img src="/images/logo.png" alt="logo"/>
                                </figure>
                                <span className={"ff fw"}>{lang.site_name}</span>
                            </NavLink>
                        </div>
                        <div className={"main-menu"}>
                            <ul>
                                <NavLink to="/" exact activeClassName="active"><li>{lang.home}</li></NavLink>
                                <NavLink to="/article" activeClassName="active"><li>{lang.article}</li></NavLink>
                                <NavLink to="/category" activeClassName="active"><li>{lang.category}</li></NavLink>
                            </ul>
                        </div>
                        <div className={"cell"}>
                            <div className={"btn-content"}>
                                <div className={"button_base double_roll ff"} onClick={()=>this.toggleContacts()}>
                                    <div>{lang.contact_us}</div>
                                    <div>{lang.contact_us}</div>
                                    <div>{lang.contact_us}</div>
                                    <div>{lang.contact_us}</div>
                                </div>
                            </div>
                        </div>
                        <div className="cell small nav-menu">
                            { !this.state.mobileMenu ?
                                <button className="hamburger" onClick={()=>this.toggleMenu()}>
                                    <MenuRounded />
                                </button> :
                                <button className="hamburger" onClick={()=>this.toggleMenu()}>
                                    <CloseRounded />
                                </button>
                            }
                            <nav className={`navigation ${this.state.mobileMenu ? "is-open" : ""}`}>
                                <ul>
                                    <li><NavLink to="/">{lang.home}</NavLink></li>
                                    <li><NavLink to="/article">{lang.article}</NavLink></li>
                                    <li><NavLink to="/category">{lang.category}</NavLink></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                {/* Contact Us modal part */}
                { this.state.toggleModal && <ContactUsModal lang={lang} toggleContacts={this.toggleContacts}/> }
            </header>
        );
    };
}

export default Header;