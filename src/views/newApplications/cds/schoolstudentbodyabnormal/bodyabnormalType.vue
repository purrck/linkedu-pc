<template>
  <div v-if="messaga.bodyabnormalTypeCodeStr">
    <span
      :style="{color:messaga.bodyabnormalTypeCodeStr.split(',')[0].split(';')[1]}"
      v-if="scope.row.bodyabnormalTypeCodeStr"
    >{{messaga.bodyabnormalTypeCodeStr.split(',')[0].split(';')[0]}}</span>
    <span
      :style="{color:messaga.bodyabnormalTypeCodeStr.split(',')[1].split(';')[1]}"
      v-if="messaga.bodyabnormalTypeCodeStr.split(',')[1]"
    >{{scope.row.bodyabnormalTypeCodeStr.split(',')[1].split(';')[0]}}</span>
    <span
      :style="{color:messaga.bodyabnormalTypeCodeStr.split(',')[2].split(';')[1]}"
      v-if="messaga.bodyabnormalTypeCodeStr.split(',')[2]"
    >{{messaga.bodyabnormalTypeCodeStr.split(',')[2].split(';')[0]}}</span>
  </div>
  <span v-else>无</span>
</template>

<script>
export default {
    name:"bodyabnormalType",
    props:["messaga"]
};
</script>

<style lang='scss'>
</style>