import {Fragment, FunctionComponent} from "react";
import {Route} from "react-router-dom";
import {PoolDashboardPage} from "./Pages/PoolDashboad";
import {PoolRoutesPath} from "./Routes";
import {PoolControlPage} from "./Pages/PoolControl";


export const PoolApp: FunctionComponent = () => {
    return <Fragment>
        <Route exact path={PoolRoutesPath.dashboard.target} component={PoolDashboardPage}/>
        <Route exact path={PoolRoutesPath.control.target} component={PoolControlPage}/>
    </Fragment>
}
