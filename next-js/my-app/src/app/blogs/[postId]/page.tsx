import axios from "axios";

export default async function BlogPost({
  params,
}: {
  params: { postId: string };
}) {
    
  const postId = params.postId;

  const blog = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const data = blog.data;

  //const blog = await fetchblogs(postId)
  return <div>{data.title}</div>;
}
