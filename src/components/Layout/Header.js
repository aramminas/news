import React, {Component} from "react";
import {MenuRounded, CloseRounded, Search, EmailTwoTone, PageviewTwoTone} from '@material-ui/icons';
import {Grid, IconButton} from '@material-ui/core';
import {NavLink, Redirect} from 'react-router-dom';
import ContactUsModal from "../ContactUsModal/ContactUsModal";
import MobileSearchModal from "../MobileSearchModal/MobileSearchModal";
import axios from "axios";
import {toast} from "react-toastify";
import {API_KEY, API_URL} from "../../constants";
// languages
import lang from '../../Lang/en/en.json';
import "./Button.css";
import "./Search.css";

class Header extends Component {

    state = {
        mobileMenu: false,
        toggleModal: false,
        toggleSearchModal: false,
        categories: [],
        search: "",
        currentSearch: "",
        goToSearch: false,
    };

    componentDidMount() {
        const categories = JSON.parse(localStorage.getItem("categories"));
        if(categories === null){
            this.getCategoriesList();
            this.setState((prevState)=>{ return {...prevState, goToSearch: false}});
        }else {
            this.setState((prevState)=>{ return {...prevState, categories: [...categories], goToSearch: false}});
        }
    }

    componentDidUpdate() {
        if(this.state.search === this.state.currentSearch){
            if(this.state.goToSearch){
                this.setState((prevState)=>{ return {...prevState, goToSearch: false}});
            }
        }
    }

    getCategoriesList = () => {
        axios.get(`${API_URL}/sources?apiKey=${API_KEY}`)
            .then((response) => {
                if(response.status === 200 && response.data && response.data.sources && response.data.sources.length > 0){
                    let tempCategories = [];
                    let catArr = [];
                    response.data.sources.map(item => {
                        if(tempCategories.indexOf(item.category) === -1){
                            let cat = `${item.category.charAt(0).toUpperCase()}${item.category.slice(1)}`;
                            catArr.push(cat);
                            tempCategories.push(item.category);
                        }
                        return true;
                    });
                    catArr = catArr.slice(0, 5);
                    this.setState((prevState)=>{ return {...prevState, categories: [...catArr]}});
                    localStorage.setItem("categories", JSON.stringify(catArr));
                }else {
                    console.log(`Categories List Not Found`);
                }
            })
            .catch((error) => {
                console.log(`Categories Server Error`, error);
            });
    }

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

    toggleSearch = () => {
        this.setState((prevState)=>{
            return {...prevState, toggleSearchModal: !this.state.toggleSearchModal};
        });
    };

    writeInSearch = (ev) => {
        const value = ev.target.value;
        this.setState((prevState)=>{ return {...prevState, search: value}});
    }

    getArticle = (data = "") => {
        let search = data === "" ? `${this.state.search}`.trim() : data;
        if(search !== ""){
            this.setState((prevState)=>{ return {...prevState, goToSearch: true, search, currentSearch: search}});
        }else {
            toast.warning(`🦄 ${lang.warning_search}`);
        }
    }

    render() {
        if(this.state.goToSearch){
            return <Redirect to={`/article/${this.state.search}`} />
        }

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
                                <NavLink to="/" exact activeClassName="active">
                                    <li>{lang.home}</li>
                                </NavLink>
                                { this.state.categories.map(item => (
                                        <NavLink to={`/category/${item}`} activeClassName="active" key={item}>
                                            <span>{item}</span>
                                        </NavLink>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className={"cell items-content"}>
                            <Grid container spacing={3}>
                                <Grid item lg={7} md={12}>
                                    <div className="search">
                                        <input
                                            type="text"
                                            className="search-input"
                                            value={this.state.search}
                                            placeholder={lang.search_placeholder}
                                            onChange={(ev)=>this.writeInSearch(ev)}
                                        />
                                        <button type="submit" className="search-btn" onClick={()=>this.getArticle()}>
                                            <Search />
                                        </button>
                                    </div>
                                </Grid>
                                <Grid item lg={5} md={12}>
                                    <div className={"btn-content"}>
                                        <div className={"button_base double_roll ff"} onClick={()=>this.toggleContacts()}>
                                            <div>{lang.contact_us}</div>
                                            <div>{lang.contact_us}</div>
                                            <div>{lang.contact_us}</div>
                                            <div>{lang.contact_us}</div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="cell small nav-menu">
                            <div className={"mobile-search"} onClick={()=>this.toggleSearch()}>
                                <IconButton className={"mobile-icon"}><PageviewTwoTone fontSize={"large"}/></IconButton>
                            </div>
                            <div className={"mobile-btn-content"}>
                                <div onClick={()=>this.toggleContacts()}>
                                    <IconButton className={"mobile-icon"}><EmailTwoTone fontSize={"large"}/></IconButton>
                                </div>
                            </div>
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
                                    { this.state.categories.map(item => (
                                            <li key={item}><NavLink to={`/category/${item}`}>{item}</NavLink></li>
                                        ))
                                    }
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                {/* Contact Us modal part */}
                { this.state.toggleModal && <ContactUsModal lang={lang} toggleContacts={this.toggleContacts}/> }
                {/* Search Mobile modal part */}
                { this.state.toggleSearchModal && <MobileSearchModal lang={lang} toggleSearch={this.toggleSearch} getArticle={this.getArticle}/> }
            </header>
        );
    };
}

export default Header;