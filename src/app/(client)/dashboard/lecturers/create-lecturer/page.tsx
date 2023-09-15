'use client'

import React from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Form from "@/components/ClubForm";
import { useAuthContext } from "@/app/(server)/context/AuthContext";
import LecturerForm from "@/components/LecturerForm";

const CreateLecturer = () => {
  const user = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    return (
        <Modal>
            <h3 className="md:text-5xl text-3xl font-extrabold text-left max-w-5xl w-full text-white">
                Add New Lecturer
            </h3>
            <LecturerForm type="add"/>
        </Modal>
    )
}

export default CreateLecturer