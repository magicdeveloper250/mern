async function useSavePost(post) {
  const resp = await fetch("http://localhost:3500/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return resp;
}

export default useSavePost;
