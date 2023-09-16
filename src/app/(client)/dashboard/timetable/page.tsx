'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/(server)/context/AuthContext";
import Header from "@/components/Header";
import CustomTimetable from "@/components/CustomTimetable";

const Timetable = () => {
    const user = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    const handleButtonClick = () => {
        router.push("/dashboard/timetable/create-lecture"); 
    };

    return (
        <div className="flex flex-col gap-8 mx-auto w-full">
            <Header title="Timetable" buttonTitle="Add New Lecture" handleClick={handleButtonClick}/>
            <CustomTimetable/>
        </div>
    );
}

export default Timetable