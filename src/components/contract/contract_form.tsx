import Button from "@mui/material/Button";
import { useState } from "react";
import { load } from 'recaptcha-v3'
import configs from "../../configs.json";

export enum ContractFormConfig{
    ConfigOne = "flex-row",
    ConfigTwo = "flex-col"
} 

export interface IContractFormInterface {
    urlEndpoint: string
    submitBtnText?: string
    className?: string
    configuration: ContractFormConfig
}

const formValueInit = {
    name: '',
    email: '',
    messages: ''
}


const stringLengthValidation = (value: string, minLength: number = 1, maxLength: number = null) => {
    if (value.length < minLength)
        return false
    if (maxLength && value.length > maxLength)
        return false
    return true
}

const emailValidation = (value: string) => {
    const regx = new RegExp(".*@.*\.com$");
    return regx.test(value);
}

const formValidator = {
    name: (v) => stringLengthValidation(v, 6, 50),
    email: (v) => emailValidation(v),
    messages: (v) => stringLengthValidation(v, 10, 100),
}

export default function ContractForm(props: IContractFormInterface) {
    const [hasError, setHasError] = useState(false);
    const [formValue, setFormValue] = useState({ ...formValueInit });

    const handelClick = async () => {
        let findError = false;
        Object.keys(formValue).forEach((key) => {

            if (!formValidator[key](formValue[key])) {
                findError = true;
                setHasError(true);
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
            });
            if (response.ok) {
                setFormValue({ ...formValueInit });

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
            <div className={"flex gap-3 "+props.configuration}>
                <div className="">

                    <input
                        className="inputs"
                        type="text"
                        name="name"
                        required
                        placeholder="Your Name"
                        value={formValue.name}
                        onChange={handelChange}
                    />
                    {hasError ? <div className="invalid-form" id="invalid-form-name">
                        name must be more then 4 character
                    </div> : null}
                </div>
                <div className="">

                    <input
                        className="inputs w-full"
                        type="email"
                        name="email"
                        required
                        placeholder="Your Email"
                        value={formValue.email}
                        onChange={handelChange}
                    />
                </div>
            </div>
            <div>

                <textarea
                    className="inputs"
                    name="messages"
                    rows={5}
                    cols={45}
                    placeholder="Write a messages"
                    onChange={handelChange}
                    value={formValue.messages}
                ></textarea>
                {hasError ? <div className="invalid-form" id="invalid-form-messages">
                    message must be more then 10 character
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