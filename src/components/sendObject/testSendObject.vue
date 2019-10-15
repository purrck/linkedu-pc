<template>
  <div class="sendObject-wrap">
    <header>
      <ul>

        <li :class="{active: item.isActive}" v-for="(item, index) of treeData" class="iconfont" :key="index">
          <el-tooltip popper-class="test" class="item" effect="dark" :content="`已选择${itemChecked(item)}项`"
                      placement="bottom">
            <span class="f12">{{item.title}}</span>
          </el-tooltip>
        </li>
      </ul>
    </header>
    <section class="main">
      <div class="disabledItem " v-show="locked"></div>

      <div class="main__menu">
        <ul class="main__menu__box">
          <li class="main__menu__box__item" :class="{active: item.isActive}" v-for="(item, index) of menuData"
              @click="handleClick(item, index)" :key="index">{{item.subTitle}}
          </li>
        </ul>
      </div>
      <div class="main__content">
        <div v-for="(item, index) of menuData" v-show="item.isActive&&!item.single" :key="index">
          <el-checkbox :indeterminate="item.isCheckAll" v-model="item.checkAll"
                       @change="handleCheckAllChange($event, item,index)">全选
          </el-checkbox>
          <div>
            <el-checkbox-group v-model="item.checked">
              <el-checkbox v-for="it in item.children" :label="it.id" :key="it.id">{{it.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div v-for="(item, index) of menuData" v-show="item.isActive&&item.single" :key="index">
          <div>
            <el-radio-group v-model="item.checked" @change="deleteOther($event, item,index)">
              <el-radio :label="it.id" v-for="it in item.children" :key="it.id">{{it.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <!--<div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center" v-show="!menuData|| !menuData.length">-->
        <!--找不到对应数据-->
        <!--</div>-->
      </div>
      <slot></slot>
    </section>
    <section style="margin-top: 30px;">
      <el-button size="mini" type="primary" @click="back" v-if="!locked" :disabled="index===0">上一个</el-button>
      <el-button size="mini" type="primary" @click="next" v-if="!locked" :disabled="isNext">下一个
      </el-button>
      <el-button size="mini" type="primary" @click="finish" v-if="!locked">完成选择</el-button>
      <el-button size="mini" type="primary" @click="showFinish" v-else>重新选择</el-button>
    </section>


  </div>
</template>

<script>
  /**
   * userName: 'DengShen'
   * createTime: '2019/2/27 14:37'
   */
  import {getTypeBy} from '@/components/sendObject/api'

  export default {
    name: 'sendObject',
    props: {
      header: {
        type: Array,
        default() {
          return [
            {
              title: '1、学段',
              isActive: true,
              code: 'segment',
              children: [
                {
                  isCheckAll: false,
                  checked: [],
                  children: [],
                  subTitle: '学段',
                  subTitleType: 'segment',
                  single: true,
                  isActive: false,
                  url: '/userapp/base/segmentGrade?type=1'
                },
              ]
            },
            {
              title: '2、选择年级',
              isActive: false,
              code: 'grade',
              children: [
                {
                  isCheckAll: false,
                  checked: [],
                  children: [],
                  subTitle: '年级',
                  subTitleType: 'grade',
                  single: true,
                  isActive: false,
                  url: '/userapp/base/segmentGrade?type=2'
                },
              ]
            },
            {
              title: '3、选择班级',
              isActive: false,
              code: 'class',
              children: [
                {
                  isCheckAll: false,
                  checked: [],
                  children: [],
                  subTitle: '班级',
                  single: true,
                  subTitleType: 'class',
                  isActive: false,
                  url: ''
                },
              ]
            },
            {
              title: '4、选择学生',
              isActive: false,
              code: 'students',
              children: [
                {
                  isCheckAll: false,
                  checked: [],
                  children: [],
                  subTitle: '学生',
                  subTitleType: 'students',
                  single: true,
                  isActive: false,
                  url: ''
                },
              ]
            },
            {
              title: '5、选择家长',
              isActive: false,
              code: 'parents',
              children: [
                {
                  isCheckAll: false,
                  checked: [],
                  children: [],
                  subTitle: '家长',
                  subTitleType: 'parents',
                  single: true,
                  isActive: false,
                  url: ''
                },
              ]
            },
          ]
        },
        required: true
      },
      list: {
        type: Array,
        default() {
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
    computed: {
      isNext: {
        get() {
          if (this.treeData[this.index].children.some(res => {
            return  res.checked.length !== 0
          })) {
            if (this.index < this.header.length -1) {
              return false;
            } else {
              return true;
            }
          } else {
            return true;
          }
        },
      }
    },
    data() {
      return {
        isFinish: false,
        locked: false,
        index: 0,
        isIndeterminate: false,
        treeData: this.header,
        menuData: [],
        checkAll: [],
        checkedArr: [],
        checked: [],
        sectionData: [],
        callbackData: {}
      }
    },
    mounted() {
      this.init()
      this.$nextTick(() => {
      })
    },
    methods: {
      init() {
        console.log(`sendObject is running...`)
        this.getChecked(this.header);
        // console.error(arr);
        this.initData()
      },
      initData() {
        this.menuData = this.treeData[this.index].children;
        this.menuData.forEach(item => {
          item.isActive = false
        });
        let isNesx = this.treeData[this.index].children.some(res => {
          console.log(res.checked)
          return res.checked.length !== 0
        })
        console.log(isNesx);
        this.menuData[0].isActive = true;
        this.handleClick(this.menuData[0], 0);
        this.$forceUpdate()
      },
      getChecked(datas) {
        let arr = [];
        datas.forEach(res => {
          res.children.forEach(child => {
            let obj = {};
            obj['key'] = child.subTitleType;
            obj['value'] = child.checked;
            obj['single'] = child.single;
            arr.push(obj);
          })
        });
        this.checkedArr = arr;
        console.log(arr);
      },
      handleClick(item, index) {
        console.log(item.single);
        this.menuData.forEach(it => {
          it.isActive = false
        });
        item.isActive = !item.isActive;
        !item.children.length && getTypeBy(item.url).then(res => {
          let resChecked = '';
          let resSingle = '';
          this.checkedArr.forEach(res => {
            if (res.key === item.subTitleType) {
              resChecked = res.value;
              resSingle = res.single;
            }
          });
          item.checked = resChecked || [];
          item.single = resSingle || false;
          item.children = res.data.data;
          this.$forceUpdate()
        })
      },
      handleSectionChange() {
        this.convertData()
      },
      handleCheckAllChange(e, item, index) {

        item.checked = e ? item.children.map(item => item.id) : [];
        item.isCheckAll = false
      },
      deleteOther(e, item, index) {
        console.log(item);

        this.treeData[this.index + 1].children.forEach(res => {
          res.checked = [];
        })
      },
      convertData() {
        this.$emit("callback", this.callbackData);
        this.$emit('finish', {header: this.treeData, menu: this.menuData, checkedArr: this.checkedArr});
      },
      next() {
        let nextMenu = [];
        let arr = [];
        let currentData = this.treeData[this.index];
        this.index++;
        this.treeData[this.index].isActive = true;
        currentData.children.forEach(item => {
          if (item.subTitleType !== "role") {
            if (item.single) {
              arr.push(item.checked);
            } else {
              arr.push(...item.checked);
            }
          }
        });
        switch (currentData.code) {
          case 'segment':
            arr.forEach(item => {
              currentData.children.forEach(itemChild => {
                itemChild.children.forEach(child => {
                  if (item === child.id) {
                    nextMenu.push({
                      isCheckAll: false,
                      checkAll: [],
                      checked: [],
                      children: [],
                      subTitle: child.name,
                      subTitleType: 'grade', //规定下一级属于什么
                      id: child.id,
                      isActive: false,
                      url: `/sm/base/schoolSegmentAd/segmentGrade?type=2&id=${child.id}`
                    })
                  }
                })
              })
            });
            this.treeData[this.index].children = this.unique(nextMenu);
            break;
          case 'grade':

            arr.forEach(item => {
              currentData.children.forEach(itemChild => {

                itemChild.children.forEach(child => {
                  if (item === child.id) {
                    nextMenu.push({
                      isCheckAll: false,
                      checkAll: [],
                      checked: [],
                      children: [],
                      subTitle: child.name,
                      subTitleType: 'class',//规定下一级属于什么
                      id: child.id,
                      isActive: false,
                      url: `/sm/base/classInfoAd/list?gradeId=${child.id}`
                    })
                  }
                })
              })
            })
            this.treeData[this.index].children = this.unique(nextMenu)
            break
          case 'class':

            arr.forEach(item => {
              currentData.children.forEach(itemChild => {

                itemChild.children.forEach(child => {
                  if (item === child.id) {
                    nextMenu.push({
                      isCheckAll: false,
                      checkAll: [],
                      checked: [],
                      children: [],
                      subTitle: child.name,
                      subTitleType: 'students',//规定下一级属于什么
                      id: child.id,
                      isActive: false,
                      url: `/sm/user/schoolPerson/option?roleId=F&classIds=${child.id}`
                    })
                  }
                })
              })
            });

            this.treeData[this.index].children = this.unique(nextMenu)
            break
          case 'students':

            arr.forEach(item => {
              currentData.children.forEach(itemChild => {
                itemChild.children.forEach(child => {
                  if (item === child.id) {
                    nextMenu.push({
                      isCheckAll: false,
                      checkAll: [],
                      checked: [],
                      children: [],
                      subTitle: child.name,
                      id: child.id,
                      isActive: false,
                      subTitleType: 'parents',//规定下一级属于什么
                      url: `/sm/user/schoolPerson/listStudentParent?ids=${child.id}&isGetParent=true`
                    })
                  }
                })
              })
            });

            this.treeData[this.index].children = this.unique(nextMenu)

            break
          case 'province':
            arr.forEach(item => {
              currentData.children.forEach(itemChild => {
                itemChild.children.forEach(child => {
                  if (item === child.id) {
                    nextMenu.push({
                      isCheckAll: false,
                      checkAll: [],
                      checked: [],
                      children: [],
                      subTitle: child.name,
                      id: child.id,
                      isActive: false,
                      url: `/userapp/base/getArea?areaType=3&id=${child.id}`
                    })
                  }
                })
              })
            })
            this.treeData[this.index].children = nextMenu
            break
          case 'city':
            let temp = []
            arr.forEach(item => {
              currentData.children.forEach(itemChild => {
                itemChild.children.forEach(child => {
                  if (item === child.id) {
                    temp.push({
                      isCheckAll: false,
                      checkAll: [],
                      checked: [],
                      children: [],
                      subTitle: child.name,
                      id: child.id,
                      isActive: false,
                      url: `/userapp/base/getArea?areaType=4&id=${child.id}`
                    })
                  }
                })
              })
            })
            this.treeData[this.index].children = temp
            break
          case 'area':
            arr.forEach(item => {
              currentData.children.forEach(itemChild => {
                itemChild.children.forEach(child => {
                  if (item === child.id) {
                    nextMenu.push({
                      isCheckAll: false,
                      checkAll: [],
                      checked: [],
                      children: [],
                      subTitle: child.name,
                      id: child.id,
                      isActive: false,
                      url: `/userapp/base/getArea?areaType=4&id=${it.id}`
                    })
                  }
                })
              })
            })
            this.treeData[this.index].children = nextMenu;
            break;
        }
        this.initData()
        this.$emit('next', {index: this.index})
        this.$forceUpdate()
      },
      back() {
        this.treeData[this.index].isActive = false
        this.index--;
        // this.initData()
        this.menuData = this.treeData[this.index].children;
        this.$emit('back', {index: this.index})
      },
      finish() {
        this.locked = true;
        this.$message.success('选择完成')
        // this.isFinish = true

        this.convertData()
      },
      showFinish() {
        this.locked = false;
      },
      itemChecked(item) {
        let count = 0
        item.children.forEach(it => {
          count += it.checked.length
        })
        return count
      },
      unique(arr) {
        let res = arr
        let hash = {}
        let result = arr.reduce((curr, next) => {
          if (!hash[next.id]) {
            hash[next.id] = true
            curr.push(next)
          }
          return curr
        }, [])
        res = result
        return res
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  $ccc: #D8D8D8;
  $active: #93BF88;
  .disabledItem {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #e8e8e8;
    opacity: 0.5;
    z-index: 100;
  }

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
      margin-top: 34px;
      display: flex;
      position: relative;
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
