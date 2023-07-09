'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'

const MyProfile = () => {
    const [posts, setPosts] = useState([])
    const router = useRouter()
    const { data: session } = useSession()
   
    const handleEdit = (prompt) => {
      router.push(`/update-prompt?id=${prompt._id}`)

    }
    const handleDelete = async (prompt) => {
       const hasConfirmed = confirm('Are you sure you want to delete?')

       if(hasConfirmed){
        try {
          await fetch(`/api/prompt/${prompt._id.toString()}`,{
            method: 'DELETE'
          });
           
          const filteredPrompt = posts.filter((p)=>{
            return p._id !== prompt._id
          })

          setPosts(filteredPrompt)

        } catch (error) {
          console.log(error)
        }
       }
    }

    useEffect(() => {
        const fetchPosts = async()=>{
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        console.log(posts)

       if(session?.user.id) {fetchPosts()};
       
    },[session?.user.id])

  return (
       <Profile 
         name='My'
         desc='Welcome to your profile page'
         data={posts}
         handleEdit={handleEdit}
         handleDelete={handleDelete}       
       />
    )
}

export default MyProfile