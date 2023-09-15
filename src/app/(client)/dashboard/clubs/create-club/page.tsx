'use client'

import React from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Form from "@/components/ClubForm";
import { useAuthContext } from "@/app/(server)/context/AuthContext";

const CreateClub = () => {
    const user = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    return (
        <Modal>
            <h3 className="md:text-5xl text-3xl font-extrabold text-left max-w-5xl w-full text-white">
                Add New Club
            </h3>
            <Form type="create"/>
        </Modal>
    )
}

export default CreateClub
