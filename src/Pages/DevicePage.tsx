import {FunctionComponent, useContext, useEffect, useState} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {IconButton, Stack, Tooltip, Typography} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {Template, TemplateTopBar} from "../Template/Template";
import {deviceActions} from "../Store/Device/DeviceActions";
import {ContextAuthentication} from "../Context/ContextAuthentication";
import {deviceSelectFromHome} from "../Store/Device/DeviceSelector";
import {useDispatch, useSelector} from "react-redux";
import {DeviceGrid} from "../Components/Device/DeviceGrid";
import {HomeInfo} from "../Store/Home/HomeReducer";
import {homeActions} from "../Store/Home/HomeActions";
import {homeSelector} from "../Store/Home/HomeSelector";
import {Routes} from "../Config/Routes";

export const DevicePage: FunctionComponent = () => {
	const authContext = useContext(ContextAuthentication)

	const [homeId, setHomeId] = useState<undefined | HomeInfo['id']>(undefined)

	const dispatch = useDispatch<any>()
	const location = useLocation()
	const history = useHistory()

	const home = useSelector(homeSelector.getOne(homeId))
	const devicesStore = useSelector(deviceSelectFromHome(homeId))

	useEffect(() => {
		const urlSearch = new URLSearchParams(location.search)
		const searchHomeId = urlSearch.get('homeId')
		if (searchHomeId) {
			setHomeId(searchHomeId)
		} else {
			const defaultHomeId = localStorage.getItem('homeId')
			if (defaultHomeId) {
				setHomeId(defaultHomeId)
			} else {
				history.push(Routes.home.target)
			}
		}
	}, [location])

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
					<Typography variant='h4'>
						{home?.home.name}
					</Typography>
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
