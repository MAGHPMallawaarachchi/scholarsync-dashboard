'use client'
import React from 'react'
import Modal from '@/components/Modal'
import LecturerForm from '@/components/LecturerForm'
import Lecturer from '@/app/(server)/models/Lecturer'
import { getLecturer } from '@/app/(server)/firebase/firestore/lecturer.firestore'

const EditLecturer = async ({ params: { id } }: { params: { id: string } }) => {

  const result = await getLecturer(id) as Lecturer;

  return (
    <Modal>
        <h3 className="md:text-5xl text-3xl font-extrabold text-left max-w-5xl w-full text-white">
          Edit Lecturer
        </h3>
        <LecturerForm type="edit" lecturer={result} />
    </Modal>
  )
}

export default EditLecturer
