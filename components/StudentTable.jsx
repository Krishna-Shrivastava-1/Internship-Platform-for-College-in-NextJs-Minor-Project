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
import { ArrowUpDown, ChevronDown, Ellipsis, MoreHorizontal } from "lucide-react"

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
import { usePathname } from "next/navigation"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import InternshipdataofStudentsasperBranch from "./InternshipdataofStudentsasperBranch"
import Link from "next/link"



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
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    //   {
    //     accessorFn: (row) => row.internshipDetails?.map(d => d.companyName).join(", ") ?? "",
    //     id: "companyName",
    //     header: "company Name",
    //     cell: ({ getValue }) => {
    //         const companyName = getValue();
    //         return <div className="font-medium capitalize">{companyName}</div>;
    //     },
    //     filterFn: (row, columnId, filterValue) => {
    //         const semesters = row.getValue(columnId);
    //         return semesters?.toLowerCase().includes(filterValue.toLowerCase());
    //     },
    // },
    {
        accessorKey: "department",
        header: () => <div className="">Department</div>,
        cell: ({ row }) => {
            return <div className=" font-medium capitalize">{row.getValue("department")}</div>
        },
    },
    {
        accessorKey: "createdAt",
        header: () => <div className="">Joined At</div>,
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
        accessorKey: "internshipDetails",
        header: () => <div className="">No. of Internsip</div>,
        cell: ({ row }) => {
            // console.log(row?.original?.internshipDetails)
            return <div className=" font-medium capitalize">{row.getValue("internshipDetails").length}</div>
        },
    },
    // {
    //     accessorFn: (row) => row.internshipDetails?.map(d => d.semester).join(", ") ?? "",
    //     id: "semester",
    //     header: "Semester(s)",
    //     cell: ({ getValue }) => {
    //         const semesters = getValue();
    //         return <div className="font-medium capitalize">{semesters}</div>;
    //     },
    //     filterFn: (row, columnId, filterValue) => {
    //         const semesters = row.getValue(columnId);
    //         return semesters?.toLowerCase().includes(filterValue.toLowerCase());
    //     },
    // },
    // {
    //     accessorFn: (row) => row.internshipDetails?.map(d => d.year).join(", ") ?? "",
    //     id: "year",
    //     header: "Year",
    //     cell: ({ getValue }) => {
    //         const semesters = getValue();
    //         return <div className="font-medium capitalize">{semesters}</div>;
    //     },
    //     filterFn: (row, columnId, filterValue) => {
    //         const semesters = row.getValue(columnId);
    //         return semesters?.toLowerCase().includes(filterValue.toLowerCase());
    //     },
    // },
  
    {
        accessorKey: "role",
        header: () => <div className="">Role</div>,
        cell: ({ row }) => {
            return <div className=" font-medium capitalize">{row.getValue("role")}</div>
        },
    },
      {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
//  console.log(user)
  const pathname = usePathname()
// console.log(pathname)
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='dark' align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user._id)}
            >
              Copy user ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <Link href={`/${pathname === '/superadmin' ? 'superadmin' :'admin'}/view-more/${user?._id}`}>
            
            <DropdownMenuItem>View Details</DropdownMenuItem>
            </Link>
            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function StudentTable() {
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([])
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})
    const { allStudentData, allStudentDeptSpecific, } = useWholeApp()
    // console.log(allStudentDeptSpecific)
    const pathname = usePathname()
    const table = useReactTable({
        data: pathname.startsWith('/superadmin') ? allStudentData : allStudentDeptSpecific,
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
                    value={(table.getColumn("name")?.getFilterValue()) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                {/* <Input
                    placeholder="Filter Company Names..."
                    value={(table.getColumn("companyName")?.getFilterValue()) ?? ""}
                    onChange={(event) =>
                        table.getColumn("companyName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                /> */}
               
              
               





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
                        {table.getRowModel().rows?.length ? (
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
