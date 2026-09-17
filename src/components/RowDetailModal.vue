<template>
  <div
    v-if="row"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm bg-slate-900/60 transition-opacity"
    @click.self="$emit('close')"
  >
    <div
      class="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl border overflow-hidden transform transition-all duration-300"
      :class="[
        theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-100' :
        theme === 'sepia' ? 'bg-[#fbf7ee] border-[#dfcca9] text-[#432f22]' :
        'bg-white border-slate-200 text-slate-800'
      ]"
    >
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b flex items-center justify-between"
        :class="[
          theme === 'dark' ? 'border-slate-800 bg-slate-800/50' :
          theme === 'sepia' ? 'border-[#ede2ce] bg-[#ede2ce]/60' :
          'border-slate-100 bg-slate-50/80'
        ]"
      >
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            #{{ currentIndex + 1 }}
          </div>
          <div>
            <h3 class="font-bold text-base">Thẻ Chi Tiết Dữ Liệu Học Tập</h3>
            <p class="text-xs text-slate-400">Dòng {{ currentIndex + 1 }} trên tổng số {{ totalRows }} dòng</p>
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <!-- Prev / Next Navigation buttons for studying -->
          <div class="flex items-center space-x-1 mr-2 border rounded-lg p-0.5"
            :class="theme === 'dark' ? 'border-slate-700' : theme === 'sepia' ? 'border-[#dfcca9]' : 'border-slate-200'"
          >
            <button
              @click="$emit('prev')"
              :disabled="currentIndex === 0"
              class="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Dòng trước (Phím mũi tên Trái)"
            >
              <ChevronLeft class="w-4 h-4" />
            </button>
            <button
              @click="$emit('next')"
              :disabled="currentIndex >= totalRows - 1"
              class="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Dòng kế tiếp (Phím mũi tên Phải)"
            >
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>

          <button
            @click="$emit('close')"
            class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Modal Body (Content Cards) -->
      <div class="p-6 overflow-y-auto space-y-4 flex-1">
        <div
          v-for="col in columns"
          :key="col"
          class="p-4 rounded-2xl border transition-all"
          :class="[
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700/80' :
            theme === 'sepia' ? 'bg-[#ede2ce]/40 border-[#dfcca9]' :
            'bg-slate-50/70 border-slate-200/80'
          ]"
        >
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs font-bold tracking-wide uppercase opacity-60">
              {{ col }}
            </span>
            <button
              v-if="row[col]"
              @click="copyText(row[col])"
              class="text-xs flex items-center space-x-1 opacity-60 hover:opacity-100 hover:text-emerald-600 transition-opacity"
              title="Sao chép nội dung"
            >
              <Copy class="w-3.5 h-3.5" />
              <span class="text-[11px]">{{ copiedKey === col ? 'Đã chép!' : 'Chép' }}</span>
            </button>
          </div>

          <div
            class="text-base font-normal leading-relaxed break-words select-text"
            :class="[
              theme === 'dark' ? 'text-slate-200' :
              theme === 'sepia' ? 'text-[#3c2a1a]' :
              'text-slate-800'
            ]"
          >
            {{ row[col] !== undefined && row[col] !== '' ? row[col] : '— (trống)' }}
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-3 border-t flex items-center justify-between text-xs text-slate-400"
        :class="theme === 'dark' ? 'border-slate-800 bg-slate-800/30' : theme === 'sepia' ? 'border-[#ede2ce] bg-[#ede2ce]/30' : 'border-slate-100 bg-slate-50/50'"
      >
        <span class="hidden sm:inline">Phím tắt: [←] [→] để chuyển thẻ, [Esc] để đóng</span>
        <button
          @click="$emit('close')"
          class="px-4 py-2 rounded-xl font-semibold text-xs ml-auto bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { X, ChevronLeft, ChevronRight, Copy } from 'lucide-vue-next'

const props = defineProps({
  row: { type: Object, default: null },
  columns: { type: Array, default: () => [] },
  currentIndex: { type: Number, default: 0 },
  totalRows: { type: Number, default: 0 },
  theme: { type: String, default: 'light' }
})

defineEmits(['close', 'prev', 'next'])

const copiedKey = ref(null)

function copyText(val) {
  navigator.clipboard.writeText(String(val))
  copiedKey.value = val
  setTimeout(() => {
    copiedKey.value = null
  }, 1500)
}
</script>
