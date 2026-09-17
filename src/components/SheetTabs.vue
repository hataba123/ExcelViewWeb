<template>
  <div v-if="sheets.length > 0" class="border-b transition-colors"
    :class="[
      theme === 'dark' ? 'border-slate-800 bg-slate-900/50' :
      theme === 'sepia' ? 'border-[#dfcca9] bg-[#f7f2e7]' :
      'border-slate-200 bg-slate-100/70'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center space-x-2 py-2 overflow-x-auto no-scrollbar">
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1 pr-2 flex items-center space-x-1 shrink-0">
          <Layers class="w-3.5 h-3.5" />
          <span>Trang tính:</span>
        </span>

        <button
          v-for="(sheet, idx) in sheets"
          :key="sheet.name"
          @click="$emit('select-sheet', idx)"
          class="group flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border"
          :class="[
            currentSheetIndex === idx
              ? (theme === 'dark'
                  ? 'bg-slate-800 border-emerald-500/80 text-emerald-400 shadow-sm'
                  : theme === 'sepia'
                    ? 'bg-[#dfcca9] border-[#ba945c] text-[#432f22] shadow-sm'
                    : 'bg-white border-emerald-500 text-emerald-700 shadow-sm')
              : (theme === 'dark'
                  ? 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  : theme === 'sepia'
                    ? 'border-transparent text-[#7c5a38] hover:text-[#432f22] hover:bg-[#ede2ce]'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/60')
          ]"
        >
          <TableProperties class="w-3.5 h-3.5 opacity-80" />
          <span>{{ sheet.name }}</span>
          <span
            class="px-1.5 py-0.5 rounded-full text-[10px] font-mono tracking-tight transition-colors"
            :class="[
              currentSheetIndex === idx
                ? (theme === 'dark' ? 'bg-emerald-950 text-emerald-300' :
                   theme === 'sepia' ? 'bg-[#ba945c] text-white' :
                   'bg-emerald-100 text-emerald-800')
                : (theme === 'dark' ? 'bg-slate-800 text-slate-400' :
                   theme === 'sepia' ? 'bg-[#ede2ce] text-[#7c5a38]' :
                   'bg-slate-200/80 text-slate-600')
            ]"
          >
            {{ sheet.totalRows }} dòng
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Layers, TableProperties } from 'lucide-vue-next'

defineProps({
  sheets: { type: Array, default: () => [] },
  currentSheetIndex: { type: Number, default: 0 },
  theme: { type: String, default: 'light' }
})

defineEmits(['select-sheet'])
</script>
