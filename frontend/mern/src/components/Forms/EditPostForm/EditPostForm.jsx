import { useEffect, useState } from "react";
import "../NewPostForm/NewPostForm.css";
import postCategories from "../../../config/postCategories";
import { useNavigate, useParams } from "react-router-dom";
function EditPostForm() {
  const navigate = useNavigate();
  const postId = new URLSearchParams(useParams()).get("id");
  const [EditPost, setEditPost] = useState({
    title: "",
    content: "",
    category: "",
    created: "",
    author: "",
  });

  const handleChange = (e) => {
    setEditPost({ ...EditPost, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("http://localhost:3500/posts", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(EditPost),
      });

      const data = await resp.json();
      if (resp.ok) {
        navigate(-1);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getPost = async () => {
      try {
        const resp = await fetch(`http://localhost:3500/posts/${postId}`, {
          method: "GET",
          headers: {
            "Content-Type": "appication/json",
          },
        });
        const data = await resp.json();
        if (resp.ok) {
          setEditPost(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);
  return (
    <div>
      <form className="post-form" onSubmit={handleUpdate}>
        <div className="post-form__header">
          <h3>Edit Post</h3>
          <button type="submit">
            <i className="bi bi-floppy"></i>
          </button>
        </div>
        <div className="post-form__inputs">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={EditPost?.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="post-form__inputs">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="categorySelector"
            onChange={handleChange}
            defaultValue={EditPost?.category}
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
            defaultValue={EditPost?.content}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default EditPostForm;
