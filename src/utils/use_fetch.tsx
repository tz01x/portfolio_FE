import { useEffect, useState } from "react";
import Configs from "../configs.json";


interface UseFetchReturn<T> {
    loading: boolean
    data: Array<T>
    error: any
}

export default function useFetch<T>(endpoint: string, extractDataCallback:Function=()=>{} ,option: object = {}): UseFetchReturn<T> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const callAPI = async () => {
        try {
            setLoading(true)
            const res = await fetch(Configs['BASE_API'] + endpoint);
            const tmpdata = await res.json()

            setData((preData) => {

                setLoading(false);
                let extracted_data =  extractDataCallback(tmpdata);
                if (!extracted_data){
                    return tmpdata;
                }else{
                    return extracted_data;
                }

            });

        } catch (error: any) {
            setError(error);
            setLoading(false);
        }


    }
    useEffect(() => {
        callAPI();
    }, []);
    return { loading, data, error }
}