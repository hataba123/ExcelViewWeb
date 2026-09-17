<template>
  <div class="min-h-screen flex flex-col font-sans transition-colors duration-200"
    :class="[
      theme === 'dark' ? 'bg-slate-950 text-slate-100' :
      theme === 'sepia' ? 'bg-[#f7f2e7] text-[#432f22]' :
      'bg-slate-50 text-slate-900'
    ]"
  >
    <!-- Top Header & Reading Controls -->
    <HeaderNavbar
      :theme="theme"
      :font-size="fontSize"
      :line-height="lineHeight"
      :is-wrap-text="isWrapText"
      :file-name="workbookData?.fileName || ''"
      :file-size="workbookData?.fileSize || 0"
      @update:theme="updateTheme"
      @update:font-size="updateFontSize"
      @update:line-height="updateLineHeight"
      @toggle-wrap="isWrapText = !isWrapText"
      @reset-file="resetAll"
      @open-upload="triggerOpenUpload"
      @export-excel="exportCurrentData"
    />

    <!-- Multi-Sheet Navigation Tabs (if workbook loaded) -->
    <SheetTabs
      v-if="workbookData && workbookData.sheets.length > 0"
      :sheets="workbookData.sheets"
      :current-sheet-index="currentSheetIndex"
      :theme="theme"
      @select-sheet="selectSheet"
    />

    <!-- Main Content Area -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-24 space-y-4">
        <div class="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-sm font-medium animate-pulse text-emerald-600">
          Đang phân tích cấu trúc dữ liệu và tối ưu hiển thị...
        </p>
      </div>

      <!-- Error State -->
      <div v-else-if="errorMessage" class="max-w-xl mx-auto my-12 p-6 rounded-2xl border border-red-200 bg-red-50 text-red-700 text-center space-y-3">
        <div class="font-bold text-lg">Không thể mở tệp</div>
        <p class="text-sm">{{ errorMessage }}</p>
        <button
          @click="resetAll"
          class="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-700 transition-colors"
        >
          Thử lại với tệp khác
        </button>
      </div>

      <!-- File Uploader View (Initial State) -->
      <FileUploader
        v-else-if="!workbookData"
        :theme="theme"
        @file-loaded="handleFile"
        @load-sample="loadSampleData"
      />

      <!-- Data Viewer Mode -->
      <div v-else class="space-y-4">
        <!-- Summary Insights Bar -->
        <SummaryStats
          :total-rows="currentSheet?.totalRows || 0"
          :total-cols="currentSheet?.totalCols || 0"
          :sheet-name="currentSheet?.name || ''"
          :rows="currentSheet?.rows || []"
          :columns="currentSheet?.headers || []"
          :theme="theme"
        />

        <!-- Controls: Search, Column Filter, Page Size -->
        <TableControls
          :search-query="searchQuery"
          :match-count="filteredAndSortedRows.length"
          :total-rows="currentSheet?.rows?.length || 0"
          :page-size="pageSize"
          :all-columns="currentSheet?.headers || []"
          :visible-columns="visibleColumns"
          :theme="theme"
          @update:search-query="onSearchUpdate"
          @update:page-size="pageSize = $event"
          @toggle-column="toggleColumn"
          @reset-columns="resetColumns"
        />

        <!-- The Responsive Data Table -->
        <DataTable
          :rows="filteredAndSortedRows"
          :columns="visibleColumns"
          :column-meta="currentSheet?.columnMeta || []"
          :search-query="searchQuery"
          :theme="theme"
          :font-size="fontSize"
          :line-height="lineHeight"
          :is-wrap-text="isWrapText"
          :sort-column="sortColumn"
          :sort-direction="sortDirection"
          :current-page="currentPage"
          :page-size="pageSize"
          @update:sort-column="sortColumn = $event"
          @update:sort-direction="sortDirection = $event"
          @update:currentPage="currentPage = $event"
          @select-row="openRowDetail"
        />
      </div>
    </main>

    <!-- Hidden Input for Header "Mở file" button -->
    <input
      ref="headerFileInput"
      type="file"
      accept=".xlsx, .xls, .csv"
      class="hidden"
      @change="handleHeaderFileSelect"
    />

    <!-- Row Detail Flashcard Reader Modal -->
    <RowDetailModal
      v-if="selectedRow"
      :row="selectedRow"
      :columns="currentSheet?.headers || []"
      :current-index="selectedRowIndex"
      :total-rows="filteredAndSortedRows.length"
      :theme="theme"
      @close="selectedRow = null"
      @prev="navigateRowDetail(-1)"
      @next="navigateRowDetail(1)"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import confetti from 'canvas-confetti'
import HeaderNavbar from './components/HeaderNavbar.vue'
import FileUploader from './components/FileUploader.vue'
import SheetTabs from './components/SheetTabs.vue'
import TableControls from './components/TableControls.vue'
import DataTable from './components/DataTable.vue'
import RowDetailModal from './components/RowDetailModal.vue'
import SummaryStats from './components/SummaryStats.vue'
import { parseExcelFile, exportToExcel } from './utils/excelParser'
import { sampleWorkbookData } from './utils/sampleData'

// Theme & Typography Settings
const theme = ref(localStorage.getItem('ev_theme') || 'light')
const fontSize = ref(localStorage.getItem('ev_font_size') || 'base')
const lineHeight = ref(localStorage.getItem('ev_line_height') || 'normal')
const isWrapText = ref(localStorage.getItem('ev_wrap') !== 'false')

// Workbook state
const workbookData = ref(null)
const currentSheetIndex = ref(0)
const isLoading = ref(false)
const errorMessage = ref('')
const headerFileInput = ref(null)

// Filtering & Table State
const searchQuery = ref('')
const sortColumn = ref('')
const sortDirection = ref('asc')
const currentPage = ref(1)
const pageSize = ref(25)
const visibleColumns = ref([])

// Row Detail Modal
const selectedRow = ref(null)
const selectedRowIndex = ref(0)

// Active sheet helper
const currentSheet = computed(() => {
  if (!workbookData.value || !workbookData.value.sheets) return null
  return workbookData.value.sheets[currentSheetIndex.value] || null
})

// Initialize theme in DOM
function applyTheme(newTheme) {
  document.body.classList.remove('theme-dark', 'theme-sepia')
  if (newTheme === 'dark') {
    document.body.classList.add('theme-dark')
    document.documentElement.classList.add('dark')
  } else if (newTheme === 'sepia') {
    document.body.classList.add('theme-sepia')
    document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function updateTheme(newTheme) {
  theme.value = newTheme
  localStorage.setItem('ev_theme', newTheme)
  applyTheme(newTheme)
}

function updateFontSize(size) {
  fontSize.value = size
  localStorage.setItem('ev_font_size', size)
}

function updateLineHeight(height) {
  lineHeight.value = height
  localStorage.setItem('ev_line_height', height)
}

watch(isWrapText, (val) => {
  localStorage.setItem('ev_wrap', String(val))
})

// Handle File Parsing
async function handleFile(file) {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const parsed = await parseExcelFile(file)
    workbookData.value = parsed
    currentSheetIndex.value = 0
    initSheetColumns()
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } })
  } catch (err) {
    errorMessage.value = err.message || 'Lỗi xử lý file Excel.'
  } finally {
    isLoading.value = false
  }
}

// Load Sample Study Workbook
function loadSampleData() {
  isLoading.value = true
  setTimeout(() => {
    workbookData.value = JSON.parse(JSON.stringify(sampleWorkbookData))
    currentSheetIndex.value = 0
    initSheetColumns()
    isLoading.value = false
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } })
  }, 350)
}

// Switch Active Sheet
function selectSheet(idx) {
  currentSheetIndex.value = idx
  currentPage.value = 1
  searchQuery.value = ''
  sortColumn.value = ''
  initSheetColumns()
}

// Initialize columns for current sheet
function initSheetColumns() {
  if (currentSheet.value) {
    visibleColumns.value = [...currentSheet.value.headers]
  }
}

function toggleColumn(col) {
  if (visibleColumns.value.includes(col)) {
    if (visibleColumns.value.length > 1) {
      visibleColumns.value = visibleColumns.value.filter(c => c !== col)
    }
  } else {
    visibleColumns.value.push(col)
  }
}

function resetColumns() {
  if (currentSheet.value) {
    visibleColumns.value = [...currentSheet.value.headers]
  }
}

function onSearchUpdate(val) {
  searchQuery.value = val
  currentPage.value = 1
}

// Filtered and Sorted Rows
const filteredAndSortedRows = computed(() => {
  if (!currentSheet.value || !currentSheet.value.rows) return []

  let list = [...currentSheet.value.rows]

  // Global full-text search across all fields
  if (searchQuery.value && searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(row => {
      return Object.entries(row).some(([k, v]) => {
        if (k.startsWith('_')) return false
        return String(v).toLowerCase().includes(q)
      })
    })
  }

  // Sorting
  if (sortColumn.value) {
    const col = sortColumn.value
    const dir = sortDirection.value === 'asc' ? 1 : -1
    list.sort((a, b) => {
      const valA = a[col]
      const valB = b[col]
      if (valA === valB) return 0
      if (valA === undefined || valA === null || valA === '') return 1
      if (valB === undefined || valB === null || valB === '') return -1

      // Numeric comparison
      const numA = Number(valA)
      const numB = Number(valB)
      if (!isNaN(numA) && !isNaN(numB)) {
        return (numA - numB) * dir
      }

      // String comparison
      return String(valA).localeCompare(String(valB), 'vi') * dir
    })
  }

  return list
})

// Row Detail Flashcard
function openRowDetail(row, index) {
  selectedRow.value = row
  selectedRowIndex.value = index
}

function navigateRowDetail(step) {
  const newIndex = selectedRowIndex.value + step
  if (newIndex >= 0 && newIndex < filteredAndSortedRows.value.length) {
    selectedRowIndex.value = newIndex
    selectedRow.value = filteredAndSortedRows.value[newIndex]
  }
}

// Reset / Open file dialogs
function resetAll() {
  workbookData.value = null
  selectedRow.value = null
  searchQuery.value = ''
  currentPage.value = 1
  errorMessage.value = ''
}

function triggerOpenUpload() {
  headerFileInput.value?.click()
}

function handleHeaderFileSelect(e) {
  const files = e.target.files
  if (files && files.length > 0) {
    handleFile(files[0])
    e.target.value = ''
  }
}

// Export data to clean Excel file
function exportCurrentData() {
  if (!currentSheet.value) return
  const filename = workbookData.value?.fileName?.replace(/\.[^/.]+$/, '') || 'Data_Study'
  exportToExcel(
    `${filename}_${currentSheet.value.name}`,
    currentSheet.value.name,
    visibleColumns.value,
    filteredAndSortedRows.value
  )
}

// Keyboard shortcut listener
function handleKeyDown(e) {
  if (selectedRow.value) {
    if (e.key === 'Escape') {
      selectedRow.value = null
    } else if (e.key === 'ArrowLeft') {
      navigateRowDetail(-1)
    } else if (e.key === 'ArrowRight') {
      navigateRowDetail(1)
    }
  }
}

onMounted(() => {
  applyTheme(theme.value)
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>
