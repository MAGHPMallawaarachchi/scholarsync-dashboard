'use client'
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import ClubTable from "@/components/ClubTable";
import { useAuthContext } from "@/app/(server)/context/AuthContext";
import LecturerTable from "@/components/LecturerTable";

const Lecturers = () => {
    const user = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    const handleButtonClick = () => {
        router.push("/dashboard/lecturers/create-lecturer"); 
    };

    return (
        <div className="flex flex-col gap-8 ml-60">
            <Header title="Lecturers" buttonTitle="Add New Lecturer" handleClick={handleButtonClick}/>
            <LecturerTable />
        </div>
    );
}

export default Lecturers