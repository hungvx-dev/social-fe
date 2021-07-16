import { ReportAPI } from '@/services'
import React from 'react'
import { useDispatch } from 'react-redux'

import DataTable from 'Templates/table'

import * as types from '../store/action_types'
import { makeGetLoading, makeGetReports, makeGetTotal } from '../store/selector'

const columns = [
  { name: '_type', title: 'Loại' },
  { name: 'author', title: 'Tác giả' },
  { name: 'numberReports', title: 'Số report' },
  { name: 'statusReport', title: 'Trạng thái' },
  { name: 'blockReport', title: 'Action' },
  { name: 'detailReport', title: 'Chi tiết' },
  // { name: 'reason', title: 'Lý do' },
]

function Reports() {
  const dispatch = useDispatch()

  const reports = makeGetReports()
  const loading = makeGetLoading()
  const total = makeGetTotal()
  // const [selection, setSelection] = useState([])

  const fetchData = params => dispatch({ type: types.S_FETCH_REPORTS, payload: params })

  const handleDelete = async ids => {
    try {
      await ReportAPI.destroyMany(ids)
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <>
      <h1 style={{ opacity: 0.8 }}>Quản lý Reports</h1>
      <DataTable
        isSelect
        isDetailRow
        rows={reports}
        columns={columns}
        loading={loading}
        totalCount={total}
        // selection={selection}
        loadData={fetchData}
        onDelete={handleDelete}
        // setSelection={setSelection}
      />
    </>
  )
}

export default Reports
