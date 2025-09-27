'use client'


import { useWholeApp } from '@/components/AuthContextAPI'
import { DepartmentSelector } from '@/components/DepartmentSelector'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const page = () => {
    const [logorsign, setlogorsign] = useState('Sign up')
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const { fetchedUserData } = useWholeApp()
    const router = useRouter()
    const [Department, setDepartment] = useState('')
    const [role, setrole] = useState('Student')

    const handleSignup = async (name, email, password) => {
        try {
            if(!Department){
             return   toast.warning("Select Department")
            }
           
            const resp = await axios.post(`/api/auth/${role=== 'student'?'register':'registerteacher'}`, {
                name,
                email,
                password,
                role: role?.toLowerCase(),
                department: Department
            })
            // console.log('register - ',resp)

            if (!resp?.data?.success) {
                toast.error(resp?.data?.message)

            }
            if (resp?.data?.success) {
                toast.success(resp?.data?.message)
                setname('')
                setDepartment(null)
                setemail('')
                setpassword('')
                setrole('')

            }
        } catch (error) {
            console.log(error.message)
        }
    }




    const handsubmit = async (e) => {
        e.preventDefault()
      
            await handleSignup(name, email, password)
        
    }

    console.log(role.toLowerCase())
    // console.log(Department)
    return (
        <div>

            <div className='w-full flex items-start justify-center mt-8'>

                <div className='mt-16 m-2  w-full border border-zinc-800 shadow-lg shadow-zinc-800/30 p-2 rounded-xl max-w-sm text-white'>
                    <h1 className='font-extrabold text-center text-3xl mb-6'>{logorsign} to <span className='text-sky-600 underline'>inter</span></h1>
                    <form onSubmit={handsubmit}>
                        <div className='flex flex-col '>
                            <input value={name} maxLength={50} onChange={(e) => setname(e.target.value)} className=' placeholder:font-bold w-[95%] outline-none  focus-within:border border-zinc-700 border focus-within:border-sky-600 focus-within:shadow-sm shadow-sky-600 text-lg m-2 pl-2 p-1 rounded-sm' type="text" placeholder='Username' />

                            <input value={email} onChange={(e) => setemail(e.target.value)} className=' placeholder:font-bold w-[95%] outline-none  focus-within:border border-zinc-700 border focus-within:shadow-sm shadow-sky-600 focus-within:border-sky-600  m-2 text-lg pl-2 p-1 rounded-sm' type="email" required placeholder='Email' />
                            <input value={password} onChange={(e) => setpassword(e.target.value)} className=' placeholder:font-bold w-[95%] outline-none  focus-within:border border-zinc-700 border focus-within:shadow-sm shadow-sky-600 focus-within:border-sky-600 m-2 text-lg pl-2 p-1 rounded-sm' type="password" required placeholder='Password' />


                            <DepartmentSelector departmentName={setDepartment} />


                            <h2 className='font-semibold my-2'>Role:</h2>
                            <RadioGroup onValueChange={(value) => setrole(value)} defaultValue="student">
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="teacher" id="r1" />
                                    <Label htmlFor="r1">Teacher</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="student" id="r2" />
                                    <Label htmlFor="r2">Student</Label>
                                </div>

                            </RadioGroup>

                        </div>
                        <div className='w-[95%] flex items-center justify-center m-2'>
                            {
                                logorsign === 'Sign up' ?
                                    <button type='submit' className='hover:bg-sky-600  cursor-pointer select-none bg-sky-600/70 p-2 font-semibold text-xl w-full rounded-sm'>Create Account</button>
                                    :
                                    <button type='submit' className='hover:bg-sky-600  cursor-pointer select-none bg-sky-600/70 p-2 font-semibold text-xl w-full rounded-sm'>Login Account</button>
                            }

                        </div>


                    </form>
                </div>
            </div>
        </div>
    )
}

export default page