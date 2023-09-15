'use client'
import React from "react";
import { useAuthContext } from "@/app/(server)/context/AuthContext";
import { useRouter } from "next/navigation";

function Page() {
    const { user } = useAuthContext() as any
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    return (
        <h1 className="text-2xl text-white">timetable</h1>
    );
}

export default Page;