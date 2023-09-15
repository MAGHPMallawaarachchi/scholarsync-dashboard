'use client'
import React from 'react'
import { getClubById } from '@/app/(server)/firebase/firestore/club.firestore'
import Club from '@/app/(server)/models/Club'
import Modal from '@/components/Modal'
import ClubForm from '@/components/ClubForm'

const EditClub = async ({ params: { id } }: { params: { id: string } }) => {

  const result = await getClubById(id) as Club;

  return (
    <Modal>
        <h3 className="md:text-5xl text-3xl font-extrabold text-left max-w-5xl w-full text-white">
          Edit Club {result.name}
        </h3>
        <ClubForm type="edit" club={result} />
    </Modal>
  )
}

export default EditClub
