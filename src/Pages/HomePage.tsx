import {Fragment, FunctionComponent, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";

import {AuthenticatedRouteProps} from "../Context/ContextAuthentication"
import {Template} from "../Template/Template"
import {Button} from "../Components/Button/Button";
import {AddIcon} from "../Icons/Add";
import {homeSelectAll, homeSelectStore} from "../Store/Home/HomeSelector";
import {HomeStore, HomeStoreStatus} from "../Store/Home/HomeReducer";
import {homeActions} from "../Store/Home/HomeActions";
import {Table} from "../Components/Table/Table";
import {Card, CardHeader} from "../Components/Card/Card";
import {HomeRow} from "../Components/Home/HomeRow";
import { Modal } from '../Components/Modal/Modal'
import {ModalControl, useModalControl} from "../Hooks/UseModalControl";
import {Input} from "../Components/Input/Input";
import {toast} from "react-toastify";
import {getAuthorization} from "../Tools/Authentication";
import {unwrapResult} from "@reduxjs/toolkit";

type AddHomeModalContentProps = {
    onAdd: (name: string) => void
    onClose: () => void
}

const AddHomeModalContent: FunctionComponent<AddHomeModalContentProps> = (props) => {
    const [name, setName] = useState('')

    const handleAdd = () => {
        props.onClose()
        props.onAdd(name)
    }

     return <Fragment>
         <Modal.Body>
             <Input placeholder='Nom' value={name} onValue={setName}/>
         </Modal.Body>
         <Modal.Footer>
             <Button onClick={props.onClose} variant='danger'>
                 Fermer
             </Button>
             <Button onClick={handleAdd} variant='primary'>
                 Ajouter
             </Button>
         </Modal.Footer>
     </Fragment>
}

export const Homepage: FunctionComponent<AuthenticatedRouteProps> = (props) => {
    const { authenticationKey } = props

    const dispatch = useDispatch<any>()
    const addHomeModal = useModalControl()

    const homes = useSelector(homeSelectAll)
    const homeStore = useSelector(homeSelectStore)

    useEffect(() => {
        if (homeStore.status === HomeStoreStatus.IDLE) {
            dispatch(homeActions.getAll({
                authenticationKey
            }))
        }
    }, [homeStore, dispatch])


    const handleAddHome = (name: string) => {
        const id = toast.loading('Ajout de la maison')
        try {
            unwrapResult(dispatch(homeActions.add({
                authenticationKey, home: { name }
            })))
            toast.success('Maison ajoutée')
        } catch (e) {
            toast.error('Impossible d\'ajouter la maison')
        } finally {
            toast.dismiss(id)
        }
    }

    return <Template>
        <Modal.Provider display={addHomeModal.display} onClose={addHomeModal.close} name='Ajouter une maison' disabledOutsideClick>
            <AddHomeModalContent onAdd={handleAddHome} onClose={addHomeModal.close}/>
        </Modal.Provider>
        <Card>
            <CardHeader>
                <h3>Maisons</h3>
            </CardHeader>
            <div className='flex flex-align-center flex-justify-end'>
                <div>
                    <Button onClick={addHomeModal.show} variant='primary'>
                        <AddIcon/>
                    </Button>
                </div>
            </div>
            <div>
                <Table>
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Nombre d'appareils</th>
                        <th>Ajouté le</th>
                    </tr>
                    </thead>
                    <tbody>
                    {homes.map((home: HomeStore, key: number) => <HomeRow
                        key={key}
                        home={home}
                        onOpen={() => console.log('open', home.home.id)}
                    />)}
                    </tbody>
                </Table>
            </div>
        </Card>
    </Template>
}
