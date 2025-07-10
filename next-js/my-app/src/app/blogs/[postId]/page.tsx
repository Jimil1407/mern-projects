import axios from "axios";

export default async function BlogPost({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;

  const blog = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const data = blog.data;

  //const blog = await fetchblogs(postId)
  return <div>{data.title}</div>;
}
