import { ContextAuthentication} from '../../Context/ContextAuthentication'
import {FunctionComponent, useContext, useEffect, useState} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {Breadcrumbs, IconButton, Stack, Tooltip} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {Template, TemplateTopBar} from '../../Template/Template'
import { RoutesPath } from '../../Config/Routes'
import { useDispatch, useSelector } from 'react-redux'
import { homeActions } from '../../Store/Home/HomeActions'
import { homeSelectOne } from '../../Store/Home/HomeSelector'
import { Home } from '../../Store/Home/HomeReducer'
import {deviceActions} from "../../Store/Device/DeviceActions";
import {deviceSelectFromHome} from "../../Store/Device/DeviceSelector";
import {DeviceGrid} from "../../Components/Device/DeviceGrid";
import AddIcon from "@mui/icons-material/Add";

export const HomeDetailsPage: FunctionComponent = () => {
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
			dispatch(
				homeActions.getOne({
					authenticationKey: authContext.authenticationKey,
					homeId: searchHomeId,
				})
			)
			dispatch(
				deviceActions.getAll({
					authenticationKey: authContext.authenticationKey,
					homeId: searchHomeId
				})
			)
		} else {
			history.push(RoutesPath.home.target)
		}
	}, [])

	return (
		<Template>
			<TemplateTopBar>
				<Stack direction='row' justifyContent='space-between' alignItems='center'>
					<div>
						<Breadcrumbs aria-label='home' separator={<NavigateNextIcon />}>
							<h3>Maisons</h3>
							<h3> {home?.home.name} </h3>
						</Breadcrumbs>
					</div>
					<div>
						<Tooltip title='Détails maison'>
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
