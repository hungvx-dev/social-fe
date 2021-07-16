import React, { useState } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { toast } from 'react-toastify'
import FormControl from '@material-ui/core/FormControl'
import { UserAPI } from '@/services'
import { makeGetDataReport } from '@/modules/home/store/selector'

const reports = [
  { value: '1', label: 'Nhảm nhí hoặc không đáng tin' },
  { value: '2', label: 'Spam hoặc quảng cáo' },
  { value: '3', label: 'Vi phạm nội quy' },
  { value: '4', label: 'Tuyên truyền xấu' },
  { value: '5', label: 'Chửi bới hoặc xúc phạm' },
  { value: '6', label: 'Khiêu dâm hoặc bạo lực' },
  { value: '7', label: 'Lý do khác' },
]

function Report({ setIsShowModal }) {
  const [value, setValue] = useState(0)
  const [reasonText, setReasonText] = useState('')
  const dataReport = makeGetDataReport()

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleReport = async () => {
    try {
      const reason = value === '7' ? reasonText : reports.find(r => r.value === value).label

      const data = {
        reason,
        postId: dataReport.type === 'post' ? dataReport.id : null,
        commentId: dataReport.type === 'comment' ? dataReport.id : null,
        type: dataReport.type,
        value: +value,
      }
      await UserAPI.reportPost(data)
      toast.success('Báo cáo thành công')
    } catch (error) {
      throw new Error(error)
    } finally {
      setIsShowModal()
    }
  }

  return (
    <div className="py-3 px-5">
      <div>
        <FormControl component="fieldset">
          <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
            {reports.map((report, i) => (
              <FormControlLabel key={i} value={report.value} control={<Radio />} label={report.label} />
            ))}
          </RadioGroup>
        </FormControl>
        {/* <div className="flex items-center py-1 px-2 rounded hover:bg-gray-200 cursor-pointer">
              <i className="far fa-circle" />
              <div className="ml-3">Nhảm nhí hoặc không đáng tin</div>
            </div>
          */}
        {/* <div className="flex items-center py-1 px-2 rounded hover:bg-gray-200 cursor-pointer">
          <i className="far fa-circle" />
          <div className="ml-3">Lý do khác</div>
        </div> */}
        <div className="ml-6">
          <textarea
            className="w-full p-1 border border-gray-400 rounded outline-none"
            disabled={value !== '7'}
            onChange={e => setReasonText(e.target.value)}
            placeholder="Vui lòng nhập lý do báo xấu..."
            value={reasonText}
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="px-3 py-1 rounded text-white text-sm font-medium bg-gray-500 hover:bg-gray-600 focus:outline-none font-sans mr-3"
          onClick={setIsShowModal}
        >
          Hủy
        </button>
        <button
          type="button"
          disabled={value === 0}
          className="px-3 py-1 rounded text-white text-sm font-medium bg-green-500 hover:bg-green-700 focus:outline-none font-sans"
          onClick={handleReport}
        >
          Báo xấu
        </button>
      </div>
    </div>
  )
}

export default Report
