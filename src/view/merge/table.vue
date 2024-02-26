<template>
  <div>
    <el-table :data="tableData" :span-method="arraySpanMethod" border>
      <el-table-column
        width="100"
        v-for="item in labelList"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import {
  computed,
  defineProps,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { tableDataIF, labelListIF, propsIF } from "../../interface/index";
const props = defineProps<propsIF>();
let rowArr: Array<number[]> = reactive([]);
/**
 * 合并行
 * @param data 列表的每一行数据
 * @param labelList 表头数据集合
 * @returns 返回值为一个二维数组，对应每一个表格元素的rowSpan值
 */
const getRowArr = (data: Array<tableDataIF>, labelList: Array<labelListIF>) => {
  let poi: number = 0; // 游标
  let rowArr: Array<number[]> = []; // 结果数组 二维数组
  labelList.forEach((item, index) => {
    rowArr[index] = [];
    for (let i = 0; i < data.length; i++) {
      if (i == 0) {
        // 第一行作为初始数据
        rowArr[index][i] = 1;
        poi = 0;
      } else {
        // 当前行和前一行的item.prop值相同
        if (data[i][item.prop] === data[i - 1][item.prop]) {
          // 游标对应的结果数组值加1
          rowArr[index][poi] += 1;
          // 结果数组当前项为0，即rowspan为0
          rowArr[index].push(0);
        } else {
          // 当前行和前一行的item.prop值不相同
          rowArr[index].push(1);
          poi = i;
        }
      }
    }
  });
  return rowArr;
};
let columnArr: Array<number[]> = reactive([]);
/**
 * 合并列
 * @param data 列表的每一行数据
 * @param labelList 表头数据集合
 * @returns 返回值为一个二维数组，对应每一个表格元素的colSpan值
 */
const getColArr = (data: Array<tableDataIF>, labelList: Array<labelListIF>) => {
  let poi: number = 0; // 游标
  let columnArr: Array<number[]> = []; // 结果数组 二维数组
  data.forEach((item, index) => {
    columnArr[index] = [];
    for (let i = 0; i < labelList.length; i++) {
      if (i === 0) {
        columnArr[index][i] = 1;
        poi = 0;
      } else {
        // 当前列和前一列的值相同
        if (item[labelList[i].prop] === item[labelList[i - 1].prop]) {
          columnArr[index][poi] += 1;
          // 结果数组当前项为0，即colspan为0
          columnArr[index].push(0);
        } else {
          //当前列和前一列的值不同
          columnArr[index].push(1);
          poi = i;
        }
      }
    }
  });
  return columnArr;
};
/**
 * 参数
 * val: 当前行列的信息。包含当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性
 *
 *
 * 返回值
 * rowspan：一个数值。0 当前行不显示， 1 显示当前行。 N 显示从当前行到N行的合并。
 * colspan：一个数值。0 当前列不显示， 1 显示当前列。 N 显示从当前列到N列的合并。
 */
const arraySpanMethod = (val) => {
  return {
    rowspan:
      rowArr &&
      rowArr[val.columnIndex] &&
      rowArr[val.columnIndex][val.rowIndex],
    colspan:
      columnArr &&
      columnArr[val.rowIndex] &&
      columnArr[val.rowIndex][val.columnIndex],
  };
};
watch(
  () => props.tableData,
  (newVal) => {
    rowArr = getRowArr(newVal, props.labelList);
    columnArr = getColArr(newVal, props.labelList);
  },
  { deep: true, immediate: true }
);
onMounted(() => {});
</script>
<style lang="scss" scoped>
</style>
