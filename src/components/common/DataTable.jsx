import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender
} from "@tanstack/react-table";

import { useState } from "react";

export default function DataTable({
  data,
  columns,
  pinnedColumns = {},
  pageSize = 10,
  emptyMessage = "No data found",
  globalSearch = true
}) {

  const [sorting, setSorting] = useState([]);
  const [columnPinning, setColumnPinning] = useState(pinnedColumns);

  // ✅ NEW STATE
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnPinning,
      globalFilter // ✅ add this
    },

    onSortingChange: setSorting,
    onColumnPinningChange: setColumnPinning,
    onGlobalFilterChange: setGlobalFilter, // ✅ add this

    initialState: {
      pagination: { pageSize }
    },

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel() // ✅ REQUIRED
  });

  const showPagination = table.getFilteredRowModel().rows.length > pageSize;

  return (
    <div className="overflow-x-auto">

      {/* 🔍 GLOBAL SEARCH */}
      {globalSearch && (
        <div className="mb-4 text-right">
          <input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="border px-3 py-2 rounded w-full max-w-sm"
          />
        </div>
      )}

      <table className="min-w-full text-sm border">

        {/* HEADER */}
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>

              {headerGroup.headers.map(header => {

                const isPinned = header.column.getIsPinned();

                return (
                  <th
                    key={header.id}
                    className={`px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer
                    ${isPinned ? "sticky left-0 bg-gray-50 z-10" : ""}`}
                    onClick={header.column.getToggleSortingHandler()}
                  >

                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    {{
                      asc: " 🔼",
                      desc: " 🔽"
                    }[header.column.getIsSorted()] ?? null}

                  </th>
                );
              })}

            </tr>
          ))}
        </thead>

        {/* BODY */}
        <tbody>

          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-t hover:bg-gray-50">

                {row.getVisibleCells().map(cell => {

                  const isPinned = cell.column.getIsPinned();

                  return (
                    <td
                      key={cell.id}
                      className={`px-4 py-3
                      ${isPinned ? "sticky left-0 bg-white z-10" : ""}`}
                    >

                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}

                    </td>
                  );
                })}

              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}

        </tbody>

      </table>

      {/* PAGINATION */}
      {showPagination && (
        <div className="flex flex-wrap items-center justify-between gap-2 mt-4 text-sm">

          <div>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>

          <div className="flex flex-wrap gap-2">

            <button
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 border rounded"
            >
              First
            </button>

            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 border rounded"
            >
              Prev
            </button>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 border rounded"
            >
              Next
            </button>

            <button
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 border rounded"
            >
              Last
            </button>

          </div>

        </div>
      )}

    </div>
  );
}