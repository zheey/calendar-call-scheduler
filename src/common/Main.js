import React from "react";
import {Switch, Route} from "react-router-dom";
import Mentors from "../components/Mentors";

const Main = ({onClickAction}) => {
    const MentorsHOC = () => <Mentors onClickAction={onClickAction}/>
    return(
        <>
            <Switch>
                <Route exact path={'/mentors'} component={MentorsHOC}/>
            </Switch>
        </>
    )
};

export default Main;