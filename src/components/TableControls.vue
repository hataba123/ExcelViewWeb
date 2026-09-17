<template>
  <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 py-3">
    <!-- Search Bar -->
    <div class="relative flex-1 max-w-md">
      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search class="w-4 h-4" />
      </div>
      <input
        type="text"
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        placeholder="Tìm nhanh từ khóa, bài học, thuật ngữ..."
        class="w-full pl-10 pr-9 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 transition-all"
        :class="[
          theme === 'dark'
            ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 focus:ring-emerald-500 focus:border-emerald-500'
            : theme === 'sepia'
              ? 'bg-[#fbf7ee] border-[#dfcca9] text-[#432f22] placeholder-[#9d7647] focus:ring-[#ba945c] focus:border-[#ba945c]'
              : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm'
        ]"
      />
      <button
        v-if="searchQuery"
        @click="$emit('update:searchQuery', '')"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
      >
        <X class="w-4 h-4" />
      </button>
    </div>

    <!-- Match Counter & Options -->
    <div class="flex items-center space-x-2 sm:space-x-3 text-xs justify-between sm:justify-end">
      <!-- Search counter badge -->
      <div v-if="searchQuery" class="px-2.5 py-1 rounded-lg font-medium border"
        :class="[
          matchCount > 0
            ? (theme === 'dark' ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300' :
               theme === 'sepia' ? 'bg-amber-100 border-amber-300 text-amber-900' :
               'bg-emerald-50 border-emerald-200 text-emerald-700')
            : 'bg-red-50 border-red-200 text-red-600 dark:bg-red-950/50 dark:border-red-800 dark:text-red-300'
        ]"
      >
        Tìm thấy {{ matchCount }} / {{ totalRows }} dòng
      </div>

      <!-- Page Size Selector -->
      <div class="flex items-center space-x-1.5">
        <span class="text-slate-400 hidden md:inline">Hiển thị:</span>
        <select
          :value="pageSize"
          @change="$emit('update:pageSize', Number($event.target.value))"
          class="px-2.5 py-1.5 rounded-lg border text-xs font-medium focus:outline-none cursor-pointer"
          :class="[
            theme === 'dark'
              ? 'bg-slate-800 border-slate-700 text-slate-200'
              : theme === 'sepia'
                ? 'bg-[#ede2ce] border-[#dfcca9] text-[#432f22]'
                : 'bg-white border-slate-200 text-slate-700 shadow-sm'
          ]"
        >
          <option :value="10">10 dòng</option>
          <option :value="25">25 dòng</option>
          <option :value="50">50 dòng</option>
          <option :value="100">100 dòng</option>
          <option :value="99999">Tất cả</option>
        </select>
      </div>

      <!-- Column Visibility Dropdown Toggle -->
      <div class="relative">
        <button
          @click="showColumnMenu = !showColumnMenu"
          class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors"
          :class="[
            theme === 'dark'
              ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
              : theme === 'sepia'
                ? 'bg-[#ede2ce] border-[#dfcca9] text-[#432f22] hover:bg-[#dfcca9]'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
          ]"
        >
          <SlidersHorizontal class="w-3.5 h-3.5" />
          <span>Ẩn / Hiện cột</span>
        </button>

        <!-- Column Dropdown Menu -->
        <div
          v-if="showColumnMenu"
          class="absolute right-0 mt-2 w-64 rounded-2xl border shadow-xl z-40 p-3"
          :class="[
            theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-200' :
            theme === 'sepia' ? 'bg-[#fbf7ee] border-[#dfcca9] text-[#432f22]' :
            'bg-white border-slate-200 text-slate-800'
          ]"
        >
          <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
            <span>Tùy chỉnh cột hiển thị</span>
            <button
              @click="$emit('reset-columns')"
              class="text-emerald-600 hover:underline font-normal text-[11px]"
            >
              Hiện tất cả
            </button>
          </div>
          <div class="max-h-60 overflow-y-auto space-y-1.5 text-xs">
            <label
              v-for="col in allColumns"
              :key="col"
              class="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                :checked="visibleColumns.includes(col)"
                @change="$emit('toggle-column', col)"
                class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
              />
              <span class="truncate" :title="col">{{ col }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search, X, SlidersHorizontal } from 'lucide-vue-next'

defineProps({
  searchQuery: { type: String, default: '' },
  matchCount: { type: Number, default: 0 },
  totalRows: { type: Number, default: 0 },
  pageSize: { type: Number, default: 25 },
  allColumns: { type: Array, default: () => [] },
  visibleColumns: { type: Array, default: () => [] },
  theme: { type: String, default: 'light' }
})

defineEmits([
  'update:searchQuery',
  'update:pageSize',
  'toggle-column',
  'reset-columns'
])

const showColumnMenu = ref(false)
</script>
