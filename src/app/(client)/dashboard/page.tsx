'use client'
import React from "react";
import { useAuthContext } from "@/app/(server)/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const user = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    return (
        <h1>Only logged in users can view this dashboard page</h1>
    );
}
