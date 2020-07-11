import React, {Suspense, lazy} from "react";
import {Route, Switch} from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// main components for router
const Home = lazy(() => import("./components/Home/Home"));
const Article = lazy(() => import("./components/Article/Article"));
const Category = lazy(() => import("./components/Category/Category"));

const NotFound = lazy(() => import("./components/NotFound/NotFound404"));

const routes = (
    <Suspense fallback={<div className={"main-loader"}><Loader type="Rings" color="black" height={100} width={100}/></div>}>
        <Switch>
            {/* main routes */}
            <Route path="/" exact component={Home}/>
            <Route path="/article/:id" exact component={Article}/>
            <Route path="/category/:id" exact component={Category}/>

            <Route path='*' exact component={NotFound} />
        </Switch>
    </Suspense>
);

export default routes;
