'use client'
import React from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ClubTable from "@/components/ClubTable";
import { useAuthContext } from "@/app/(server)/context/AuthContext";

const Clubs = () => {
    const user = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    const handleButtonClick = () => {
        router.push("/dashboard/clubs/create-club"); 
    };

    return (
        <div className="flex flex-col gap-8 mx-auto w-full">
            <Header title="Clubs" buttonTitle="Add New Club" handleClick={handleButtonClick}/>
            <ClubTable />
        </div>
    );
}

export default Clubs