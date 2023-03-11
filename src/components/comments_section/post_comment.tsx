import { useEffect } from "react";
import { fetchComments } from "../../stores/comments";
import ContractForm, { ContractFormConfig } from "../contract/contract_form";

export interface IPostCommentPops{
    blog_slug: string;
}

export const PostComment = ({blog_slug}:IPostCommentPops)=>{
    useEffect(()=>{
        fetchComments(blog_slug);
    },[])
    return <ContractForm 
            successAction={(data)=>{
                fetchComments(blog_slug);
            }} 
            submitBtnText="Post" 
            configuration={ContractFormConfig.ConfigOne} 
            urlEndpoint={`/api/comment-create/${blog_slug}`} 
        />

}