import React, {Component} from "react";
import {Grid, Paper} from '@material-ui/core';
import Loader from "react-loader-spinner";
import "./LoaderBox.css";

class LoaderBox extends Component{

    render() {
        const {lang} = this.props;

        return (
            <div className={"rfg1 loader-root"}>
                <Grid container justify="center" spacing={3}>
                    <Grid item lg={8} xs={10}>
                        <Paper className={"paper"}>
                            <div className={"loader-content"}>
                                <div className={"loader-element"}>
                                    <Loader type="Rings" color="black" height={100} width={100}/>
                                </div>
                                <span className={"loader-text ff fw"}>{lang.info_please_wait_loading}</span>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    };
}

export default LoaderBox;