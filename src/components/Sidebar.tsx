'use client'

import { NavLinks } from '@/constants';
import Image from 'next/image'
import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';
import { MdPeopleAlt } from 'react-icons/md';
import { getAuth, signOut } from "firebase/auth";
import router from 'next/router';

const Sidebar = () => {

  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/'); 

    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="flex h-screen fixed bg-gray-900 text-white">
        <aside className="bg-primarygreen w-60 p-8 flex flex-col items-center justify-between">
            <div className='flex flex-col gap-16'>
              <Image
                  src='/images/scholarsynclogo.png'
                  alt='ScholarSync Logo'
                  width={140}
                  height={140}
              />
              <div className="flex flex-col items-start gap-12 px-3">
                  {NavLinks.map((link, index) => (
                      <div key={index} className="flex items-center space-x-2">
                      {getIconComponent(link.icon)} {/* Render the icon */}
                      <a href={link.path} className="text-blue-500 hover:text-blue-700">
                          {link.title}
                      </a>
                      </div>
                  ))}
              </div>
            </div>
            
            <button onClick={handleLogout} className="w-full bg-secondarygreen text-white rounded-md py-2">
                Logout
            </button>

        </aside>
    </div>

  )
}

// Function to get the corresponding icon component
function getIconComponent(iconName: string) {
    switch (iconName) {
      case 'FiHome':
        return <FiHome />;
      case 'FaRegCalendarAlt':
        return <FaRegCalendarAlt />;
      case 'MdPeopleAlt':
        return <MdPeopleAlt />;
      case 'BsFillPersonFill':
        return <BsFillPersonFill />;
      default:
        return null;
    }
  }

export default Sidebar