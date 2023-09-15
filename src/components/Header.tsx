"use client"

import React from 'react'
import { useAuthContext } from '@/app/(server)/context/AuthContext';
import { useRouter } from "next/navigation";
import Button from './Button';
import { AiFillPlusCircle } from 'react-icons/ai';

type Props = {
    title: string,
    buttonTitle: string
}

const Header = ({title, buttonTitle}:Props) => {
    const { user } = useAuthContext() as any
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    const handleButtonClick = () => {
        router.push("/dashboard/clubs/create-club"); 
      };

  return (
    <div className='w-full flex justify-between'>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <Button title={buttonTitle} leftIcon={<AiFillPlusCircle size="20" />} handleClick={handleButtonClick}/>
    </div>
  )
}

export default Header