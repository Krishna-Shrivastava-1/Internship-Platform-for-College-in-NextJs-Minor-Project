'use client'

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useStyleRegistry } from "styled-jsx";

const { createContext, useState, useEffect, useContext } = require("react");

const AuthContext = createContext()
export const WholeAppProvider = ({ children }) => {
    const [userId, setuserId] = useState('')
    const [allStudentData, setallStudentData] = useState([])
    const [allStudentDeptSpecific, setallStudentDeptSpecific] = useState([])
    const [allTeacherDataOnly, setallTeacherDataOnly] = useState([])
    const pathname = usePathname()
    const router = useRouter()
    const [fetchedUserData, setfetchedUserData] = useState([])
    const [internshipDatawithFiltration, setinternshipDatawithFiltration] = useState([])
    const [year, setyear] = useState('')
    const [semester, setsemester] = useState('all')
    const [page, setpage] = useState(1)
    const [nocRequest, setnocRequest] = useState([])
    const [getUserbyId, setgetUserbyId] = useState([])
    const [totalPages, settotalPages] = useState(1)
    const [sessionYear, setsessionYear] = useState('')
    const [sessionHalf, setsessionHalf] = useState('')
    const [nocRequestPages, setnocRequestPages] = useState(1)
    const [nocRequestLimit, setnocRequestLimit] = useState(10)
    const [internshipForAllStudentAsPerDeptLimit, setinternshipForAllStudentAsPerDeptLimit] = useState(10)
    // Get UserId
    useEffect(() => {
        const userIdfunc = async () => {
            try {
                const respo = await axios.get('/api/auth/user')

                setuserId(respo?.data?.user)
                // setuserId(respo?.data?.user?.id)
            } catch (error) {
                console.log(error.message)

            }
        }
        if (!userId) {
            userIdfunc();
        }
    }, [pathname, userId])

    // Get Current User Data From ID
    useEffect(() => {
        if (!userId) {
            setfetchedUserData(null); // ✅ Reset immediately when logged out
            return;
        }
        const fetchUserDatafromId = async () => {
            if (!userId) {
                setfetchedUserData(null);
                return;
            }
            try {
                if (userId) {

                    const respo = await axios.get(`/api/auth/getuserbyid/${userId?.id}`)
                    setfetchedUserData(respo?.data)
                    // console.log(respo)
                }

            } catch (error) {
                console.log(error.message)

            }
        }
        fetchUserDatafromId()
    }, [userId, pathname])
    const fetchUserDatafromIdinparam = async (id) => {
        try {
            if (id) {

                const respo = await axios.get(`/api/auth/getuserbyid/${id}`)
                setgetUserbyId(respo?.data)
                // console.log(respo)
            }

        } catch (error) {
            console.log(error.message)

        }
    }



    // Fetch All Students Only
    const fetchAllStudentsOnly = async () => {
        try {

            const repo = await axios.get(`/api/auth/getallstudent`)
            if (repo?.data?.user) {
                setallStudentData(repo.data.user)
            }
        } catch (error) {
            console.error(error)
        }
    }




    // Logout Route
const handleLogout = async () => {
  try {
    await axios.post("/api/auth/logout"); // clears cookie

    // Clear local state
    setfetchedUserData(null);
    setuserId(null);

    // Redirect to login (or landing page)
    window.location.href = '/login'; // reloads page and triggers AuthGuard
  } catch (err) {
    console.error("Logout failed:", err);
  }
};



    // Fetch All Teachers Only
    const fetchAllTeachersOnly = async () => {
        try {
            const resp = await axios.get('/api/auth/getallteacher')
            setallTeacherDataOnly(resp?.data?.allTeacher)
        } catch (error) {
            console.log(error)
        }

    }




    // Fetch All Students Only with Specific Department
    useEffect(() => {
        const fetchAllStudentsOnlyWithSpecificDepartment = async () => {
            try {


                const repo = await axios.get(`/api/auth/getallstudent/getallstudentbydepartment?dept=${fetchedUserData?.user?.department}&page=${page}&limit=10`)
                if (repo?.data) {
                    setallStudentDeptSpecific(repo.data?.data)
                }


            } catch (error) {
                console.error(error)
            }
        }
        // fetchAllStudentsOnlyWithSpecificDepartment()
    }, [userId, fetchedUserData, pathname])


    const fetchNocRequest = async (CordinatorId) => {
        if (CordinatorId) {
            const resp = await axios.get(`/api/noc/getnocrequestforcordinatorteacher/${CordinatorId}?page=${nocRequestPages}&limit=${nocRequestLimit}`)
            setnocRequest(resp?.data)

        }
    }

    useEffect(() => {
        if (userId?.id) {

            fetchNocRequest(userId?.id)
        }
    }, [userId?.id, nocRequestPages, nocRequestLimit])

    const pendingNOtificationNumber = nocRequest?.nocs?.filter((e) => (
        e?.approvedornotbyteacher === 'Pending'
    ))
    // const pend = yu.map((e)=>e)
    //   console.log(pendingNOtificationNumber?.length)


    const fetchinternshipdatawithquery = async () => {
        try {

            if (fetchedUserData?.user && fetchedUserData?.user?.department) {
                const params = {
                    dept: fetchedUserData?.user?.department,
                    page,
                    limit: internshipForAllStudentAsPerDeptLimit,
                    sessionyear: sessionYear,
                    sessionhalf: sessionHalf
                };
                if (year) params.year = year;
                if (semester && semester !== "all") {
                    params.semester = semester;
                }

                // console.log(params)
                const resp = await axios.get(`/api/internshipcollection/getinternshipasperdept`, { params })
                if (resp.data) {
                    setinternshipDatawithFiltration(resp?.data?.students)
                    settotalPages(Math.ceil(resp.data.total / params.limit))

                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        if (userId && fetchedUserData?.user?.department) {
            fetchinternshipdatawithquery()
        }
    }, [userId, fetchedUserData, year, semester, page, sessionHalf, sessionYear, internshipForAllStudentAsPerDeptLimit])



    // console.log(fetchedUserData?.user)
    // console.log(sessionHalf)
    // console.log(sessionYear)
    // console.log(userId)
    // console.log(internshipDatawithFiltration)
    // console.log(allTeacherDataOnly)
    // console.log(allStudentData)
    // console.log(allStudentDeptSpecific)
    // console.log(getUserbyId)

    return (
        <AuthContext.Provider value={{
            userId,
            fetchedUserData,
            setallTeacherDataOnly,
            allTeacherDataOnly,
            fetchAllTeachersOnly,
            fetchAllStudentsOnly,
            setfetchedUserData,
            allStudentData,
            handleLogout,
            allStudentDeptSpecific,
            fetchUserDatafromIdinparam,
            getUserbyId,
            pendingNOtificationNumber,
            page,
            setpage,
            setyear,
            setsemester,
            internshipDatawithFiltration,
            totalPages,
            setsessionYear,
            setsessionHalf,
            fetchNocRequest,
            nocRequest,
            setnocRequest,
            nocRequestPages,
            setnocRequestPages,
            nocRequestLimit,
            setnocRequestLimit,
            internshipForAllStudentAsPerDeptLimit,
            setinternshipForAllStudentAsPerDeptLimit
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useWholeApp = () => useContext(AuthContext)