"use client"

import * as React from "react"
import {

    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,

    useReactTable,

} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useWholeApp } from "./AuthContextAPI"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { DepartmentSelector } from "./DepartmentSelector"
import { DepartmentCordinatorSelector } from "./DepartmentCordinatorSelector"
import axios from "axios"
import { toast } from "sonner"
import Link from "next/link"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"

const data = [
    {
        id: "m5gr84i9",
        amount: 316,
        status: "success",
        email: "ken99@example.com",
    },
    {
        id: "3u1reuv4",
        amount: 242,
        status: "success",
        email: "Abe45@example.com",
    },
    {
        id: "derv1ws0",
        amount: 837,
        status: "processing",
        email: "Monserrat44@example.com",
    },
    {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@example.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@example.com",
    },
]



export const columns = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },

    {
        accessorKey: "companyName",
        header: "Company Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("companyName")}</div>
        ),
    },
    {
        accessorKey: "jobDescription",
        header: ({ column }) => {

            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Job Description
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase line-clamp-2">{row.getValue("jobDescription")}</div>,
    },
    {
        accessorKey: "role",
        header: () => <div className="">Role</div>,
        cell: ({ row }) => {
            return <div className=" font-medium capitalize">{row.getValue("role")}</div>
        },
    },
    {
        accessorKey: "stipend",
        header: () => <div className="">Stipend</div>,
        cell: ({ row }) => {
            return <div className=" font-medium capitalize">{row.getValue("stipend") || 'Unpaid'}</div>
        },
    },
    {
        accessorKey: "workType",
        header: () => <div className="">Work Type</div>,
        cell: ({ row }) => {
            return <div className=" font-medium capitalize">{row.getValue("workType")}</div>
        },
    },
    {
        accessorKey: "semester",
        header: () => <div className="">Semester</div>,
        cell: ({ row }) => {
            return <div className=" font-medium capitalize">{row.getValue("semester")}</div>
        },
    },
    {
        accessorKey: "year",
        header: () => <div className="">Year</div>,
        cell: ({ row }) => {
            return <div className=" font-medium capitalize">{row.getValue("year")}</div>
        },
    },
    {
        accessorKey: "sessionYear",
        header: () => <div className="">Session Year</div>,
        cell: ({ row }) => {
            return <div className=" font-medium capitalize">{row.getValue("sessionYear")}</div>
        },
    },
    {
        accessorKey: "sessionHalf",
        header: () => <div className="">Session Half</div>,
        cell: ({ row }) => {
            return <div className=" font-medium capitalize">{row.getValue("sessionHalf")}</div>
        },
    },
    {
        accessorKey: "location",
        header: () => <div className="">Location</div>,
        cell: ({ row }) => {
            return <div className=" font-medium capitalize">{row.getValue("location")}</div>
        },
    },
    {
        accessorKey: "createdAt",
        header: () => <div className="">Created At</div>,
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"))
            return <div className="">
                {date.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}
            </div>
        },
    },
    {
        accessorKey: "offerletterurl",
        header: () => <div className="">Offer Letter</div>,
       cell: ({ row }) => {
            return <div className="text-sky-600 font-medium capitalize"><a className="text-sky-600 font-semibold hover:underline" href={row.getValue("offerletterurl")}>Download</a></div>
        },
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const internship = row.original;
            console.log(internship)
            const [companyName, setCompanyName] = React.useState(internship?.companyName || "");
            const [semester, setSemester] = React.useState(internship?.semester?.toString() || "");
            const [year, setYear] = React.useState(internship?.year?.toString() || "");
            const [stipend, setStipend] = React.useState(internship?.stipend || "");
            const [duration, setDuration] = React.useState(internship?.duration || "");
            const [location, setLocation] = React.useState(internship?.location || "");
            const [workType, setWorkType] = React.useState(internship?.workType || "");
            const [jobDescription, setJobDescription] = React.useState(internship?.jobDescription || "");
            const [role, setRole] = React.useState(internship?.role || "");
            const { setfetchedUserData ,fetchUserDatafromIdinparam,userId} = useWholeApp()
         const handleSubmit = async (e) => {
    e.preventDefault();

    // consistency validation
    const yearNum = Number(year);
    const semesterNum = Number(semester);

    if (
        (yearNum === 1 && ![1, 2].includes(semesterNum)) ||
        (yearNum === 2 && ![3, 4].includes(semesterNum)) ||
        (yearNum === 3 && ![5, 6].includes(semesterNum)) ||
        (yearNum === 4 && ![7, 8].includes(semesterNum))
    ) {
        toast.warning("Year and Semester is not consistent");
        return;
    }

    if (!role.trim()) {
        toast.warning("Role is required");
        return;
    }

    const payload = {
        _id: internship._id,
        companyName,
        semester: semesterNum,
        year: yearNum,
        stipend,
        duration,
        location,
        workType,
        jobDescription,
        role,
        sessionYear,
        sessionHalf
    };

    try {
        const resp = await axios.put("/api/auth/updateinternsipdetailsbystudent", payload);
        if (resp.data.success) {
            toast.success("Internship updated successfully!");
            const updated = resp.data.internship;
            setCompanyName(updated.companyName);
            setSemester(updated.semester?.toString() || "");
            setYear(updated.year?.toString() || "");
            setStipend(updated.stipend);
            setDuration(updated.duration);
            setLocation(updated.location);
            setWorkType(updated.workType);
            setJobDescription(updated.jobDescription);
            setRole(updated.role);

          // Corrected Section
fetchUserDatafromIdinparam(userId?.id)
            setIsModalOpen(false);
        } else {
            toast.error(resp.data.message || "Something went wrong!");
        }
    } catch (err) {
        console.error(err);
        toast.error("Error submitting internship");
    }
};

            const [isModalOpen, setIsModalOpen] = React.useState(false);

           
React.useEffect(() => {
    if (isModalOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto'; // or 'scroll'
    }
    
    // Cleanup function to remove the style when the component unmounts
    return () => {
        document.body.style.overflow = 'auto'; // or 'scroll'
    };
}, [isModalOpen]);
            return (
                <div className="relative flex flex-col">
                    {/* Trigger Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full text-left hover:bg-neutral-800 rounded-md text-sm p-1 px-2 text-white"
                    >
                        Edit
                    </button>

                    {/* Custom Modal */}
                    {isModalOpen && (
                        <div onClick={() => setIsModalOpen(false)} className='fixed inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
                            <div onClick={(e) => e.stopPropagation()} className="bg-neutral-900 w-11/12 z-40 max-w-xl p-4 rounded-md flex flex-col overflow-auto max-h-[80vh] shadow-xl shadow-neutral-800">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <h1 className="text-lg font-semibold">Edit Internsip Details</h1>
                                    {/* Company Name */}
                                    <div>
                                        <label className="block mb-1 font-medium">Company Name</label>
                                        <Input
                                            type="text"
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Semester */}
                                    <div>
                                        <label className="block mb-1 font-medium">Semester</label>
                                        <Select
                                            value={semester}
                                            onValueChange={setSemester}
                                        >
                                            <SelectTrigger className="w-[155px]">
                                                <SelectValue placeholder="Select Semester" />
                                            </SelectTrigger>
                                            <SelectContent className="dark">
                                                <SelectGroup>
                                                    <SelectLabel>Semester</SelectLabel>
                                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                                        <SelectItem key={num} value={num.toString()}>
                                                            {num}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Year */}
                                    <div>
                                        <label className="block mb-1 font-medium">Year</label>
                                        <Select
                                            value={year}
                                            onValueChange={setYear}
                                        >
                                            <SelectTrigger className="w-[140px]">
                                                <SelectValue placeholder="Select Year" />
                                            </SelectTrigger>
                                            <SelectContent className="dark">
                                                <SelectGroup>
                                                    <SelectLabel>Year</SelectLabel>
                                                    {[1, 2, 3, 4].map((num) => (
                                                        <SelectItem key={num} value={num.toString()}>
                                                            {num}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Work Type */}
                                    <div>
                                        <label className="block mb-1 font-medium">Work Type</label>
                                        <Select
                                            value={workType}
                                            onValueChange={setWorkType}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select Work Type" />
                                            </SelectTrigger>
                                            <SelectContent className="dark">
                                                <SelectGroup>
                                                    <SelectLabel>Work Type</SelectLabel>
                                                    {["Remote", "Onsite", "Hybrid"].map((num) => (
                                                        <SelectItem key={num} value={num}>
                                                            {num}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Stipend */}
                                    <div>
                                        <label className="block mb-1 font-medium">Stipend</label>
                                        <Input
                                            type="number"
                                            value={stipend}
                                            onChange={(e) => setStipend(e.target.value)}
                                        />
                                    </div>

                                    {/* Duration */}
                                    <div>
                                        <label className="block mb-1 font-medium">Duration</label>
                                        <Input
                                            type="text"
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className="block mb-1 font-medium">Location</label>
                                        <Input
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Job Description */}
                                    <div>
                                        <label className="block mb-1 font-medium">Job Description</label>
                                        <Textarea
                                            value={jobDescription}
                                            onChange={(e) => setJobDescription(e.target.value)}
                                            rows="3"
                                            placeholder="Job Description"
                                        />
                                    </div>

                                    {/* Role */}
                                    <div>
                                        <label className="block mb-1 font-medium">Role</label>
                                        <Input
                                            type="text"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        />
                                    </div>


                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="w-full bg-white text-black py-2 rounded-md hover:bg-zinc-300 cursor-pointer select-none font-semibold sticky bottom-0 z-20"
                                    >
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            );
        },
    }

]

export function StudentInternsipDataTable({studentInternData = []}) {
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([])
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})
  
    const table = useReactTable({
        data: studentInternData || [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter Names..."
                    value={(table.getColumn("companyName")?.getFilterValue()) ?? ""}
                    onChange={(event) =>
                        table.getColumn("companyName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto dark">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='dark' align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table?.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                {/* <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div> */}
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
