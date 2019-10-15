<template>
  <el-dialog :title="title" :visible.sync="visible" center width="60%">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-main>
        <p class="text-center" v-show="state == '0'">暂无数据,谢谢</p>
        <p class="text-center" v-show="state == '1'"><strong>接口信息: </strong><span style="color:red">{{errorMsg}}</span>
        </p>
        <el-form :label-position="'right'" class="edit-form" label-width="165px"
                 :inline="true" size="small">
          <el-col :span="12" v-for="(data,index) in list" :key="index">
            <el-form-item :label="data.name" >
              <!--{{data.key}}-->
              <span v-html="data.key"> </span>
            </el-form-item>
          </el-col>
        </el-form>
      </el-main>
    </el-container>
  </el-dialog>
</template>
<script>
  import commonApi from "@/api/common/common";

  export default {
    name: "detail-dialog",
    data() {
      return {
        visible: true,
        list: [],
        isLoaded: true,

        state: "",
        errorMsg: ""
      }
    },
    created() {
      this.getDetailForDialog();
    },
    methods: {
      getDetailForDialog() {
        commonApi.getDetailForDialog(this.url).then((res) => {
          if (res.data.resultCode == "000000") {

            if (res.data.data.hasOwnProperty("gender") && res.data.data.gender == "M") {
              res.data.data.gender = "男"
            }
            if (res.data.data.hasOwnProperty("gender") && res.data.data.gender == "F") {
              res.data.data.gender = "女"
            }

            this.list = this.items.map((item) => {
              for (let key in res.data.data) {
                if (item.key == key) {
                  return {
                    name: `${item.name}: `,
                    key: item.key.lastIndexOf("Str") != -1 ? res.data.data[key].split(";")[0] : res.data.data[key]
                  }
                }

              }
            }).filter((item) => {
              return item
            })
            if (!this.list.length) {
              this.state = "0"
            }
            this.isLoaded = false;
          } else {
            this.isLoaded = false;
            this.errorMsg = res.data.message;
            this.state = "1"
          }
        })
      }
    }
  }
</script>
<style>
</style>
