import moment from "moment";
import {commentsListStore, IComments} from "../../stores/comments";
import { useStore } from '@nanostores/react';

export default function CommentsList() {

    const $commentsList = useStore(commentsListStore);


  return (
    <div className="comments flex flex-col gap-4">
    {$commentsList.map((data: IComments, index)=>(
            <div className="comment" key={`comment_${data.id}`}>
            <div className="flex gap-1">
                <img
                    className="rounded-full w-9 h-9"
                    src="https://picsum.photos/seed/22/35/35"
                    alt=""
                />
                <div>
                    <div className="bg-[var(--primary-color)] rounded-md pr-10 p-2">
                        <strong>{data.username}</strong>
                        <p>{data.message}</p>
                    </div>
                    <div className="text-sm">{moment(data.created).fromNow()}</div> 
                </div>
            </div>
        </div>
        ))}
    </div>
  )
}
