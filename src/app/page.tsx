'use client'
import React from "react";
import signIn from "@/firebase/auth/authentification";
import { useRouter } from 'next/navigation'
import Container from "@/components/Container";

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/dashboard")
    }
    return (
        <Container>
            <div className="min-h-screen flex items-center justify-center">
                <div className="mx-auto max-w-sm p-6 bg-backgroundlight rounded-lg shadow-md">
                    <h1 className="text-2xl text-white font-semibold mb-4">Login</h1>
                    <form onSubmit={handleForm} className="space-y-4">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-white">
                                Email
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                type="email"
                                name="email"
                                id="email"
                                placeholder="example@mail.com"
                                className="mt-1 p-2 w-full rounded-md bg-gray3"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-white">
                                Password
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                type="password"
                                name="password"
                                id="password"
                                placeholder="password"
                                className="mt-1 p-2 w-full rounded-md bg-gray3"
                            />
                        </div>
                        <button type="submit" className="w-full bg-secondarygreen text-white rounded-md py-2">
                            Login
                        </button>
                    </form>
                </div>
            </div>

        </Container>
    );
}

export default Page;