import { useState, useEffect } from 'react';
import Post from "./Post";
import { getAllPosts } from '../../services/posts';


function PostsList() {

    /*El state de este componente será únicamente los posts*/
    const [state, setState] = useState({
        posts: [],
        newPost: {
            name:'',
            user: ''
        },
        newPostDone: {
            name:'',
            user: ''
        }
    });


    useEffect(() => {
        async function fetchPosts() {
            console.log('Fetching posts...');
            setState(state => ({
                ...state,
            }))

            let posts = await getAllPosts();

            if (!isUnmounted) {
                setState({
                    posts: posts,
                })
            }
        }

        let isUnmounted = false;

        fetchPosts();

        return () => {
            isUnmounted = true;
        }
    }, []);

    /*Controlador para borrar disparado por el child Post e identificado por su id*/
    const handleDeletePost = id => {
        setState(state => ({
            ...state,
            posts: posts.filter(post => (post.id != id))
        }))

    }
    const handleChange = (newPost) => {

        const { name, value } = newPost.target
        setState(state => {
    
          return {
            ...state,
            newPost: {
              ...state.newPost,
              [name]: value
            }
          }
        });
      }
    
    const handleClick = () => {
        const newPostDone = state.newPost;
        setState(state => {

            return {
                ...state,
                newPost: {
                    name:'',
                    user: ''
                },
                newPostDone: {
                    name: newPostDone.name,
                    user: newPostDone.user
                },
                posts: [newPostDone, ...state.posts]
            }
        });

    }

    const { posts, newPost } = state

    return (

        <div>
            <h2>PostsList</h2>
            <div>
                {posts.map(post => (
                    <div key={post.id} >
                        <Post post={post} onDeletePost={handleDeletePost}></Post></div>
                ))}
            </div>

            <h2>New Post</h2>
            <div className="input-group mb-2">
                <span className="input-group-text  bg-white border-warning text-warning"><i className="fa fa-edit fa-fw"></i></span>
                <textarea name="name" placeholder="post..." onChange={handleChange}></textarea>
                <textarea name="user" placeholder="user..." onChange={handleChange}></textarea>
                <button onClick={handleClick} value="Comentar">Add post</button>

            </div>

        </div>



    )

}

export default PostsList;
