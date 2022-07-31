import {FunctionComponent, useEffect, useState} from "react";
import {AuthenticatedRouteProps} from "../../Context/ContextAuthentication";
import {Template} from "../../Template/Template";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../Store/User/UserActions";
import {Card, CardHeader} from "../../Components/Card/Card";
import {Input} from "../../Components/Input/Input";
import {userSelectInfo} from "../../Store/User/UserSelector";


export const AccountProfilePage: FunctionComponent<AuthenticatedRouteProps> = (props) => {
    const { authenticationKey } = props

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch<any>()

    const userInfo = useSelector(userSelectInfo)

    useEffect(() => {
        if (!userInfo) {
            dispatch(userActions.getInfo({
                authenticationKey
            }))
        }
    }, [userInfo])

    useEffect(() => {
        if (userInfo) {
            const { username, firstname, lastname, email } = userInfo
            setUsername(username)
            if (firstname) {
                setFirstName(firstname)
            }
            if (lastname) {
                setLastName(lastname)
            }
            setEmail(email)
        }
    }, [userInfo])


    return (
        <Template>
            <Card>
                <CardHeader>
                    <h3>Informations générales</h3>
                </CardHeader>
                {userInfo && <div>
                    <Input placeholder="No d'utilisateur" value={username} setValue={setUsername}/>
                    <Input placeholder='Prénom' value={firstName} setValue={setFirstName}/>
                    <Input placeholder='Nom' value={lastName} setValue={setLastName}/>
                </div>}
            </Card>
            <br/>
            <Card>
                <CardHeader>
                    <h3>Coordonnées</h3>
                    {userInfo && <div>
                        <Input placeholder='Email' value={email} setValue={setEmail}/>
                    </div>}
                </CardHeader>
            </Card>
        </Template>
    )
}
