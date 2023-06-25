import { useState, useEffect, MouseEvent, FormEvent, ChangeEvent } from "react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import PostType from "../types/post";
import UserType from "../types/auth";
import { getAllPosts, createPost } from "../lib/apiWrapper";

type HomeProps = {
  user: UserType | null;
  handleClick?: (e: MouseEvent) => void;
};

export default function Home({ user }: HomeProps) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [newPost, setNewPost] = useState<PostType>({ title: "", body: "" });
  const [displayForm, setDisplayForm] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllPosts();
      if (response.data) {
        setPosts(response.data);
      }
    };
    fetchData();
  }, [update]);

  const handleFormSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const response = await createPost(newPost, token!);
    if (response.error) {
      console.log(response.error);
    } else {
      const response = await getAllPosts();
      if (response.data) {
        setPosts(response.data);
      }
      setUpdate(!update);
      setNewPost({ title: "", body: "" });
      setDisplayForm(false);
      console.log(newPost.title + " has been created");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1>
        Hello {user?.firstName} {user?.lastName}
      </h1>
      {user && (
        <button
          onClick={() => {
            setDisplayForm(!displayForm);
          }}>
          {displayForm ? "Close X" : "Compose +"}
        </button>
      )}
      {displayForm && (
        <PostForm
          handleSubmit={handleFormSubmit}
          newPost={newPost}
          handleChange={handleInputChange}
        />
      )}
      {posts.map((p) => (
        <PostCard
          key={p.id}
          post={p}
          user={user}
          setUpdate={setUpdate}
          update={update}
        />
      ))}
      <button
        onClick={() => {
          setPosts([]);
        }}>
        Clear All Posts
      </button>
    </>
  );
}