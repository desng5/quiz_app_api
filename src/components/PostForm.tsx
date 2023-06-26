import { FormEvent, ChangeEvent } from "react";
import PostType from "../types/question";

type PostFormProps = {
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  newPost: PostType;
};

export default function PostForm({
  handleSubmit,
  handleChange,
  newPost,
}: PostFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        type="text"
        name="question"
        onChange={handleChange}
        value={newPost.question}
      />
      <label>Body</label>
      <input
        type="text"
        name="answer"
        onChange={handleChange}
        value={newPost.answer}
      />
      <button type="submit">Create Post</button>
    </form>
  );
}