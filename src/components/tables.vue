<template>
  <div class="tablePage">
    <!-- 表格-->
    <v-table
      is-horizontal-resize
      column-width-drag
      :columns="tableConfig.columns"
      :table-data="tData"
      :paging-index="(pageIndex-1)*pageSize"
      row-hover-color="#eee"
      row-click-color="#edf7ff">
    </v-table>
    <!-- 分页-->
    <v-pagination
      @page-change="pageChange"
      @page-size-change="pageSizeChange"
      :total="total"
      :page-size="pageSize"
      :page-list=[10,20,30]
      :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']">
    </v-pagination>
  </div>
</template>
<script>
export default {
  name: 'tables',
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      total: '',
      tdStyle: 'background-color:yellow;border:1px solid green;height:40px',
      tableConfig: {
        tableData: [],
        columns: []
      },
      myList1: this.tList,
      myData1: this.tData
    }
  },
  created () {
    // this.getTableList()
    this.getTableData()
  },
  methods: {
    getTableData () {
      this.tableConfig.columns = this.myList1
      this.tableConfig.tableData = this.tData.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      )
      this.total = this.tData.length
    },
    pageChange (pageIndex) {
      this.pageIndex = pageIndex
      this.getTableData()
    },
    pageSizeChange (pageSize) {
      this.pageIndex = 1
      this.pageSize = pageSize
      this.getTableData()
    }
  },
  props: [
    'tData',
    'tList'
  ],
  watch: {
    myData1: function () {
    }
  }
}
</script>

<style scoped>
  table.v-table{
    font-size: 12px;
    width: 90%;
    margin: 0 auto;
    border:1px #aaa solid;
    max-height: 70%;
  }
  th,td{
    min-height: 35px!important;
    border-right: 1px solid #aaa;
    border-bottom: 1px solid #aaa;
    text-align: center;
  }
  tr{
    height: 35px!important;
    /*overflow: hidden;*/
  }
</style>
