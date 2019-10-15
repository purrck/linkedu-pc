

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


                  <el-col :span="12">
                    <el-form-item label="设备类型 :" prop="schoolDeviceTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.schoolDeviceTypeCode" placeholder="请您选择">
                        <el-option v-for="schoolDeviceTypeCodeItem in schoolDeviceTypeCodeOptions"
                                   :key="schoolDeviceTypeCodeItem.name"
                                   :label="schoolDeviceTypeCodeItem.label" :value="schoolDeviceTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="设备号 :" prop="deviceNum">
                      <el-input class="input-v2-rao" v-model="formData.deviceNum"
                                maxlength="64"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--<el-col  :span="12">-->
                    <!--<el-form-item label="场所id :" prop="placeId">-->
                      <!--<el-input class="input-v2-rao" v-model="formData.placeId"-->
                                <!--maxlength="32"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <!--<el-col :span="12">-->
                    <!--<el-form-item label="场所 :" prop="placeName">-->
                      <!--<el-input class="input-v2-rao" v-model="formData.placeName"-->
                                <!--maxlength="128"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
            <!--<el-col :span="12">-->
              <!--<el-form-item label="场所" prop="placeName" >-->
                <!--<el-select style="width: 300px" v-model="formData.placeName" placeholder="请选择"  @change="getPlaceNames">-->
                  <!--<el-option-->
                    <!--v-for="item in palceTableDataList"-->
                    <!--:key="item.placeName"-->
                    <!--:label="item.placeName"-->
                    <!--:value="item.placeName">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
            <!--</el-col>-->

            <el-col :span="12">
              <el-form-item label="场所 :" prop="placeName">
                <el-cascader style="width: 300px"
                  :options="palceTableDataList"
                  v-model="childrenPlaceId"
                  :props="props" @change="getPlaceNames">
                </el-cascader>
              </el-form-item>
            </el-col>



                  <el-col :span="12">
                    <el-form-item label="设备状态 :" prop="schoolDeviceStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.schoolDeviceStatusCode" placeholder="请您选择">
                        <el-option v-for="schoolDeviceStatusCodeItem in schoolDeviceStatusCodeOptions"
                                   :key="schoolDeviceStatusCodeItem.name"
                                   :label="schoolDeviceStatusCodeItem.label" :value="schoolDeviceStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
            <el-col :span="12">
              <el-form-item label="设备分组 :" prop="">
                <el-input class="input-v2-rao" v-model="formData.deviceGroup"
                          maxlength="64"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="内/外标识:" prop="" >
                <el-select style="width: 300px" v-model="formData.inOutStateCode" placeholder="请选择"  @change="changeInOutState">
                  <el-option value="">无</el-option>
                  <el-option
                    v-for="item in inOutStateCodeOptions"
                    :key="item.name"
                    :label="item.label"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="12">
                    <el-form-item label="设备类型 :" prop="schoolDeviceTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.schoolDeviceTypeCode" placeholder="请您选择">
                        <el-option v-for="schoolDeviceTypeCodeItem in schoolDeviceTypeCodeOptions"
                                   :key="schoolDeviceTypeCodeItem.name"
                                   :label="schoolDeviceTypeCodeItem.label" :value="schoolDeviceTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="设备号 :" prop="deviceNum">
                      <el-input class="input-v2-rao" v-model="formData.deviceNum"
                                maxlength="64"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="12">-->
                    <!--<el-form-item label="场所id :" prop="placeId">-->
                      <!--<el-input class="input-v2-rao" v-model="formData.placeId"-->
                                <!--maxlength="32"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <!--<el-col :span="12">-->
                    <!--<el-form-item label="场所 :" prop="placeName">-->
                      <!--<el-input class="input-v2-rao" v-model="formData.placeName"-->
                                <!--maxlength="128"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
            <!--<el-col :span="12">-->
              <!--<el-form-item label="场所" prop="" >-->
                <!--<el-select style="width: 300px" v-model="formData.placeName" placeholder="请选择" @change="getPlaceNames">-->
                  <!--<el-option-->
                    <!--v-for="item in palceTableDataList"-->
                    <!--:key="item.placeName"-->
                    <!--:label="item.placeName"-->
                    <!--:value="item.placeName">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
            <!--</el-col>-->


            <el-col :span="12">
              <el-form-item label="场所 :" prop="placeName">
                <el-cascader style="width: 300px"
                             :options="palceTableDataList"
                             v-model="childrenPlaceId"
                             :props="props" @change="getPlaceNames">
                </el-cascader>
              </el-form-item>
            </el-col>

                  <el-col :span="12">
                    <el-form-item label="设备状态 :" prop="schoolDeviceStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.schoolDeviceStatusCode" placeholder="请您选择">
                        <el-option v-for="schoolDeviceStatusCodeItem in schoolDeviceStatusCodeOptions"
                                   :key="schoolDeviceStatusCodeItem.name"
                                   :label="schoolDeviceStatusCodeItem.label" :value="schoolDeviceStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
            <el-col :span="12">
              <el-form-item label="设备分组 :" prop="">
                <el-input class="input-v2-rao" v-model="formData.deviceGroup"
                          maxlength="64"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="内/外标识:" prop="" >
                <el-select style="width: 300px" v-model="formData.inOutStateCode" placeholder="请选择"  @change="changeInOutState">
                  <el-option value="">无</el-option>
                  <el-option
                    v-for="item in inOutStateCodeOptions"
                    :key="item.name"
                    :label="item.label"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">

            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small" class="flex row wrap">
              <div class="p100">
                <div class="detail-title-v2 ">
                      {{formData.schoolDeviceTypeCode}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50">
                          <el-form-item label="设备类型 :" prop="schoolDeviceTypeCode">
                            <span v-if="formData.schoolDeviceTypeCodeStr"
                                  :style="{'color':formData.schoolDeviceTypeCodeStr.split(';')[1]}">{{formData.schoolDeviceTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.deviceNum">
                          <el-form-item label="设备号 :" prop="deviceNum">
                            <span v-if="formData.deviceNum">{{formData.deviceNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.placeName">
                          <el-form-item label="场所 :" prop="placeName">
                            <span v-if="formData.placeName">{{formData.placeName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="设备状态 :" prop="schoolDeviceStatusCode">
                            <span v-if="formData.schoolDeviceStatusCodeStr"
                                  :style="{'color':formData.schoolDeviceStatusCodeStr.split(';')[1]}">{{formData.schoolDeviceStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>


                  <div class="p50" v-if="formData.deviceGroup">
                    <el-form-item label="设备分组 :" prop="placeName">
                      <span v-if="formData.deviceGroup">{{formData.deviceGroup}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.inOutStateCode">
                    <el-form-item label="内/外标识 :" prop="placeName">
                      <span v-if="formData.inOutStateCode==='in'">进入</span>
                      <span v-if="formData.inOutStateCode==='out'">外出</span>
                    </el-form-item>
                  </div>

                </div>
              </div>
            </el-form>
          </el-col>

        </el-row>
      </div>

      <div class="text-center mt-30">
        <el-button v-if="pageState === 'edit'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="medium"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="medium"
                   @click="submit('formData')">发布
        </el-button>
        <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff" size="medium"
                   @click="goBack">返回
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "./schooldeviceUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  //import preview from '@/util/preview';
  export default {
      components: {editor, upload, uploads},
    data() {
      return {
        props: {
          value: 'placeId',
          label: 'placeName',
          children: 'children'
        },
        childrenPlaceId:[],
        inOutStateCodeOptions:[],
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),
        schoolDeviceTypeCodeOptions: [{"label": "全部", "name": ""}],
        schoolDeviceTypeCode : null,
        schoolDeviceStatusCodeOptions: [{"label": "全部", "name": ""}],
        schoolDeviceStatusCode : null,
        formData:{
          deviceGroup:'',
          inOutState:'',
              schoolDeviceId:'',
              schoolDeviceTypeCode :"",
              deviceNum :"",
              placeId :"",
              placeName :"",
              schoolDeviceStatusCode :"",
        },
        place: {
          schoolId: null
        },
        palceTableDataList:[],
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              schoolDeviceTypeCode :
              [
                {required: true, message: "请您选择设备类型", trigger: "blur"},
              ],
              deviceNum :
              [
                {required: true, message: "请您选择设备号", trigger: "blur"},
              ],
              placeId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              placeName :
              [
                {required: true, message: "请您选择场所", trigger: "blur"},

              ],
              schoolDeviceStatusCode :
              [
                {required: true, message: "请您选择设备状态", trigger: "blur"},
              ],
        }
      }
    },
    computed: {
      pageState() {
        return this.$route.params.type;
      }
    },
   // directives: {preview},
    created() {

          commonApi.getCodeIntType("schoolDeviceType").then(res => {
            let viewList = res.data.data || [];
            for (let schoolDeviceTypeItem of viewList) {
              this.schoolDeviceTypeCodeOptions.push({
                "label": schoolDeviceTypeItem.codeDesc,
                "name": schoolDeviceTypeItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("schoolDeviceStatus").then(res => {
            let viewList = res.data.data || [];
            for (let schoolDeviceStatusItem of viewList) {
              this.schoolDeviceStatusCodeOptions.push({
                "label": schoolDeviceStatusItem.codeDesc,
                "name": schoolDeviceStatusItem.codeId
              });
            }
          });
      commonApi.getCodeIntType("inOutState").then(res => {
        let viewList = res.data.data || [];
        for (let schoolDeviceTypeItem of viewList) {
          this.inOutStateCodeOptions.push({
            "label": schoolDeviceTypeItem.codeDesc,
            "name": schoolDeviceTypeItem.codeId
          });
        }
      });
          this.getPalce();
    },

  mounted(){
      this.getDetail(this.$route.params.id)
  },
    methods: {
      changeInOutState(){
      },
      getPlaceNames() {
        // console.log(this.childrenPlaceId)
        if (this.childrenPlaceId.length===1){   //选择主场所
          let placeId=this.childrenPlaceId[0]
          for (let i=0;i<this.palceTableDataList.length;i++){
              if (placeId === this.palceTableDataList[i].placeId){
                this.formData.placeName = this.palceTableDataList[i].placeName
                this.formData.placeId = this.palceTableDataList[i].placeId
                break
              }
          }
        } else {                                 //选择子场所
          let placeId=this.childrenPlaceId[1]
          for (let i=0;i<this.palceTableDataList.length;i++){
            if (this.palceTableDataList[i].children !==undefined ) {
              for (let j = 0; j < this.palceTableDataList[i].children.length; j++) {
                if (placeId === this.palceTableDataList[i].children[j].placeId) {
                  this.formData.placeName = this.palceTableDataList[i].children[j].placeName
                  this.formData.placeId = this.palceTableDataList[i].children[j].placeId
                  break
                }
              }
            }
          }
        }
      },
      getPalce(){
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        this.place.schoolId=userInfo.content.extValues.schoolOrg.schoolOrgId   //学校id
        api.getPlaceList(this.place).then(res => {
          let palceList = res.data.data
          this.hasChildrenPlace = res.data.data
          // console.log(this.palceTableDataList);
          // this.palceTableData=res.data.data

          for (let i=0;i<palceList.length;i++){
            let num =1
            if (palceList[i].children.length!==0){
              this.palceTableDataList.push({placeName:palceList[i].placeName,placeId:palceList[i].placeId,children:[]});
              for (let j=0;j<palceList[i].children.length;j++) {
                if (num===1){
                  this.palceTableDataList[i].children.push({placeName: palceList[i].placeName, placeId: palceList[i].placeId});
                  num=2
                }
                this.palceTableDataList[i].children.push({placeName: palceList[i].children[j].placeName, placeId: palceList[i].children[j].placeId});
              }
              }else{
                this.palceTableDataList.push({placeName: palceList[i].placeName, placeId: palceList[i].placeId});
                // for (let j = 0; j < palceList[i].children.length; j++) {
                //   this.palceTableDataList[i].children.push({placeName: palceList[i].children[j].placeName,placeId: palceList[i].children[j].placeId});
                // }
                }
              }

        })

      },


      // getPalce(){
      //   let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      //   this.place.schoolId=userInfo.content.extValues.schoolOrg.schoolOrgId   //学校id
      //   api.getPlaceList(this.place).then(res => {
      //     console.log(res.data.data);
      //     this.palceTableData=res.data.data
      //     for (let i=0;i<this.palceTableData.length;i++){
      //       this.palceTableDataList.push({placeName:this.palceTableData[i].placeName,placeId:this.palceTableData[i].placeId}  );
      //     }
      //     if (res.data.resultCode !== "000000") {
      //       this.$message.error(res.data.message);
      //     }
      //   })
      // },
      submit(formName) {
        const set = this.$refs;
        this.isLoaded = true;
        set[formName].validate(valid => {
          if (this.pageState === 'edit' && valid) {
            this.formLoading = true;
            // this.formData.deviceGroup=''
            // this.formData.inOutState=''
            api.putObj(this.formData).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.goBack()
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
            })
          } else if (this.pageState === 'add' && valid) {
            this.formLoading = true;
            api.addObj(this.formData).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.goBack()
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
            })
          }
        })
        this.isLoaded = false;
      },
      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === "000000") {
              this.formData = res.data.data
              let placeId=this.formData.placeId
              this.childrenPlaceId=[]
              // console.log(this.palceTableDataList)
//创建一个有children的场所列表
//               for (let i=0;i<this.hasChildrenPlace.length;i++){
//                   placeIdArr.push({placeName:this.hasChildrenPlace[i].placeName,placeId:this.hasChildrenPlace[i].placeId,children:[]});
//                   for (let j=0;j<this.hasChildrenPlace[i].children.length;j++) {
//                     placeIdArr[i].children.push({placeName: this.hasChildrenPlace[i].children[j].placeName, placeId: this.hasChildrenPlace[i].children[j].placeId});
//                   }
//               }
              for (let i=0;i<this.hasChildrenPlace.length;i++){
                if (this.hasChildrenPlace[i].children.length>0){
                  for (let j=0;j<this.hasChildrenPlace[i].children.length;j++){
                    if (placeId === this.hasChildrenPlace[i].children[j].placeId){
                      this.childrenPlaceId.push(this.hasChildrenPlace[i].placeId)
                      this.childrenPlaceId.push(this.hasChildrenPlace[i].children[j].placeId)
                      // console.log(this.childrenPlaceId)
                      break
                    }
                  }
                } else{
                  if (placeId === this.palceTableDataList[i].placeId) {
                    this.childrenPlaceId.push(placeId)
                    break
                  }
                }
              }

              console.log(this.childrenPlaceId)
            }
            this.isLoaded = false;
          })
        }
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .edit-box {
    padding: 40px;
    width: auto;

  .detail-title-v2 {
    background: #f5f5f5;
    border-radius: 4px;
    height: 40px;
    line-height: 40px;
    padding-left: 12px;
    margin-right: 40px;
    color: #707070;
    font-size: 14px;
  }

  .detail-item-v2 {
    display: flex;
    flex-wrap: wrap;
    padding: 25px 25px 0 25px;
  }

  }

  .el-form-item--small.el-form-item {
    margin-bottom: 25px;
  }

  .bm-view {
    width: 640px;
    height: 300px;
    margin-top: 10px;
  }

  .fush-btn {
    margin: 0 15px
  }
</style>
