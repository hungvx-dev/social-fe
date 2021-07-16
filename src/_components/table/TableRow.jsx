import React from 'react'
import { Table } from '@devexpress/dx-react-grid-material-ui'

const style = {
  comment: { backgroundColor: '#dcf4ff' },
  post: { backgroundColor: '#d2ecd3' },
  admin: { backgroundColor: '#d2ecd3' },
}

function TableRow({ row, ...restProps }) {
  if (row.role) row.type = row.role
  return (
    <Table.Row
      {...restProps}
      // eslint-disable-next-line no-alert
      // onClick={() => console.log(row)}
      style={{
        // cursor: 'pointer',
        ...style[row.type],
      }}
    />
  )
}

export default TableRow
