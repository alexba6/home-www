import {Fragment, FunctionComponent, useContext, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {TextField, Button, IconButton, Tooltip, Stack} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { ContextAuthentication} from '../../Context/ContextAuthentication'
import {Template, TemplateTopBar} from '../../Template/Template'
import { homeSelectAll } from '../../Store/Home/HomeSelector'
import { HomeStore } from '../../Store/Home/HomeReducer'
import { homeActions } from '../../Store/Home/HomeActions'
import { HomeGrid } from '../../Components/Home/HomeGrid'
import { ModalBody, ModalFooter, ModalProvider} from '../../Components/Modal/Modal'
import { useModalControl } from '../../Hooks/UseModalControl'
import { toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'
import { useHistory } from 'react-router-dom'
import { RoutesPath } from '../../Config/Routes'

type HomeAddModalContentProps = {
	display: boolean
	onAdd: (name: string) => void
	onClose: () => void
}

const HomeAddModalContent: FunctionComponent<HomeAddModalContentProps> = (props) => {
	const nameRef = useRef<HTMLInputElement>(null)

	const handleAdd = () => {
		if (nameRef.current ) {
			props.onClose()
			props.onAdd(nameRef.current.value)
		}
	}

	return (
		<ModalProvider disabledOutsideClick display={props.display} onClose={props.onClose} name='Ajouter une maison'>
			<ModalBody>
				<TextField inputRef={nameRef} type='text' label='Nom' size='small' variant='outlined' fullWidth/>
			</ModalBody>
			<ModalFooter>
				<Button onClick={handleAdd}>
					Ajouter
				</Button>
			</ModalFooter>
		</ModalProvider>
	)
}

export const HomePage: FunctionComponent = () => {
	const authContext = useContext(ContextAuthentication)

	const dispatch = useDispatch<any>()
	const addHomeModal = useModalControl()
	const history = useHistory()

	const homes = useSelector(homeSelectAll)

	useEffect(() => {
		dispatch(
			homeActions.getAll({
				authenticationKey: authContext.authenticationKey,
			})
		)
	}, [dispatch])

	const handleOpenHome = (homeStore: HomeStore) => {
		history.push({
			pathname: RoutesPath.homeDetails.target,
			search: `?homeId=${homeStore.home.id}`,
		})
	}

	const handleAddHome = (name: string) => {
		const id = toast.loading('Ajout de la maison')
		try {
			unwrapResult(
				dispatch(
					homeActions.add({
						authenticationKey: authContext.authenticationKey,
						home: { name },
					})
				)
			)
			toast.success('Maison ajoutée')
		} catch (e) {
			toast.error("Impossible d'ajouter la maison")
		} finally {
			toast.dismiss(id)
		}
	}

	return (
		<Template>
			<HomeAddModalContent onAdd={handleAddHome} onClose={addHomeModal.close} display={addHomeModal.display}/>
			<TemplateTopBar>
				<Stack direction='row' justifyContent='space-between' alignItems='center'>
					<div>
						<h3>Maisons</h3>
					</div>
					<div>
						<Tooltip title='Ajouter une maisons'>
							<IconButton onClick={addHomeModal.show} color='primary'>
								<AddIcon/>
							</IconButton>
						</Tooltip>
					</div>
				</Stack>
			</TemplateTopBar>
			<HomeGrid homes={homes} onOpen={handleOpenHome} />
		</Template>
	)
}
