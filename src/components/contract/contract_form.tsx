import Button from "@mui/material/Button";
import { useState } from "react";
import { load } from 'recaptcha-v3'
import configs from "../../configs.json";

export enum ContractFormConfig {
    ConfigOne = "flex-row",
    ConfigTwo = "flex-col"
}

export interface IContractFormInterface {
    urlEndpoint: string
    configuration: ContractFormConfig,
    submitBtnText?: string
    className?: string
    successAction?: Function,
}

type FormValidatorResult = [boolean, string];

const formValueInit = {
    name: '',
    email: '',
    messages: ''
}

const formErrorsInit = {
    name: null,
    email: null,
    messages: null,
}


const stringLengthValidation = (value: string, minLength: number = 1, maxLength: number = null): FormValidatorResult => {
    if (value.length < minLength)
        return [false, "can't be less than " + minLength + " characters"];
    if (maxLength && value.length > maxLength)
        return [false, "can't be greater than " + maxLength + " characters"];
    return [true, value];
}

const emailValidation = (value: string): FormValidatorResult => {
    const regx = new RegExp(".*@.*\.com$");
    if (!regx.test(value)) {
        return [false, "is not a valid email address"];
    }
    return [true, value];
}

const formValidator = {
    name: (v):FormValidatorResult => stringLengthValidation(v, 6, 50),
    email: (v):FormValidatorResult => emailValidation(v),
    messages: (v):FormValidatorResult => stringLengthValidation(v, 10, 500),
}

export default function ContractForm(props: IContractFormInterface) {
    const [fromError, setFormError] = useState({ ...formErrorsInit });
    const [formValue, setFormValue] = useState({ ...formValueInit });

    const handelClick = async () => {
        let findError = false;
        Object.keys(formValue).forEach((key) => {
            
            const [hasError, error] = formValidator[key](formValue[key]);
            if (!hasError) {
                findError = true;
                setFormError(val => {
                    return { ...val, [key]: error };
                });
            }
        });
        if (findError) {
            return;
        }
        try {
            const recaptcha = await load(configs.Data_Site_Key);
            const token = await recaptcha.execute('submit');
            const payload = { ...formValue, "token": token };
            const response = await fetch(configs.BASE_API + props.urlEndpoint, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const data = await response.json();
                setFormValue({ ...formValueInit });
                setFormError({ ...formErrorsInit });

                if(props.successAction){
                    props.successAction(data);
                }

            } else {
                console.log(await response.text());
            }

        } catch (error) {
            console.log(error);
        }

    }

    const handelChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }
    return (
        <form className={"form mt-4 flex flex-col gap-3 " + (!props.className ? '' : props.className)} id="form" onSubmit={_ => false}>
            <div className={"flex gap-3 w-full" + props.configuration}>
                <div className="w-full">

                    <input
                        className="inputs  w-full"
                        type="text"
                        name="name"
                        required
                        placeholder="Your Name"
                        value={formValue.name}
                        onChange={handelChange}
                    />
                    {fromError.name ? <div className="invalid-form" id="invalid-form-name">
                        {fromError.name}
                    </div> : null}
                </div>
                <div className="w-full">

                    <input
                        className="inputs   w-full"
                        type="email"
                        name="email"
                        required
                        placeholder="Your Email"
                        value={formValue.email}
                        onChange={handelChange}
                    />
                    {fromError.email ? <div className="invalid-form" id="invalid-form-email">
                        {fromError.email}
                    </div> : null}
                </div>
            </div>
            <div>

                <textarea
                    className="inputs w-full"
                    name="messages"
                    rows={5}
                    cols={45}
                    placeholder="Write a messages"
                    onChange={handelChange}
                    value={formValue.messages}
                ></textarea>
                {fromError.messages ? <div className="invalid-form" id="invalid-form-messages">
                    {fromError.messages}
                </div> : null}
            </div>
            <Button
                sx={{
                    backgroundColor: "var(--primary-color)",
                    width: "40%",
                    marginTop: "1em"
                    // borderRadius:2,
                }}
                size="medium"
                variant="contained"
                onClick={handelClick}

            >
                {props.submitBtnText ? props.submitBtnText : "Send"}
            </Button>
        </form>)
}