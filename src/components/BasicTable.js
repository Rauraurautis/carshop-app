import React, { useMemo, useEffect } from 'react'
import EditCar from "./EditCar.js"
import vehicleService from '../services/vehicles'
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table"
import GlobalFilter from './GlobalFilter.js'




export default function BasicTable({ vehicles, setVehicles }) {

    const deleteCar = (car) => {
        if (window.confirm("Are you sure?")) {
            vehicleService.removeOne(car).then(res => vehicleService.getAll().then(data => setVehicles(data)))
        }
    }

    const COLUMNS = useMemo(() => [
        {
            Header: "Brand",
            accessor: "brand"
        },
        {
            Header: "Model",
            accessor: "model"
        }
        ,
        {
            Header: "Color",
            accessor: "color"
        }
        ,
        {
            Header: "Fuel",
            accessor: "fuel"
        }
        ,
        {
            Header: "Year",
            accessor: "year"
        }
        ,
        {
            Header: "Price",
            accessor: "price",
        },
        {
            Id: "Edit",
            accessor: "_links.self",
            sortable: false,
            filterable: false,
            Cell: row => <EditCar editingCar={row} setVehicles={setVehicles} />
        },
        {
            accessor: "_links.self.href",
            sortable: false,
            filterable: false,
            Cell: row => <button class="btn btn-danger" onClick={() => deleteCar(row.value)}>Delete</button>
        }
    ], []);

    const tableInstance = useTable({
        columns: COLUMNS,
        data: vehicles,
        initialState: {pageSize: 8}
    }, useGlobalFilter, useSortBy, usePagination
    );

    const { getTableProps, getTableBodyProps, headerGroups,
         page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, setPageSize, prepareRow, state, setGlobalFilter } = tableInstance;

        
    return (
        <>
            <GlobalFilter filter={state.globalFilter} setFilter={setGlobalFilter} />
            <table className="table table-hover" {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th scope="col" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render("Header")}
                                            {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                                        </th>
                                    ))}
                            </tr>
                        ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return <td style={{ paddingTop: "1rem" }} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    })}
                                </tr>)
                        })
                    }
                </tbody>
            </table>
            <div>
                <span>
                    Page{" "}
                    <strong>
                        {state.pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            </div>
        </>
    )
}
