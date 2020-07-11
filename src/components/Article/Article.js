import React, {Component} from "react";
import axios from "axios";
import {API_KEY, API_URL} from "../../constants";
import {toast} from "react-toastify";
import {Grid, Paper} from '@material-ui/core';
import {NotInterested, InfoOutlined} from '@material-ui/icons';
import Layout from "../../Hoc/Layout/Layout";
import ArticleItem from "./ArticleItem";
import LoaderBox from "../LoaderBox/LoaderBox";
import {Animated} from "react-animated-css";
import "./Article.css"
import "../css/common.css";
import lang from "../../Lang/en/en.json";

class Article extends Component {

    state = {
        article: [],
        mainArticle: {},
        notFound: false,
        loader: false,
        articleId: "",
        title: false,
    }

    componentDidMount() {
        this.getArticleByName();
    }

    componentDidUpdate() {
        const {id} = this.props.match.params;
        if(id !== this.state.articleId){
            this.setState((prevState)=>{ return {...prevState, articleId: id}});
            this.getArticleByName();
        }
    }

    getArticleByName = () => {
        let {id} = this.props.match.params;
        this.setState((prevState)=>{ return {...prevState, loader: true, articleId: id, title: false}});
        axios.get(`${API_URL}/everything?q=${id}&sortBy=publishedAt&apiKey=${API_KEY}`)
            .then((response) => {
                if(response.status === 200 && response.data && response.data.articles && response.data.articles.length > 0){
                    let similarArticles = response.data.articles.slice(0, 5);
                    this.setState((prevState) => {
                        return {
                            ...prevState,
                            article: [...similarArticles],
                            mainArticle: {...similarArticles[0]},
                            loader: false,
                            title: true,
                        }
                    });
                }else {
                    toast.warn(`🦄 ${lang.warning_article_not_found}`);
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
                    <Animated animationIn="rubberBand" animationOut="zoomOut" animationInDuration={1000} animationOutDuration={1000}
                              isVisible={this.state.title}>
                        <h2 className={"ff"}>{
                            this.state.mainArticle?.source?.name ?
                                this.state.mainArticle?.source?.name :
                                lang.article_not_found}
                        </h2>
                    </Animated>
                </div>
                { !this.state.loader ?
                    <Grid container justify="center" className={"common-container"} spacing={3}>
                        { this.state.notFound ?
                            <Grid item xs={8}>
                                <Paper className={"paper"}>
                                    <div className={"no-common-content"}>
                                        <p><NotInterested htmlColor={"red"}/> {lang.not_found_msg_1}</p>
                                        <p><InfoOutlined htmlColor={"#00c3ff"}/> {lang.not_found_msg_2}</p>
                                        <p><InfoOutlined htmlColor={"#00c3ff"}/> {lang.not_found_msg_3}</p>
                                    </div>
                                </Paper>
                            </Grid>
                            :
                            <Grid item xs={8}>
                                <Paper className={"paper"}>
                                    <ArticleItem lang={lang} data={this.state.article}/>
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

export default Layout(Article);