import React, {Component} from "react";
import {Grid, Paper} from '@material-ui/core';
import {NotInterested} from '@material-ui/icons';

class EmptyResult extends Component {

    render() {
        const {lang} = this.props;

        return (
            <div className={"rfg1 empty-result"}>
                <Grid container justify="center" spacing={3}>
                    <Grid item lg={8} xs={10}>
                        <Paper className={"paper"}>
                            <div className={"empty-result-content"}>
                                <NotInterested />
                                <span className={" ff fw"}>{lang.info_data_to_display}</span>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    };
}

export default EmptyResult;