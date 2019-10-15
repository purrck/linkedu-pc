<template>
    <el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-main>
            <el-row class="pa30">
        <el-col :span="14">
          <div v-for="(data1,index) in getSementGrade" :key="index">
            <p>{{data1.name}}</p>
            <el-row v-for="(data,index) in data1.children" :key="index">
              <el-col :span="5">
                <el-form ref="form" label-width="80px">
                  <el-form-item label="年级:">
                    {{data.name}}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="6">
                <el-form ref="form" label-width="80px">
                  <el-form-item label="班级数量:">
                    <el-select v-model="data.number" class="select-v2-rao" size="mini" placeholder="请您选择" @change="addClassNum(data)">
                      <el-option v-for="item in classNumberList"
                                :key="item.name"
                                :label="item.name" :value="item.value">
                      </el-option>
                    </el-select>
                    <!--<el-input class="input-v2-rao" v-model="data[data.vmodel]" @change="addClassNum" size="mini"></el-input>-->
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="6">
                <el-form ref="form" label-width="80px">
                  <el-form-item label="入学年份:">
                    <el-date-picker
                      type="year"
                      placeholder="请您选择年份" size="mini" value-format="yyyy" class="date-v2-rao" v-model="data.year" @change="addClassNum(data)">
                    </el-date-picker>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="10">
            <div class="table mt10">
              <el-scrollbar class="phone-component__scroll">
              <el-table :data="classList" tooltip-effect="dark" style="width: 100%;height: 600px;
    overflow-y: auto;" border
                        class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true">
                <el-table-column prop="className" align="center" label="班级名称">
                  <template slot-scope="scope">
                    <div>
                      <el-input class="input-v2-rao" size="mini" v-model="scope.row.className" maxlength="30"></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="classId" align="center" label="班级编号"></el-table-column>

              </el-table>
              </el-scrollbar>
              <div class="text-right mt10">
                <el-button type="primary" size="mini" @click="fenpei1" class="button-v2-rao b93BF88">分配班主任</el-button>
              </div>
            </div>
        </el-col>
        </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import {mapGetters,mapMutations} from 'vuex'
    export default{
        data(){
            return {
                classNumberList : [],
                classList : [],
                getSementGrade : []
            }
        },
        created(){

            this.$store.dispatch("segmentGradeService1").then(res => {
              if(res.data.resultCode == "390000"){
                  this.$message.error("该学校尚未设置学段信息,快去设置学段");
                  this.SET_IS_LOADING(false);
                  return
              }
              this.getSementGrade = res.data.data.children
              console.log(2343)
                this.SET_IS_LOADING(false)
            })


            for(let i=0; i<30; i++){
            this.classNumberList.push({
                name : `${i+1}`,
                value : `${i+1}`
            })
            }

        },
        computed:{
            ...mapGetters(['isLoading']),
            /*getSementGrade(){
                return this.$store.getters.getSementGrade;
            }*/
        },
        methods : {
            ...mapMutations(['SET_IS_LOADING']),
            addClassNum(event){
                if(!event.year){
                  event.isAvailable = false;
                this.$message.warning("请选择年份");
                }
                if(!event.number){
                  event.isAvailable = false;
                this.$message.warning("请选择数量");
                }
                if(event.year && event.number){
                  event.isAvailable = true;
                }
                this.classList = [];
                this.getSementGrade.map(item => {
                  item.children.map(item1 => {
                    if(item1.isAvailable){
                      for(let i=0; i<item1.number; i++){
                        if((i+1) < 10){
                          this.classList.push({
                              className : `${item1.name}${i+1}班`,
                              classId : `${item.id}0${item1.year}0${i+1}`,
                              entranceSchoolYear : item1.year,
                              segmentId : item.id,
                              segmentName : item.name,
                              gradeId : item1.id,
                              gradeName : item1.name

                          })
                        }
                        if((i+1) >= 10){
                          this.classList.push({
                              className : `${item1.name}${i+1}班`,
                              classId : `${item.id}0${item1.year}${i+1}`,
                              entranceSchoolYear : item1.year,
                              segmentId : item.id,
                              segmentName : item.name,
                              gradeId : item1.id,
                              gradeName : item1.name

                          })
                        }

                      }
                    }


                  })
                })

            },
            fenpei1(){

              let a = this.classList.some(item => {
                return item.className == ""
              })
              if(a){
                this.$message.error("不能为空");
                return ;
              }


              if(!this.classList.length){
                this.$message.error("请您先分配");
                return
              }
                let opath = `/basedata/classFenpei`;

                this.$router.push({path: opath,query:{classList : encodeURIComponent(JSON.stringify(this.classList))}});
            }
        }
    }
</script>

<style>
  .phone-component__scroll{
    /*height:500px;*/
  }
</style>
