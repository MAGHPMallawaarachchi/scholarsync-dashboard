'use client'
import { useAuthContext } from '@/app/(server)/context/AuthContext'
import LectureForm from '@/components/LectureForm'
import Modal from '@/components/Modal'
import { useRouter } from 'next/navigation'
import React from 'react'

const CreateLecture = () => {
  const user = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    return (
        <Modal>
            <h3 className="md:text-5xl text-3xl font-extrabold text-left max-w-5xl w-full text-white">
                Add New Lecture
            </h3>
            <LectureForm type="add"/>
        </Modal>
    )
}

export default CreateLecture 