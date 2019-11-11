<template>
  <div class="sendObject-wrap">
    <header>
      <ul>

        <li :class="{active: item.isActive}" v-for="(item, index) of treeData" class="iconfont" :key="index">
          <el-tooltip popper-class="test" class="item" effect="dark" :content="`已选择${itemChecked(item)}项`" placement="bottom">
            <span>{{item.title}}</span>
          </el-tooltip>
        </li>
      </ul>
    </header>
    <section class="main">
      <div class="main__menu">
        <ul class="main__menu__box">
          <li class="main__menu__box__item" :class="{active: item.isActive}" v-for="(item, index) of menuData" @click="handleClick(item, index)" :key="index">{{item.subTitle}}</li>
        </ul>
      </div>
      <div class="main__content">
        <div v-for="(item, index) of menuData" v-show="item.isActive&&!item.single" :key="index">
          <el-checkbox :indeterminate="item.isCheckAll" v-model="item.checkAll" @change="handleCheckAllChange($event,item,index)">全选</el-checkbox>
          <div>
            <el-checkbox-group v-model="item.checked">
              <el-checkbox v-for="it in item.children" :label="it.id" :key="it.id">{{it.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div v-for="(item, index) of menuData" v-show="item.isActive&&item.single" :key="index">
          <div>
            <h1>{{item.single}}</h1>
            <el-radio-group v-model="item.checked">
              <el-radio :label="it.id" v-for="it in item.children" :key="it.id">{{it.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <slot></slot>
    </section>

    <section style="margin-top: 30px;">
      <el-button size="mini" type="primary" @click="back" :disabled="index===0">上一个</el-button>
      <el-button size="mini" type="primary" @click="next" :disabled="index === treeData.length - 1">下一个</el-button>
      <el-button size="mini" type="primary" @click="finish">完成</el-button>
    </section>
  </div>
</template>

<script>
/**
 * userName: 'DengShen'
 * createTime: '2019/2/27 14:37'
 */
import axios from 'axios'
import {getTypeBy} from '@/components/sendObject/api'

export default {
  name: 'sendObject',
  props: {
    header: {
      type: Array,
      default () {
        return []
      },
      required: true
    },
    list: {
      type: Array,
      default () {
        return [
          {
            title: '角色',
            codeType: 'role',
            isActive: true,
            data: []
          },
          {
            title: '学段',
            codeType: 'role',
            isActive: false,
            data: []
          }
        ]
      },
      required: false
    }
  },
  components: {},
  computed: {},
  watch:{
    header(val){
      // console.log(val)
    }
  },
  data () {
    return {
      isFinish: false,
      index: 0,
      isIndeterminate: false,
      treeData: this.header,
      menuData: [],
      checkAll: [],
      checked: [],
      sectionData: []
    }
  },
  mounted () {
    // console.log(this.header)
    this.init()
    this.$nextTick(() => {
    })
  },
  methods: {
    init () {
      this.initData()
    },
    initData () {
      this.menuData = this.treeData[this.index].children
      this.handleClick(this.menuData[0],0)
      // for (let i = 0; i < this.treeData.length; i++) {
      //   const treeDatum = this.treeData[i]
      //   if (!treeDatum.isActive) {
      //     this.menuData = this.treeData[--i].children
      //     this.$forceUpdate()
      //     return false
      //   }
      // }
      this.$forceUpdate()
    },
    handleClick (item, index) {
      if (this.isFinish) {
        return
      }
      this.menuData.forEach(item => {
        item.isActive = false
      })
      item.isActive = !item.isActive
      !item.checked.length && getTypeBy(item.url).then(res => {
        item.checked = []
        item.isCheckAll = false
        item.checkAll = false
        item.children = res.data.data
        this.$forceUpdate()
      })
    },
    handleSectionChange () {
      this.convertData()
    },
    handleCheckAllChange (e, item, index) {
      item.checked = e ? item.children.map(item => item.id) : []
      item.isCheckAll = false
    },
    convertData () {
      // for (const tree of this.treeData) {
      //   if (tree.code === 'area' && tree.children[0].checked.length) {
      //     tree.children[0].checked.forEach(child => {
      //       // console.log(child)
      //     })
      //   }
      // }
      this.$emit('finish', {header: this.treeData, menu: this.menuData, checked: this.checked})
    },
    next () {
      let currentData = this.treeData[this.index]
      this.handleClick(currentData.children[0],0)
      this.index++
      this.treeData[this.index].isActive = true
      let nextMenu = []

      switch (currentData.code) {
        case 'stage':
          currentData.children[0].checked.forEach(item => {
            currentData.children[0].children.forEach(it => {
              if (item === it.id) {
                nextMenu.push({
                  test: true,
                  isCheckAll: false,
                  checkAll: [],
                  checked: [],
                  children: [],
                  subTitle: it.name,
                  id: it.id,
                  isActive: false,
                  url: `/userapp/base/segmentGrade?type=2&id=${it.id}`
                })
              }
            })
          })
          this.treeData[this.index].children = nextMenu
          break
        case 'province':
          currentData.children[0].checked.forEach(item => {
            currentData.children[0].children.forEach(it => {
              if (item === it.id) {
                nextMenu.push({
                  isCheckAll: false,
                  checked: [],
                  subTitle: it.name,
                  id: it.id,
                  isActive: false,
                  children: [],
                  url: `/userapp/base/getArea?areaType=3&id=${it.id}`
                })
              }
            })
          })
          this.treeData[this.index].children = nextMenu
          break
        case 'city':
          let temp = []
          currentData.children.forEach(item1 => {
            item1.checked.forEach(item2 => {
              for (const child of item1.children) {
                if (item2 === child.id) {
                  temp.push({
                    title: child.name,
                    subTitle: child.name,
                    id: child.id,
                    isActive: false,
                    isCheckAll: false,
                    checked: [],
                    children: [],
                    url: `/userapp/base/getArea?areaType=4&id=${child.id}`
                  })
                }
              }
            })
          })
          this.treeData[this.index].children = temp
          break
        case 'area':
          currentData.children[0].checked.forEach(item => {
            currentData.children[0].children.forEach(it => {
              if (item === it.id) {
                nextMenu.push({
                  isCheckAll: false,
                  checked: [],
                  subTitle: it.name,
                  id: it.id,
                  children: [],
                  isActive: false,
                  url: `/userapp/base/getArea?areaType=4&id=${it.id}`
                })
              }
            })
          })
          this.treeData[this.index].children = nextMenu;
          break;
        case 'class':
          currentData.children.forEach(item => {
            item.forEach(ittem => {
            currentData.children[0].children.forEach(it => {
              if (ittem === it.id) {
                nextMenu.push({
                  isCheckAll: false,
                  checked: [],
                  subTitle: it.name,
                  id: it.id,
                  isActive: false,
                  children: [],
                  url: `/sm/base/schoolSegmentAd/segmentGrade?type=2&id=${it.id}`
                })
              }
            })
          })
          })
          this.treeData[this.index].children = nextMenu
          break
      }
      this.initData()
      this.$emit('next', {index: this.index})
      this.$forceUpdate()
    },
    back () {
      this.treeData[this.index].isActive = false
      this.index--
      this.initData()
      this.$emit('back', {index: this.index})
    },
    finish () {
      this.$message.success('选择完成')
      this.isFinish = true
      this.convertData()
    },
    itemChecked (item) {
      let count = 0
      item.children.forEach(it => {
        count += it.checked.length
      })
      return count
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
          padding: 0 10px;
          height: 30px;
          color: #707070;
          background-color: #e8e8e8;
          border-radius: 4px;
          position: relative;

          &:not(:last-child) {
            margin-right: 30px;

            &:after {
              position: absolute;
              right: -20px;
              content: "\e67e"
            }
          }

        }

        .active {
          color: white;
          background-color: $active;

          &:not(:last-child) {
            margin-right: 30px;

            &:after {
              color: $active;
              position: absolute;
              right: -20px;
              content: "\e67e"
            }
          }
        }
      }
    }

    .main {
      min-height: 300px;
      margin-top: 30px;
      display: flex;
      border: 1px solid $ccc;

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

        .el-checkbox + .el-checkbox {
          margin-left: 0;
          margin-right: 10px;

        }

        .el-checkbox {
          &:first-child {
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
