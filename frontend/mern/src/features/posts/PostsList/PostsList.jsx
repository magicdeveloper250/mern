import { useEffect, useState } from "react";
import Post from "../../../components/Post/Post";
import "./PostsList.css";
import { Link } from "react-router-dom";
import usePrivateAxios from "../../../hooks/usePrivateAxios";
function PostsList() {
  const [posts, setPosts] = useState([]);
  const privateAxios = usePrivateAxios();
  const handleDeletePost = async (postId) => {
    try {
      const resp = await fetch("http://localhost:3500/posts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });
      const data = await resp.json();
      if (resp.ok) {
        setPosts([...posts.filter((post) => post._id !== postId)]);
      }
    } catch (error) {}
  };
  // const onUpdate
  useEffect(() => {
    const getPosts = async () => {
      try {
        const resp = await privateAxios.get("/posts");
        setPosts(resp.data.reverse());
      } catch (error) {
        if (error.response) console.log(error.response.data);
      }
    };
    getPosts();
  }, []);
  return (
    <div className="posts">
      <section className="posts__header">
        <h3>Recent posts</h3>
        <Link to={"./new"}>
          <i className="bi bi-plus-square"></i>
        </Link>
      </section>
      <section className="posts__body">
        {posts.map((post, index) => {
          return <Post post={post} onDelete={handleDeletePost} />;
        })}
      </section>
    </div>
  );
}

export default PostsList;
