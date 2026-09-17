<template>
  <div class="max-w-4xl mx-auto px-4 py-8 sm:py-12">
    <!-- Hero Header -->
    <div class="text-center mb-8 sm:mb-10">
      <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 border"
        :class="[
          theme === 'dark' ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300' :
          theme === 'sepia' ? 'bg-[#ede2ce] border-[#dfcca9] text-[#5c422c]' :
          'bg-emerald-50 border-emerald-200 text-emerald-700'
        ]"
      >
        <Sparkles class="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
        <span>Trình Đọc Excel Đột Phá Cho Học Tập & Nghiên Cứu</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
        Biến Bảng Tính Excel Thô Kệch Thành
        <span class="bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-600 bg-clip-text text-transparent block mt-1">
          Giao Diện Đọc & Học Tập Cực Đẹp
        </span>
      </h1>
      <p class="text-base sm:text-lg max-w-2xl mx-auto"
        :class="theme === 'dark' ? 'text-slate-400' : theme === 'sepia' ? 'text-[#7c5a38]' : 'text-slate-600'"
      >
        Tự động co giãn kích thước cột theo nội dung, ngắt dòng ghi chú mượt mà, tối ưu font chữ tiếng Việt, hỗ trợ chế độ đọc êm dịu bảo vệ mắt.
      </p>
    </div>

    <!-- Drag & Drop Card -->
    <div
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      class="relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 shadow-xl"
      :class="[
        isDragging
          ? 'border-emerald-500 bg-emerald-500/10 scale-[1.01]'
          : (theme === 'dark'
              ? 'border-slate-700 bg-slate-900/60 hover:border-slate-600'
              : theme === 'sepia'
                ? 'border-[#dfcca9] bg-[#fbf7ee] hover:border-[#ba945c]'
                : 'border-slate-300 bg-white hover:border-emerald-400')
      ]"
    >
      <input
        ref="fileInput"
        type="file"
        accept=".xlsx, .xls, .csv"
        class="hidden"
        @change="handleFileSelect"
      />

      <div class="flex flex-col items-center">
        <!-- Floating Animated Icon -->
        <div class="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform group-hover:scale-110"
          :class="[
            theme === 'dark' ? 'bg-gradient-to-br from-emerald-600 to-teal-800 text-white' :
            theme === 'sepia' ? 'bg-gradient-to-br from-[#ba945c] to-[#9d7647] text-white' :
            'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/25'
          ]"
        >
          <FileSpreadsheet class="w-10 h-10" />
        </div>

        <h3 class="text-xl sm:text-2xl font-bold mb-2">
          Kéo thả tệp Excel vào đây
        </h3>
        <p class="text-sm mb-6"
          :class="theme === 'dark' ? 'text-slate-400' : theme === 'sepia' ? 'text-[#7c5a38]' : 'text-slate-500'"
        >
          Hỗ trợ định dạng <span class="font-semibold text-emerald-600">.xlsx</span>, <span class="font-semibold text-teal-600">.xls</span>, <span class="font-semibold text-indigo-600">.csv</span> (Dữ liệu xử lý an toàn 100% trên máy bạn)
        </p>

        <!-- Actions Buttons Group -->
        <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-center">
          <button
            @click="triggerFileInput"
            class="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/30 transition-all transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <Upload class="w-4 h-4" />
            <span>Chọn file từ máy tính</span>
          </button>

          <button
            @click="$emit('load-sample')"
            class="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold border transition-all transform active:scale-95 flex items-center justify-center space-x-2"
            :class="[
              theme === 'dark' ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-emerald-400' :
              theme === 'sepia' ? 'border-[#dfcca9] bg-[#ede2ce] hover:bg-[#dfcca9] text-[#432f22]' :
              'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-800'
            ]"
          >
            <BookOpenCheck class="w-4 h-4 text-emerald-600" />
            <span>Xem dữ liệu học tập mẫu</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Feature Grid for Learning Excel Viewer -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
      <div class="p-5 rounded-2xl border transition-all"
        :class="[
          theme === 'dark' ? 'bg-slate-900/40 border-slate-800' :
          theme === 'sepia' ? 'bg-[#ede2ce]/40 border-[#dfcca9]' :
          'bg-white border-slate-200/80 shadow-sm'
        ]"
      >
        <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-4">
          <Type class="w-5 h-5" />
        </div>
        <h4 class="font-bold text-base mb-1">Chữ Đọc Rõ Nét & Đẹp Mắt</h4>
        <p class="text-xs leading-relaxed"
          :class="theme === 'dark' ? 'text-slate-400' : theme === 'sepia' ? 'text-[#7c5a38]' : 'text-slate-500'"
        >
          Sử dụng font chữ Be Vietnam Pro hỗ trợ dấu tiếng Việt hoàn hảo, tùy chỉnh kích thước chữ và khoảng cách dòng tùy ý.
        </p>
      </div>

      <div class="p-5 rounded-2xl border transition-all"
        :class="[
          theme === 'dark' ? 'bg-slate-900/40 border-slate-800' :
          theme === 'sepia' ? 'bg-[#ede2ce]/40 border-[#dfcca9]' :
          'bg-white border-slate-200/80 shadow-sm'
        ]"
      >
        <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
          <Maximize2 class="w-5 h-5" />
        </div>
        <h4 class="font-bold text-base mb-1">Co Giãn Cột Tự Động</h4>
        <p class="text-xs leading-relaxed"
          :class="theme === 'dark' ? 'text-slate-400' : theme === 'sepia' ? 'text-[#7c5a38]' : 'text-slate-500'"
        >
          Tự động đo độ dài từng cột dữ liệu, dành không gian rộng rãi cho các cột ghi chú, định nghĩa hay ví dụ học tập.
        </p>
      </div>

      <div class="p-5 rounded-2xl border transition-all"
        :class="[
          theme === 'dark' ? 'bg-slate-900/40 border-slate-800' :
          theme === 'sepia' ? 'bg-[#ede2ce]/40 border-[#dfcca9]' :
          'bg-white border-slate-200/80 shadow-sm'
        ]"
      >
        <div class="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
          <Eye class="w-5 h-5" />
        </div>
        <h4 class="font-bold text-base mb-1">Chế Độ Bảo Vệ Mắt (Sepia)</h4>
        <p class="text-xs leading-relaxed"
          :class="theme === 'dark' ? 'text-slate-400' : theme === 'sepia' ? 'text-[#7c5a38]' : 'text-slate-500'"
        >
          Tông màu vàng ấm dịu như trang sách thật, giảm ánh sáng xanh gây mỏi mắt khi đọc tài liệu học tập trong thời gian dài.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  FileSpreadsheet,
  Upload,
  BookOpenCheck,
  Sparkles,
  Type,
  Maximize2,
  Eye
} from 'lucide-vue-next'

defineProps({
  theme: { type: String, default: 'light' }
})

const emit = defineEmits(['file-loaded', 'load-sample'])

const fileInput = ref(null)
const isDragging = ref(false)

function triggerFileInput() {
  fileInput.value?.click()
}

function handleFileSelect(e) {
  const files = e.target.files
  if (files && files.length > 0) {
    emit('file-loaded', files[0])
  }
}

function handleDrop(e) {
  isDragging.value = false
  const files = e.dataTransfer.files
  if (files && files.length > 0) {
    emit('file-loaded', files[0])
  }
}
</script>
