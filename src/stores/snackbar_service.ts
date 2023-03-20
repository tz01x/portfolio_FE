import { atom, map } from 'nanostores';


export enum AlertEnum{
    Error = 'error',
    Warning = 'warning',
    Info = 'info',
    Success ='success'

}


interface iSnackBarAlert{
    open: boolean;
    message: string;
    alertType: AlertEnum;
}

export const snackbar_store = map<iSnackBarAlert>({open: false, message:'', alertType: AlertEnum.Info});

export const snackbar_open = (message: string, alertType: AlertEnum) => {
    snackbar_store.set({open:true, message, alertType})
}

export const snackbar_close = () => {
    snackbar_store.set({open:false, message:'', alertType: AlertEnum.Info})
}