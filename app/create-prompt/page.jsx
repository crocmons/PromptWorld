'use client'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'

const CreatePrompt = () => {
    const {data:session} = useSession();
    const router = useRouter()
    const [submitted, setSubmitted] = useState(false)
    const [post, setPost] = useState({
        prompt:'',
        tag:''
    })
    
 const handleCreatePrompt = async(e)=>{
       e.preventDefault();
       setSubmitted(true)

       try {
        
        const response = await fetch('/api/prompt/new',{
            method:'POST',
            body: JSON.stringify({
                prompt:post.prompt,
                userId:session?.user.id,
                tag:post.tag
            })
        })

        if(response.ok){
            router.push('/');
        }

       } catch (error) {
        console.log(error)
       } finally{
         setSubmitted(false)
       }
 }


  return (
    <Form 
      type='Create'
      post={post}
      setPost={setPost}
      submitted={submitted}
      handleSubmit={handleCreatePrompt}
    
    />
  )
}

export default CreatePrompt