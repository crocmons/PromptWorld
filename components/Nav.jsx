"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import {BsFillMoonStarsFill} from "react-icons/bs"
import {BsFillSunFill} from "react-icons/bs"
import { useTheme } from "next-themes";

const Nav = () => {
  // const isUserLogIn = true;

  const  { data:session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const {resolvedTheme, setTheme} = useTheme()



  useEffect(()=>{

    const setUpProvider = async()=>{
      const response = await getProviders();

      setProviders(response)
      
    }

    setUpProvider()

  },[])

  useEffect(() => {
    setMounted(true);
  },[]);

  // if (!mounted) return null;
  // const currentTheme = theme === 'system' ? systemTheme : theme;


  return (
    <nav className="flex-between w-full mb-16 pt-3">
       <Link href='/' className="flex gap-2 flex-center">
         <Image 
          src='/assets/images/logo.svg'
          alt="prompt-logo"
          width={30}
          height={30}
          className="object-contain"
         />
         <p className="logo_text">PromptAI</p>
       </Link>

       {/* {alert(session?.user)} */}
       {/* {alert(providers)} */}

       {/* For Desktop Navigation*/}
       
       <div className="sm:flex hidden">

       {  mounted && ( 
       <button
          type="button"
          aria-label="Toggle Dark Mode"
        className="p-2 rounded mx-3"
        onClick={() =>setTheme( resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        {resolvedTheme === 'dark' ? (
          <BsFillSunFill className="h-8 w-8" />
        ) : (
          <BsFillMoonStarsFill className="h-8 w-8" />
        )}
      </button>
      )
     }

          {session?.user ? (
             <div className="flex gap-3 md:gap-5">
                 <Link
                  href='/create-prompt'
                  className="black_btn"
                 >
                   Create Post
                 </Link>
                 <button type="button" onClick={signOut} className="outline_btn" >
                     Sign Out
                 </button>

                 <Link href='/profile'>
                    <img
                     src={session?.user.image}
                     width={37}
                     height={37}
                     className="rounded-full"
                     alt="profile"
                    />
                 </Link>
            </div>
          ):(
            <>
              {
                providers && Object.values(providers).map((provider)=>(
                  <button
                   type="button"
                   key={provider.name}
                   onClick={()=>signIn(provider.id)}
                   className="black_btn"
                  >
                    Sign In
                  </button>
                ))
              }
            </>
          )}
       </div>

       {/* For Mobile Navigation */}
       <div className="sm:hidden flex relative">
          {session?.user ? (
              <div className="flex">
                <img
                     src={session?.user.image}
                     width={37}
                     height={37}
                     className="rounded-full"
                     alt="profile"
                     onClick={()=>{setToggleDropdown((prev)=>!prev)}}
                    />
                    {toggleDropdown && (
                      <div className="dropdown">
                         <Link 
                          href="/profile"
                          className="dropdown_link"
                          onClick={()=>setToggleDropdown(false)}
                         >
                          My Profile
                        </Link>
                         <Link 
                          href="/create-prompt"
                          className="dropdown_link"
                          onClick={()=>setToggleDropdown(false)}
                         >
                          Create Prompt
                        </Link>
                        <button
                         type="button"
                         onClick={()=>{
                          setToggleDropdown(false);
                          signOut()
                         }}
                         className="mt-4 w-100 black_btn"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
              </div>
          ):(
              <>
              {
                providers && Object.values(providers).map((provider)=>(
                  <button
                   type="button"
                   key={provider.name}
                   onClick={()=>signIn(provider.id)}
                   className="black_btn"
                  >
                    Sign In
                  </button>
                ))
              }
            </>
          )}
       </div>

    </nav>
  )
}

export default Nav