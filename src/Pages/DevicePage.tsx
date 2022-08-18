import {FunctionComponent, useContext, useEffect, useState} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {Breadcrumbs, IconButton, Stack, Tooltip} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Template, TemplateTopBar} from "../Template/Template";
import {deviceActions} from "../Store/Device/DeviceActions";
import {ContextAuthentication} from "../Context/ContextAuthentication";
import {deviceSelectFromHome} from "../Store/Device/DeviceSelector";
import {useDispatch, useSelector} from "react-redux";
import {DeviceGrid} from "../Components/Device/DeviceGrid";
import {Home} from "../Store/Home/HomeReducer";
import {homeActions} from "../Store/Home/HomeActions";
import {RoutesPath} from "../Config/Routes";
import {homeSelectOne} from "../Store/Home/HomeSelector";


export const DevicePage: FunctionComponent = () => {
	const authContext = useContext(ContextAuthentication)

	const [homeId, setHomeId] = useState<undefined | Home['id']>(undefined)

	const dispatch = useDispatch<any>()
	const location = useLocation()
	const history = useHistory()

	const home = useSelector(homeSelectOne(homeId))
	const devicesStore = useSelector(deviceSelectFromHome(homeId))

	useEffect(() => {
		const urlSearch = new URLSearchParams(location.search)
		const searchHomeId = urlSearch.get('homeId')
		if (searchHomeId) {
			setHomeId(searchHomeId)
		} else {
			const defaultHomeId = localStorage.getItem('defaultHomeId')
			if (defaultHomeId) {
				setHomeId(defaultHomeId)
			} else {
				history.push('/')
			}
		}
	}, [])

	useEffect(() => {
		if (homeId) {
			dispatch(
				homeActions.getOne({
					authenticationKey: authContext.authenticationKey,
					homeId,
				})
			)
			dispatch(
				deviceActions.getAll({
					authenticationKey: authContext.authenticationKey,
					homeId
				})
			)
		}
	}, [homeId, dispatch, deviceActions])

	return (
		<Template>
			<TemplateTopBar>
				<Stack direction='row' justifyContent='space-between' alignItems='center'>
					<div>
						<h3> {home?.home.name} </h3>
					</div>
					<div>
						<Tooltip title='Détails'>
							<IconButton color='primary'>
								<MoreVertIcon/>
							</IconButton>
						</Tooltip>
					</div>
				</Stack>
			</TemplateTopBar>
			<DeviceGrid devicesStore={devicesStore}/>
		</Template>
	)
}
