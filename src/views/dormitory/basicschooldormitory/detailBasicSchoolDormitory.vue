<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col v-show="false" :span="24">
            <el-form-item label="学校id:" prop="dormitoryNum">
              <el-input disabled class="input-v2-rao" v-model="formData.schoolId"
                        maxlength="64"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="宿舍编号 :" prop="dormitoryNum">
              <!--宿舍编号（楼栋+楼层+序号）-->
              <el-input class="input-v2-rao" v-model="formData.dormitoryNum"
                        maxlength="64"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="宿舍名称 :" prop="dormitoryName">
              <el-input class="input-v2-rao" v-model="formData.dormitoryName"
                        maxlength="100"></el-input>
            </el-form-item>
          </el-col>

          <!--<el-col :span="24">-->
          <!--<el-form-item label="宿舍类型:" prop="dormitoryTypeCode">-->
          <!--&lt;!&ndash;宿舍类型代码（来自于字典）区分男生，女生，教职工，其他&ndash;&gt;-->
          <!--<el-select class="select-v2-rao" v-model="formData.dormitoryTypeCode" placeholder="请您选择">-->
          <!--<el-option v-for="dormitoryTypeCodeItem in dormitoryTypeCodeOptions"-->
          <!--:key="dormitoryTypeCodeItem.name"-->
          <!--:label="dormitoryTypeCodeItem.label" :value="dormitoryTypeCodeItem.name">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <el-col :span="12">
            <el-form-item label="宿舍类型 :" prop="dormitoryTypeCode">
              <el-select class="select-v2-rao" v-model="formData.dormitoryTypeCode" placeholder="请您选择">
                <el-option v-for="classStudentStatusCodeItem in classStudentStatusCodeOptions"
                           :key="classStudentStatusCodeItem.name"
                           :label="classStudentStatusCodeItem.label" :value="classStudentStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="可入住人数:" prop="maxUser">
              <el-input class="input-v2-rao" v-model="formData.maxUser"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房间总数   :" prop="roomNum">
              <el-input class="input-v2-rao" v-model="formData.roomNum"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="楼栋编号  :" prop="buildingNum">
              <el-input class="input-v2-rao" v-model="formData.buildingNum"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="楼栋名称  :" prop="buildingName">
              <el-input class="input-v2-rao" v-model="formData.buildingName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>

          <!--<el-col :span="12">-->
          <!--<el-form-item label="场所:" prop="placeName">-->
          <!--<el-select class="select-v2-rao p100" @change="getClassName()" popper-class="select-popper-v2-rao" v-model="formData.placeId"-->
          <!--placeholder="请您选择" >-->
          <!--<el-option value="">-->
          <!--请您选择-->
          <!--</el-option>-->
          <!--<el-option v-for="(item,index) in palceTableDataList" :key="item.placeId"-->
          <!--:label="item.placeName"  :value="item.placeId" >-->
          <!--&lt;!&ndash;                    <div>{{item.interestCourseClassName}}</div>&ndash;&gt;-->
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
            <el-form-item label="序号 :" prop="sequnceNum">
              <el-input class="input-v2-rao" v-model="formData.sequnceNum"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="宿舍编号:" prop="dormitoryNum">
              <el-input class="input-v2-rao" v-model="formData.dormitoryNum"
                        maxlength="64"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="宿舍名称  :" prop="dormitoryName">
              <el-input class="input-v2-rao" v-model="formData.dormitoryName"
                        maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="宿舍类型 :" prop="dormitoryTypeCode">
              <el-select class="select-v2-rao" v-model="formData.dormitoryTypeCode" placeholder="请您选择">
                <el-option v-for="dormitoryTypeCodeItem in dormitoryTypeCodeOptions"
                           :key="dormitoryTypeCodeItem.name"
                           :label="dormitoryTypeCodeItem.label" :value="dormitoryTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="可入住人数:" prop="maxUser">
              <el-input class="input-v2-rao" v-model="formData.maxUser"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房间总数   :" prop="roomNum">
              <el-input class="input-v2-rao" v-model="formData.roomNum"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="24">-->
          <!--<el-form-item label="学生性别 *  :" prop="genderCode">-->
          <!--<el-select class="select-v2-rao" v-model="formData.genderCode" placeholder="请您选择">-->
          <!--<el-option v-for="genderCodeItem in genderCodeOptions"-->
          <!--:key="genderCodeItem.name"-->
          <!--:label="genderCodeItem.label" :value="genderCodeItem.name">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="12">
            <el-form-item label="楼栋编号   :" prop="buildingNum">
              <el-input class="input-v2-rao" v-model="formData.buildingNum"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="楼栋名称  :" prop="buildingName">
              <el-input class="input-v2-rao" v-model="formData.buildingName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="12">-->
          <!--<el-form-item label="场所:" prop="placeName" >-->
          <!--<el-select class="select-v2-rao p100" @change="getClassName()" popper-class="select-popper-v2-rao" v-model="formData.placeId"-->
          <!--placeholder="请您选择" >-->
          <!--<el-option value="">-->
          <!--请您选择-->
          <!--</el-option>-->
          <!--<el-option v-for="(item,index) in palceTableDataList" :key="item.placeId"-->
          <!--:label="item.placeName"  :value="item.placeId" >-->
          <!--&lt;!&ndash;                    <div>{{item.interestCourseClassName}}</div>&ndash;&gt;-->
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
            <el-form-item label="序号 :" prop="sequnceNum">
              <el-input class="input-v2-rao" v-model="formData.sequnceNum"
                        maxlength="11"></el-input>
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
                  {{formData.dormitoryNum}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.dormitoryNum">
                    <el-form-item label="宿舍编号 :" prop="dormitoryNum">
                      <span v-if="formData.dormitoryNum">{{formData.dormitoryNum}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.dormitoryName">
                    <el-form-item label="宿舍名称 :" prop="dormitoryName">
                      <span v-if="formData.dormitoryName">{{formData.dormitoryName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="宿舍类型:" prop="dormitoryTypeCode">
                            <span v-if="formData.dormitoryTypeCodeStr"
                                  :style="{'color':formData.dormitoryTypeCodeStr.split(';')[1]}">{{formData.dormitoryTypeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.maxUser">
                    <el-form-item label="可入住人数 :" prop="maxUser">
                      <span v-if="formData.maxUser">{{formData.maxUser}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.roomNum">
                    <el-form-item label="房间总数 :" prop="roomNum">
                      <span v-if="formData.roomNum">{{formData.roomNum}}</span>
                    </el-form-item>
                  </div>
                  <!--<div class="p50">-->
                  <!--<el-form-item label="学生性别 :" prop="genderCode">-->
                  <!--<span v-if="formData.genderCodeStr"-->
                  <!--:style="{'color':formData.genderCodeStr.split(';')[1]}">{{formData.genderCodeStr.split(';')[0]}}</span>-->
                  <!--</el-form-item>-->
                  <!--</div>-->
                  <div class="p50" v-if="formData.buildingName">
                    <el-form-item label="楼栋名称 :" prop="buildingName">
                      <span v-if="formData.buildingName">{{formData.buildingName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.buildingName">
                    <el-form-item label="场所 :" prop="placeName">
                      <span v-if="formData.placeName">{{formData.placeName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.sequnceNum">
                    <el-form-item label="序号 :" prop="sequnceNum">
                      <span v-if="formData.sequnceNum">{{formData.sequnceNum}}</span>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-form>
          </el-col>

          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="menu-quickly">
              <ul>
                <li>
                  <router-link :to="`/basedata/listBasicSchoolDormitoryRoom?dormitoryId=`+
                                  formData.dormitoryId">
                    <i class="iconfont icon-icon_liebiao"></i>学校宿舍房间
                  </router-link>
                </li>
                <li>
                  <router-link :to="`/basedata/listBasicSchoolDormitoryTeacher?dormitoryId=`+
                                  formData.dormitoryId">
                    <i class="iconfont icon-icon_liebiao"></i>宿舍管理老师
                  </router-link>
                </li>
                <li>
                  <router-link :to="`/basedata/listBasicSchoolDormitoryStudent?dormitoryId=`+
                                  formData.dormitoryId">
                    <i class="iconfont icon-icon_liebiao"></i>学生住宿
                  </router-link>
                </li>
              </ul>
            </div>
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
  import api from "./basicschooldormitoryUrl";
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
        Drag: false,
        inputTable: true,
        childrenPlaceId:[],
        palceTableDataList:[],

        props: {
          value: 'placeId',
          label: 'placeName',
          children: 'children'
        },

        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        dormitoryTypeCodeOptions: [{"label": "全部", "name": ""}],
        dormitoryTypeCode: null,
        genderCodeOptions: [{"label": "全部", "name": ""}],
        genderCode: null,
        formData: {
          schoolId: null,
          dormitoryId: '',
          dormitoryNum: "",
          dormitoryName: "",
          dormitoryTypeCode: "",
          maxUser: "",
          roomNum: "",
          genderCode: "",
          buildingNum: "",
          buildingName: "",
          sequnceNum: "",
        },
        place: {
          schoolId: null
        },
        selectedOptions: [],

        classStudentStatusCodeOptions: [{"label": "全部", "name": ""}],
        palceTableDataList: [],

        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {

          placeName:
            [
              {required: true, message: "请选择场所", trigger: "blur"},
            ],
          dormitoryNum:
            [
              // {required: true, message: "请您输入宿舍编号", trigger: "blur"},
            ],
          dormitoryName:
            [
              {required: true, message: "请您输入宿舍名称", trigger: "blur"},
            ],
          dormitoryTypeCode:

            [
              {required: true, message: "请您输入宿舍名称", trigger: "blur"},
            ],
          maxUser:
            [
              {required: true, message: "请您输入宿舍可入住最大人数", trigger: "blur"},
              {validator: validation.number, trigger: "blur"},

            ],
          roomNum:
            [
              {required: true, message: "请您输入房间总数", trigger: "blur"},
              {validator: validation.number, trigger: "blur"},

            ],
          buildingNum:
            [
              {required: true, message: "请您输入楼栋编号", trigger: "blur"},
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          buildingName:
            [
              {required: true, message: "请您输入楼栋名称", trigger: "blur"},
              {max: 32, message: "最多能输入32个字", trigger: "blur"},
            ],
          sequnceNum:
            [
              {validator: validation.number, trigger: "blur"},

            ],
        },
        place: {
          page: 1,
          limit: 9999,
          schoolId: null,
          parentPlaceId: -1,
        },
      }
    },
    computed: {
      pageState() {
        return this.$route.params.type;
      }
    },
    // directives: {preview},
    created() {
      this.getPalce();
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.formData.schoolId = userInfo.content.extValues.schoolOrg.schoolOrgId   //学校id
      // console.log(this.formData.schoolId)
      commonApi.getCodeIntType("dormitoryType").then(res => {
        let viewList = res.data.data || [];
        for (let classStudentStatusItem of viewList) {
          this.classStudentStatusCodeOptions.push({
            "label": classStudentStatusItem.codeDesc,
            "name": classStudentStatusItem.codeId
          });
        }
      });
      commonApi.getCodeIntType("dormitoryType").then(res => {
        let viewList = res.data.data || [];
        for (let dormitoryTypeItem of viewList) {
          this.dormitoryTypeCodeOptions.push({
            "label": dormitoryTypeItem.codeDesc,
            "name": dormitoryTypeItem.codeId
          });
        }
      });
      commonApi.getCodeIntType("gender").then(res => {
        let viewList = res.data.data || [];
        for (let genderItem of viewList) {
          this.genderCodeOptions.push({
            "label": genderItem.codeDesc,
            "name": genderItem.codeId
          });
        }
      });
      this.getPlaceList()
      // this.getPalce();

    },
    mounted() {
    },
    methods: {
      getPalce(){
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        this.place.schoolId=userInfo.content.extValues.schoolOrg.schoolOrgId   //学校id
        api.getPlaceList(this.place).then(res => {
          let palceList = res.data.data
          this.hasChildrenPlace = res.data.data
          // // console.log(this.palceTableDataList);
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
              for (let j = 0; j < palceList[i].children.length; j++) {
                this.palceTableDataList[i].children.push({placeName: palceList[i].children[j].placeName,placeId: palceList[i].children[j].placeId});
              }
            }
          }
        })
        this.getDetail(this.$route.params.id)
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
        } else {
          let placeId=this.childrenPlaceId[1]
          // // console.log(this.palceTableDataList)
          for (let i=0;i<this.palceTableDataList.length;i++){
            // // console.log(this.palceTableDataList[i].children)
            if (this.palceTableDataList[i].children !==undefined ) {
              for (let j = 0; j < this.palceTableDataList[i].children.length; j++) {
                if (placeId === this.palceTableDataList[i].children[j].placeId) {
                  this.formData.placeName = this.palceTableDataList[i].children[j].placeName
                  this.formData.placeId = this.palceTableDataList[i].children[j].placeId
                  // // console.log(this.formData.placeId)
                  // // console.log(this.formData.placeName)
                  break
                }
              }
            }
          }
        }
      },

      getClassName() {
        this.palceTableDataList.map(item => {
          if (item.placeId === this.formData.placeId) {
            this.formData.placeName = item.placeName
          }
        })
        // // console.log(this.formData.placeName);
        // // console.log(this.formData.placeId);
      },

      submit(formName) {
        const set = this.$refs;
        this.isLoaded = true;
        set[formName].validate(valid => {
          if (this.pageState === 'edit' && valid) {
            this.formLoading = true;
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
      // getPlaceId(id) {
      //   let mainName = null;
      //   // console.log(this.palceTableDataList)
      //   // console.log(this.palceTableDataList.length)
      //   this.palceTableDataList.map(item => {
      //     if (item.placeId === id) {
      //       mainName = item.placeName
      //       // console.log(mainName)
      //     }
      //   })
      //
      //   setTimeout(_ => {
      //     let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      //     this.place.schoolOrgName = userInfo.content.extValues.schoolOrg.schoolOrgName   //学校名
      //     this.place.parentPlaceId = id
      //     this.palceTableChildrenData = []
      //     for (let i = 0; i < this.palceTableDataList.length; i++) {
      //       if (this.palceTableDataList[i].children.length <= 0) {
      //         // // console.log(this.palceTableDataList[i].children.length)
      //         if (this.palceTableDataList[i].placeId === id) {
      //           // this.formData.placeName = this.palceTableDataList[i].placeName
      //           api.fetchListsss(this.place).then(res => {
      //             this.palceTableChildrenData = res.data.data.records
      //             this.palceTableDataList[i].children = this.palceTableChildrenData
      //             this.palceTableDataList[i].children.unshift({placeId: id, placeName: mainName})
      //
      //             // console.log(this.palceTableDataList[i].children)
      //           }, res => {
      //             this.$message.error(res.message);
      //           });
      //         }
      //       }
      //     }
      //   }, 300);
      // },

      getDetail(paramsId) {
        // console.log(33333333);
        if (this.pageState !== 'add') {
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === "000000") {
              this.formData = res.data.data
// console.log(this.formData.placeId)
              // this.mianpArrlaceId = this.formData.placeId.split('-')[0]
              // this.getPlaceId(this.mianpArrlaceId);
              // // console.log(this.palceTableDataList)
              // // console.log(this.palceTableDataList.length)
              // this.selectedOptions.push(this.formData.placeId.split('-')[0])
              // this.selectedOptions.push(this.formData.placeId.split('-')[1])

              this.setionList = [];
              this.setionList = [{beginTime: this.formData.beginTime, endTime: this.formData.endTime}]

              let placeId=this.formData.placeId
              this.childrenPlaceId=[]

              // console.log(this.hasChildrenPlace)
              for (let i=0;i<this.hasChildrenPlace.length;i++){
                if (this.hasChildrenPlace[i].children.length>0){
                  // console.log(this.hasChildrenPlace[i])
                  for (let j=0;j<this.hasChildrenPlace[i].children.length;j++){
                    if (placeId === this.hasChildrenPlace[i].children[j].placeId){
                      this.childrenPlaceId.push(this.hasChildrenPlace[i].placeId)
                      this.childrenPlaceId.push(this.hasChildrenPlace[i].children[j].placeId)
                      // // console.log(this.childrenPlaceId)
                      break
                    }
                  }
                } else{
                  if (placeId === this.hasChildrenPlace[i].placeId) {
                    this.childrenPlaceId.push(placeId)
                    break
                  }
                }
              }
// console.log(this.childrenPlaceId)



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
