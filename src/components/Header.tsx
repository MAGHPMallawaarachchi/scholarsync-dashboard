"use client"

import React from 'react'
import { useAuthContext } from '@/app/(server)/context/AuthContext';
import { useRouter } from "next/navigation";
import Button from './Button';
import { AiFillPlusCircle } from 'react-icons/ai';

type Props = {
    title: string,
    buttonTitle: string
    handleClick?: () => void
}

const Header = ({title, buttonTitle, handleClick}:Props) => {
    const { user } = useAuthContext() as any
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

  return (
    <div className='w-full flex justify-between items-center'>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <Button title={buttonTitle} leftIcon={<AiFillPlusCircle size="20" />} handleClick={handleClick}/>
    </div>
  )
}

export default Header