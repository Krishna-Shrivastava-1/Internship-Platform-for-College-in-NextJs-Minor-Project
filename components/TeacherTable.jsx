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
        accessorKey: "Status",
        header: () => <div className="">Status</div>,
        cell: ({ row }) => {
            const value = row?.original?.assignedCordinatorOfNOC;
            return (
                <div className="font-medium capitalize ">
                    {value=== "Not Assigned" || !value ? <span className="rounded-full px-2 p-1 text-center border border-red-800 text-red-600 font-semibold bg-red-500/20">Not Active</span>:<span className="rounded-full px-2 p-1 text-center border font-semibold border-green-600 text-green-500 bg-green-500/20">Active</span>}
                </div>
            );
        },
    },
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
        accessorKey: "role",
        header: () => <div className="">Role</div>,
        cell: ({ row }) => {
            return <div className=" font-medium capitalize">{row.getValue("role")}</div>
        },
    },
    {
        accessorKey: "Assigned NOC Cordinator",
        header: () => <div className="">Assigned NOC Cordinator</div>,
        cell: ({ row }) => {
            const value = row?.original?.assignedCordinatorOfNOC;
            return (
                <div className="font-medium capitalize">
                    {value && value.trim() !== "" ? value : "Not Assigned"}
               
                </div>
            );
        },
    },

{
  id: "actions",
  enableHiding: false,
  cell: ({ row }) => {
    const columnofCordinator = row.original;

    const [newName, setNewName] = React.useState(columnofCordinator?.name || '');
    const [newDepartment, setNewDepartment] = React.useState(columnofCordinator?.department || '');
    const [departmentNocCordinator, setDepartmentNocCordinator] = React.useState(columnofCordinator?.assignedCordinatorOfNOC || '');
    const [isModalOpen, setIsModalOpen] = React.useState(false);
const {setallTeacherDataOnly} = useWholeApp()
    const handleUpdate = async () => {
      try {
        if(!newDepartment){
            toast.warning("Cannot Empty Department Field!")
            return
        }
        const payload = {
      teacherId: columnofCordinator?._id,
      name: newName,
      department: newDepartment || null,
      assignedCordinatorOfNOC: departmentNocCordinator || null,
    };

    const resp = await axios.put(`/api/auth/updateteacherbyid`, payload);
console.log(resp)

        if (resp?.data?.success) {
          toast.success(resp?.data?.message);
          setIsModalOpen(false);
          setallTeacherDataOnly((prevTeachers) =>
        prevTeachers.map((t) =>
          t._id === columnofCordinator._id
            ? { ...t, name: newName, department: newDepartment, assignedCordinatorOfNOC: departmentNocCordinator }
            : t
        )
      );
        } else {
          toast.error(resp?.data?.message || "Something went wrong!");
        }
      } catch (error) {
        console.log(error.message);
        toast.error("Something went wrong!");
      }
    };
// console.log(departmentNocCordinator)
    return (
      <div className="relative flex flex-col">
        {/* Trigger Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full text-left hover:bg-neutral-800 rounded-md text-sm p-1 px-2 text-white"
        >
          Edit User
        </button>

        {/* Custom Modal */}
        {isModalOpen && (
          <div  onClick={() => setIsModalOpen(false)} className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div  onClick={(e) => e.stopPropagation()} className="bg-neutral-900 w-11/12 z-40 max-w-md p-4 rounded-md flex flex-col overflow-auto max-h-[80vh] shadow-xl shadow-neutral-800">
              <h2 className="text-white text-lg font-bold mb-4">Update User</h2>
<div className="m-1">
    <h2 className="text-lg font-semibold">Name</h2>
              <Input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Name"
                className="w-full p-2 mb-2 rounded "
              />
</div>
<div className="m-1">
    <h2 className="text-lg font-semibold">Department</h2>
              <DepartmentSelector
                initialValue={newDepartment}
                departmentName={setNewDepartment}
              />
</div>
<div className="m-1">
    <h2 className="text-lg font-semibold">Assigned Cordinator of NOC Department</h2>
              <DepartmentCordinatorSelector
                initialValue={departmentNocCordinator}
                departmentName={setDepartmentNocCordinator}
              />

</div>
              <div className="mt-4 flex justify-end gap-2">
               
                <Button  onClick={() => setIsModalOpen(false)} className='font-semibold text-md cursor-pointer select-none' variant={'destructive'}>
                    Cancel
                </Button>
                <Button className='font-semibold text-md cursor-pointer select-none' onClick={handleUpdate}>
                    Update
                </Button>
               
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
}

]

export function TeacherTable() {
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([])
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})
    const { allTeacherDataOnly } = useWholeApp()
    const table = useReactTable({
        data: allTeacherDataOnly,
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
