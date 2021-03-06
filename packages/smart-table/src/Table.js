import React, { useState, useEffect, useMemo } from 'react'
import { useTable, useFilters, useSortBy } from 'react-table'
import { Box } from 'theme-ui'

const defaultSettings = {
  border: false,
  rowStripe: true,
  search: false,
  searchFilters: [],
}

const SmartTable = React.forwardRef(
  (
    {
      variant = 'table',
      settings = defaultSettings,
      columns,
      data,
      onRowSelect,
      ...props
    },
    ref
  ) => {
    const [filterInput, setFilterInput] = useState('')
    const memoized = useMemo(() => columns, [])

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      setFilter,
    } = useTable(
      {
        columns: memoized,
        data,
      },
      useFilters,
      useSortBy
    )

    return (
      <Box
        ref={ref}
        as="table"
        variant={variant}
        {...getTableProps()}
        __css={{
          borderCollapse: settings.border && 'collapse',
          'th, td': {
            border: settings.border && '1px solid',
            borderColor: 'border',
          },
          'tbody tr': { cursor: onRowSelect && 'pointer' },
          'tbody tr:nth-of-type(odd)': {
            bg: settings.rowStripe && 'stripe',
          },
        }}
        {...props}>
        <Box as="thead" variant={`${variant}.head`}>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sort-desc'
                        : 'sort-asc'
                      : ''
                  }>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </Box>
        <Box as="tbody" variant={`${variant}.body`} {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row)
            return (
              <tr
                key={index}
                {...row.getRowProps()}
                tabIndex={onRowSelect && '0'}
                role={onRowSelect && 'button'}
                onClick={onRowSelect && (e => onRowSelect(row.original))}>
                {row.cells.map((cell, index) => {
                  return (
                    <Box
                      as="td"
                      variant={`${variant}.cell`}
                      key={index}
                      {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </Box>
                  )
                })}
              </tr>
            )
          })}
        </Box>
      </Box>
    )
  }
)

export default SmartTable
