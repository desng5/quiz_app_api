import PostType from "../types/posts";

type PostCardProps = {
    post: PostType;
};

export default function PostCard ({ post}: PostCardProps) {
    return (
        <div className="mt-3">
            <div>
                <div>{post.title}</div>
                <div>{post.body}</div>
                <div>By {post.author?.firstName} {post.author?.lastName}</div>
                <div>Date Created:</div>
            </div>
        </div>

    )
}