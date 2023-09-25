import { UserTransaction } from "@prisma/client"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type TransactionTableData = UserTransaction & {
  index: number
  totalCredits: number
}

export const TransactionTable = ({
  transactions,
}: {
  transactions: UserTransaction[]
}) => {
  const columns: ColumnDef<TransactionTableData>[] = [
    {
      accessorKey: "index",
      header: "No.",
    },
    {
      accessorKey: "totalCredits",
      header: "Total Credits",
    },
    {
      accessorKey: "credits",
      header: "Credit Package",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "createdAt",
      header: "Date",
    },
  ]

  const data: TransactionTableData[] = transactions.map((txn, index) => ({
    index: index + 1,
    totalCredits: txn.credits * txn.quantity,
    ...txn,
  }))

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border-muted-foreground border-2">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              ></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
