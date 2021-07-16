import React from 'react'
import { Table } from '@devexpress/dx-react-grid-material-ui'
import { DataTypeProvider } from '@devexpress/dx-react-grid'
import Tooltip from '@material-ui/core/Tooltip'
import { Button } from '@material-ui/core'
import { setStorage } from '@/helpers/storage'
import { useDispatch } from 'react-redux'

import * as types from '@/modules/admin/store/action_types'
import { formatDate } from '@/helpers/common'
import { makeGetMe } from '@/modules/auth/store/selector'

const classify = {
  forum: 'topics',
  blog: 'blogs',
}

function Cell(props) {
  const { column, row } = props
  const dispatch = useDispatch()
  const user = makeGetMe()
  if (column.name === 'createdAt') {
    return (
      <Table.Cell {...props}>
        <span>{formatDate(row.createdAt)}</span>
      </Table.Cell>
    )
  }

  if (column.name === 'statusReport') {
    const data = row.post || row.comment
    return (
      <Table.Cell {...props}>
        <span style={{ color: data.isBlock ? 'red' : '#48bb78' }}>{row.status}</span>
      </Table.Cell>
    )
  }

  if (column.name === 'statusUser') {
    return (
      <Table.Cell {...props}>
        <span style={{ color: row?.isBlock ? 'red' : '#48bb78' }}>{row?.isBlock ? 'Khóa' : 'Đang hoạt động'}</span>
      </Table.Cell>
    )
  }

  if (column.name === 'blockReport') {
    const data = row.post || row.comment
    return (
      <Table.Cell {...props}>
        <Button
          variant="outlined"
          size="small"
          color={data.isBlock ? 'primary' : 'secondary'}
          onClick={() => dispatch({ type: types.S_BLOCK, payload: row })}
        >
          {data.isBlock ? 'Active' : 'Block'}
        </Button>
      </Table.Cell>
    )
  }

  if (column.name === 'blockUser') {
    if (user.id === row.id) return <Table.Cell {...props} />
    return (
      <Table.Cell {...props}>
        <Button
          variant="outlined"
          size="small"
          color={row.isBlock ? 'primary' : 'secondary'}
          onClick={() => dispatch({ type: types.S_BLOCK_USER, payload: row })}
        >
          {row.isBlock ? 'Active' : 'Block'}
        </Button>
      </Table.Cell>
    )
  }

  if (column.name === 'detailUser') {
    return (
      <Table.Cell {...props}>
        <Button variant="outlined" size="small" color="primary" href={`/users/${row.id}`} target="_blank">
          View
        </Button>
      </Table.Cell>
    )
  }

  if (column.name === 'detailReport') {
    const post = row.post || row.comment.post
    console.log(post.classify)
    return (
      <Table.Cell {...props}>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          href={`/${classify[post.classify]}/posts/${post.id}`}
          target="_blank"
          onClick={() => row.comment && setStorage(row.comment.id, row.comment.id)}
        >
          View
        </Button>
      </Table.Cell>
    )
  }

  return <Table.Cell {...props} />
}

export default Cell

const TooltipFormatter = ({ value }) => (
  <Tooltip title={<span>{value}</span>}>
    <span>{value}</span>
  </Tooltip>
)

const DateFormatter = ({ value }) => value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1')

export const DateTypeProvider = props => <DataTypeProvider formatterComponent={DateFormatter} {...props} />

export const CellTooltip = ({ columns, ...rest }) => (
  <DataTypeProvider for={columns.map(({ name }) => name)} formatterComponent={TooltipFormatter} {...rest} />
)
