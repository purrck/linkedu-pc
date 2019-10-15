<template>
    <el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                    style="min-height: 600px"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-main class="pt-15">
            <div class="pl30">
                <!--<SendObject :header="header" @finish="finish"></SendObject>-->
                <xx-sendObject  @callback="finish"></xx-sendObject>
            </div>
        </el-main>
    </el-container>
</template>

<script>

    import { bulletinUserRuleAdNew } from '@/api/safety/bulletin/bulletinInfo'
    import commonApi from '@/api/common/common'
    import SendObject from "../../../components/sendObject/testSendObject";
    import { mapGetters, mapMutations } from 'vuex';
    export default {
        components : {SendObject},
        data() {
            return {
                checkedClass : [],
                checkedGrade : [],
                userTypeList : [],
                userType : "",
                gradeList : [],
                grade : "",
                classList : [],
                segment : "",
                formData : {

                },
                header: [
          {
            title: '1、通知角色/学段',
            isActive: true,
            code: 'stage',
            children: [
              {
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '角色',
                subTitleType : "role",
                isActive: false,
                url: '/userapp/base/codeInt/list?codetypeId=userType'
              },
              {
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '学段',
                subTitleType : "segment",
                isActive: false,
                url: '/userapp/base/segmentGrade?type=1'
              }
            ]
          },
          {
            title: '2、选择年级',
            isActive: false,
            code: 'class',
            children: [
              {
                checked: [],
                children: [],
                subTitle: '年级',
                isActive: false,
                url: '/userapp/base/segmentGrade?type=2'
              },
            ]
          },
          {
            title: '3、选择班级',
            isActive: false,
            code: 'persons',
            children: [
              {
                checked: [],
                children: [],
                subTitle: '人员',
                isActive: false,
                url: '/sm/user/schoolPerson/option'
              },
            ]
          },
        ],
            }
        },
        computed: {
            ...mapGetters(['isLoading']),
            segmentList(){
                return this.$store.getters.getSementGradeClass;
            },
            bulletinId(){
              return this.$route.query.bulletinId
            }
        },
        created(){
            
            this.SET_IS_LOADING(false)
           /* this.$store.dispatch("subjectTeacherTree").then(res => {
                console.log("222")
            })
            commonApi.getCodeIntType('userType').then(item => {
                this.userTypeList = item.data.data
            })*/
        },
        methods:{
            ...mapMutations(["SET_IS_LOADING"]),
            finish(data){
              console.log(data)
              let _a = {
                "bulletinId":this.bulletinId,
                "scopeVO":{
                  "roleIds":data.role,		
                  "segmentIds":data.segment,		
                  "gradeIds":data.grade,
                  "classIds":data.class
                }
              }

              /*_a.scopeVO.segmentIds = data.header[0].children[1].checked

              _a.scopeVO.roleIds = data.header[0].children[0].checked
              _a.scopeVO.gradeIds = data.header[1].children[0].checked
              _a.scopeVO.classIds = data.header[2].children[0].checked*/
              

              console.log(_a);

              bulletinUserRuleAdNew(_a).then((res) => {
                  if (res.data.resultCode === "000000") {
                    this.$message.success("发送成功");
                    this.$router.push({ path: `/safety/bulletin` })
                  } else {
                    this.$message.error(res.data.message);
                  }
              })
              
            },
            gradeClick(event){
                this.classList = event.children[0].children
            },
            segmentChange(){

            },
            segmentClick(index){

                
                this.gradeList = this.segmentList[index].children
                console.log(this.gradeList)
            },
            handlerReview(){
                //let content = this.$refs.ue.getUEContent();
                let content = this.form1.content;
                var storage=window.localStorage;
                    storage.setItem("reviewContent",content);
                //this.review.visible = true;
                console.log(this.form1)
                this.$router.push({ path: `/safety/preview` , query : this.form1 })
                
            }
        }
    }
</script>