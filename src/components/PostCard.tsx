import { Dispatch, MouseEvent, SetStateAction } from "react";
import PostType from "../types/post";
import UserType from "../types/auth";
import { deletePost } from "../lib/apiWrapper";

type PostCardProps = {
  post: PostType;
  user: UserType | null;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  update: boolean;
};

export default function PostCard({
  post,
  user,
  setUpdate,
  update,
}: PostCardProps) {
  const date = new Date(post.dataCreated as string);

  const handleDeleteClick = (_: MouseEvent): void => {
    const token = localStorage.getItem("token");
    deletePost(post.id!, token!);
    setTimeout(() => {
      setUpdate(!update);
    }, 1000);
  };

  return (
    <div className="mt-3">
      <div>
        <div>{post.title}</div>
        <div>{post.body}</div>
        <div>
          By {post.author?.firstName} {post.author?.lastName}
        </div>
        <div>Date Created: {DataTransfer.toString()}</div>
      </div>

      {post.author?.username === user?.username ? (
        <button onClick={handleDeleteClick}>Delete Post</button>
      ) : null}
    </div>
  );
}