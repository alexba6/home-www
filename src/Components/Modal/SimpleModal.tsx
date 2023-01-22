import {FunctionComponent, ReactNode} from "react";
import {Box, Button, Modal, Stack, Tooltip, Typography} from "@mui/material";
import {SxProps} from "@mui/system";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import {ModalControl} from "../../Hooks/UseModalControl";

type FooterButton = {
    name: string
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    onClick: () => void
}

type ModalSimpleProps = {
    control: ModalControl
    children: ReactNode
    title: string
    footerButtons?: FooterButton[]
}

const style: SxProps = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    padding: '20px 30px',
    width: '300px'
}

export const ModalSimple: FunctionComponent<ModalSimpleProps> = (props) => {
    return <Modal open={props.control.display} onClose={props.control.close}>
        <Box sx={style}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h5'>
                    {props.title}
                </Typography>
                <Tooltip title='Close'>
                    <IconButton onClick={props.control.close}>
                        <CloseIcon/>
                    </IconButton>
                </Tooltip>
            </Stack>
            <Box sx={{ marginY: 2 }}>
                {props.children}
            </Box>
            {props.footerButtons && <Stack direction='row' alignItems='center'>
                {props.footerButtons.map((button: FooterButton, index: number) => <Button
                    key={index}
                    sx={{ flexGrow: 1, marginLeft: index > 0 ? 1 : 0 }}
                    variant='outlined'
                    color={button.color}
                    onClick={button.onClick}>
                    {button.name}
                </Button>)}
            </Stack>}
        </Box>
    </Modal>
}
