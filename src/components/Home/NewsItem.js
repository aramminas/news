import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Grid, GridList, GridListTile, GridListTileBar, IconButton} from '@material-ui/core';
import {Info} from '@material-ui/icons';
import {Animated} from "react-animated-css";

// distribution column
const cols = [2, 1, 1, 1, 1, 1, 2, 3, 2, 1];

class NewsItem extends Component {

    render() {
        const {lang, data} = this.props;

        return (
            <div className={"news-item root"}>
                <Grid container justify="center" spacing={3}>
                    <Grid item lg={7} xs={10}>
                        <GridList cellHeight={160} className={"grid-list"} cols={3}>
                            { data.map((news, index) => {
                                return (
                                    <GridListTile key={`${news.source.name}-${index}`} cols={cols[index] || 1}>
                                        <Animated animationIn="zoomIn" animationInDuration={1000 + (100 * index)} isVisible={true}>
                                            <img src={news.urlToImage !== null ? news.urlToImage : "/images/news-default.jpg"} alt={news.title} />
                                            <GridListTileBar
                                                title={
                                                    <NavLink to={`/article/${news.source.name}`} className={"news-item-link"}>
                                                        <span>{news.title}</span>
                                                    </NavLink>
                                                }
                                                subtitle={<span>{lang.by}: {news.author !== null ? news.author : lang.unknown}</span>}
                                                actionIcon={
                                                    <IconButton aria-label={`${lang.info_about} ${news.title}`} className={"icon"}>
                                                        <Info />
                                                    </IconButton>
                                                }
                                            />
                                        </Animated>
                                    </GridListTile>
                                );
                            })};
                        </GridList>
                    </Grid>
                </Grid>
            </div>
        );
    };
}

export default NewsItem;