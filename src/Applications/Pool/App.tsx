import {Fragment, FunctionComponent} from "react";
import {Route} from "react-router-dom";
import {PoolDashboardPage} from "./Pages/PoolDashboad";
import {PoolRoutesPath} from "./Routes";


export const PoolApp: FunctionComponent = () => {
    return <Fragment>
        <Route exact path={PoolRoutesPath.dashboard.target}>
            <PoolDashboardPage/>
        </Route>
    </Fragment>
}
