import React, {Component} from "react";
import {Grid, Paper} from '@material-ui/core';
import {LinkRounded} from '@material-ui/icons';
import {Animated} from "react-animated-css";

class CategoryItems extends Component{

    render() {
        const {lang, categories} = this.props;

        return (
            <Grid container spacing={3}>
                { categories.map((item, index) => (
                        <Grid item xs={12} key={`${item.source.name}-${index}`} className={"category-item-content"}>
                            <Paper className={"paper"}>
                                <Animated animationIn={index%2 === 0 ? "bounceInLeft": "bounceInRight"} animationInDuration={1500} isVisible={true}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} lg={4} className={"category-item-image"}>
                                            <figure>
                                                <img src={item.urlToImage ? item.urlToImage : "/images/news-no-image.jpg"} alt="article"/>
                                            </figure>
                                        </Grid>
                                        <Grid item xs={12} sm={8} className={"category-item-body"}>
                                            <div className={"category-item-title"}>
                                                {item.source.name}
                                            </div>
                                            <p>
                                                <span>{lang.title}:</span> {item.title}
                                            </p>
                                            <p>
                                                <span>{lang.author}:</span> {item.author}
                                            </p>
                                            <p>
                                                <span>{lang.content}:</span> {item.content}
                                            </p>
                                            <p>
                                                <span>{lang.description}:</span> {item.description}
                                            </p>
                                            <p>
                                                <span>{lang.published_at}:</span> {item.publishedAt}
                                                <span className={"category-item-link"}>{lang.source}:
                                                    <a href={item.url} target="_blank" rel="noopener noreferrer"><LinkRounded /></a>
                                                </span>
                                            </p>
                                        </Grid>
                                    </Grid>
                                </Animated>
                            </Paper>
                        </Grid>
                    )
                )};
            </Grid>
        );
    };
}

export default CategoryItems;