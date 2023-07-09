"use client";

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const PromptCard = ({prompt, handleTagClick, handleEdit, handleDelete}) => {

      const {data:session} = useSession()
      const router = useRouter()
      const pathName = usePathname()
      
      const [copied, setCopied] = useState('')

      const handleCopy = () =>{
        setCopied(prompt.prompt)
        navigator.clipboard.writeText(prompt.prompt)
        setTimeout(() => {
             setCopied('')
            }, 3000)
      }
  
  return (
    <div className='prompt_card'>
       <div className='flex justify-between items-start gap-5'>
           <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
             {/* {console.log(prompt)} */}
             <a
              href={`/profile`}
             >
              <Image 
                src={prompt.creator?.image}
                alt='user_image'
                width={40}
                height={40}
                className='rounded-full object-contain'
              />
             </a>

              <div className='flex flex-col'>
                <h3 className='font-semibold font-satoshi text-gray-900 dark:text-white'>{prompt.creator?.username}</h3>
                <p className='font-inter text-sm text-gray-500 dark:text-gray-100'>{prompt.creator?.email}</p>
              </div>
           </div>
           <div className='copy_btn' onClick={handleCopy}>
               <Image 
                  src={ copied === prompt.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                  alt='copy'
                  className='dark:w-13 dark:h-13 dark:font-semibold'
                  width={12}
                  height={12}
               />
           </div>
       </div>
         <p className='mt-4 mb-2 font-satoshi text-md text-gray-700 dark:text-white'>{prompt.prompt}
         </p>
         {/* <Link href="/profile" className='text-blue-700'>See more</Link>
         <p className='font-inter my-2 text-sm orange_gradient cursor-pointer'
          onClick={() => handleTagClick && handleTagClick(prompt.tag)}>

          {prompt.tag}

         </p> */}

         {session?.user.id === prompt.creator._id && pathName === '/profile' && (
            <div className='mt-5 flex-center gap-5 justify-evenly border-t border-gray-100 pt-3'> 
               <button
                className='font-inter text-md green_gradient cursor-pointer rounded-lg py-2 px-2 border border-gray-500 font-semibold'
                onClick={handleEdit}
               >
                Edit
                </button>
                <button className='font-inter text-md font-semibold orange_gradient cursor-pointer rounded-lg py-2 px-2 border border-gray-500'
                onClick={handleDelete}
                >
                  Delete
                </button>
            </div>
         )}
    </div>
  )
}

export default PromptCard