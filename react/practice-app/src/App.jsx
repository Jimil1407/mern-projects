import { useState } from 'react'
import './App.css'
import { PostComponent } from '../components/post'
import ToggleMessage from '../components/notifications'
import Topbar from '../components/navbar'
import Timer from '../components/countdown'
import UserList from '../components/userlist'

function App() {
  const [posts, setPosts] = useState([]);

  const postComponents = posts.map((post,idx) => (<PostComponent
    key={idx}
    name={post.name}
    subtitle={post.subtitle}
    time={post.time}
    image={post.image}
    description={post.description}
  />));

  function addPost(){
    setPosts([...posts, {
      name:"Jimil",
      subtitle: "1000 followers",
      time: "2m ago",
      image: "https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg",
      description: "what to do bhai"
    }])
  }


  return (
  //   <div style={{background: "#dfe6e9", height: "100vh", }}>
  //   <button onClick={addPost}>Add post</button>
  //   <div style={{display: "flex", justifyContent: "center" }}>
  //     <div>
  //       {postComponents}
       
  //     </div>
  //   </div>
  // </div>
  // <div>
  //  <Topbar/>
  // </div>
  <div>
    {/* <Timer/> */}
    <UserList/>
  </div>

  )
}

export default App
