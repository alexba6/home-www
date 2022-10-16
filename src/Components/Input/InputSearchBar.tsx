import {ChangeEvent, FunctionComponent, ReactNode, useState} from "react";
import {
    Alert,
    Box,
    Divider,
    InputBase,
    List,
    ListItem,
    ListItemButton, ListItemIcon, ListItemText,
    Paper, Stack, Tooltip, Typography,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import RestoreIcon from '@mui/icons-material/Restore';

import styles from './InputSearchBar.module.sass'

export type InputSearchItem = {
    text: string,
    icon: ReactNode
    onClick: () => void
    onRemoveHistory: () => void
}

type SearchItemProps = {
    item: InputSearchItem
    onHide: () => void
    searchInput: string
}
type SearchPreviousItemProps = {
    item: InputSearchItem
    onHide: () => void
    searchInput: string
}

type InputSearchBarProps = {
    search: string
    onSearch: (search: string) => void
    results: InputSearchItem[]
    previousResults: InputSearchItem[]
    state: 'PENDING' | 'READY'
}

const SearchItem: FunctionComponent<SearchItemProps> = (props) => {
    const item = props.item

    const handleClick = () => {
        props.onHide()
        item.onClick()
    }

    return <ListItem disablePadding onClick={handleClick}>
        <ListItemButton>
            <ListItemIcon>
                {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
        </ListItemButton>
    </ListItem>
}

const SearchItemPrevious: FunctionComponent<SearchPreviousItemProps> = (props) => {
    const item = props.item

    const handleClick = () => {
        props.onHide()
        item.onClick()
    }

    return <ListItem disablePadding secondaryAction={
        <Tooltip title="Retirer de l'historique">
            <IconButton edge='end' aria-label='delete' onClick={item.onRemoveHistory}>
                <CloseIcon />
            </IconButton>
        </Tooltip>
    }>
        <ListItemButton onClick={handleClick}>
            <ListItemIcon>
                <RestoreIcon/>
            </ListItemIcon>
            <ListItemText primary={item.text}/>
        </ListItemButton>
    </ListItem>
}

export const InputSearchBar: FunctionComponent<InputSearchBarProps> = (props) => {
    const [focus, setFocus] = useState(false)
    const [hover, setHover] = useState(false)
    const [display, setDisplay] = useState(false)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onSearch(event.target.value)
    }

    const onMouseEnter = () => {
        setHover(true)
    }

    const onMouseLeave = () => {
        setHover(false)
        if (!focus) {
            setDisplay(false)
        }
    }

    const onFocus = () => {
        setFocus(true)
        setDisplay(true)
    }

    const onBlur = () => {
        setFocus(false)
        if (!hover) {
            setDisplay(false)
        }
    }

    const onHide = () => {
        props.onSearch('')
        setDisplay(false)
    }

    return <div
        className={styles.inputSearchBarContainer}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
        {display &&
            <Paper  sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
                paddingTop: '40px',
            }}>
                <Divider orientation='horizontal' sx={{ margin: '5px 0' }}/>
                <Box sx={{
                    maxHeight: '250px',
                    overflowY: 'scroll'
                }}>
                    <List>
                        {props.search.length === 0 && props.previousResults.map((item: InputSearchItem, key: number) => <SearchItemPrevious
                            key={key}
                            item={item}
                            onHide={onHide}
                            searchInput={props.search}/>
                        )}
                        {props.search.length > 0 && props.state === 'READY' && props.results.map((item: InputSearchItem, key: number) => <SearchItem
                            key={key}
                            onHide={onHide}
                            item={item}
                            searchInput={props.search}/>
                        )}
                    </List>
                </Box>
            </Paper>}
        <Paper
            component='form'
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 400,
                borderRadius: 1
            }}
        >
            <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
                <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Rechercher sur Home'
                inputProps={{ 'aria-label': 'search on home' }}
                value={props.search}
                onChange={handleChange}
                onBlur={onBlur}
                onFocus={onFocus}
            />
            <IconButton sx={{ p: '10px' }} aria-label='menu'>
                <MenuIcon />
            </IconButton>
        </Paper>
    </div>
}
