import React, {Component} from "react";
import axios from "axios";
import {API_URL, API_KEY} from "../../constants";
import  {getDateNow} from "../../Helpers/dateHelper";
import {toast} from 'react-toastify';
import Layout from "../../Hoc/Layout/Layout";
import NewsItem from "./NewsItem";
import LoaderBox from "../LoaderBox/LoaderBox";
import EmptyResult from "../EmptyResult/EmptyResult";
import {Animated} from "react-animated-css";

// styles
import "./Home.css";
// languages
import lang from '../../Lang/en/en.json';

class Home extends Component {

    state = {
        latestNews : [],
        noNews: false,
        loader: false,
        emptyResult: false,
    }

    componentDidMount() {
        this.getLatestNews();
    }

    getLatestNews() {
        const keyWord = "new";
        const today = getDateNow();
        this.setState((prevState)=>{ return {...prevState, loader: true}});

        axios.get(`${API_URL}/everything?q=${keyWord}&from=${today}&sortBy=publishedAt&apiKey=${API_KEY}`)
            .then((response) => {
                if(response.status === 200 && response.data && response.data.articles && response.data.articles.length > 0){
                    let latestData = response.data.articles.slice(0, 10);
                    this.setState((prevState)=>{ return {...prevState, latestNews: [...latestData], loader: false}});
                }else {
                    toast.warn(`🦄 ${lang.no_recent_news}`);
                    this.setState((prevState)=>{ return {...prevState, loader: false, emptyResult: true}});
                }
            })
            .catch((error) => {
                console.log(`Latest News Error `, error);
                toast.error(`🦄 ${lang.error_server_no_data}`);
                this.setState((prevState)=>{ return {...prevState, loader: false, emptyResult: true}});
            });
    }

    render() {
        return (
            <div className={"main-content"}>
                <Animated animationIn="fadeInDown" animationInDuration={1000} isVisible={true}>
                    <h2 className={"ff"}>{lang.latest_news}</h2>
                </Animated>
                { this.state.loader ?
                    <LoaderBox lang={lang}/>
                    :
                    this.state.emptyResult ?
                        <EmptyResult lang={lang}/>
                        :
                        <NewsItem lang={lang} data={this.state.latestNews}/>
                }
            </div>
        );
    };
}

export default Layout(Home);