import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import {
  SelectionState,
  PagingState,
  CustomPaging,
  IntegratedSelection,
  SortingState,
  SearchState,
  IntegratedSorting,
  RowDetailState,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  Toolbar,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
  SearchPanel,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui'
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { parseQuery, queryWith } from '@/helpers/api'
import { useDebounce } from '@/hooks/useDebounce'

import Cell, { CellTooltip } from './Cell'
import TableRow from './TableRow'
import DetailRow from './DetailRow'

const getRowId = row => row.id

export default props => {
  const { rows, columns, totalCount, styleColumn, onDelete, sorting, loading, loadData, isDetailRow, isSelect } = props
  const location = useLocation()
  const history = useHistory()
  const params = parseQuery(location.search)

  const [pageSizes] = useState([5, 10, 20, 50, 100])
  const [searchValue, setSearchState] = useState(params.q)
  const debouncedValue = useDebounce(searchValue, 700)
  const [selection, setSelection] = useState([])
  const [sort, setSort] = useState(sorting)

  useEffect(() => {
    loadData(params)
  }, [location.search])

  useEffect(() => {
    params.q = debouncedValue
    params.page = 1
    const queryStr = queryWith(params)
    history.push(`?${queryStr}`)
  }, [debouncedValue])

  const handlePageSizeChange = limit => {
    const page = (+params.page * params.limit) / limit
    if (limit > params.limit) {
      params.page = Math.ceil(page)
    } else if (totalCount < +params.page * params.limit) {
      params.page = Math.floor(totalCount / limit) || 1
    } else {
      params.page = Math.floor(page)
    }

    params.limit = limit

    const queryStr = queryWith(params)
    history.push(`?${queryStr}`)
  }

  const handlePageChange = page => {
    params.page = page + 1
    const queryStr = queryWith(params)
    history.push(`?${queryStr}`)
  }

  const handleDelete = async () => {
    onDelete && onDelete(selection)
    loadData(params)
    setSelection([])
  }

  return (
    <Paper style={{ position: 'relative' }}>
      {isSelect && (
        <S_Selection isVisible={onDelete && selection.length > 0}>
          <span>{selection.length} lựa chọn</span>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon color="secondary" />
          </IconButton>
        </S_Selection>
      )}
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <SearchState value={searchValue} onValueChange={setSearchState} />
        <SortingState
          sorting={sort || [{ columnName: 'updatedAt', direction: 'desc' }]}
          // defaultSorting={[{ columnName: 'updatedAt', direction: 'desc' }]}
          onSortingChange={setSort}
        />
        {isSelect && <SelectionState selection={selection} onSelectionChange={setSelection} />}
        <PagingState
          defaultCurrentPage={0}
          pageSize={+params.limit}
          currentPage={+params.page - 1}
          onPageSizeChange={handlePageSizeChange}
          onCurrentPageChange={handlePageChange}
        />

        <CustomPaging totalCount={totalCount} />
        <IntegratedSorting />
        {isSelect && <IntegratedSelection />}
        {/* <IntegratedFiltering /> */}
        {/* <DateTypeProvider for={['createdAt', 'updatedAt']} /> */}
        <CellTooltip columns={columns} />

        {isDetailRow && <RowDetailState />}
        <Table cellComponent={Cell} rowComponent={TableRow} columnExtensions={styleColumn} />
        <TableHeaderRow showSortingControls />

        {isDetailRow && <TableRowDetail contentComponent={DetailRow} />}
        <Toolbar />
        <SearchPanel />
        {isSelect && <TableSelection showSelectAll />}
        <PagingPanel pageSizes={pageSizes} />
      </Grid>
      {loading && (
        <S_Loading>
          <CircularProgress />
        </S_Loading>
      )}
    </Paper>
  )
}

const S_Loading = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff80;
`

const S_Selection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 25px;
  color: red;
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
`
