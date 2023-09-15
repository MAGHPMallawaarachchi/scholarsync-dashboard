'use client'

import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import Button from "./Button";
import Club from "@/app/(server)/models/Club";
import { createClubAsUser, updateClubById } from "@/app/(server)/firebase/club.firestore";
import { AiFillPlusCircle } from "react-icons/ai";

type Props = {
    type: string;
    club?: Club;
}

const ProjectForm = ({ type, club }: Props) => {

    const [profileImageFile, setProfileImageFile] = useState<File>(new File([], ''));
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [password, setPassword] = useState("");

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            if (type === "create") {
                // Create a new club
                if (isImageSelected) {
                    // Create a new club with the profileImageFile
                    await createClubAsUser(form, profileImageFile, password); 
                    alert("Club created successfully!");                   

                    // Clear the form fields
                    setForm({
                        image: "",
                        id: "",
                        uid: "",
                        name: "",
                        about: "",
                        email: "",
                        inCharge: "",
                        president: "",
                        profileImageURL: "",
                    });

                     // Reset the selected image
                    setProfileImageFile(new File([], ''));
                    setIsImageSelected(false);

                } else {
                    alert("Please select a profile image for your club.");
                }
            }             
            if (type === "edit") {
                await updateClubById(club?.id as string, form);
                alert("Club updated successfully!");
            }
        } catch (error) {
            alert(`Failed to ${type === "create" ? "create" : "edit"} club. Try again!`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.includes('image')) {
            alert('Please upload an image file');
            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = reader.result as string;
            handleStateChange('image', result);
            setIsImageSelected(true);
        };

        setProfileImageFile(file);
        setIsImageSelected(true);
    };

    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prevState) => ({ ...prevState, [fieldName]: value }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        image: club?.image || "",
        id: club?.id || "",
        uid: club?.uid || "",
        name: club?.name || "",
        about: club?.about || "",
        email: club?.email || "",
        inCharge: club?.inCharge || "",
        president: club?.president || "",
        profileImageURL: club?.profileImageURL || "",
    });    

    return (
        <form 
            onSubmit={handleFormSubmit}
            className="flexStart form"
        >
            <div className="flexStart relative z-10 text-center h-[400px] w-[400px] text-white border-2 border-white border-dashed rounded-full overflow-hidden">
                <label htmlFor="image" className="flex items-center justify-center w-full h-full">
                    {!form.image && 'Choose an image for your club'}
                </label>
                <input 
                    id="image"
                    type="file"
                    accept="image/*"
                    required={type === 'create'}
                    className="absolute z-30 w-full opacity-0 h-full cursor-pointer"
                    onChange={handleChangeImage}
                />
                {form.image && (
                    <div className="rounded-full overflow-hidden w-32 h-32 sm:w-40 sm:h-40">
                        <Image
                            src={form.image}
                            className="object-cover w-full h-full"
                            alt="club image"
                            layout="fill"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                )}
            </div>

            <FormField
                title="Name"
                state={form.name}
                placeholder="name"
                setState={(value) => handleStateChange('name', value)}
            />

            <FormField
                isTextArea
                title="About"
                state={form.about}
                placeholder="about"
                setState={(value) => handleStateChange('about', value)}
            />

            <FormField
                title="Email"
                type="email"
                state={form.email}
                placeholder="email"
                setState={(value) => handleStateChange('email', value)}
            />

            <FormField
                title="Mister/Mistress In Charge"
                state={form.inCharge}
                placeholder="mister/mistress in charge"
                setState={(value) => handleStateChange('inCharge', value)}
            />

            <FormField
                title="President"
                state={form.president}
                placeholder="president"
                setState={(value) => handleStateChange('president', value)}
            />

            {type === "create" && (
                <FormField
                    title="Password"
                    type="password"
                    state={password}
                    placeholder="password"
                    setState={(value) => setPassword(value)}
                />
            )}

            <div className="flex justify-center items-center w-full">
                <Button
                    title={
                        isSubmitting
                            ? `${type === 'create' ? 'Adding New Club' : 'Updating Club'}`
                            : `${type === 'create' ? 'Add New Club' : 'Update Club'}`
                    }
                    type="submit"
                    leftIcon={<AiFillPlusCircle size="20" />}
                    isSubmitting={isSubmitting}
                />
            </div>

        </form>
    )
}

export default ProjectForm;
