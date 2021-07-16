import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { formatDate } from '@/helpers/common'

const role = { admin: 'Admin', user: 'Viewer' }
function DetailRow({ row }) {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Người report</TableCell>
              <TableCell>Lý do</TableCell>
              <TableCell align="center">Quyền</TableCell>
              <TableCell align="center">Ngày report</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row.reports.map(report => (
              // eslint-disable-next-line no-underscore-dangle
              <TableRow key={report._id}>
                <TableCell component="th" scope="row">
                  {report.userReport.fullName}
                </TableCell>
                <TableCell>{report.reason}</TableCell>
                <TableCell align="center">{role[report.userReport.role]}</TableCell>
                <TableCell align="center">{formatDate(report.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default DetailRow
