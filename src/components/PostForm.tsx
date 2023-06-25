import { FormEvent, ChangeEvent } from "react"
import PostType from "../types/post";

type PostFormProps = {
    handleSubmit: (e: FormEvent) => void
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    newPost: PostType;
};

export default function PostForm({
    handleSubmit,
    handleChange,
    newPost
}:
    PostFormProps) {
    return (
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input
                type="text"
                name="title"
                onChange={handleChange}
                value={newPost.title}
            />
            <label>Body</label>
            <input
                type="text"
                name="body"
                onChange={handleChange}
                value={newPost.body}
            />
            <button type="submit">Create Post</button>
        </form>
    )
}