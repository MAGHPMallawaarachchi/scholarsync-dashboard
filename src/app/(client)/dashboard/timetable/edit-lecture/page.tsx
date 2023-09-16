'use client'
import React from 'react'
import Modal from '@/components/Modal'
import LectureForm from '@/components/LectureForm'
import { getLecture } from '@/app/(server)/firebase/firestore/lecture.firestore'
import Lecture from '@/app/(server)/models/Lecture'

const EditLecturer = async ({ params: { id } }: { params: { id: string } }) => {

  const result = await getLecture(id) as Lecture;

  return (
    <Modal>
        <h3 className="md:text-5xl text-3xl font-extrabold text-left max-w-5xl w-full text-white">
          Edit Lecture
        </h3>
        <LectureForm type="edit" lecture={result} />
    </Modal>
  )
}

export default EditLecturer
