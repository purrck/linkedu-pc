<template>
  <el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                style="min-height: 600px"
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
    <el-main>
      <div class="pa30">
        <el-select size="mini" popper-class="select-popper-v2-rao" class="select-v2-rao" style="width:100px"
                   v-model="segmentOptionsValue" placeholder="请选择">
          <el-option
            v-for="(item,index) in segmentOptionList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            <div @click="sementClick(index,item)">{{item.name}}</div>
          </el-option>
        </el-select>


        <!--<el-table :data="schedule" tooltip-effect="dark" style="width: 100%" border class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true">
            <span v-for="(data,key) in schedule" :key="key">
                <el-table-column :label="data.columnTitle" width="55" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.switch" active-color="#93BF88" inactive-color="#dcdfe6">
                        </el-switch>
                    </template>
                </el-table-column>
            </span>
        </el-table>-->

        <div
          class="el-table table-v2-rao mt20 el-table--fit el-table--striped el-table--border el-table--enable-row-hover el-table--enable-row-transition">
          <table class="p100 addSubjectTable">
            <tr class="table-header-v2-rao">
              <th>
                <div class="cell">年级</div>
              </th>
              <th v-for="item in subjectList" :key="item.id">
                <div class="cell">{{item.name}}</div>
              </th>
            </tr>
            <tr class="el-table__row" v-for="(item,index) in segmentList.children" :key="index">
              <td>
                <div class="cell" style="text-align:center">{{item.name}}</div>
              </td>
              <td v-for="(data,key) in item.sementSubject" :key="key">
                <div class="cell" style="text-align:center">
                  <el-switch v-model="data.switch"
                             active-color="#93BF88"
                             inactive-color="#dcdfe6" @change="switchChange(data)">
                  </el-switch>
                  <!--<input type="checkbox" :checked="data.switch" @change="switchChange(data)" />-->
                  <!--<el-switch v-model="data.switch"
                      active-color="#93BF88"
                      inactive-color="#dcdfe6" @change="switchChange(data)">
                  </el-switch>-->
                  <!--<el-switch v-model="data[`a${currentSegmentIndex}${index}${key}`]"
                      active-color="#93BF88"
                      inactive-color="#dcdfe6" @change="switchChange(data)">
                  </el-switch>-->
                  <!--<el-switch v-model="data['a'+index+key]"
                      active-color="#93BF88"
                      inactive-color="#dcdfe6" @change="switchChange(data)">
                  </el-switch>-->
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="text-center mt20">
          <el-button type="primary" size="small" :loading="isCreate"
                     class="el-button--small-icon  button-v2-rao b93BF88 " @click="finishCreate">
            完成创建
          </el-button>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import api from "./basicschoolsegmentsubjectUrl";
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    data() {
      return {
        isCreate: false,
        sdfsdfsdfsdf: "",
        asdfsdf: "",
        dkdk: [
          {
            name: "232324"
          },
          {
            name: "556555"
          }
        ],
        segmentOptionsValue: "",
        schedule: [
          {
            columnTitle: "sffsdf"
          }, {
            columnTitle: "sffsdf"
          }, {
            columnTitle: "sffsdf"
          }
        ],
        gradeList: [],
        //getSementSubject : [],
        d: {},
        currentSegmentIndex: 0,
        SegmentId: 1,
        getGradeAndSubject: [
          {
            sementSubject: [
              {
                switch: true
              }
            ]
          }
        ],
        //getSementGrade : [],
        segmentOptionList: [],
        segmentList: [],
        gradeList: [],
        subjectList: [],
        allData: []
      }
    },
    computed: {
      ...mapGetters(['isLoading']),
    },
    created() {
      this.SET_IS_LOADING(false);
      this.getData();


      /*let _this = this;
      async function _a() {
          await _this.$store.dispatch("segmentGradeService");
          return await _this.$store.dispatch("segmentSubjectService",[_this.currentSegmentIndex]);
      }
      _a().then(res => {

              this.gradeList = this.getSementGrade[0];
          this.gradeList.children.map((item,index) => {
              item.sementSubject = [];
              this.$store.getters.getSementSubject[0].children.map((item1,index1) => {
                  item.sementSubject.push({
                      subjectName : item1.name,
                      subjectId : item1.id,
                      switch : true,
                      gradeName : item.name,
                      gradeId : item.id,
                      segmentName : this.gradeList.name,
                      segmentId : this.gradeList.id
                  })
              })

          })

          // console.log(this.gradeList)


      })*/


    },
    mounted() {
      /*let _this = this;
      async function _a() {
          await _this.$store.dispatch("segmentGradeService");
          return await _this.$store.dispatch("segmentSubjectService",["1"]);
      }
      _a().then(res => {
          this.gradeList = this.getSementGrade[0];
          this.$store.getters.getSementSubject[0].children.map(item => {
              item.isd = true
          })
          this.getSementSubject = this.$store.getters.getSementSubject[0]
      // console.log(this.getSementSubject)
      })
      */
    },
    methods: {
      ...mapMutations(["SET_IS_LOADING"]),
      getData() {
        this.SET_IS_LOADING(true);
        this.$store.dispatch("segmentGradeService1").then(res => {
          if (res.data.resultCode == "390000") {
            this.$message.error("该学校尚未设置学段信息,快去设置学段");
            this.SET_IS_LOADING(false);
            return
          }
          //this.allData = res.data.data.children;
          this.segmentOptionList = res.data.data.children;
          this.segmentList = res.data.data.children[this.currentSegmentIndex];
          this.segmentList.isSelected = true;
          this.segmentOptionsValue = this.segmentList.id
          this.$store.dispatch("segmentSubjectService1", [this.segmentList.id]).then(res => {
            this.subjectList = res.data.data.children[0].children
            this.segmentList.children.map((item, index) => {
              this.$set(item, "sementSubject", [])
              //item['sementSubject'] = [];
              this.subjectList.map((item2, index2) => {
                item.sementSubject.push({
                  subjectName: item2.name,
                  subjectId: item2.id,
                  switch: true,
                  gradeName: item.name,
                  gradeId: item.id,
                  segmentName: this.segmentList.name,
                  segmentId: this.segmentList.id
                })
              })
            })

            this.allData = this.allData.filter(item => {
              return this.segmentList.id != item.id;
            })

            this.allData.push({
              id: this.segmentList.id,
              list: this.segmentList
            })
            this.SET_IS_LOADING(false);
          })
        })

      },
      finishCreate() {
        let _a = [];
        // console.log(this.allData)
        this.allData.map(item => {
          item.list.children.map((item) => {
            item.sementSubject.map(item => {
              if (item.switch) {
                _a.push(item)
              }
            })
          })
        })
        // console.log(_a)


        /*this.segmentList.children.map((item) => {
            item.sementSubject.map(item => {
                if(item.switch){
                    _a.push(item)
                }
            })
        })*/
        if (!_a.length) {
          this.$message.error("至少选择一个");
          return
        }
        this.isCreate = true;
        api.addBatch(_a).then(res => {
          if (res.data.resultCode == "000000") {
            this.$message.success("新增成功");
            this.$router.push({path: "/basedata/listSchoolSegmentSubject"})
          }
          this.isCreate = false;
        })

      },
      sementClick(index, item) {
        this.currentSegmentIndex = index;
        this.getData();

      },
      goBack() {
        this.$router.go(-1)
      },
      switchChange(data) {
        //data.switch = data.switch ? false : true
        // console.log(data)

      }
    }
  }
</script>

<style>
</style>
