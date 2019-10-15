<template>
  <div style="">
    <div class="block ">
      <el-carousel :interval="4000" height="700px" autoplay>
        <el-carousel-item>
          <div class="flex center echart">
            <img src="../assets/img/bg-index.png" alt="" style="width: 100%">
            <!--<div id="myChart2" style="width:800px;height:600px;padding: 30px"></div>-->

          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="flex center echart">
            <img src="../assets/img/bg-index-2.png" alt="" style="height: 100%">
            <!--<div id="myChart4" style="width:800px;height:600px;padding: 30px"></div>-->
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="flex center echart">
            <img src="../assets/img/bg-index-3.png" alt="" style="height: 100%">
            <!--<div class="flex row center">-->
            <!--<div id="myChart3" style="width:800px;height:600px;padding: 30px"></div>-->
            <!--</div>-->
          </div>
        </el-carousel-item>
        <!--<el-carousel-item>-->
        <!--<div class="flex center echart">-->
        <!--<div class="flex row center">-->
        <!--<div id="myChart" style="width:800px;height:600px;padding: 30px"></div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</el-carousel-item>-->
      </el-carousel>
    </div>

  </div>
</template>

<script>
  import {mapState, mapGetters} from "vuex";
  import comment from '@/api/common/common'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        searchForm: [],
        bulletinTypeCodeList: [],
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {

    },
    computed: {
      ...mapGetters(['activeOne', 'activeTwo', 'activeThree'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .echart {
    height: 700px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  /*a {*/
    /*<!--color: $mainBg;-->*/
  /*}*/

</style>
