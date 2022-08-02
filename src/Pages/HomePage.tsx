import { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AuthenticatedRouteProps } from '../Context/ContextAuthentication'
import { Template } from '../Template/Template'
import { Button } from '../Components/Button/Button'
import { AddIcon } from '../Icons/Add'
import { homeSelectAll } from '../Store/Home/HomeSelector'
import { HomeStore } from '../Store/Home/HomeReducer'
import { homeActions } from '../Store/Home/HomeActions'
import { HomeGrid } from '../Components/Home/HomeGrid'
import { Modal } from '../Components/Modal/Modal'
import { useModalControl } from '../Hooks/UseModalControl'
import { Input } from '../Components/Input/Input'
import { toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'
import { useHistory } from 'react-router-dom'
import { RoutesPath } from '../Config/Routes'

type HomeAddModalContentProps = {
	onAdd: (name: string) => void
	onClose: () => void
}

const HomeAddModalContent: FunctionComponent<HomeAddModalContentProps> = (props) => {
	const [name, setName] = useState('')

	const handleAdd = () => {
		props.onClose()
		props.onAdd(name)
	}

	return (
		<Fragment>
			<Modal.Body>
				<Input placeholder="Nom" value={name} onValue={setName} />
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onClose} variant="danger">
					Fermer
				</Button>
				<Button onClick={handleAdd} variant="primary">
					Ajouter
				</Button>
			</Modal.Footer>
		</Fragment>
	)
}

export const HomePage: FunctionComponent<AuthenticatedRouteProps> = (props) => {
	const { authenticationKey } = props

	const dispatch = useDispatch<any>()
	const addHomeModal = useModalControl()
	const history = useHistory()

	const homes = useSelector(homeSelectAll)

	useEffect(() => {
		dispatch(
			homeActions.getAll({
				authenticationKey,
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
						authenticationKey,
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
			<Modal.Provider
				display={addHomeModal.display}
				onClose={addHomeModal.close}
				name="Ajouter une maison"
				disabledOutsideClick={true}
			>
				<HomeAddModalContent onAdd={handleAddHome} onClose={addHomeModal.close} />
			</Modal.Provider>
			<div className="flex flex-align-center flex-justify-space-between">
				<div>
					<h2>Maisons</h2>
				</div>
				<div>
					<Button onClick={addHomeModal.show} variant="primary">
						<AddIcon />
					</Button>
				</div>
			</div>
			<HomeGrid homes={homes} onOpen={handleOpenHome} />
		</Template>
	)
}
