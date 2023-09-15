'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/(server)/context/AuthContext";

const Timetable = () => {
    const user = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    return (
        <h1 className="text-2xl text-white">timetable</h1>
    );
}

export default Timetable