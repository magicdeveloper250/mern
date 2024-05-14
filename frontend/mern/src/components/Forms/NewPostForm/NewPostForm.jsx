import { useState } from "react";
import "./NewPostForm.css";
import useCurrentUser from "../../../hooks/useCurrentUser";
import postCategories from "../../../config/postCategories";
import useSavePost from "../../../features/posts/useSavePost";
import { useNavigate } from "react-router-dom";
function NewPostForm() {
  const savePost = useSavePost;
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [post, setPost] = useState({
    title: "",
    content: "",
    category: postCategories[0],
    created: new Date().toLocaleString(),
    author: currentUser?.username,
  });
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await savePost(post);
    if (resp.ok) {
      navigate(-1);
    }
  };
  return (
    <div>
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="post-form__header">
          <h3>New post</h3>
          <button type="submit">
            <i className="bi bi-floppy"></i>
          </button>
        </div>
        <div className="post-form__inputs">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" onChange={handleChange} required />
        </div>
        <div className="post-form__inputs">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="categorySelector"
            onChange={handleChange}
            required
          >
            {postCategories.map((cat, index) => {
              return (
                <option key={index} value={cat}>
                  {cat}
                </option>
              );
            })}
          </select>
        </div>
        <div className="post-form__inputs">
          <label htmlFor="title">Content</label>
          <textarea
            name="content"
            id=""
            cols={20}
            rows={20}
            onChange={handleChange}
            required
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default NewPostForm;
