import {FunctionComponent} from "react";
import {Template} from "../../Template/Template";
import {AccountProfileTab} from "./AccountProfil";
import {AccountSecurityPasswordTab} from "./AccountSecurity";
import {AccountAuthKeyTab} from "./AccountAuthKey";
import {TabNavigation} from "../../Components/Navigation/TabNavigation";
import {AccountThemeTab} from "./AccountTheme";


export const AccountPage: FunctionComponent = () => {
    return <Template>
        <TabNavigation default={0} tabs={[
            {
                name: 'Profil',
                anchor: 'profil',
                component: <AccountProfileTab/>
            },
            {
                name: 'Mot de passe',
                anchor: 'password',
                component: <AccountSecurityPasswordTab/>
            },
            {
                name: 'Connexions',
                anchor: 'connexions',
                component: <AccountAuthKeyTab/>
            },
            {
                name: 'Theme',
                anchor: 'theme',
                component: <AccountThemeTab/>
            }
        ]}/>
    </Template>
}
