import * as XLSX from 'xlsx'

/**
 * Parses an Excel or CSV file into sheets with headers, rows, and smart column metadata
 * @param {File} file
 * @returns {Promise<{ fileName: string, fileSize: number, sheets: Array }>}
 */
export async function parseExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, {
          type: 'array',
          cellDates: true,
          dateNF: 'yyyy-mm-dd'
        })

        const sheets = workbook.SheetNames.map((sheetName) => {
          const worksheet = workbook.Sheets[sheetName]
          // Convert to 2D array with empty string default
          const rawData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: '',
            blankrows: false
          })

          if (!rawData || rawData.length === 0) {
            return {
              name: sheetName,
              headers: [],
              rows: [],
              columnMeta: [],
              totalRows: 0,
              totalCols: 0
            }
          }

          // First non-empty row as header
          const rawHeaders = rawData[0] || []
          const headers = rawHeaders.map((h, i) => (h !== undefined && h !== null && String(h).trim() !== '') ? String(h).trim() : `Cột ${i + 1}`)

          // Subsequent rows as data
          const dataRows = rawData.slice(1).map((row, rowIndex) => {
            const rowObj = { _id: rowIndex + 1 }
            headers.forEach((header, colIndex) => {
              const val = row[colIndex]
              rowObj[header] = val !== undefined && val !== null ? val : ''
            })
            return rowObj
          })

          // Calculate smart column metadata (type, width, hasLongContent)
          const columnMeta = analyzeColumns(headers, dataRows)

          return {
            name: sheetName,
            headers,
            rows: dataRows,
            columnMeta,
            totalRows: dataRows.length,
            totalCols: headers.length
          }
        })

        resolve({
          fileName: file.name,
          fileSize: file.size,
          sheets: sheets.filter(s => s.headers.length > 0 || s.rows.length > 0)
        })
      } catch (err) {
        console.error('Lỗi khi đọc file Excel:', err)
        reject(new Error('Không thể đọc file. Vui lòng kiểm tra lại định dạng file Excel/CSV.'))
      }
    }

    reader.onerror = () => {
      reject(new Error('Đã xảy ra lỗi trong quá trình tải tệp.'))
    }

    reader.readAsArrayBuffer(file)
  })
}

/**
 * Analyzes columns to determine data types and optimal display widths
 */
function analyzeColumns(headers, rows) {
  const sampleSize = Math.min(rows.length, 100)
  const sampleRows = rows.slice(0, sampleSize)

  return headers.map((header) => {
    let maxLength = String(header).length
    let totalLength = 0
    let numericCount = 0
    let dateCount = 0
    let urlCount = 0
    let validCellCount = 0

    sampleRows.forEach((row) => {
      const val = row[header]
      if (val !== undefined && val !== null && val !== '') {
        validCellCount++
        const strVal = String(val).trim()
        const len = strVal.length
        totalLength += len
        if (len > maxLength) maxLength = len

        // Type detection
        if (typeof val === 'number' || (!isNaN(val) && !isNaN(parseFloat(val)) && !strVal.includes('-') && !strVal.includes('/'))) {
          numericCount++
        }
        if (val instanceof Date || /^\d{4}-\d{2}-\d{2}/.test(strVal) || /^\d{1,2}\/\d{1,2}\/\d{2,4}/.test(strVal)) {
          dateCount++
        }
        if (/^https?:\/\//i.test(strVal)) {
          urlCount++
        }
      }
    })

    const avgLength = validCellCount > 0 ? totalLength / validCellCount : maxLength

    let type = 'text'
    if (validCellCount > 0) {
      if (numericCount / validCellCount > 0.7) type = 'number'
      else if (dateCount / validCellCount > 0.7) type = 'date'
      else if (urlCount / validCellCount > 0.7) type = 'url'
    }

    // Determine smart column width (in px)
    // Extra padding for comfortable reading
    let idealWidth = Math.max(120, Math.min(480, Math.max(maxLength * 11 + 36, 140)))
    if (type === 'number') {
      idealWidth = Math.max(100, Math.min(180, maxLength * 12 + 40))
    } else if (maxLength > 60) {
      idealWidth = 360 // Give generous width for learning notes/descriptions
    }

    return {
      key: header,
      label: header,
      type,
      isLongText: maxLength > 40 || avgLength > 30,
      idealWidth,
      align: type === 'number' ? 'right' : 'left'
    }
  })
}

/**
 * Export data to clean Excel file (.xlsx)
 */
export function exportToExcel(filename, sheetName, headers, rows) {
  const cleanRows = rows.map(r => {
    const obj = {}
    headers.forEach(h => {
      obj[h] = r[h]
    })
    return obj
  })

  const worksheet = XLSX.utils.json_to_sheet(cleanRows)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName || 'Data')
  XLSX.writeFile(workbook, `${filename || 'Export_Data'}.xlsx`)
}

/**
 * Format cell value based on column metadata
 */
export function formatCellValue(val, type) {
  if (val === undefined || val === null || val === '') return ''
  if (type === 'number' && typeof val === 'number') {
    return new Intl.NumberFormat('vi-VN').format(val)
  }
  if (val instanceof Date) {
    return val.toLocaleDateString('vi-VN')
  }
  return String(val)
}
