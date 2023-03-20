import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useStore } from "@nanostores/react";
import { snackbar_store, snackbar_close } from "../../stores/snackbar_service"


export const SnackbarComponent = () => {
    const $snackbar_info = useStore(snackbar_store);


    const handleClose = () => {
        snackbar_close()
    }

    return (
        <Snackbar open={$snackbar_info.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={$snackbar_info.alertType} sx={{ width: '100%' }}>
                {$snackbar_info.message}
            </Alert>
        </Snackbar>
    )

}