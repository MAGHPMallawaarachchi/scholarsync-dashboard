'use client'

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import ClubTable from "@/components/ClubTable";
import { useAuthContext } from "@/app/(server)/context/AuthContext";

function Page() {
    const { user } = useAuthContext() as any
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    return (
        <div className="flex flex-col gap-8 mx-auto w-full">
            <Header title="Clubs" buttonTitle="Add New Club"/>
            <ClubTable />
        </div>
    );
}

export default Page;