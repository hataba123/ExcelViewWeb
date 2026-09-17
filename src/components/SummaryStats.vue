<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
    <!-- Stat 1: Total Entries -->
    <div class="p-3.5 rounded-2xl border transition-colors flex items-center space-x-3"
      :class="[
        theme === 'dark' ? 'bg-slate-900/60 border-slate-800' :
        theme === 'sepia' ? 'bg-[#fbf7ee] border-[#dfcca9]' :
        'bg-white border-slate-200/80 shadow-sm'
      ]"
    >
      <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
        <ListOrdered class="w-5 h-5" />
      </div>
      <div class="min-w-0">
        <div class="text-xs text-slate-400 font-medium">Tổng số dòng</div>
        <div class="text-lg font-bold truncate">{{ totalRows.toLocaleString('vi-VN') }}</div>
      </div>
    </div>

    <!-- Stat 2: Total Columns -->
    <div class="p-3.5 rounded-2xl border transition-colors flex items-center space-x-3"
      :class="[
        theme === 'dark' ? 'bg-slate-900/60 border-slate-800' :
        theme === 'sepia' ? 'bg-[#fbf7ee] border-[#dfcca9]' :
        'bg-white border-slate-200/80 shadow-sm'
      ]"
    >
      <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
        <Columns3 class="w-5 h-5" />
      </div>
      <div class="min-w-0">
        <div class="text-xs text-slate-400 font-medium">Số cột thông tin</div>
        <div class="text-lg font-bold truncate">{{ totalCols }}</div>
      </div>
    </div>

    <!-- Stat 3: Estimated Reading Time -->
    <div class="p-3.5 rounded-2xl border transition-colors flex items-center space-x-3"
      :class="[
        theme === 'dark' ? 'bg-slate-900/60 border-slate-800' :
        theme === 'sepia' ? 'bg-[#fbf7ee] border-[#dfcca9]' :
        'bg-white border-slate-200/80 shadow-sm'
      ]"
    >
      <div class="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
        <Clock class="w-5 h-5" />
      </div>
      <div class="min-w-0">
        <div class="text-xs text-slate-400 font-medium">Thời gian đọc ước tính</div>
        <div class="text-lg font-bold truncate">~{{ estimatedReadMinutes }} phút</div>
      </div>
    </div>

    <!-- Stat 4: Active Sheet Info -->
    <div class="p-3.5 rounded-2xl border transition-colors flex items-center space-x-3"
      :class="[
        theme === 'dark' ? 'bg-slate-900/60 border-slate-800' :
        theme === 'sepia' ? 'bg-[#fbf7ee] border-[#dfcca9]' :
        'bg-white border-slate-200/80 shadow-sm'
      ]"
    >
      <div class="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0">
        <FileText class="w-5 h-5" />
      </div>
      <div class="min-w-0">
        <div class="text-xs text-slate-400 font-medium">Trang tính hiện tại</div>
        <div class="text-base font-bold truncate" :title="sheetName">{{ sheetName || '—' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ListOrdered, Columns3, Clock, FileText } from 'lucide-vue-next'

const props = defineProps({
  totalRows: { type: Number, default: 0 },
  totalCols: { type: Number, default: 0 },
  sheetName: { type: String, default: '' },
  rows: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] },
  theme: { type: String, default: 'light' }
})

// Estimate reading time based on total word count across cells
const estimatedReadMinutes = computed(() => {
  if (!props.rows || props.rows.length === 0) return 1
  let wordCount = 0
  const sample = props.rows.slice(0, 100)
  sample.forEach(r => {
    props.columns.forEach(c => {
      const val = r[c]
      if (typeof val === 'string') {
        wordCount += val.split(/\s+/).length
      }
    })
  })
  const avgWordsPerRow = sample.length > 0 ? wordCount / sample.length : 10
  const totalEstimatedWords = avgWordsPerRow * props.rows.length
  return Math.max(1, Math.ceil(totalEstimatedWords / 180))
})
</script>
