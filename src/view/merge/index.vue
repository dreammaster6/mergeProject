<template>
  <mergeTable :labelList="labelList" :tableData="dataList"></mergeTable>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import mergeTable from "./table.vue";
import { Data7 } from "./data";
const labelList = ref([
  {
    label: "学校",
    prop: "school",
  },
  {
    label: "年级",
    prop: "grade",
  },
  {
    label: "班级",
    prop: "class",
  },
  {
    label: "姓名",
    prop: "name",
  },
  {
    label: '数学',
    prop: 'scoreMath',
  },
  {
    label: '语文',
    prop: 'scoreChina',
  },
  {
    label: '英语',
    prop: 'scoreEnglish',
  },
]);
const dataList = ref(Data7);
</script>
<style lang="scss" scoped>
</style>
