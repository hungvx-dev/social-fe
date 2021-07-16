import React from 'react'
import { useDispatch } from 'react-redux'

import DataTable from 'Templates/table'

import * as types from '../store/action_types'
import { makeGetLoading, makeGetTotal, makeGetUsers } from '../store/selector'

const columns = [
  { name: 'fullName', title: 'Họ tên' },
  { name: 'username', title: 'Tên đăng nhập' },
  { name: '_role', title: 'Quyền' },
  { name: 'statusUser', title: 'Trạng thái' },
  { name: 'createdAt', title: 'Ngày tạo' },
  { name: 'blockUser', title: 'Action' },
  { name: 'detailUser', title: 'Chi tiết' },
]

function Users() {
  const dispatch = useDispatch()

  const users = makeGetUsers()
  const loading = makeGetLoading()
  const total = makeGetTotal()
  // const [selection, setSelection] = useState([])
  const fetchData = params => dispatch({ type: types.S_FETCH_USERS, payload: params })

  return (
    <>
      <h1 style={{ opacity: 0.8 }}>Quản lý Users</h1>
      <DataTable
        rows={users}
        columns={columns}
        loading={loading}
        totalCount={total}
        // sorting={[{ columnName: 'fullName', direction: 'asc' }]}
        // selection={selection}
        loadData={fetchData}
        // setSelection={setSelection}
      />
    </>
  )
}

export default Users
