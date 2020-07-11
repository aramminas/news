import React, {Component} from 'react';
import {GridList, GridListTile, GridListTileBar, IconButton} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {LinkRounded} from '@material-ui/icons';
import {Animated} from "react-animated-css";

// distribution column
const cols = [2, 1, 1, 1, 1];

class ArticleItem extends Component {

    render() {
        const {lang, data} = this.props;

        return (
            <div className={"root"}>
                <GridList cellHeight={200} spacing={3} className={"grid-list"}>
                    {data.map((news, index) => (
                        <GridListTile key={`${news.source.name}-${index}`} cols={cols[index]} rows={2}>
                            <Animated animationIn={index%2 === 0 ? "rotateInDownLeft" : "rotateInUpRight"} animationInDuration={1000} isVisible={true}>
                                <img src={news.urlToImage ? news.urlToImage : "/images/news-no-image.jpg"} alt={news.title} />
                                <GridListTileBar
                                    title={news.title}
                                    titlePosition="top"
                                    actionIcon={
                                        <IconButton aria-label={`star ${news.title}`} className={"icon"}>
                                            <StarBorderIcon />
                                        </IconButton>
                                    }
                                    actionPosition="left"
                                    className={"title-bar"}
                                />
                                <GridListTileBar
                                    className={"article-description"}
                                    title={
                                        <>
                                            <p><span>{lang.by}:</span> {news.author}</p>
                                            <p><span>{lang.description}:</span> {news.description}</p>
                                            <p><span>{lang.content}:</span> {news.content}</p>
                                            <a href={news.url}><LinkRounded /> {lang.source}</a>
                                        </>
                                    }
                                />
                            </Animated>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

export default ArticleItem;