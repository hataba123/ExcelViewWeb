<template>
  <div class="relative flex flex-col rounded-2xl border shadow-sm overflow-hidden transition-colors"
    :class="[
      theme === 'dark' ? 'bg-slate-900 border-slate-800' :
      theme === 'sepia' ? 'bg-[#fbf7ee] border-[#dfcca9]' :
      'bg-white border-slate-200'
    ]"
  >
    <!-- Table Container with horizontal and vertical scrolling -->
    <div class="overflow-x-auto max-h-[calc(100vh-280px)] min-h-[350px]">
      <table class="w-full text-left border-collapse" :class="typographyClasses">
        <!-- Table Header (Sticky) -->
        <thead class="sticky top-0 z-20 shadow-sm transition-colors select-none"
          :class="[
            theme === 'dark' ? 'bg-slate-800/95 text-slate-200 border-b border-slate-700' :
            theme === 'sepia' ? 'bg-[#ede2ce]/95 text-[#432f22] border-b border-[#dfcca9]' :
            'bg-slate-100/95 text-slate-800 border-b border-slate-200'
          ]"
        >
          <tr>
            <!-- STT (Row Index) Header -->
            <th class="py-3 px-3 w-16 text-center font-bold text-xs uppercase tracking-wider sticky left-0 z-30"
              :class="[
                theme === 'dark' ? 'bg-slate-800' : theme === 'sepia' ? 'bg-[#ede2ce]' : 'bg-slate-100'
              ]"
            >
              #
            </th>

            <!-- Dynamic Data Columns -->
            <th
              v-for="col in displayColumns"
              :key="col"
              @click="handleSort(col)"
              class="py-3 px-4 font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors group relative"
              :style="{ minWidth: getColumnWidth(col) + 'px' }"
              :class="[
                theme === 'dark' ? 'hover:bg-slate-700/80' :
                theme === 'sepia' ? 'hover:bg-[#dfcca9]' :
                'hover:bg-slate-200/80'
              ]"
            >
              <div class="flex items-center justify-between space-x-2">
                <span class="truncate" :title="col">{{ col }}</span>
                <span class="flex items-center text-slate-400 group-hover:text-emerald-600 transition-colors">
                  <ArrowUpDown v-if="sortColumn !== col" class="w-3.5 h-3.5 opacity-40 group-hover:opacity-100" />
                  <ArrowUp v-else-if="sortDirection === 'asc'" class="w-3.5 h-3.5 text-emerald-600 font-bold" />
                  <ArrowDown v-else class="w-3.5 h-3.5 text-emerald-600 font-bold" />
                </span>
              </div>
            </th>

            <!-- Action column -->
            <th class="py-3 px-3 w-20 text-center font-bold text-xs uppercase tracking-wider">
              Chi tiết
            </th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody class="divide-y transition-colors"
          :class="[
            theme === 'dark' ? 'divide-slate-800/80' :
            theme === 'sepia' ? 'divide-[#ede2ce]' :
            'divide-slate-100'
          ]"
        >
          <tr
            v-for="(row, rowIndex) in paginatedRows"
            :key="row._id || rowIndex"
            @click="$emit('select-row', row, getGlobalRowIndex(rowIndex))"
            class="transition-colors duration-150 cursor-pointer group"
            :class="[
              rowIndex % 2 === 1
                ? (theme === 'dark' ? 'bg-slate-800/20' : theme === 'sepia' ? 'bg-[#f7f2e7]/40' : 'bg-slate-50/50')
                : 'bg-transparent',
              theme === 'dark' ? 'hover:bg-slate-800/60' :
              theme === 'sepia' ? 'hover:bg-[#ede2ce]/60' :
              'hover:bg-emerald-50/40'
            ]"
          >
            <!-- STT Cell -->
            <td class="py-3.5 px-3 text-center text-xs font-mono font-medium text-slate-400 sticky left-0 z-10 transition-colors group-hover:text-emerald-600"
              :class="[
                rowIndex % 2 === 1
                  ? (theme === 'dark' ? 'bg-slate-900' : theme === 'sepia' ? 'bg-[#fbf7ee]' : 'bg-slate-50')
                  : (theme === 'dark' ? 'bg-slate-900' : theme === 'sepia' ? 'bg-[#fbf7ee]' : 'bg-white')
              ]"
            >
              {{ getGlobalRowIndex(rowIndex) + 1 }}
            </td>

            <!-- Data Cells -->
            <td
              v-for="col in displayColumns"
              :key="col"
              class="py-3 px-4 transition-colors"
              :style="{ minWidth: getColumnWidth(col) + 'px' }"
            >
              <!-- Pill Badge for status / level tags -->
              <span
                v-if="isBadgeValue(row[col])"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                :class="getBadgeClass(row[col])"
              >
                {{ row[col] }}
              </span>

              <!-- Regular text / formatted content with optional keyword highlighting -->
              <div
                v-else
                :class="[
                  isWrapText
                    ? 'whitespace-pre-wrap break-words leading-relaxed'
                    : 'truncate max-w-md'
                ]"
                :title="row[col]"
                v-html="renderCellContent(row[col])"
              ></div>
            </td>

            <!-- Quick Action: Expand into Flashcard -->
            <td class="py-3.5 px-3 text-center" @click.stop="$emit('select-row', row, getGlobalRowIndex(rowIndex))">
              <button
                class="p-1.5 rounded-lg opacity-40 group-hover:opacity-100 hover:bg-emerald-100 dark:hover:bg-slate-700 text-emerald-600 transition-all"
                title="Xem chi tiết dạng thẻ học"
              >
                <Maximize2 class="w-4 h-4" />
              </button>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="paginatedRows.length === 0">
            <td :colspan="displayColumns.length + 2" class="py-16 text-center text-slate-400">
              <div class="flex flex-col items-center justify-center space-y-3">
                <FileQuestion class="w-12 h-12 text-slate-300 dark:text-slate-600" />
                <p class="text-base font-semibold">Không tìm thấy dữ liệu phù hợp</p>
                <p class="text-xs max-w-sm">Hãy thử tìm kiếm bằng từ khóa khác hoặc xóa bộ lọc.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer -->
    <div
      v-if="totalPages > 1"
      class="border-t px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
      :class="[
        theme === 'dark' ? 'border-slate-800 bg-slate-900 text-slate-400' :
        theme === 'sepia' ? 'border-[#dfcca9] bg-[#fbf7ee] text-[#7c5a38]' :
        'border-slate-200 bg-white text-slate-500'
      ]"
    >
      <div>
        Hiển thị từ <span class="font-bold text-emerald-600">{{ startIndex + 1 }}</span> đến
        <span class="font-bold text-emerald-600">{{ endIndex }}</span> trong tổng số
        <span class="font-bold">{{ totalRows }}</span> dòng
      </div>

      <div class="flex items-center space-x-1">
        <button
          @click="changePage(1)"
          :disabled="currentPage === 1"
          class="p-1.5 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Trang đầu"
        >
          <ChevronsLeft class="w-4 h-4" />
        </button>
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="p-1.5 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Trang trước"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>

        <span class="px-3 font-semibold">
          Trang {{ currentPage }} / {{ totalPages }}
        </span>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="p-1.5 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Trang sau"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
        <button
          @click="changePage(totalPages)"
          :disabled="currentPage === totalPages"
          class="p-1.5 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Trang cuối"
        >
          <ChevronsRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Maximize2,
  FileQuestion,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-vue-next'

const props = defineProps({
  rows: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] },
  columnMeta: { type: Array, default: () => [] },
  searchQuery: { type: String, default: '' },
  theme: { type: String, default: 'light' },
  fontSize: { type: String, default: 'base' },
  lineHeight: { type: String, default: 'normal' },
  isWrapText: { type: Boolean, default: true },
  sortColumn: { type: String, default: '' },
  sortDirection: { type: String, default: 'asc' },
  currentPage: { type: Number, default: 1 },
  pageSize: { type: Number, default: 25 }
})

const emit = defineEmits([
  'update:sortColumn',
  'update:sortDirection',
  'update:currentPage',
  'select-row'
])

const displayColumns = computed(() => props.columns)

// Smart column width calculation from metadata or fallback
function getColumnWidth(col) {
  const meta = props.columnMeta.find(m => m.key === col)
  if (meta && meta.idealWidth) {
    return meta.idealWidth
  }
  return 180
}

// Typography classes
const typographyClasses = computed(() => {
  const fontMap = {
    sm: 'text-xs',
    base: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }
  const leadingMap = {
    compact: 'leading-tight',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed'
  }
  return `${fontMap[props.fontSize] || 'text-sm'} ${leadingMap[props.lineHeight] || 'leading-normal'}`
})

// Check if a cell value represents a status or badge
function isBadgeValue(val) {
  if (!val || typeof val !== 'string') return false
  const str = val.trim()
  const badges = [
    'Xuất sắc', 'Giỏi', 'Khá', 'Trung bình',
    'Căn bản', 'Trung cấp', 'Nâng cao',
    'Đã hoàn thành', 'Hoàn thành', 'Đang học', 'Chưa học', 'Cần ôn lại',
    'Quan trọng', 'Khẩn cấp', 'Tùy chọn'
  ]
  return badges.includes(str)
}

function getBadgeClass(val) {
  const str = String(val).trim()
  if (['Xuất sắc', 'Đã hoàn thành', 'Hoàn thành'].includes(str)) {
    return props.theme === 'dark'
      ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
  }
  if (['Giỏi', 'Nâng cao', 'Quan trọng'].includes(str)) {
    return props.theme === 'dark'
      ? 'bg-indigo-950/80 border border-indigo-800 text-indigo-300'
      : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
  }
  if (['Khá', 'Trung cấp', 'Đang học'].includes(str)) {
    return props.theme === 'dark'
      ? 'bg-amber-950/80 border border-amber-800 text-amber-300'
      : 'bg-amber-100 text-amber-800 border border-amber-200'
  }
  return props.theme === 'dark'
    ? 'bg-slate-800 border border-slate-700 text-slate-300'
    : 'bg-slate-100 text-slate-700 border border-slate-200'
}

// Highlight search keyword
function renderCellContent(val) {
  if (val === undefined || val === null || val === '') return '<span class="text-slate-300 dark:text-slate-600">—</span>'
  const str = String(val)
  if (!props.searchQuery || !props.searchQuery.trim()) {
    return escapeHtml(str)
  }

  const query = props.searchQuery.trim()
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi')
  const escaped = escapeHtml(str)
  return escaped.replace(regex, '<mark class="search-highlight">$1</mark>')
}

function escapeHtml(string) {
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Sorting
function handleSort(col) {
  if (props.sortColumn === col) {
    if (props.sortDirection === 'asc') {
      emit('update:sortDirection', 'desc')
    } else {
      emit('update:sortColumn', '')
      emit('update:sortDirection', 'asc')
    }
  } else {
    emit('update:sortColumn', col)
    emit('update:sortDirection', 'asc')
  }
}

// Pagination computations
const totalRows = computed(() => props.rows.length)
const totalPages = computed(() => Math.ceil(totalRows.value / props.pageSize) || 1)
const startIndex = computed(() => (props.currentPage - 1) * props.pageSize)
const endIndex = computed(() => Math.min(startIndex.value + props.pageSize, totalRows.value))

const paginatedRows = computed(() => {
  return props.rows.slice(startIndex.value, endIndex.value)
})

function getGlobalRowIndex(localIndex) {
  return startIndex.value + localIndex
}

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page)
  }
}
</script>
