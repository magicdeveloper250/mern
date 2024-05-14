import { jwtDecode } from "jwt-decode";
import useAuth from "../../hooks/useAuth";
import "./Post.css";
import { useMemo, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
function Post({ post, onDelete }) {
  const { auth } = useAuth();
  const MIN = 600;
  const [postLikes, setPostLikes] = useState(post.likes);
  const [postViews, setPostViews] = useState(post.views);
  const currentUser = useMemo(() => {
    try {
      return jwtDecode(auth);
    } catch (error) {
      console.log(error);
    }
  }, [auth]);
  const handleLike = async () => {
    try {
      const resp = await fetch("http://localhost:3500/posts/like", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: currentUser._id, postId: post._id }),
      });
      const data = await resp.json();
      if (resp.ok) {
        setPostLikes(data.likes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post">
      <section className="post__header">
        <h5>
          <i className="bi bi-person-circle"></i>&nbsp;
          {post.author}
        </h5>
        <section>
          <h6>Created:&nbsp;{post.createdAt}</h6>
          <h6>Last update:&nbsp;{post.updatedAt}</h6>
        </section>
      </section>
      <section className="post__body">
        <p className="post__title">{post.title}</p>
        <span className="post__content-container">
          <p className="post__content">{post.content}</p>
          {post.content.length > MIN && (
            <input type="checkbox" className="expand-btn" />
          )}
        </span>
      </section>
      <section className="post__footer">
        <button className="button button-secondary">
          <i className="bi bi-eye"></i>
          {postViews.length}
        </button>
        <button className="button button-secondary" onClick={handleLike}>
          <i className="bi bi-heart-fill"></i>
          {postLikes.length}
        </button>
        {post.author == currentUser?.username ||
        currentUser?.roles?.includes("admin") ? (
          <>
            <Link className="button button-secondary" to={`./${post._id}`}>
              <i className="bi bi-pen"></i>
            </Link>
            <button
              className="button button-secondary"
              onClick={() => onDelete(post._id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </>
        ) : null}
      </section>
    </div>
  );
}

export default Post;
