import {FunctionComponent, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {InputSearchBar, InputSearchItem} from "../Components/Input/InputSearchBar";
import { ContextAuthentication } from "../Context/ContextAuthentication";
import {homeSelector} from "../Store/Home/HomeSelector";
import {homeActions} from "../Store/Home/HomeActions";
import HomeIcon from '@mui/icons-material/Home';
import {Routes} from "../Config/Routes";
import {useHistory} from "react-router-dom";
import {LocationDescriptorObject} from "history";
import {HomeStore} from "../Store/Home/HomeReducer";

enum SearchIcon {
    HOME
}

type SearchItem = {
    text: string
    icon: SearchIcon
    push: LocationDescriptorObject
}

const PREVIOUS_ITEMS_KEY_STORAGE = 'previousSearch'

export const TemplateSearch: FunctionComponent = () => {
    const history = useHistory()
    const authContext = useContext(ContextAuthentication)
    const [search, setSearch] = useState('')
    const [previousItems, setPreviousItems] = useState<SearchItem[]>([])
    const dispatch = useDispatch<any>()

    useEffect(() => {
        const previousItemsStore = localStorage.getItem(PREVIOUS_ITEMS_KEY_STORAGE)
        if (previousItemsStore) {
            setPreviousItems(JSON.parse(previousItemsStore))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(PREVIOUS_ITEMS_KEY_STORAGE, JSON.stringify(previousItems))
    }, [previousItems])

    const homes = useSelector(homeSelector.search(search))

    const handleSearch = (value: string) => {
        setSearch(value)
        if (value.length > 0) {
            dispatch(homeActions.search({
                authenticationKey: authContext.authenticationKey,
                pattern: value
            }))
        }
    }

    const homeFormat = useCallback((home: HomeStore): SearchItem => ({
        text: home.home.name,
        icon: SearchIcon.HOME,
        push: {
            pathname: Routes.device.target,
            search: `?homeId=${home.home.id}`,
        }
    }), [Routes])

    const formatResults = useCallback((items: SearchItem[]): InputSearchItem[] => items.map(item => ({
        text: item.text,
        icon: item.icon === SearchIcon.HOME ? <HomeIcon/> : <HomeIcon/>,
        onClick: () => {
            setPreviousItems(previousItems => [
                item,
                ...previousItems.filter(previousItem => JSON.stringify(previousItem.push) !== JSON.stringify(item.push)).slice(0, 10)
            ])
            history.push(item.push)
        },
        onRemoveHistory: () => {
            setPreviousItems(previousItems => previousItems.filter(previousItem => JSON.stringify(previousItem.push) !== JSON.stringify(item.push)))
        }
    })), [history])

    const currentItems = useMemo((): SearchItem[] => homes.map(homeFormat), [homes, homeFormat])

    const currentResults = formatResults(currentItems)
    const previousResults = formatResults(previousItems)

    return <InputSearchBar
        state='READY'
        results={currentResults}
        previousResults={previousResults}
        search={search}
        onSearch={handleSearch}/>
}
