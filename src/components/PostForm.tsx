import { FormEvent, ChangeEvent } from "react"

type Post = {
    id: number;
    title: string;
}

type PostFormProps = {
    handleSubmit: (e:FormEvent) => void
    handleChange:(e:ChangeEvent<HTMLInputElement>) => void
    newPost: Post;
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
            <button type="submit">Create Post</button>
        </form>
    )
}