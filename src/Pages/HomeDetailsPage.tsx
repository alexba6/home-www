import {AuthenticatedRouteProps} from "../Context/ContextAuthentication";
import {FunctionComponent, useEffect, useState} from "react";
import {Template} from "../Template/Template";
import {useHistory, useLocation} from "react-router-dom";
import {RoutesPath} from "../Config/Routes";
import {useDispatch, useSelector} from "react-redux";
import {homeActions} from "../Store/Home/HomeActions";
import {homeSelectOne} from "../Store/Home/HomeSelector";
import {Home} from "../Store/Home/HomeReducer";
import {Button} from "../Components/Button/Button";
import {OptionsIcon} from "../Icons/Options";
import {FilterIcon} from "../Icons/FilterIcon";
import {TextLink} from "../Components/Link/TextLink";


export const HomeDetailsPage: FunctionComponent<AuthenticatedRouteProps> = (props) => {
    const { authenticationKey } = props

    const [homeId, setHomeId] = useState<undefined | Home['id']>(undefined)

    const dispatch = useDispatch<any>()
    const location = useLocation()
    const history = useHistory()

    const home = useSelector(homeSelectOne(homeId))

    useEffect(() => {
        const urlSearch = new URLSearchParams(location.search)
        const searchHomeId = urlSearch.get('homeId')
        if (searchHomeId) {
            setHomeId(searchHomeId)
            dispatch(homeActions.getOne({
                authenticationKey, homeId: searchHomeId
            }))
        } else {
            history.push(RoutesPath.home.target)
        }
    }, [])

    console.log(home)

    return <Template>
        <div className='flex flex-align-center flex-justify-space-between'>
            <div>
                <h2> {home?.home.name} </h2>
            </div>
            <div>
                <Button onClick={() => {}} variant='primary'>
                    <OptionsIcon/>
                </Button>
            </div>
        </div>

    </Template>
}
