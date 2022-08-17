import {Fragment, FunctionComponent, useContext, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ContextAuthentication} from '../Context/ContextAuthentication'
import { Template } from '../Template/Template'
import { Button } from '../Components/Button/Button'
import { AddIcon } from '../Icons/Add'
import { homeSelectAll } from '../Store/Home/HomeSelector'
import { HomeStore } from '../Store/Home/HomeReducer'
import { homeActions } from '../Store/Home/HomeActions'
import { HomeGrid } from '../Components/Home/HomeGrid'
import { ModalBody, ModalFooter, ModalProvider} from '../Components/Modal/Modal'
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
			<ModalBody>
				<Input placeholder="Nom" value={name} onValue={setName} />
			</ModalBody>
			<ModalFooter>
				<div>
					<Button onClick={props.onClose} variant="danger">
						Fermer
					</Button>
				</div>
				<div>
					<Button onClick={handleAdd} variant="primary">
						Ajouter
					</Button>
				</div>
			</ModalFooter>
		</Fragment>
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
			<ModalProvider
				display={addHomeModal.display}
				onClose={addHomeModal.close}
				name="Ajouter une maison"
				disabledOutsideClick={true}
			>
				<HomeAddModalContent onAdd={handleAddHome} onClose={addHomeModal.close} />
			</ModalProvider>
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
