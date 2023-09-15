'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/(server)/context/AuthContext";

const Lecturers = () => {
    const user = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    return (
        <h1 className="text-2xl text-white">lecturers</h1>
    );
}

export default Lecturers