<template>
  <div class="BasicSchoolDormitory">
    <!--<el-button size="small" type="primary" @click="addChapter" v-show="true">打开来访记录</el-button>-->
    <!--<el-button size="small" type="primary" @click="initWebSocket" v-show="true">开始连接</el-button>-->
    <!--<el-button size="small" type="primary" @click="closeWebSocket" v-show="true">关闭连接</el-button>-->
    <!--<el-button size="small" type="primary" @click="tianjia" v-show="true">添加数据</el-button>-->
    <!--<el-button size="small" type="primary" @click="visitorToLogin" v-show="true">登录</el-button>-->


    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">
          <!--<el-form-item label="宿舍id:"  prop="dormitoryId" class="w140">-->
          <!--<el-input class="input-v2-rao" v-model="searchForm.dormitoryId" maxlength="30"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="宿舍编号:" prop="dormitoryNum" class="w140">
            <!--宿舍编号（楼栋+楼层+序号）-->
            <el-input class="input-v2-rao" v-model="searchForm.dormitoryNum" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="宿舍名称:" prop="dormitoryName" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.dormitoryName" maxlength="30"></el-input>
          </el-form-item>

          <!--<el-form-item label="宿舍类型:" prop="dormitoryTypeCode" class="w140">-->
          <!--&lt;!&ndash;宿舍类型代码（来自于字典）区分男生，女生，教职工，其他:&ndash;&gt;-->
          <!--<el-select class="select-v2-rao" v-model="searchForm.dormitoryTypeCode" placeholder="请您选择">-->
          <!--<el-option v-for="dormitoryTypeCodeItem in dormitoryTypeCodeOptions"-->
          <!--:key="dormitoryTypeCodeItem.name"-->
          <!--:label="dormitoryTypeCodeItem.label" :value="dormitoryTypeCodeItem.name">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->

          <el-form-item label="宿舍类型 :" prop="dormitoryTypeCode">
            <el-select class="select-v2-rao" v-model="searchForm.dormitoryTypeCode" placeholder="请您选择">
              <el-option v-for="classStudentStatusCodeItem in dormitoryTypeCodeOptions"
                         :key="classStudentStatusCodeItem.name"
                         :label="classStudentStatusCodeItem.label" :value="classStudentStatusCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>

          <!--<el-form-item label="学生性别:" prop="genderCode" class="w140">-->
          <!--<el-select class="select-v2-rao" v-model="searchForm.genderCode" placeholder="请您选择">-->
          <!--<el-option v-for="genderCodeItem in genderCodeOptions"-->
          <!--:key="genderCodeItem.name"-->
          <!--:label="genderCodeItem.label" :value="genderCodeItem.name">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
            <!--<el-button type="primary" @click="resetForm('searchForm')" class="button-v2-rao b93BF88">重置</el-button>-->
          </el-form-item>
        </el-form>
      </el-header>

      <div class="bt border-color-e8e8e8 mt10 mb10"></div>

      <el-main class="pt-15">
        <el-row class="mb10">
          <el-col :span="24" class="text-left mb-10 flex row btns x-center space-between">

            <div class="flex space-between row btns-msg f12">
              <div>
                <i class="iconfont icon-icon_shanchu_p" style="color: #93BF88;"></i>
                <span class="c707070">已选择<span class="bold c93BF88"> {{multipleSelection.length}} </span>项</span>
              </div>
              <div>
                <span class="c707070">共搜索到<span class="bold c93BF88"> {{data.total}} </span>条数据</span>
                <i class="iconfont icon-icon_shuju" @click="toTotal" style="color: #93BF88;"></i>
              </div>
            </div>
            <el-button type="primary" size="small" class="button-v2-rao b93BF88 " @click="toAdd">
              <i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增
            </el-button>
            <el-button type="primary" size="small" class="button-v2-rao bFA6557" @click="toDel"
                       :disabled="!multipleSelection.length > 0">
              <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
            </el-button>
          </el-col>
        </el-row>

        <div class="table">

          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true"
                    @sort-change="sortChange">
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="dormitoryNum" align="center" label="宿舍编号" sortable="custom">
              <!--宿舍编号（楼栋+楼层+序号）-->
              <template slot-scope="scope">
                <div v-if="scope.row.dormitoryNum" class="one-line">{{scope.row.dormitoryNum}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="dormitoryName" align="center" label="宿舍名称" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.dormitoryName" class="one-line">{{scope.row.dormitoryName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>

            <el-table-column prop="dormitoryTypeCode" label="宿舍类型" align="center" sortable="custom">
              <!--宿舍类型代码（来自于字典）区分男生，女生，教职工，其他-->
              <template slot-scope="scope">
                            <span :style="{color:scope.row.dormitoryTypeCodeStr.split(';')[1]}"
                                  v-if="scope.row.dormitoryTypeCodeStr">{{scope.row.dormitoryTypeCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>


            <!--<el-table-column prop="maxUser" align="center" label="宿舍可入住最大人数" sortable="custom">-->
            <!--<template slot-scope="scope">-->
            <!--<div v-if="scope.row.maxUser" class="one-line">{{scope.row.maxUser}}</div>-->
            <!--<div v-else>无</div>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="roomNum" align="center" label="房间总数" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.roomNum" class="one-line">{{scope.row.roomNum}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <!--<el-table-column prop="genderCode" label="学生性别" align="center" sortable="custom">-->
            <!--<template slot-scope="scope">-->
            <!--<span :style="{color:scope.row.genderCodeStr.split(';')[1]}"-->
            <!--v-if="scope.row.genderCodeStr">{{scope.row.genderCodeStr.split(';')[0]}}</span>-->
            <!--<span v-else>无</span>-->
            <!--</template>-->
            <!--</el-table-column>-->


            <!--<el-table-column prop="buildingName" align="center" label="楼栋名称" sortable="custom">-->
            <!--<template slot-scope="scope">-->
            <!--<div v-if="scope.row.buildingName" class="one-line">{{scope.row.buildingName}}</div>-->
            <!--<div v-else>无</div>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="sequnceNum" align="center" label="序号" sortable="custom">-->
            <!--<template slot-scope="scope">-->
            <!--<div v-if="scope.row.sequnceNum" class="one-line">{{scope.row.sequnceNum}}</div>-->
            <!--<div v-else>无</div>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="操作00" fixed="right" >-->
            <el-table-column label="操作">
              <template slot-scope="scope">

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover">
                    <span slot="reference"
                          @click.stop="toEdit(scope.row.dormitoryId)"><i
                      class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
                </el-popover>

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference"
                          @click.stop="toDetail(scope.row.dormitoryId)"><i
                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">
                  <span slot="reference"
                        @click.stop="rowDel(scope.row.dormitoryId)"><i
                    class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                </el-popover>

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="学校宿舍房间" trigger="hover">
                      <span slot="reference"
                            @click.stop="toAnother(scope.row.dormitoryId ,`listBasicSchoolDormitoryRoom`,scope.row.dormitoryNum,scope.row.dormitoryName)"><i
                        class="iconfont icon-room ml5 f20 c999999"></i></span>
                </el-popover>

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="宿舍管理老师" trigger="hover">
                      <span slot="reference"
                            @click.stop="toAnother(scope.row.dormitoryId ,`listBasicSchoolDormitoryTeacher`,scope.row.dormitoryNum,scope.row.dormitoryName)"><i
                        class="iconfont icon-teacher ml5 f20 c999999"></i></span>
                </el-popover>

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="学生住宿" trigger="hover">
                      <span slot="reference"
                            @click.stop="toAnother(scope.row.dormitoryId ,`listBasicSchoolDormitoryStudent`,scope.row.dormitoryNum,scope.row.dormitoryName)"><i
                        class="iconfont icon-dormitory ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="宿舍出入记录" trigger="hover">
                      <span slot="reference"
                            @click.stop="addChapter(scope.row)">
                        <i class="iconfont icon-qingjiaguanli ml5 f20 c999999"></i></span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <div class="paging text-right">
        <el-pagination class="pagination-v2-rao" :page-sizes="[10,20,30]" :page-size="data.size" :total="data.total"
                       :current-page="data.current" layout="total, sizes, prev, pager, next, jumper"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <el-dialog title="" :visible.sync="dialogDelete" center width="22%">
        <div class="text-center">
          <i class="iconfont icon-icon_tc_shanchu_hong ml5 f30 cFA6557"></i>
          <p class="text-center fs-16 color333 mt-20">是否确认删除?</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" class="border-color-cccccc c000000 bfff" @click="dialogDeleteComfireHandler"
                     :loading="isDel">是
          </el-button>
          <el-button type="primary" class="b93BF88" @click="dialogDeleteCancelHandler">否</el-button>
        </div>
      </el-dialog>

      <!-- 提示信息 -->
      <div class="tips-school tips-rao" v-if="msgShow">
        <img src="~@/assets/img/icon-warning.png" width="20"/>
        请至少选择一项内容!
      </div>
    </el-container>


    <div class="two">

      <el-dialog title="" :visible.sync="chapterVisible" width="100%">
        <!--<el-button size="small" type="primary" @click="chooseStdent=!chooseStdent">打开选择学生</el-button>-->

        <div class="top flex row x-center">
          <div class="a" style="flex: 1"><img src="~@/assets/img/dormitory.png" alt=""></div>
          <!--<span class="visitorListLogin" @click="visitorToLogin(item,index)">登记</span>-->

          <div class="allNum">宿舍总数:<span class="c428675">{{liveingStudentNum}} </span>人 ｜ 来访人数:<span
            class="c428675"> {{visitNum}} </span>人 请假人数:<span class="c428675"> {{studentsLeaveNum}} </span>人
          </div>
          <!--<el-button size="small" type="primary" @click="filterData" v-show="true">添加数据</el-button>-->
          &nbsp &nbsp
          <div class="top-linLogo"><img src="~@/assets/img/icon-shape-lin.png"/></div>
          &nbsp &nbsp
          <div class="top-userInfo bl flex row x-center"
               style="border: 1px solid #93BF88;padding: 5px;border-radius: 30px">
            <el-tooltip class="item" effect="dark" content="用户头像" placement="bottom">
              <img style="width: 30px;height: auto;border-radius: 50%;" class="top-userImg"
                   src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557290967723&di=f5ee0c93e97ebd1447d1f23e96943950&imgtype=0&src=http%3A%2F%2Fimg0.itiexue.net%2F1923%2F19239948.jpg"/>
            </el-tooltip>
            &nbsp &nbsp
            <el-dropdown>
          <span class="el-dropdown-link">
            <span>{{dormitoryName}} </span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
              <el-dropdown-menu slot="dropdown">
                <!--<el-dropdown-item  ><p>0000000</p></el-dropdown-item>-->
                <!--<el-dropdown-item @click.native="logout" divided>退出</el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                      element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
          <el-header style="height: auto">
            <span class="time" id="times"></span>
            <!--<el-tabs class="right"  >-->
            <!--<el-tab-pane label="用户管理" name="first"></el-tab-pane>-->
            <!--<el-tab-pane label="配置管理" name="second"></el-tab-pane>-->
            <!--</el-tabs>-->
            <div style="clear: both;border-top: 1px solid #E8E8E8;margin: 10px 0;"></div>
          </el-header>

          <div class="video">
            <div class="videoLeft">
              <div class="visitorData" >
                <img v-show="inManPic" style="display:block; "
                  :src="inManPic"
                  alt="">
                <img v-show="!inManPic" style="display:block; "
                  src="https://static.tuputech.com/api/image/original/bi-api/storage-0831/2019-06-11/09-21/5ce4ca3dcef78f891bfdb732/15602169162590.8066246718676189.jpg"
                  alt="">
              </div>
              <div class="getinNumberBox" ></div>
              <div class="getinNumber" >
                <i class="iconfont icon-qingjiaguanli left pl10 pr10 f20 pt5 cfff "></i>
                <span class="left">进入人员</span>
                <span class="right">总人数:<span>{{getInNum}}</span>人</span>
              </div>

              <!--<div class="getOutpicture"></div>&lt;!&ndash;//半透明背景&ndash;&gt;-->
              <!--<div class="getOutpictureList" @mouseleave="hiddenLetGO" ref="visitorEnterPic" style="overflow: hidden;">-->
                <!--<i class="iconfont icon-icon_quxiaozhiding1 cFA6557"-->
                   <!--style="float: left;line-height: 60px;padding: 0 10px 0 0"></i>-->
                <!--<span v-for="(item,index) in getInStrangers">-->
                  <!--<span style="position: relative">-->
                    <!--<img class="getOutVisitorList" @mouseover="showEnterpic(item)" :src="item.imagePath" alt="">-->
                    <!--<i v-show="item.isShow" @click="enter(item,index)" class="iconfont icon-gouzi cfff letGo"-->
                       <!--style="border:1px solid;border-radius: 50%"></i>-->
                  <!--</span>-->
                <!--</span>-->
                <!--<div @click="showAEnterll" class=""-->
                     <!--style="position: absolute;right:0;top: 0; width: 50px;height: 60px;">-->
                  <!--<i v-show="!showEnterVisitorPic" class="iconfont icon-icon_zuojiantoucopy1 cfff letGo"-->
                     <!--style="float: right;line-height: 60px;padding-top: 20px"></i>-->
                  <!--<i v-show="showEnterVisitorPic" class="iconfont icon-icon_zuojiantoucopy cfff letGo"-->
                     <!--style="float: right;line-height: 60px;padding-top: 20px"></i>-->
                <!--</div>-->
                <!--&lt;!&ndash;<img  class="getOutVisitorList" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg" alt="">&ndash;&gt;-->
              <!--</div>-->

              <div class="wantInVisitorlist " >
                <p class="pb5 pl10" v-for="(item,index) in getInAll">
                  <img v-show="!item.imagePath"
                       style="width: 40px;height: 40px;border-radius: 50%;display:inline-block;vertical-align:middle"
                       src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559815360925&di=211ed55372884426c21029a56b86f7f0&imgtype=0&src=http%3A%2F%2Fimg.18183.com%2Fuploads%2Fallimg%2F180906%2F235-1PZ6102538.jpg"
                       alt="">
                  <img class="hover" v-show="item.imagePath"
                       style="width: 40px;height: 40px;border-radius: 50%;display:inline-block;vertical-align:middle"
                       :src="item.imagePath" @click="showInBigImg(item)" alt="">
                  <span class="visitorList" v-show="item.studentName">{{item.studentName}}</span>
                  <span class="visitorList" v-show="!item.studentName">陌生人</span>
                  <span v-show="!item.hiddenOparetion">
                    <span class="visitorList">(</span>
                    <span class="visitorListLogin" @click="visitorToLogin(item,index)">登记</span>
                    <span class="visitorList">)</span>
                      <!--<span class="visitorList" v-show="item.isIdCar">:无法识别到校园卡</span>-->
                      <!--<span class="visitorList" v-show="item.isFiveClean">:无法识别五官</span>-->
                    <i class="iconfont icon-x1 pl10 pr5 f20 cFA6557 hover" @click="refuseThrough(index)"></i>
                    <i class="iconfont icon-gouzi pl10 pr10 f20 c93BF88 hover" @click="visitorToLogin(item,index)"></i>
                  </span>
                </p>
              </div>
            </div>

            <div class="videoRight">
              <div class="visitorData">
                <img
                  :src="outManPic" v-show="outManPic" style="display:block; "
                  alt="">
                <img v-show="!outManPic" style="display:block; "
                     src="https://static.tuputech.com/api/image/original/bi-api/storage-0831/2019-06-12/18-21/5cde5e4609fc58f4f2fe1dad/15603351827120.37095062505788.jpg"
                     alt="">
              </div>
              <div class="getinNumberBox"></div>
              <div class="getinNumber">
                <i class="iconfont icon-qingjiaguanli left pl10 pr10 f20 pt5 cfff"></i>
                <span class="left">离去人员</span>
                <span class="right">总人数:<span>{{getOutNum}}</span>人</span>
              </div>
              <div class="wantInVisitorlist " >
              <p class="pb5 pl10" v-for="item in getOutAll">
              <img v-show="!item.imagePath" style="width: 40px;height: 40px;border-radius: 50%;display:inline-block;vertical-align:middle" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559815360925&di=211ed55372884426c21029a56b86f7f0&imgtype=0&src=http%3A%2F%2Fimg.18183.com%2Fuploads%2Fallimg%2F180906%2F235-1PZ6102538.jpg" alt="">
              <img v-show="item.imagePath" class="hover" @click="showOutBigImg(item)" style="width: 40px;height: 40px;border-radius: 50%;display:inline-block;vertical-align:middle" :src="item.imagePath" alt="">
              <span class="visitorList">{{item.studentName}}</span>
              <span class="visitorList"></span>
              </p>
              </div>
              <div class="getOutpicture"></div><!--//半透明背景-->
              <div class="getOutpictureList" @mouseleave="hiddenLetGO" ref="visitorPic" style="overflow: hidden;">
                <i class="iconfont icon-icon_quxiaozhiding1 cFA6557"
                   style="float: left;line-height: 60px;padding: 0 10px 0 0"></i>
                <span v-for="(item,index) in getOutStrangers">
                  <span style="position: relative">
                    <img class="getOutVisitorList hover"  @mouseover="show(item,index)" :src="item.imagePath" alt="">
                    <i v-show="item.isShow" @click="leave(item,index)" class="iconfont icon-gouzi cfff letGo"
                       style="border:1px solid;border-radius: 50%"></i>
                  </span>
                </span>
                <div @click="showAll" class="" style="position: absolute;right:0;top: 0; width: 50px;height: 60px;">
                  <i v-show="!showVisitorPic" class="iconfont icon-icon_zuojiantoucopy1 cfff letGo"
                     style="float: right;line-height: 60px;padding-top: 20px"></i>
                  <i v-show="showVisitorPic" class="iconfont icon-icon_zuojiantoucopy cfff letGo"
                     style="float: right;line-height: 60px;padding-top: 20px"></i>
                </div>
                <!--<img  class="getOutVisitorList" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg" alt="">-->
              </div>

            </div>
          </div>
        </el-container>
        <!--灰色空白区域-->
        <div class="line" style="width: 100%;height: 20px;background-color: #F5F5F5"></div>
        <div class="data" v-show="VisitorDataTable">
          <el-row>
            <el-col :span="7">
              <div class="grid-content pd10AndBoxSizing">
                <div class="dataTop">
                  <i class="iconfont icon-icon_chakan1 left f15 pr10 c999999"
                     style="line-height: 25px;margin-left: -10px"></i>
                  <span class="left inLeft">进入情况</span>
                  <span class="right inRight">人数: 1人</span>
                </div>
                <div class="clear center pt10" style="display: flex">
                  <span class="leftData">未出:60人</span>
                  <el-progress style="width: 70%" :stroke-width="10" :percentage="80" color="#FA6557"></el-progress>
                  <span class="rightData">详情</span>
                </div>
                <div class="clear center pt10" style="display: flex">
                  <span class="leftData">已出:70人</span>
                  <el-progress style="width: 70%" :stroke-width="10" :percentage="90" color="#FA6557"></el-progress>
                  <span class="rightData">详情</span>
                </div>
                <div class="clear center pt10" style="display: flex">
                  <span class="leftData">晚出:80人</span>
                  <el-progress style="width: 70%" :stroke-width="10" :percentage="70" color="#FA6557"></el-progress>
                  <span class="rightData">详情</span>
                </div>

                <div class="center" style="display: flex">
                  <!--<el-button class="checkAll">全部</el-button>-->
                  <div class="checkAll" @click="checkGetInAllFloor">全部</div>
                  <div class="clear  mt10 checkFloors" style="width: 80%">
                    <el-pagination style="width: 100%" layout="prev, pager, next"
                                   :total="100" @current-change="checkGetInFloor">
                    </el-pagination>
                  </div>
                </div>

              </div>
            </el-col>

            <el-col :span="7">
              <div class="grid-content pd10AndBoxSizing">
                <div class="dataTop">
                  <i class="iconfont icon-icon_chakan1 left f15 pr10 c999999"
                     style="line-height: 25px;margin-left: -10px"></i>
                  <span class="left inLeft">离去情况</span>
                  <span class="right inRight">人数: 1人</span>
                </div>
                <div class="clear center pt10" style="display: flex">
                  <span class="leftData">未归:60人</span>
                  <el-progress style="width: 70%" :stroke-width="10" :percentage="80" color="#FA6557"></el-progress>
                  <span class="rightData">详情</span>
                </div>
                <div class="clear center pt10" style="display: flex">
                  <span class="leftData">已归:70人</span>
                  <el-progress style="width: 70%" :stroke-width="10" :percentage="90" color="#FA6557"></el-progress>
                  <span class="rightData">详情</span>
                </div>
                <div class="clear center pt10" style="display: flex">
                  <span class="leftData">晚归:80人</span>
                  <el-progress style="width: 70%" :stroke-width="10" :percentage="70" color="#FA6557"></el-progress>
                  <span class="rightData">详情</span>
                </div>

                <div class="center" style="display: flex">
                  <div class="checkAll" @click="checkToLeaveAllFloor">全部</div>
                  <div class="clear  mt10 checkFloors" style="width: 80%">
                    <el-pagination style="width: 100%" layout="prev, pager, next"
                                   :total="100" @current-change="checkToLeaveFloor">
                    </el-pagination>
                  </div>
                </div>

                <!--<div class="clear center mt10 checkFloors" style="width: 100%" >-->
                <!--<el-pagination-->
                <!--layout="prev, pager, next"-->
                <!--:total="100" style="width: 100%" @current-change="checkToLeaveFloor">-->
                <!--</el-pagination>-->
                <!--</div>-->

              </div>


            </el-col>
            <el-col :span="5" class="border">
              <div class="grid-content pd10AndBoxSizing ">
                <div class="dataTop">
                  <i class="iconfont icon-icon_chakan1 left f15 pr10 c999999"
                     style="line-height: 25px;margin-left: -10px"></i>
                  <span class="left inLeft">访问情况</span>
                  <span class="right inRight">人数: 130人</span>

                  <div class="clear center pt10" style="display: flex">
                    <span class="leftData">学生:80人 &nbsp</span>
                    <el-slider v-model="visitorNumber" style="width: 50%" disabled></el-slider>
                    <span class="rightData"> &nbsp详情</span>
                  </div>
                  <div class="clear center pt10" style="display: flex">
                    <span class="leftData">其它:80人 &nbsp</span>
                    <el-slider v-model="visitorNumber" style="width: 50%" disabled></el-slider>
                    <span class="rightData"> &nbsp详情</span>
                  </div>
                  <div class="center" style="display: flex">
                    <div class="checkAll" @click="checkGetVisitAllFloor">全部</div>
                    <div class="clear  mt10 checkFloors" style="width: 100%">
                      <el-pagination style="width: 100%" layout="prev, pager, next" small
                                     :total="100" @current-change="checkGetVisitFloor">
                      </el-pagination>
                    </div>
                  </div>
                  <!--<div class="clear center mt10 checkFloors" style="width: 100%;font-size: 20px" >-->
                  <!--<el-pagination small layout="prev, pager, next" :total="100" @current-change="checkGetVisitFloor"></el-pagination>-->
                  <!--</div>-->
                </div>
              </div>
            </el-col>

            <el-col :span="5">
              <div class="grid-content pd10AndBoxSizing">
                <div class="dataTop">
                  <i class="iconfont icon-qingjiaguanli left f15 pr10 c999999"
                     style="line-height: 25px;margin-left: -10px"></i>
                  <span class="left inLeft">访问情况</span>
                  <span class="right inRight">人数: 130人</span>
                  <div class="clear center pt10" style="display: flex">
                    <el-progress type="circle" :percentage="25" color="#93BF88" :width="80"></el-progress>
                    <span class="rightData"> &nbsp详情</span>
                  </div>
                  <div class="center" style="display: flex">
                    <div class="checkAll" @click="checkGetAllVisitStatistics">全部</div>
                    <div class="clear  mt10 checkFloors" style="width: 100%">
                      <el-pagination style="width: 100%" layout="prev, pager, next" small
                                     :total="100" @current-change="checkGetVisitStatistics">
                      </el-pagination>
                    </div>
                  </div>
                  <!--<div class="clear center mt10 checkFloors" style="width: 100%;" >-->
                  <!--<el-pagination small layout="prev, pager, next" :total="100" @current-change="checkGetVisitStatistics"></el-pagination>-->
                  <!--</div>-->
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!--校外人员来访登记（还没用到）-->
        <div class="data" v-show="VisitorLoginTable">
          <div class="right" style="padding: 10px;" @click="cancel"><img src="~@/assets/img/close.png"/></div>
          <div class="visitorLogin">
            <el-form :label-position="'right'" class="edit-form"
                     label-width="120px" ref="outsiteVisitor" :inline="false" :model="outsiteVisitor" size="small">
              <!---->
              <el-col :span="8">
                <el-form-item label="姓名 :" prop="visitorName" class="visitorMessage">
                  <el-input v-model="outsiteVisitor.visitorName" maxlength="32" placeholder="请输入姓名"></el-input>
                  <!--v-model="formData.studentId"-->
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="电话 :" prop="visitorPhonenum" class="visitorMessage">
                  <el-input v-model="outsiteVisitor.visitorPhonenum" maxlength="32" placeholder="请输入手机号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份号 :" prop="cardNum" class="visitorMessage">
                  <el-input v-model="outsiteVisitor.cardNum" maxlength="32" placeholder="请输入身份证"></el-input>
                  <!--v-model="formData.studentId"-->
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="宿舍号 :" prop="studentUserId" class="visitorMessage">
                  <el-input v-model="outsiteVisitor.dormitoryNumber" maxlength="32" placeholder="请输入访问的宿舍号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否家长 :" prop="sex" class="visitorMessage">
                  <el-select v-model="outsiteVisitor.isParent" placeholder="是否是家长" @change="showChooceStudent">
                    <el-option v-for="isParentItem in ynOptions"
                               :key="isParentItem.gender"
                               :label="isParentItem.label" :value="isParentItem.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!--<el-col :span="8">-->
              <!--<el-form-item label="是否家长 :" prop="isParent">-->
              <!--<el-select v-model="outsiteVisitor.isParent" placeholder="请您选择" @change="showChooceStudent">-->
              <!--<el-option v-for="isParentItem in ynOptions" :key="isParentItem.name"-->
              <!--:label="isParentItem.label" :value="isParentItem.name">-->
              <!--</el-option>-->
              <!--</el-select>-->
              <!--</el-form-item>-->
              <!--</el-col>-->

              <!---->
              <!--<el-col :span="8" v-show="parentBotton">-->
              <!--<el-form-item label="选择孩子 :" prop="isParent">-->
              <!--<el-input v-model="outsiteVisitor.studentName" disabled placeholder="请输入姓名"></el-input>-->
              <!--<el-button size="small" type="primary" @click="chooseStdent=!chooseStdent">选择孩子</el-button>-->
              <!--</el-form-item>-->
              <!--</el-col>-->

              <el-col :span="8">
                <el-form-item label="性别 :" prop="sex" class="">
                  <el-select v-model="outsiteVisitor.sex" placeholder="请选择性别">
                    <el-option v-for="(item,index ) in sexOptions"
                               :key="item.gender"
                               :label="item.label" :value="item.gender">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="找谁 :" prop="studentUserId" class="visitorMessage">
                  <el-input v-model="outsiteVisitor.forWho" maxlength="32" placeholder="请输入姓名"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="备注 :" prop="studentName" class="visitorMessage">
                  <el-input v-model="outsiteVisitor.remark" style="width: 90%" class="input-v2-rao"
                            placeholder="请输入备注信息"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="来访头像 :" prop="imagePath" class="visitorMessage">
                  <upload v-on:uploadData="uploadData" class="input-v2-rao" :imagelist="outsiteVisitor.imagePath"/>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item class="center">
                  <el-button type="primary" class="button-v2-rao b93BF88"
                             @click="keepData('outsiteVisitor',outsiteVisitor)">保存
                  </el-button>
                  <el-button @click="cancel">取消</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </div>

        <!--学生来访登录-->
        <div class="data" v-show="studentVisitorLoginTable">
          <div class="right" style="padding: 10px;" @click="studentcancel"><img src="~@/assets/img/close.png"/></div>
          <div class="visitorLogin">
            <el-form :label-position="'right'" class="edit-form"
                     label-width="120px" ref="insiteVisitor" :inline="false" :rules="rules" :model="insiteVisitor" size="small">
              <!---->
              <el-col :span="12">
                <el-form-item label="姓名 :" prop="visitorName" class="visitorMessage">
                  <el-input v-model="insiteVisitor.visitorName" placeholder="请输入姓名" maxlength="32"></el-input>
                  <!--v-model="formData.studentId"-->
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="证件类型 :" prop="cardTypeCode">
                  <el-select  v-model="insiteVisitor.cardTypeCode" placeholder="请您选择">
                    <el-option v-for="cardTypeCodeItem in cardTypeCodeOptions"
                               :key="cardTypeCodeItem.name"
                               :label="cardTypeCodeItem.label" :value="cardTypeCodeItem.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件号 :" prop="cardNum" class="visitorMessage">
                  <el-input v-model="insiteVisitor.cardNum" placeholder="请输入身份证" maxlength="32"></el-input>
                  <!--v-model="formData.studentId"-->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电话 :" prop="visitorPhonenum" class="visitorMessage">
                  <el-input v-model="insiteVisitor.visitorPhonenum" placeholder="请输入手机号码" maxlength="32"></el-input>
                </el-form-item>
              </el-col>

              <!--<el-col :span="6">-->
                <!--<el-form-item label="性别 :" prop="sex" class="visitorMessage">-->
                  <!--<el-input v-model="insiteVisitor.sex" placeholder="请选择性别" maxlength="32"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <el-col :span="12">
                <el-form-item label="宿舍号 :" prop="studentUserId" class="visitorMessage">
                  <el-input v-model="insiteVisitor.dormitoryNumber" placeholder="请输入访问的宿舍号码" maxlength="32"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="找谁 :" prop="studentUserId" class="visitorMessage">
                  <el-input v-model="insiteVisitor.forWho" placeholder="请输入姓名" maxlength="32"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="备注 :" prop="studentName" class="visitorMessage">
                  <el-input v-model="insiteVisitor.remark" placeholder="请输入备注信息" style="width: 90%" class="input-v2-rao"
                            maxlength="32"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="来访头像 :" prop="imagePath" class="visitorMessage">
                  <upload v-on:uploadData="uploadData" class="input-v2-rao" :imagelist="insiteVisitor.imagePath"/>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item class="center">
                  <!--<el-button type="primary" class="button-v2-rao b93BF88" @click="through(insiteVisitor)">放行</el-button>-->
                  <el-button type="primary" class="button-v2-rao b93BF88"
                             @click="keepData('insiteVisitor',insiteVisitor)">保存
                  </el-button>
                  <el-button type="danger" @click="refuseThrough(insiteVisitor)">拒绝</el-button>
                  <el-button @click="studentcancel">取消</el-button>
                </el-form-item>
              </el-col>


            </el-form>
          </div>
        </div>

        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>

      <el-dialog title="" :visible.sync="isLetgoOut" center width="22%">
        <div class="text-center">
          <i class="iconfont icon-icon_tc_shanchu_hong ml5 f30 cFA6557"></i>
          <p class="text-center fs-16 color333 mt-20">是否确认放行?</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" class="border-color-cccccc c000000 bfff" @click="sureletgo"
                     :loading="isDel">是
          </el-button>
          <el-button type="primary" class="b93BF88" @click="notletgo">否</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import api from "./basicschooldormitoryUrl";
  import apiAr from "../../safety/studentAccessRecords/studentAccessRecordsUrl";
  import commonApi from "@/api/common/common";
  import preview from '@/util/preview';
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import axios from '@/axios/axios';
  import {dateFilter} from '@/filters/index';

  // import SockJS from  'sockjs-client';
  // import Stomp from 'stompjs';


  export default {
    components: {upload, uploads},
    directives: {preview},
    data() {
      return {
        rules: {
          visitorName:
            [
              {required: true, message: "请输入姓名", trigger: "blur"},
            ],
          cardTypeCode:
            [
              {required: true, message: "请选择选择证件类型", trigger: "blur"},
            ],
          cardNum:
            [
              {required: true, message: "请输入证件号码", trigger: "blur"},
            ],
          visitorPhonenum:
            [
              {required: true, message: "请输入手机号码", trigger: "blur"},
            ],
        },
        isLetgoOut:false,
        showEnterVisitorPic: false,
        showEnter: false,
        parentBotton: false,
        showVisitorPic: false,
        studentVisitorLoginTable: false,
        VisitorDataTable: true,
        VisitorLoginTable: false,
        chapterVisible: false,
        isLoaded: true,
        dialogDelete: false,
        isDel: false,
        msgShow: false,
        dormitoryName: null,
        getInNum:0,
        getOutNum:0,
        visitNum:0,
        visitorNumber: 10,
        liveingStudentNum: 0,
        studentData: [],
        parentsData: [],
        stompClient: null,
        searchParentForm: {
          ids: null,
        },
        sexOptions: [
          {
            gender: 'F',
            label: '女',
          },
          {
            gender: 'M',
            label: '男',
          }
        ],
        options: [],  //出
        optionsTwo: [],  //出
        optionsEnter:[], //进
        optionsEnterTwo:[],

        getInAll:[],
        getInStudents:[],
        getInStrangers:[],

        getOutAll:[],
        getOutStudents:[],
        getOutStrangers:[],


      dormitoryTypeCodeOptions: [{"label": "全部", "name": ""}],
        genderCodeOptions: [{"label": "全部", "name": ""}],
        ynOptions: [{"label": "全部", "name": ""}],
        cardTypeCodeOptions: [{"label": "全部", "name": ""}],

        searchStudentForm: {
          studentName: null,
          dormitoryId: null,
        },
        form: {
          dormitoryId: null,
          dormitoryNum: null,
          dormitoryName: null,
          dormitoryTypeCodeValue: null,
          genderCodeValue: null,
        },
        searchForm: {
          dormitoryId: null,
          dormitoryNum: null,
          dormitoryName: null,
          dormitoryTypeCode: null,
          genderCode: null,
        },
        outsiteVisitor: {
          visitorName: '',
          sex: '',
          dormitoryNumber: '',
          forWho: '',
          cardNum: '',
          visitorPhonenum: '',
          remark: '',
          visitedDt: null,
          dormitoryId: null,
          isParent: null,
          studentName: null,
          cardTypeCode:null,
        },
        insiteVisitor: {
          visitorName: '',
          sex: '',
          dormitoryNumber: '',
          forWho: '',
          cardNum: '',
          visitorPhonenum: '',
          remark: '',
          cardTypeCode: '',
          visitedDt: null,
          dormitoryId: null,
          isParent: null,
          studentName: null,
          schoolId:null,
        },
        data: "",
        multipleSelection: [],
        params: {
          page: 1,
          limit: 10,
          dormitoryId: null,
          dormitoryNum: null,
          dormitoryName: null,
          dormitoryTypeCode: null,
          genderCode: null,
        },
        classStudentStatusCodeOptions: [{"label": "全部", "name": ""}],
        getWatch:{
          placeId:null,
          dormitoryId:null,
        },
        websock: null,
        newData:null,
        forChangeArray:null,
        inManPic:null,
        outManPic:null,
        todelete:null,
        studentsLeaveNumForm:{
          dormitoryId:null,
          leaveDt:null,
        },
        studentsLeaveNum:0,//学生请假人数
        placeType:null,
        placeId:null,//获取宿舍类型
        connectionNum:1,//设备断开后重连次数
        isbeginSetInterval:null,//定时器去获取时间
      }
    },
    watch:{
      chapterVisible() {
        if (this.chapterVisible === false){
          this.closeWebSocket()
          console.log('断开连接')
          clearInterval(this.isbeginSetInterval)
          console.log('已清除定时器')
        }
      },
      forChangeArray(){
        if (this.liveingStudentNum>0){
          this.filterData()
        }
      },
    },
    computed: {
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      },
    },
    // beforeDestroy: function () {
    //   // 页面离开时断开连接,清除定时器
    //   this.disconnect();
    //   clearInterval(this.timer);
    // },
    // activated() {
    //   //只刷新数据，不改变整体的缓存
    //   console.log('重新活跃路由');
    //   let query = this.$route.query;
    //   for (let item in query) {
    //     this.params[item] = query[item]
    //   }
    //   this.getList()
    // },
    created() {
      // this.initWebSocket()
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
      commonApi.getCodeIntType("dormitoryType").then(res => {
        let viewList = res.data.data || [];
        for (let classStudentStatusItem of viewList) {
          this.classStudentStatusCodeOptions.push({
            "label": classStudentStatusItem.codeDesc,
            "name": classStudentStatusItem.codeId
          });
        }
      });
      commonApi.getCodeIntType("boolean_yn").then(res => {
        let viewList = res.data.data || [];
        for (let ynItem of viewList) {
          this.ynOptions.push({
            "label": ynItem.codeDesc,
            "name": ynItem.codeId
          });
        }
      });
      commonApi.getCodeIntType("cardType").then(res => {
        let viewList = res.data.data || [];
        for (let cardTypeItem of viewList) {
          this.cardTypeCodeOptions.push({
            "label": cardTypeItem.codeDesc,
            "name": cardTypeItem.codeId
          });
        }
      });
    },
    mounted() {
      // this.initWebSocket();
      this.getList();
      commonApi.getCodeIntType("dormitoryType").then(res => {
        let viewList = res.data.data || [];
        for (let dormitoryTypeItem of viewList) {
          this.dormitoryTypeCodeOptions.push({
            "label": dormitoryTypeItem.codeDesc,
            "name": dormitoryTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("gender").then(res => {
        let viewList = res.data.data || [];
        for (let genderItem of viewList) {
          this.genderCodeOptions.push({
            "label": genderItem.codeDesc,
            "name": genderItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    destroyed() {
      this.websock.close() //离开路由之后断开websocket连接
    },
    methods: {
      filterData(){

        // this.optionsEnter = []
        // this.optionsEnterTwo =[]
        // this.options = []
        // this.optionsTwo =[]
        // console.log(this.studentData)
        // let getIn=[]
        // let getOut=[]
        if(this.newData.inCheck.length>0) {
          for (let i=0;i<this.newData.inCheck.length;i++) {
            let isStranger = true  //默认是陌生人
            for (let j = 0; j < this.studentData.length; j++) {
              if (this.newData.inCheck[i].studentId === this.studentData[j].studentId) {
                isStranger = false  //不是陌生人
                this.getInStudents.push(this.newData.inCheck[i])  //要登记列表（进）
                this.newData.inCheck[i].hiddenOparetion = true
              }
            }
            if (isStranger){  //是陌生人  插到陌生人数组
              this.getInStrangers.push(this.newData.inCheck[i])  //免登记学生列表（进）
            }
          }
          this.getInAll = this.getInStudents.concat(this.getInStrangers)
          this.inManPic=this.newData.inCheck[this.newData.inCheck.length-1].imagePath
        }
        if(this.newData.outCheck.length>0){
          for (let i=0;i<this.newData.outCheck.length;i++) {
            this.getOutAll.push(this.newData.outCheck[i])  //免登记学生列表（进）
          }
          this.outManPic=this.newData.outCheck[this.newData.outCheck.length-1].imagePath
        }

        this.getInNum = this.newData.inNum                   //进入人数
        this.getOutNum = this.newData.outNum               //离开人员
        this.visitNum = this.newData.visitNum               //访问人员
      },

      initWebSocket(){
        //初始化weosocket schoolId
        // const wsuri = "ws://192.168.2.69:6250/websocket?schoolId="+this.getWatch.schoolId+"&placeId="+this.getWatch.placeId
        // const wsuri = `ws://192.168.2.69:6250/websocket?schoolId=${this.getWatch.schoolId}&placeId=${this.getWatch.placeId}`  //本地
        const wsuri = `ws://47.112.96.64:6250/websocket?schoolId=${this.getWatch.schoolId}&placeId=${this.getWatch.placeId}`   //阿里云
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen(){ //连接建立之后执行send方法发送数据
        //this.websocketsend(JSON.stringify(this.getWatch));
        console.log('已连接')
      },
      websocketonerror(){//连接建立失败重连
        console.log('已断开连接')
        if (this.connectionNum<4){   //只会重连3次
          this.connectionNum++
          this.initWebSocket();
        }else{
          // alert('监控已断开，已重连了3次，请刷新再连接')
          console.log('已重连了3次，请刷新再连接')
        }
      },
      websocketonmessage(e){ //数据接收
        this.forChangeArray = this.newData = JSON.parse(e.data);
          console.log(this.newData)
      },
      websocketsend(Data){//数据发送
        // this.websock.send(Data);
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },
      closeWebSocket(){
        this.websock.close()
      },



      keepData(formName, deleteOne) {   //验证表单  and 添加数据后删除显示
        console.log(deleteOne)
        const set = this.$refs;
        set[formName].validate(valid => {
          if (this.pageState === 'edit' && valid) {
            api.addVisitor(this.insiteVisitor).then(res => {
              if (res.data.resultCode === "000000") {
                this.$message.success("添加成功");
                this.studentcancel()   //关闭添加信息页面
                // this.optionsEnterTwo[this.insiteVisitor.index].studentName = this.insiteVisitor.studentName
                this.getInAll[this.insiteVisitor.index].hiddenOparetion = true
                this.getInAll[this.insiteVisitor.index].studentName = this.insiteVisitor.visitorName + '(已登记)'
                deleteOne.visitRecordId = res.data.data
                this.getOutStrangers.push(deleteOne)
                this.$forceUpdate() //  手动渲染数据，
                this.insiteVisitor = {}
              } else {
                this.$message.error(res.data.message);
              }
            })
          }
        })
      },
      // 来访登录
      visitorToLogin(val, index) {
        // if (val.studentId !== '' && val.studentId !== undefined) { //来访为学生
          this.VisitorDataTable = false
          this.VisitorLoginTable = false
          this.studentVisitorLoginTable = true
        if(val.studentName==='未登记人员'){
          this.insiteVisitor.visitorName = ''
        }else{
          this.insiteVisitor.visitorName = val.studentName
        }
        this.insiteVisitor.imagePath=null
        this.insiteVisitor.imagePath = val.imagePath
        this.insiteVisitor.visitedDt = dateFilter(val.happenedDt)
        this.insiteVisitor.index = index
        this.$forceUpdate()   //手动渲染数据，

        console.log(this.insiteVisitor)
        // console.log(dateFilter('来访时间'+val.happenedDt));
          // this.insiteVisitor.sex = val.sex
          // this.insiteVisitor.cardNum = val.id
          // if (val.sex === 'F') {
          //   this.insiteVisitor.sex = '女'
          // }
          // if (val.sex === 'M') {
          //   this.insiteVisitor.sex = '男'
          // }
        // } else {
        //   this.VisitorDataTable = false
        //   this.studentVisitorLoginTable = false
        //   this.VisitorLoginTable = true
        //   this.outsiteVisitor.visitorName = val.visitorName
        //   this.outsiteVisitor.cardNum = val.id
        //   this.outsiteVisitor.imagePath = val.src
        //   this.outsiteVisitor.index = index
        // }
      },
      //放行
      through(data, index, num) {
        // if (num == 1) { //快捷放行
          // if (data.isStdent === true) { //来访为学生
            this.insiteVisitor.visitorName = data.studentName
            this.insiteVisitor.imagePath = data.imagePath
            this.insiteVisitor.visitedDt = dateFilter(data.happenedDt)
            this.insiteVisitor.index = index
            // this.insiteVisitor.visitorName = data.visitorName
            // this.insiteVisitor.sex = data.sex
            // this.insiteVisitor.cardNum = data.id
            // this.insiteVisitor.imagePath = val.src
            // this.insiteVisitor.index = index
          // } else {
          //   this.VisitorDataTable = false
          //   this.studentVisitorLoginTable = false
          //   this.VisitorLoginTable = true
          //   this.outsiteVisitor.visitorName = data.visitorName
          //   this.outsiteVisitor.cardNum = data.id
          //   this.outsiteVisitor.imagePath = data.src
          //   this.outsiteVisitor.index = index
          // }
          this.option.splice(index, 1)
        // } else {
        //   this.option.splice(data.index, 1)
        // }
        this.studentcancel();
      },
      //拒绝放行
      refuseThrough(index) {
        if (typeof index === "number") {
          this.getInAll.splice(index, 1)
        } else {
          this.getInAll.splice(index.index, 1)
        }
        this.studentcancel();
      },
      //进入情况
      checkGetInFloor(size) {
        alert('进入' + size)
      },
      //离去情况
      checkToLeaveFloor(size) {
        alert('离去' + size)
      },
      //访问情况
      checkGetVisitFloor(size) {
        alert('访问' + size)
      },
      //访问统计
      checkGetVisitStatistics(size) {
        alert('统计' + size)
      },
      checkGetInAllFloor() {
        alert('进入所有')
      },
      checkToLeaveAllFloor() {
        alert('离开所有')
      },
      checkGetVisitAllFloor() {
        alert('访问所有')
      },
      checkGetAllVisitStatistics() {
        alert('访问统计所有')
      },
      showAll() {
        if (this.showVisitorPic) {
          this.showVisitorPic = false
          this.$refs.visitorPic.style.overflow = "hidden";
        } else {
          this.showVisitorPic = true
          this.$refs.visitorPic.style.overflow = "visible";
        }
      },
      showAEnterll() {
        if (this.showEnterVisitorPic) {
          this.showEnterVisitorPic = false
          this.$refs.visitorEnterPic.style.overflow = "hidden";
        } else {
          this.showEnterVisitorPic = true
          this.$refs.visitorEnterPic.style.overflow = "visible";
        }
      },

      leave() {
        this.isLetgoOut=true
      },
      showOutBigImg(val){
        this.outManPic =null
        this.outManPic = val.imagePath
      },
      showInBigImg(val){
        this.inManPic =null
        this.inManPic = val.imagePath
      },

      sureletgo( ){
        this.isLetgoOut = false;
        this.todelete.leftDt= new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
        api.changeTime(this.todelete).then(res => {
          if (res.data.resultCode === "000000") {
            this.$message.success("已放行");
          } else {
            this.$message.error(res.data.message);
          }
        })
        this.getOutStrangers.splice(this.todelete.index, 1)
      },
      notletgo(){
        this.isLetgoOut = false;
      },
        enter(val, index) {
        this.optionsEnter.splice(index, 1)
      },
      show(val,index) {
        this.getOutStrangers.map(item => {
          item.isShow = false
        })
        val.isShow = true
        this.todelete = val
        this.todelete.index=index
        this.outManPic = val.imagePath
        this.$forceUpdate()   //手动渲染数据，
      },
      showEnterpic(val) {
        this.optionsEnter.map(item => {
          item.isShow = false
        })
        val.isShow = true
        // alert(val)
      },

      hiddenLetGO() {
        this.getOutStrangers.map(item => {
          item.isShow = false
        })
      },
      addChapter(val) {
        // console.log(val)
        this.dormitoryName = val.dormitoryName
        //提供参数给添加访问
        this.getWatch.dormitoryId = this.insiteVisitor.dormitoryId = this.studentsLeaveNumForm.dormitoryId = val.dormitoryId  //给监控提供参数 and 来访  and 学生请假
        this.getWatch.placeId = this.insiteVisitor.placeId = this.outsiteVisitor.placeId = val.placeId
        this.getWatch.schoolId =this.insiteVisitor.schoolId = val.schoolId
        // this.searchStudentForm.dormitoryId = this.insiteVisitor.dormitoryId = this.outsiteVisitor.dormitoryId = val.dormitoryId  //去获取学生  和学生来访
        // this.insiteVisitor.placeId = this.outsiteVisitor.placeId = val.placeId
        this.insiteVisitor.placeName = this.outsiteVisitor.placeName = val.placeName
        this.placeId = val.placeId
        this.chapterVisible = true
        this.connectionNum = 1  //初始化断开重连次数
        this.once = true
        this.getAllStudents(val)  //获取居住人数
        this.getStudentsLeaveNum() //获取学生请假人数
        this.getPlaceType()  //获取场所类型去添加来访时提供场所类型
        this.beginSetInterval() //开启定时器去获取请假人数
      },
      getPlaceType(){
        api.getPlaceType(this.placeId).then(res => {
          if (res.data.resultCode === "000000") {
            // this.placeType = res.data.data.placeTypeCode;
            this.insiteVisitor.placeTypeCode = res.data.data.placeTypeCode   //场所类型
          }
          this.isLoaded = false;
        }, res => {
          this.$message.error(res.message);
        });
      },
      beginSetInterval(){
        this.isbeginSetInterval = setInterval(this.showLeave,3600000)
      },
      showLeave(){
        console.log(new Date())
        let todaySix = Number(new Date(new Date(new Date().toLocaleDateString()).getTime()+6*60*60*1000-1)) ;
        let todayNow = Number(new Date());
        // console.log(this.isToDay)
        if (this.isToDay !== todaySix){
          this.once = true
        }
        if (todayNow > todaySix && this.once===true){
          this.once = false
          this.getStudentsLeaveNum()
          // alert('要重新获取数据了')
        }
        this.isToDay = todaySix
        // console.log(todaySix);
        // console.log(todayNow);
      },
      getStudentsLeaveNum(){
        let date = new Date();
        let y = date .getFullYear(); //获取完整的年份(4位)
        let m = date .getMonth(); //获取当前月份(0-11,0代表1月)
        let d = date .getDate(); //获取当前日(1-31)
        let time = y+'-'+m+'-'+d
        this.studentsLeaveNumForm.leaveDt=time
        api.getStudentsLeaveNum(this.studentsLeaveNumForm).then(res => {
          if (res.data.resultCode === "000000") {
            this.studentsLeaveNum = res.data.data;
          }
          this.isLoaded = false;
        }, res => {
          this.$message.error(res.message);
        });
      },
      getAllStudents(val) {
        let getStudentsForm = {}
        getStudentsForm.dormitoryId = val.dormitoryId
        getStudentsForm.page = 1
        getStudentsForm.limit = 9999
        api.getAllStudents(getStudentsForm).then(res => {
          let data = this.studentData = res.data.data.records;
          // console.log(this.studentData)
          this.liveingStudentNum = 0
          // console.log(res.data.resultCode)
          //统计可用学生
          data.map(item => {
            if (item.accommodationStatusCodeStr !== '' && item.accommodationStatusCodeStr !== undefined) {
              if (item.accommodationStatusCodeStr.split(';')[0] === '可用') {
                this.liveingStudentNum += 1
              }
            }
          })
          if (res.data.resultCode === "000000") {
            this.initWebSocket()//
            // this.filterData()
          }
          this.isLoaded = false;
        }, res => {
          this.$message.error(res.message);
        });
      },
      showChooceStudent(val) {
        // if (val==='Y'){
        //   this.parentBotton = true
        // }else{
        //   this.parentBotton = false
        //   this.outsiteVisitor.studentName = null
        // }
      },
      cancel() {
        this.VisitorLoginTable = false
        this.VisitorDataTable = true
      },
      studentcancel() {
        this.VisitorDataTable = true
        this.VisitorLoginTable = false
        this.studentVisitorLoginTable = false
      },
      // //搜索学生
      // searchStudent() {
      //   api.getStudentList(this.searchStudentForm).then(res => {
      //     this.studentData = res.data.data.records
      //   })
      // },
      // //查找父母
      // searchParent() {
      //   api.getParentMessage(this.searchParentForm).then(res => {
      //     this.parentsData = res.data.data
      //   })
      // },
      // // 选择父母（未实现）
      // chooseParent() {
      //   api.chooseParent(this.searchParentForm).then(res => {
      //     if (res.data.resultCode === "000000") {
      //       this.chooseStdent = false
      //     } else {
      //       this.$message.error(res.data.message);
      //     }
      //     this.parentsData = res.data.data
      //   })
      // },
      // chooseStudentId(val) {
      //   this.searchParentForm.ids = val[0].studentUserId  //将其选择变成false 实现单选  （未实现）
      //   this.outsiteVisitor.studentName = val[0].studentName
      // },

      uploadData(res) {
        this.formData.imagePath = res;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.dormitoryId
        });
      },
      handleSizeChange(size) {
        this.params.limit = size;
        this.setCurrentPage(this.$route.path, this.params)
        this.isLoaded = true;
        this.getList();
      },
      handleCurrentChange(currentPage) {
        this.params.page = currentPage;
        this.setCurrentPage(this.$route.path, this.params)
        this.isLoaded = true;
        this.getList();
      },
      // 分页按找正常序列开始
      typeIndex(index) {
        return index + this.params.limit * (this.params.page - 1) + 1;
      },
      sortChange(obj) {
        this.params.orderByField = obj.prop;
        this.params.isAsc = obj.order == "ascending";
        this.setCurrentPage(this.$route.path, this.params)
        this.isLoaded = true;
        this.getList();
      },
      getList() {          this.isLoaded = false;

        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        this.params.schoolId = userInfo.content.extValues.schoolOrg.schoolOrgId   //学校id

        api.fetchList(this.params).then(res => {
          this.data = res.data.data;
        }, res => {
          this.$message.error(res.message);
        });

      },

      search() {
        this.params.page = 1;
        for (let key in this.searchForm) {
          this.params[key] = this.searchForm[key]
        }
        this.isLoaded = true;
        this.getList();
      },

      //删除表格当前行
      rowDel(id) {
        this.dialogDelete = true;
        this.multipleSelection = [id];
      },
      //删除
      toDel() {
        if (this.$refs.schooltable.selection.length == 0) {
          this.msgShow = true;
          setTimeout(() => {
            this.msgShow = false;
          }, 800)
          return;
        }
        this.dialogDelete = true;
      },
      dialogDeleteComfireHandler() {
        this.isDel = true;
        api.batchDelObj(this.multipleSelection).then(res => {
          this.isDel = false;
          this.dialogDelete = false;
          if (res.data.resultCode == "000000") {
            this.$message.success("删除成功");
            this.getList();
          }
        })
        this.isDel = false;

      },
      dialogDeleteCancelHandler() {
        this.dialogDelete = false;
      },
      toAdd() {
        //safety safetyEdu basedata
        let opath = '/dormitory/detailBasicSchoolDormitory/add/' + 0;
        this.$router.push({path: opath})
      },
      toTotal() {
        let opath = '/dormitory/BasicSchoolDormitoryTotal';
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/dormitory/detailBasicSchoolDormitory/edit/' + id;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/dormitory/detailBasicSchoolDormitory/detail/' + id;
        this.$router.push({path: opath})
      },
      toAnother(id, path, num, name, placeId, placeName) {
        let opath = '/dormitory/' + path + '?dormitoryId=' + id + '&dormitoryNum=' + num + '&dormitoryName=' + name + '&placeId=' + placeId + '&placeName=' + placeName;
        this.$router.push({path: opath})
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .checkAll {
    margin: 13px 0 0 0;
    width: 48px;
    height: 26px;
    background: rgba(147, 191, 136, 1);
    border-radius: 4px;
    color: white;
    text-align: center;
    line-height: 26px;
  }

  .hover:hover {
    cursor: pointer;
  }

  .allNum {
    font-size: 16px;
    font-family: MicrosoftYaHei;
    color: rgba(153, 153, 153, 1);
  }

  .visitorMessage {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(153, 153, 153, 1);
    line-height: 14px;
  }

  .visitorLogin {
    clear: both;
  }

  .border {
    height: 100%;
    border-left: 1px solid #E8E8E8;
    border-right: 1px solid #E8E8E8;
  }

  .dataTop {
    width: 100%;
    height: auto;
  }

  .leftData {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(153, 153, 153, 1);
    line-height: 19px;
  }

  .rightData {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(147, 191, 136, 1);
    line-height: 19px;
  }

  .clear {
    clear: both;
  }

  .inLeft {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: rgba(53, 53, 53, 1);
    line-height: 24px;
  }

  .inRight {
    width: 90px;
    height: 24px;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
    white-space: nowrap;

  }

  .data {
    overflow: hidden;
    width: 100%;
    height: auto;
    margin-top: 20px;
    border: 1px solid #E8E8E8;
    border-radius: 5px;
  }

  .pd10AndBoxSizing {
    padding: 10px 20px;
    box-sizing: border-box;
  }

  .three {
    background-color: #3c7373;
  }

  .four {
    background-color: #353535;

  }

  .video {
    width: 100%;
    display: flex;
    height: auto;
    border: 1px solid #9A9792;
    border-radius: 8px;
    margin-top: 10px;
  }

  .visitorData {
    border-radius: 10px;
    overflow: hidden;
    height: auto;
    /*border: 1px solid red;*/
  }

  .visitorData > img {
    width: 100%;
    height: auto;
  }

  .videoLeft {
    width: 50%;
    height: auto;
    margin: 0 10px 0 0;
    position: relative;
  }

  .wantInVisitorlist {
    width: 100%;
    height: 180px;
    margin-left: 10px;
    overflow-y:scroll;
    overflow-x:hidden;
    position: absolute;
    bottom: 80px;
    font-size: 16px;
    font-family: MicrosoftYaHeiSemibold;
    color: rgba(255, 255, 255, 1);
  }

  .visitorList {
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .visitorListLogin {
    color: #FA6557;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .visitorListLogin:hover {
    cursor: pointer;
  }

  .getinNumberBox {
    width: 100%;
    height: 80px;
    background-color: #353535;
    opacity: 0.3;
    position: absolute;
    left: 0;
    bottom: 0px;
  }

  .getOutpicture {
    width: 90%;
    height: 60px;
    background-color: #353535;
    opacity: 0.3;
    position: absolute;
    border-radius: 5px;
    margin: auto;
    top: 20px;
    left: 0;
    right: 0;
    box-sizing: border-box;
  }

  .getOutpictureList {
    width: 90%;
    height: 60px;
    position: absolute;
    border-radius: 5px;
    margin: auto;
    top: 20px;
    left: 0;
    right: 0;
    /*overflow: hidden;*/
    box-sizing: border-box;
    padding: 0 50px 20px 20px;
  }

  .getOutVisitorList {
    width: 50px;
    height: 50px;
    margin-top: 5px;
    border-radius: 50%;
    border: 1px solid #FA6557;
  }

  .getOutVisitorList:hover {
    cursor: pointer;
  }

  .letGo {
    position: absolute;
    left: 17px;
    top: -24px;
    z-index: 5;
  }

  .letGo:hover {
    color: #93BF88;
    cursor: pointer;
  }

  .getinNumber {
    padding: 10px;
    box-sizing: border-box;
    font-size: 24px;
    /*font-family:MicrosoftYaHei;*/
    color: rgba(255, 255, 255, 1);
    width: 100%;
    position: absolute;
    bottom: 13px;
    color: white;
  }

  .videoRight {
    width: 50%;
    height: auto;
    margin: 0 0 0 10px;
    position: relative;
  }

  .time {
    width: 134px;
    height: 22px;
    font-size: 18px;
    font-family: Impact;
    color: rgba(153, 153, 153, 1);
    line-height: 22px;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .tips-school {
    position: absolute;
    top: 40%;
    left: 47%;

  }

  .select-all {
    margin: 0 0 5px;
  }

  .selected-box {
    background: #F0F0F0;
    border-radius: 5px;
    padding: 8px;
    font-size: 16px;

    img {
      vertical-align: -4px;
    }

  }
</style>
