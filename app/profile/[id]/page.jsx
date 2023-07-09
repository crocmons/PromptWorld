"use client"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

import Profile from "@components/Profile"

const userProfile = ({params})=>{

      const searchParams = useSearchParams()
      const userName = searchParams.get('name')
      const [userPosts, setUserPosts] = useState([])

      useEffect(() => {
       const fetchData = async () =>{

         const response = await fetch(`/api/users/${params?.id}/posts`)

         const data = response.json()

         setUserPosts(data)
       }

       if (params?.id) fetchData()

      }, [params?.id]);

      return(
        <Profile 
          name = {userName}
          desc = {`Welcome to ${userName}'s profile page`}
          data = {userPosts}
        />
      )
      
}
export default userProfile;