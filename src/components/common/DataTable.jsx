import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

import { useState } from "react";
import * as XLSX from "xlsx";

export default function DataTable({
  data,
  columns,
  pinnedColumns = {},
  pageSize = 10,
  emptyMessage = "No data found",
  globalSearch = true,
  exportFileName = "export",
  exportSheetName = "Data",
}) {
  const [sorting, setSorting] = useState([]);
  const [columnPinning, setColumnPinning] =
    useState(pinnedColumns);

  const [globalFilter, setGlobalFilter] =
    useState("");

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnPinning,
      globalFilter,
    },

    onSortingChange: setSorting,
    onColumnPinningChange: setColumnPinning,
    onGlobalFilterChange: setGlobalFilter,

    initialState: {
      pagination: {
        pageSize,
      },
    },

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // ---------------------------------------------------------
  // Record Counts
  // ---------------------------------------------------------

  const totalRecords = data.length;

  const filteredRows =
    table.getFilteredRowModel().rows;

  const filteredRecords =
    filteredRows.length;

  const {
    pageIndex,
    pageSize: currentPageSize,
  } = table.getState().pagination;

  const startRecord =
    filteredRecords === 0
      ? 0
      : pageIndex * currentPageSize + 1;

  const endRecord = Math.min(
    (pageIndex + 1) * currentPageSize,
    filteredRecords
  );

  const showPagination =
    filteredRecords > currentPageSize;

  // ---------------------------------------------------------
  // Export To Excel
  // ---------------------------------------------------------

  const handleExportExcel = () => {
    if (filteredRecords === 0) {
      return;
    }

    // Get all filtered rows, not only current page
    const rowsToExport = filteredRows.map(
      (row) => row.original
    );

    // Get columns that should be exported
    const exportColumns = columns.filter(
      (column) =>
        column.accessorKey &&
        column.id !== "actions"
    );

    // Create Excel data
    const excelData = rowsToExport.map(
      (row) => {
        const exportRow = {};

        exportColumns.forEach(
          (column) => {
            const key =
              column.accessorKey;

            const header =
              typeof column.header === "string"
                ? column.header
                : key;

            let value = row[key];

            // Handle null/undefined
            if (
              value === null ||
              value === undefined
            ) {
              value = "";
            }

            // Convert objects/arrays to string
            if (
              typeof value === "object"
            ) {
              value = JSON.stringify(value);
            }

            exportRow[header] = value;
          }
        );

        return exportRow;
      }
    );

    // Create worksheet
    const worksheet =
      XLSX.utils.json_to_sheet(
        excelData
      );

    // Create workbook
    const workbook =
      XLSX.utils.book_new();

    // Add worksheet
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      exportSheetName
    );

    // Generate Excel file
    XLSX.writeFile(
      workbook,
      `${exportFileName}.xlsx`
    );
  };

  return (
    <div className="overflow-x-auto">

      {/* -------------------------------------------------- */}
      {/* SEARCH + EXPORT + RECORD COUNT */}
      {/* -------------------------------------------------- */}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

        {/* Record Count */}
        <div className="text-sm text-gray-600">

          Showing{" "}

          <span className="font-semibold text-gray-800">
            {startRecord}
          </span>

          {" - "}

          <span className="font-semibold text-gray-800">
            {endRecord}
          </span>

          {" "}of{" "}

          <span className="font-semibold text-gray-800">
            {filteredRecords}
          </span>

          {" "}records

          {filteredRecords !== totalRecords && (
            <span className="ml-1 text-gray-400">
              (filtered from {totalRecords} total)
            </span>
          )}

        </div>

        {/* Search + Export */}
        <div className="flex flex-wrap items-center gap-2">

          {/* Global Search */}
          {globalSearch && (
            <input
              value={globalFilter ?? ""}
              onChange={(e) =>
                setGlobalFilter(
                  e.target.value
                )
              }
              placeholder="Search..."
              className="
                border
                border-gray-300
                px-3
                py-2
                rounded-lg
                w-full
                sm:w-64
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          )}

          {/* Export Excel */}
          <button
            type="button"
            onClick={handleExportExcel}
            disabled={filteredRecords === 0}
            className="
              px-4
              py-2
              rounded-lg
              bg-green-600
              text-white
              text-sm
              font-medium
              hover:bg-green-700
              transition
              disabled:bg-gray-300
              disabled:cursor-not-allowed
              whitespace-nowrap
            "
          >
            Export Excel
          </button>

        </div>

      </div>

      {/* -------------------------------------------------- */}
      {/* TABLE */}
      {/* -------------------------------------------------- */}

      <table className="min-w-full text-sm border">

        {/* HEADER */}
        <thead className="bg-gray-50">

          {table.getHeaderGroups().map(
            (headerGroup) => (
              <tr key={headerGroup.id}>

                {headerGroup.headers.map(
                  (header) => {

                    const isPinned =
                      header.column.getIsPinned();

                    return (
                      <th
                        key={header.id}
                        className={`
                          px-4
                          py-3
                          text-left
                          font-semibold
                          text-gray-700
                          cursor-pointer
                          ${
                            isPinned
                              ? "sticky left-0 bg-gray-50 z-10"
                              : ""
                          }
                        `}
                        onClick={
                          header.column.getToggleSortingHandler()
                        }
                      >

                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[
                          header.column.getIsSorted()
                        ] ?? null}

                      </th>
                    );
                  }
                )}

              </tr>
            )
          )}

        </thead>

        {/* BODY */}
        <tbody>

          {table.getRowModel().rows.length > 0 ? (

            table
              .getRowModel()
              .rows
              .map((row) => (

                <tr
                  key={row.id}
                  className="
                    border-t
                    hover:bg-gray-50
                  "
                >

                  {row
                    .getVisibleCells()
                    .map((cell) => {

                      const isPinned =
                        cell.column.getIsPinned();

                      return (
                        <td
                          key={cell.id}
                          className={`
                            px-4
                            py-3
                            ${
                              isPinned
                                ? "sticky left-0 bg-white z-10"
                                : ""
                            }
                          `}
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
                className="
                  px-4
                  py-6
                  text-center
                  text-gray-500
                "
              >
                {emptyMessage}
              </td>

            </tr>

          )}

        </tbody>

      </table>

      {/* -------------------------------------------------- */}
      {/* PAGINATION */}
      {/* -------------------------------------------------- */}

      {showPagination && (

        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-2
            mt-4
            text-sm
          "
        >

          {/* Page Information */}
          <div>

            Page{" "}

            <span className="font-medium">
              {pageIndex + 1}
            </span>

            {" "}of{" "}

            <span className="font-medium">
              {table.getPageCount()}
            </span>

          </div>

          {/* Pagination Buttons */}
          <div className="flex flex-wrap gap-2">

            {/* First */}
            <button
              onClick={() =>
                table.firstPage()
              }
              disabled={
                !table.getCanPreviousPage()
              }
              className="
                px-3
                py-1
                border
                rounded
                disabled:opacity-50
                disabled:cursor-not-allowed
                hover:bg-gray-50
              "
            >
              First
            </button>

            {/* Previous */}
            <button
              onClick={() =>
                table.previousPage()
              }
              disabled={
                !table.getCanPreviousPage()
              }
              className="
                px-3
                py-1
                border
                rounded
                disabled:opacity-50
                disabled:cursor-not-allowed
                hover:bg-gray-50
              "
            >
              Prev
            </button>

            {/* Next */}
            <button
              onClick={() =>
                table.nextPage()
              }
              disabled={
                !table.getCanNextPage()
              }
              className="
                px-3
                py-1
                border
                rounded
                disabled:opacity-50
                disabled:cursor-not-allowed
                hover:bg-gray-50
              "
            >
              Next
            </button>

            {/* Last */}
            <button
              onClick={() =>
                table.lastPage()
              }
              disabled={
                !table.getCanNextPage()
              }
              className="
                px-3
                py-1
                border
                rounded
                disabled:opacity-50
                disabled:cursor-not-allowed
                hover:bg-gray-50
              "
            >
              Last
            </button>

          </div>

        </div>

      )}

    </div>
  );
}