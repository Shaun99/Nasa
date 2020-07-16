import React from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";

import App from "./App";
import History from './History';
import Tech from './Tech';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';

//Router use to route to EachRecipe.js page (show detail of selected recipe) and History.js page (show search history table)

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/home" component={Home} />
            <Route path="/history" component={History}/> 
            <Route path="/tech" component={Tech}/> 
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register}/> 
            <Route path="/logout" component={Logout}/> 
            {/* if route not found */}
            <Route path="*" component={App} />
        </Switch>
    </BrowserRouter>
);

export default Router;