'use client';

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';


const PromptCardList=({data, handleTagClick})=>{
  
  return (
    <div className='mt-16 prompt_layout'>
       {data.map((prompt)=>(
           <PromptCard 
             key={prompt._id}
             prompt={prompt}
             handleTagClick={handleTagClick}     
           />
       ))}
    </div>
  )

}


const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedResults, setSearchedResults] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [posts, setPosts] = useState([])


  const filteredPrompts = (searchtext)=>{
     const regex = new RegExp(searchtext, "i") //'i' flag for case insensitive search
     return posts.filter((postItem)=> 
     regex.test(postItem.creator.username) ||
     regex.test(postItem.tag) ||
     regex.test(postItem.prompt)
     )
  }
  
  
  const handleSearchChange =(e)=>{
       clearTimeout(searchTimeout)
       setSearchText(e.target.value)

      //  debounce method
      setSearchTimeout(
        setTimeout(()=>{
          const searchResult = filteredPrompts(e.target.value)
          setSearchedResults(searchResult)
        },500)
      )
  }

  const handleTagClick = (tagname) => {
        setSearchText(tagname)

       const searchTagResult = filteredPrompts(tagname)
       setSearchedResults(searchTagResult)
  }


  useEffect(() => {
    const fetchPosts = async ()=>{
          const response = await fetch('/api/prompt')
          const data = await response.json();
          
          setPosts(data)
    }
  
    fetchPosts()

  }, [])
  

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
           <input 
             type='text'
             placeholder='Search for a tag or username....'
             value={searchText}
             onChange={handleSearchChange}
             required
             className='search_input peer'
           />
      </form>

      {searchText ? (
      <PromptCardList 
        data={searchedResults}
        handleTagClick={handleTagClick}
      
      />
      ) : (
        <PromptCardList 
         data={posts}
         handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed