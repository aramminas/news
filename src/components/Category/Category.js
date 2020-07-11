import React, {Component} from "react";
import Layout from "../../Hoc/Layout/Layout";
import lang from "../../Lang/en/en.json";
import LoaderBox from "../LoaderBox/LoaderBox";
import {Grid, Paper} from '@material-ui/core';
import axios from "axios";
import {API_KEY, API_URL} from "../../constants";
import {toast} from "react-toastify";
import {InfoOutlined, NotInterested} from "@material-ui/icons";
import CategoryItems from "./CategoryItems";
import {Animated} from "react-animated-css";
import "./Category.css";
import "../css/common.css";

class Category extends Component{

    constructor(props) {
        super(props);
        this.state = {
            categoryId: "",
            categories: [],
            loader: false,
            title: true,
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.setState((prevState)=>{ return {...prevState, categoryId: id}});
        this.getArticleByCategory();
    }

    componentDidUpdate() {
        const {id} = this.props.match.params;
        if(id !== this.state.categoryId){
            this.setState((prevState)=>{ return {...prevState, categoryId: id}});
            this.getArticleByCategory();
        }
    }

    getArticleByCategory = () => {
        let {id} = this.props.match.params;
        this.setState((prevState)=>{ return {...prevState, loader: true, title: false}});
        axios.get(`${API_URL}/top-headlines?country=us&category=${id}&apiKey=${API_KEY}`)
            .then((response) => {
                if(response.status === 200 && response.data && response.data.articles && response.data.articles.length > 0){
                    this.setState((prevState) => {
                        return {
                            ...prevState,
                            categories: [...response.data.articles.slice(0, 20)],
                            loader: false,
                            title: true,
                        }
                    });
                }else {
                    toast.warn(`🦄 ${lang.warning_category_not_found}`);
                    this.setState((prevState)=>{ return {...prevState, notFound: true,loader: false, title: true}});
                }
            })
            .catch((error) => {
                console.log(`Article Data Error `, error);
                toast.error(`🦄 ${lang.error_article}`);
                this.setState((prevState)=>{ return {...prevState, notFound: false, loader: false, title: true}});
            });
    }

    render() {
        return (
            <div className={"main-content common-content root"}>
                <div className={"common-content-title"}>
                    <Animated animationIn="flipInY" animationOut="zoomOut" animationInDuration={1000} animationOutDuration={1000}
                              isVisible={this.state.title}>
                        <ul className="category-main-title">
                            <li>
                                <a href={this.state.categories.length > 0 ? this.state.categories[0].url : "/"}>
                                    <span>{this.state.categoryId ? this.state.categoryId : lang.category_not_found}</span>
                                </a>
                            </li>
                        </ul>
                    </Animated>
                </div>
                { !this.state.loader ?
                    <Grid container justify="center" className={"common-container"} spacing={3}>
                        { this.state.notFound ?
                            <Grid item xs={8}>
                                <Paper className={"paper"}>
                                    <div className={"no-common-content"}>
                                        <p><NotInterested htmlColor={"red"}/> {lang.not_found_cat_msg_1}</p>
                                        <p><InfoOutlined htmlColor={"#00c3ff"}/> {lang.not_found_cat_msg_2}</p>
                                        <p><InfoOutlined htmlColor={"#00c3ff"}/> {lang.not_found_cat_msg_3}</p>
                                    </div>
                                </Paper>
                            </Grid>
                            :
                            <Grid item xs={8}>
                                <Paper className={"paper"}>
                                    <CategoryItems lang={lang} categories={this.state.categories}/>
                                </Paper>
                            </Grid>
                        }
                    </Grid>
                    :
                    <LoaderBox lang={lang}/>
                }
            </div>
        );
    };
}

export default Layout(Category);