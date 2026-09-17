<template>
  <header class="border-b transition-colors duration-200 sticky top-0 z-30 backdrop-blur-md"
    :class="[
      theme === 'dark' ? 'bg-slate-900/90 border-slate-800 text-slate-100' :
      theme === 'sepia' ? 'bg-[#f7f2e7]/90 border-[#ede2ce] text-[#432f22]' :
      'bg-white/90 border-slate-200 text-slate-900'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 gap-4">
        <!-- Brand Logo & Title -->
        <div class="flex items-center space-x-3 cursor-pointer select-none" @click="$emit('reset-file')">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/20 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-xl">
            <BookOpen class="w-5 h-5" />
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <span class="font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
                ExcelView
              </span>
              <span class="text-xs px-2 py-0.5 rounded-full font-semibold border"
                :class="[
                  theme === 'dark' ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300' :
                  theme === 'sepia' ? 'bg-amber-100 border-amber-300 text-amber-900' :
                  'bg-emerald-50 border-emerald-200 text-emerald-700'
                ]"
              >
                Học Tập & Nghiên Cứu
              </span>
            </div>
            <p class="text-xs text-slate-400 dark:text-slate-400 -mt-0.5 hidden sm:block">
              Tối ưu chữ đọc • Tự động co giãn • Giao diện êm mắt
            </p>
          </div>
        </div>

        <!-- File Active Pill (if loaded) -->
        <div v-if="fileName" class="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs"
          :class="[
            theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-300' :
            theme === 'sepia' ? 'bg-[#ede2ce]/60 border-[#dfcca9] text-[#5c422c]' :
            'bg-slate-100 border-slate-200 text-slate-700'
          ]"
        >
          <FileSpreadsheet class="w-4 h-4 text-emerald-500" />
          <span class="font-medium truncate max-w-[200px]" :title="fileName">{{ fileName }}</span>
          <span class="text-slate-400">({{ formattedFileSize }})</span>
        </div>

        <!-- Reading & Display Controls Bar -->
        <div class="flex items-center space-x-2 sm:space-x-3">
          <!-- Text Size Toggle -->
          <div class="flex items-center p-0.5 rounded-lg border text-xs"
            :class="[
              theme === 'dark' ? 'bg-slate-800/80 border-slate-700' :
              theme === 'sepia' ? 'bg-[#ede2ce]/80 border-[#dfcca9]' :
              'bg-slate-100 border-slate-200'
            ]"
            title="Kích thước chữ đọc"
          >
            <button
              v-for="size in fontSizes"
              :key="size.value"
              @click="$emit('update:fontSize', size.value)"
              class="px-2 py-1 rounded transition-all font-medium text-xs"
              :class="[
                fontSize === size.value
                  ? (theme === 'dark' ? 'bg-emerald-600 text-white shadow-sm' :
                     theme === 'sepia' ? 'bg-[#ba945c] text-white shadow-sm' :
                     'bg-white text-emerald-700 shadow-sm')
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              ]"
            >
              {{ size.label }}
            </button>
          </div>

          <!-- Line Height Toggle (Compact / Standard / Relaxed) -->
          <div class="hidden lg:flex items-center p-0.5 rounded-lg border text-xs"
            :class="[
              theme === 'dark' ? 'bg-slate-800/80 border-slate-700' :
              theme === 'sepia' ? 'bg-[#ede2ce]/80 border-[#dfcca9]' :
              'bg-slate-100 border-slate-200'
            ]"
            title="Khoảng cách dòng đọc"
          >
            <button
              @click="$emit('update:lineHeight', 'compact')"
              class="px-2 py-1 rounded transition-all"
              :class="lineHeight === 'compact' ? 'bg-indigo-600 text-white shadow-sm font-semibold' : 'text-slate-500'"
              title="Dòng gọn"
            >
              Gọn
            </button>
            <button
              @click="$emit('update:lineHeight', 'normal')"
              class="px-2 py-1 rounded transition-all"
              :class="lineHeight === 'normal' ? 'bg-indigo-600 text-white shadow-sm font-semibold' : 'text-slate-500'"
              title="Dòng tiêu chuẩn"
            >
              Chuẩn
            </button>
            <button
              @click="$emit('update:lineHeight', 'relaxed')"
              class="px-2 py-1 rounded transition-all"
              :class="lineHeight === 'relaxed' ? 'bg-indigo-600 text-white shadow-sm font-semibold' : 'text-slate-500'"
              title="Dòng thoáng (đọc bài học thoải mái)"
            >
              Thoáng
            </button>
          </div>

          <!-- Text Wrap Mode Toggle -->
          <button
            @click="$emit('toggle-wrap')"
            class="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors"
            :class="[
              isWrapText
                ? (theme === 'dark' ? 'bg-emerald-950/70 border-emerald-700 text-emerald-300' :
                   theme === 'sepia' ? 'bg-amber-100 border-amber-400 text-amber-900' :
                   'bg-emerald-50 border-emerald-300 text-emerald-700')
                : (theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200' :
                   theme === 'sepia' ? 'bg-[#ede2ce] border-[#dfcca9] text-[#7c5a38]' :
                   'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200')
            ]"
            :title="isWrapText ? 'Đang bật tự động xuống dòng để đọc hết chữ' : 'Đang rút gọn 1 dòng'"
          >
            <WrapText class="w-3.5 h-3.5" />
            <span>{{ isWrapText ? 'Xuống dòng' : 'Cắt dòng' }}</span>
          </button>

          <!-- Theme Switcher (Light / Sepia / Dark) -->
          <div class="flex items-center p-0.5 rounded-lg border text-xs"
            :class="[
              theme === 'dark' ? 'bg-slate-800/80 border-slate-700' :
              theme === 'sepia' ? 'bg-[#ede2ce]/80 border-[#dfcca9]' :
              'bg-slate-100 border-slate-200'
            ]"
          >
            <button
              @click="$emit('update:theme', 'light')"
              class="p-1.5 rounded transition-all"
              :class="theme === 'light' ? 'bg-white text-amber-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
              title="Giao diện Sáng tinh tươm"
            >
              <Sun class="w-4 h-4" />
            </button>
            <button
              @click="$emit('update:theme', 'sepia')"
              class="p-1.5 rounded transition-all"
              :class="theme === 'sepia' ? 'bg-[#ba945c] text-white shadow-sm' : 'text-[#7c5a38] hover:text-[#432f22]'"
              title="Giao diện Ấm áp êm dịu (Bảo vệ mắt để học lâu)"
            >
              <Eye class="w-4 h-4" />
            </button>
            <button
              @click="$emit('update:theme', 'dark')"
              class="p-1.5 rounded transition-all"
              :class="theme === 'dark' ? 'bg-slate-700 text-indigo-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'"
              title="Giao diện Đêm dịu mắt"
            >
              <Moon class="w-4 h-4" />
            </button>
          </div>

          <!-- Upload Another File or Load Sample -->
          <div v-if="fileName" class="flex items-center space-x-2">
            <button
              @click="$emit('open-upload')"
              class="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
              :class="[
                theme === 'dark' ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200' :
                theme === 'sepia' ? 'bg-[#ede2ce] border-[#dfcca9] hover:bg-[#dfcca9] text-[#432f22]' :
                'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm'
              ]"
              title="Mở file Excel khác"
            >
              <Upload class="w-3.5 h-3.5" />
              <span class="hidden sm:inline">Mở file</span>
            </button>
            <button
              @click="$emit('export-excel')"
              class="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
              title="Xuất file Excel này"
            >
              <Download class="w-3.5 h-3.5" />
              <span class="hidden sm:inline">Xuất Excel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import {
  BookOpen,
  FileSpreadsheet,
  Sun,
  Moon,
  Eye,
  WrapText,
  Upload,
  Download
} from 'lucide-vue-next'

const props = defineProps({
  theme: { type: String, default: 'light' },
  fontSize: { type: String, default: 'base' },
  lineHeight: { type: String, default: 'normal' },
  isWrapText: { type: Boolean, default: true },
  fileName: { type: String, default: '' },
  fileSize: { type: Number, default: 0 }
})

defineEmits([
  'update:theme',
  'update:fontSize',
  'update:lineHeight',
  'toggle-wrap',
  'reset-file',
  'open-upload',
  'export-excel'
])

const fontSizes = [
  { label: 'A-', value: 'sm' },
  { label: 'A', value: 'base' },
  { label: 'A+', value: 'lg' },
  { label: 'A++', value: 'xl' }
]

const formattedFileSize = computed(() => {
  if (!props.fileSize) return ''
  if (props.fileSize < 1024) return `${props.fileSize} B`
  if (props.fileSize < 1024 * 1024) return `${(props.fileSize / 1024).toFixed(1)} KB`
  return `${(props.fileSize / (1024 * 1024)).toFixed(1)} MB`
})
</script>
