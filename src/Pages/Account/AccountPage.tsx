import {FunctionComponent} from "react";
import {Template} from "../../Template/Template";
import {AccountProfileTab} from "./AccountProfil";
import {AccountSecurityTab} from "./AccountSecurity";
import {AccountAuthKeyTab} from "./AccountAuthKey";
import {TabNavigation} from "../../Components/Navigation/TabNavigation";
import {AccountPreferencesTab} from "./AccountPreferences";


export const AccountPage: FunctionComponent = () => {
    return <Template>
        <TabNavigation default={0} tabs={[
            {
                name: 'Profil',
                anchor: 'profil',
                component: <AccountProfileTab/>
            },
            {
                name: 'Sécurité',
                anchor: 'security',
                component: <AccountSecurityTab/>
            },
            {
                name: 'Connexions',
                anchor: 'connexions',
                component: <AccountAuthKeyTab/>
            },
            {
                name: 'Préférences',
                anchor: 'preferences',
                component: <AccountPreferencesTab/>
            }
        ]}/>
    </Template>
}
