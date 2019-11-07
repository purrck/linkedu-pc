<template>
  <div class="sendObject-wrap mt20 pa20 bfff">
    <header>
      <ul>
        <li  v-for="(item, index) of treeData" :key="index">
          <div class="item" :class="{active: item.isActive}">
            {{item.title}}
            <i v-show="item.isCurrent" class="iconfont icon-icon_sanjaio_hui f12 c93BF88 "></i>
          </div>
          <div class="arrow">
            <i class="iconfont icon-icon_sanjaio_hui f12 cD8D8D8 " :class="{active: item.isActive}"></i>
          </div>

        </li>
      </ul>
    </header>
    <section class="main">
      <div class="main__menu">
        <ul class="main__menu__box">
          <li class="main__menu__box__item" :class="{active: menuIndex == index}" v-for="(item, index) of menu" @click="openData(item.url,index)" :key="index">{{item.name}}</li>
        </ul>
      </div>
      <div class="main__content">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>

        <span class="cFA6557" v-show="pageState == 'error'">{{pageInfo}}</span>
        <el-checkbox-group v-show="pageState != 'error'" v-model="checkedList" @change="handleSectionClick">
          <el-checkbox v-for="item in checkboxData" :label="item.id" :key="item.name" @change="checkboxClick($event,item)">{{item.name}}</el-checkbox>

        </el-checkbox-group>
      </div>
    </section>

    <section style="margin-top: 30px;">
      <el-button size="mini" type="primary" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "back" :disabled="index===0">上一步</el-button>
      <el-button size="mini" type="primary" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "next">下一步</el-button>
      <el-button size="mini" type="primary" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "finish">完成选择</el-button>
    </section>
  </div>
</template>

<script>
import {getTypeBy} from '@/components/sendObject/api'
import commonApi from "@/api/common/common";
import axios from 'axios'

export default {
  name: 'gg-sendObject',
  props: {

  },
  components: {},
  computed: {
    isNext:{
      get(){
        if(this.currentPage.selectionList.length){
          if(this.index == 2){
            return true;
          }else{
            return false;
          }
        }else{
          return true;
        }
      },
      set(val){
        this.index = val
      }
    },
    checkedList: {
      get(){
        if(!this.pageList[this.indexV2].menu[this.menuIndex]){
          this.pageList[this.indexV2].menu[this.menuIndex] = []
        }
        return this.pageList[this.indexV2].menu[this.menuIndex].selectList;
      },
      set(val){
        this.pageList[this.indexV2].menu[this.menuIndex].selectList = val
      }
    }
  },
  data () {
    return {
      curIndex : 0,
      index: 0,
      isIndeterminate: false,
      classList : [],
      pageIndex : 0,
      treeData: [
        {
          title : "1、选择角色/学段",
          isActive : true,
          isCurrent : false
        },
        {
          title : "2、选择年级",
          isActive : true,
          isCurrent : false
        },
        {
          title : "3、选择班级",
          isActive : true,
          isCurrent : false
        }/*,
        {
          title : "4、人员列表",
          isActive : true,
          isCurrent : true
        },
        {
          title : "5、选择班级",
          isActive : false,
          isCurrent : false
        }*/
      ],
      targetData : [],
      menuData: [
        {
          id : 0,
          selectionList : [],
          list : [
            {
              name : "角色",
              id : "",
              url : "/userapp/base/codeInt/list?codetypeId=userType",
              selectList : []
            },
            {
              name : "学段",
              id : "",
              url : "/userapp/base/segmentGrade?type=1",
              selectList : []
            }
          ]
        }
      ],
      page : [
        {
          list : [
            {
              name : "",
              selectList : []
            }
          ],

        },
        {
          list : [
            {
              name : "",
              selectList : []
            }
          ],

        }
      ],
      selectionList : [],
      checkAll: [],
      checked: [],
      currentPage : {selectionList:[]},
      callbackData : {},
      pageType : "",
      sectionData: [
        {
          name : "一班",
          id : "342342342424"
        },
        {
          name : "二班",
          id : "54623454672"
        }
      ],
      pageState: "",
      pageInfo : "",


      pageList : [],
      menu : [],
      checkboxData : [],
      indexV2 : 0,
      menuIndex : 0
    }
  },
  created(){
    this.init()
  },
  methods: {
    init () {
      
      for(let i=0; i<this.treeData.length; i++){
        this.pageList.push({
          menu : [
            {
              selectList : [],
              selectData : [],
              nextData : []
            }
          ],
          checkboxGroup : []
        })
      }

      this.pageList[0].menu = [
        {
          name : "学段",
          id : "1",
          url : "/userapp/base/segmentGrade?type=1",
          selectList : [

          ],
          selectData : [
            {
              name : "学段",
              id : "1",
              url : "/userapp/base/segmentGrade?type=1"
            }
          ],
          nextData : []
        }
      ]
      this.menu = this.pageList[0].menu
      this.openData(this.menu[0].url,0)

      // console.log(this.pageList)


      for(let i=1; i<this.treeData.length; i++){
        this.menuData.push({
          list:[],
          selectionList:[]
        })
      }
      this.menuData[0].id = ""
      this.menuData[0].list = [
        {
          name : "角色",
          id : "",
          url : "/userapp/base/codeInt/list?codetypeId=userType",
          selectList : [],
          type : "role"
        },
        {
          name : "学段",
          id : "",
          url : "/userapp/base/segmentGrade?type=1",
          selectList : []
        }
      ]
      this.targetData = this.menuData[0];
      this.targetData.selectionList.push({
          name : "角色",
          id : "",
          url : "/userapp/base/codeInt/list?codetypeId=userType",
          selectList : []
        })
      this.targetData.selectionList.push({
            name : "学段",
            id : 123,
            url : "/userapp/base/segmentGrade?type=1",
            selectList : []
          })
      this.handleClick(this.targetData.list[0],0)
      /*commonApi.getUserType().then(res => {
        // console.log(res)
        this.sectionData = res.data.data
      })*/
      this.initData()
    },
    openData(url,index){
      // console.log(this.indexV2,index)
      // console.log(this.checkedList)
      
      getTypeBy(url,{}).then(res => {
        
        res.data.data.map(item => {
            if(this.indexV2 == 0){
              item.url = `/userapp/base/segmentGrade?type=2&id=${item.id}`
            }
            if(this.indexV2 == 1){
              item.url = `/sm/base/classInfoAd/list?gradeId=${item.id}`
            }


        })
        this.checkboxData = res.data.data
        
        this.menuIndex = index;
        //this.pageList[this.indexV2].menu[this.menuIndex].selectList = [];
        // console.log(this.pageList)
      })
    },
    handleSectionClick(event){
      // console.log(event)
      //this.pageList[this.indexV2].menu[this.menuIndex].selectList =  event
      
      /*let b = [];
      event.map(item => {
        b = b.concat(this.checkboxData.filter(item1 => {
          return item1.id == item
        }))
      })*/
    },
    checkboxClick(event,item){
      //// console.log(item)
      // console.log(event)
      if(event){
        this.pageList[this.indexV2].menu[this.menuIndex].nextData.push(item);
      }
      if(!event){
        this.pageList[this.indexV2].menu[this.menuIndex].nextData = this.pageList[this.indexV2].menu[this.menuIndex].nextData.filter(item1 => {
          return item.id != item1.id
        })
      }

      // console.log(this.pageList)
      
    },


    initData () {
      this.treeData.map(item => {
        item.isActive = false;
        item.isCurrent = false
      });
      this.treeData[this.index].isActive = true;
      this.treeData[this.index].isCurrent = true
    },
    handleClick (data, index) {
      // console.log(data)
      getTypeBy(data.url,{}).then(res => {
        // console.log(this.index)
        if(res.data.resultCode == "100000"){
          this.pageState = "error"
          this.pageInfo = res.data.message
        }else{
          res.data.data.map(item => {
            //debugger
            if(this.index == 0 && data.type == "role"){
              item.type = "role"
            }
            if(this.index == 0 && data.type != "role"){
              item.url = `/userapp/base/segmentGrade?type=2&id=${item.id}`
              item.type = "segment"
            }
            if(this.index == 1){
              item.url = `/sm/base/classInfoAd/list?gradeId=${item.id}`
              item.type = "grade"
            }

          })
          this.sectionData = res.data.data
        }

      })

      this.curIndex = index;

    },
    handleSectionChange (val) {

      this.menuData[this.index].list[this.curIndex].selectList =  val

      this.classList = val;

    },
    handleCheckAllChange (val) {
      this.checked = val ? this.sectionData : []
      this.isIndeterminate = false
    },
    checkboxChange(event,data){
      // console.log(data)

      if(data.type == "role"){
        return ;
      }

      if(this.index == 2){
        return ;
      }

        this.currentPage = this.menuData[this.index+1];
        if(event == false){
          this.currentPage['selectionList'] = this.currentPage['selectionList'].filter(item => {
            return item.id != data.id
          })
        }
        if(event == true){
          this.currentPage['selectionList'].push({
            type : data.type,
            name : data.name,
            id : data.id,
            url : data.url,
            selectList : []
          })
        }
      // console.log(this.menuData[this.index])
    },
    setCall(){
      if(this.index == 0 && this.curIndex == 0){
        this.callbackData['role'] = this.menuData[this.index].list[this.curIndex].selectList
      }
      if(this.index == 0 && this.curIndex == 1){
        this.callbackData['segment'] = this.menuData[this.index].list[this.curIndex].selectList
      }
      if(this.index == 1){
        this.callbackData['grade'] = this.menuData[this.index].list[this.curIndex].selectList
      }
      if(this.index == 2){
        this.callbackData['class'] = this.menuData[this.index].list[this.curIndex].selectList
      }
    },
    convertData () {
      // console.log(this.menuData)
      let _a = {
        role : [],
        segment : [],
        grade : [],
        class : []
      }
      let d = this.menuData;
      d.map((item,index) => {
        item.list.map((item1,index1) => {
          //debugger
          if(index == 0){
            if(index1 == 0){
              _a['role'] = item1.selectList;
            }
            if(index1 == 1){
              _a['segment'] = item1.selectList;
            }
          }
          if(index == 1){
            _a['grade'] = _a['grade'].concat(item1.selectList);
          }
          if(index == 2){
            _a['class'] = _a['class'].concat(item1.selectList);
          }
        })

      });
      // console.log(_a)
      // console.log(this.callbackData)
      this.$emit('callback', _a)
    },
    next () {
      
      if(this.index == 2){
        return;
      }

      this.treeData.map(item => {
        item.isCurrent = false
      });
      this.index++

      for(let i=1; i<=this.index; i++){
        this.treeData[i].isActive = true;
      }
      this.treeData[this.index].isCurrent = true

      


      if(this.indexV2 == 2){
        return ;
      }
      this.menu = []
      this.pageList[this.indexV2].menu.map(item => {
        this.menu = this.menu.concat(item.nextData)
      })

      this.openData(this.menu[0].url,0)

      
      this.indexV2++
      this.menu.map(item => {
        this.pageList[this.indexV2].menu.push({
          selectList : [],
          selectData : []
        })
      })
    },
    back () {
      if(this.index == 0){
        return;
      }
      this.treeData.map(item => {
        item.isActive = false;
        item.isCurrent = false
      });
      this.index--;
      for(let i=0; i<=this.index; i++){
        this.treeData[i].isActive = true;
      }
      this.treeData[this.index].isCurrent = true

      if(this.indexV2 == 0){
        return ;
      }
      this.indexV2--
      this.menu = []
      // console.log(this.pageList)
      this.pageList[this.indexV2].menu.map(item => {
        this.menu = this.menu.concat(item.selectData)
      })

      this.openData(this.menu[0].url,0)

      
      
    },
    finish () {
      this.convertData()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  $ccc: #D8D8D8;
  $active: #93BF88;
  .sendObject-wrap {
    header {
      & > ul {
        display: flex;

        li {
          display: flex;
          align-items: center;
          justify-content: center;
          .arrow{
            padding:0 10px;
          }
          .arrow i{
            transform: rotate(271deg);
          }


          &:not(:last-child) {
            //margin-right: 30px;

            /*&:after {
              position: absolute;
              right: -20px;
              content: ">"
            }*/
          }
          .item{
            background-color: #e8e8e8;
            color:#707070;
            padding:10px;
            border-radius: 4px;
            position: relative;
            font-size:14px;
          }

          .item i{
            position:absolute;
            bottom:-10px;
            left:50%;
            margin-left:-6px;
          }
          .arrow i.active{
            color: $active;
          }
          .item.active {
            color: white;
            background-color: $active;

            /*&:not(:last-child) {
              margin-right: 30px;

              &:after {
                color: $active;
                position: absolute;
                right: -20px;
                content: ">"
              }
            }*/
          }

        }

        li:last-child .arrow{
            display:none
          }


      }
    }

    .main {
      min-height: 300px;
      margin-top: 30px;
      display: flex;
      border: 1px solid $ccc;
      border-radius: 5px;
      .active {
        color: white;
        background-color: $active;
      }

      &__menu {
        width: 200px;

        &__box {
          &__item {
            display: flex;
            align-items: center;
            height: 35px;
            padding: 0 15px;
            border-bottom: 1px solid $ccc;
          }
        }
      }

      &__content {
        padding: 20px;
        flex: 1;
        border-left: 1px solid $ccc;
      }
    }
  }
</style>
