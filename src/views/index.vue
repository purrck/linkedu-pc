<template>
  <div style="">
    <div class="block ">
      <el-carousel :interval="4000" height="700px" autoplay>
        <el-carousel-item>
          <div class="flex center echart">
            <img src="../assets/img/bg-web.jpg" alt="" style="width: 100%">
          </div>
        </el-carousel-item>
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
