


<template>
  <div  class="SchoolPlaceStudentCheck">
    <div  class="one">
      <el-button size="small" type="primary" @click="addChapter" v-show="true">打开来访记录</el-button>

      <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                    style="min-height: 600px"
                    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-header style="height: auto">

          <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">
            <el-form-item label="学生:"  prop="studentName" class="w140">
              <el-input class="input-v2-rao" v-model="searchForm.studentName" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="年级:"  prop="gradeName" class="w140">
              <el-input class="input-v2-rao" v-model="searchForm.gradeName" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="班级:"  prop="className" class="w140">
              <el-input class="input-v2-rao" v-model="searchForm.className" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="进出:"  prop="leaveEnter" class="w140">
              <el-input class="input-v2-rao" v-model="searchForm.leaveEnter" maxlength="30"></el-input>
            </el-form-item>
            <!--<el-form-item label="时间:" prop="happenedDt" class="w140">-->
            <!--<el-date-picker class="date-v2-rao" v-model="searchForm.happenedDt" type="dateTime"-->
            <!--value-format="yyyy-MM-dd HH:mm" placeholder="选择日期"></el-date-picker>-->
            <!--</el-form-item>-->
            <el-form-item label="时间 :" prop="startDt">
              <el-date-picker class="date-v2-rao" v-model="searchForm.happenedDt" type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="是否异常:"  prop="isException" class="w140">
              <el-select class="select-v2-rao" v-model="searchForm.isException" placeholder="请您选择">
                <el-option v-for="isExceptionItem in ynOptions"
                           :key="isExceptionItem.name"
                           :label="isExceptionItem.label" :value="isExceptionItem.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="场所:"  prop="placeName" class="w140">
              <el-input class="input-v2-rao" v-model="searchForm.placeName" maxlength="30"></el-input>
            </el-form-item>
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
              <!--<el-button type="primary" size="small" class="button-v2-rao b93BF88 " @click="toAdd">-->
              <!--<i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增-->
              <!--</el-button>-->
              <el-button type="primary" size="small" class="button-v2-rao bFA6557" @click="toDel" :disabled="!multipleSelection.length > 0">
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
              <!--<el-table-column prop="studentName" align="center" label="学生" sortable="custom">-->
              <!--<template slot-scope="scope">-->
              <!--<div v-if="scope.row.studentName" class="one-line">{{scope.row.studentName}}</div>-->
              <!--<div v-else>无</div>-->
              <!--</template>-->
              <!--</el-table-column>-->

              <el-table-column prop="userPreviewVO" align="center" label="学生" >
                <template slot-scope="scope">
                  <div v-if="scope.row.studentUserPreviewVO" class="flex row center">
                    <div class="pr-10">
                      <img :src="scope.row.studentUserPreviewVO.headPicture" alt="" v-preview height="64" width="64">
                    </div>
                    <div class="flex space-between" style="height: 50px">
                      <span>{{scope.row.studentUserPreviewVO.firstName}}</span>
                      <span v-if="scope.row.studentUserPreviewVO.gender==='M' ">男</span>
                      <span v-else>女</span>
                    </div>
                  </div>
                  <div v-else>无</div>
                </template>
              </el-table-column>



              <el-table-column prop="className" align="center" label="班级" sortable="custom">
                <template slot-scope="scope">
                  <div v-if="scope.row.className" class="one-line">{{scope.row.className}}</div>
                  <div v-else>无</div>
                </template>
              </el-table-column>
              <el-table-column prop="leaveEnter" align="center" label="进出" sortable="custom">
                <template slot-scope="scope">
                  <div v-if="scope.row.leaveEnter" class="one-line">{{scope.row.leaveEnter}}</div>
                  <div v-else>无</div>
                </template>
              </el-table-column>
              <el-table-column prop="happenedDt" label="时间" align="center" sortable="custom"></el-table-column>
              <el-table-column prop="imagePath" align="center" label="摄影头截图">
                <template slot-scope="scope">
                  <div v-if="scope.row.imagePath">
                    <img :src="scope.row.imagePath" alt="" height="100px" class="scope-img">
                  </div>
                  <div v-if="!scope.row.imagePath">无</div>
                </template>
              </el-table-column>
              <el-table-column prop="deviceTypeCode" label="设备类型" align="center" sortable="custom">
                <template slot-scope="scope">
                            <span :style="{color:scope.row.deviceTypeCodeStr.split(';')[1]}"
                                  v-if="scope.row.deviceTypeCodeStr">{{scope.row.deviceTypeCodeStr.split(';')[0]}}</span>
                  <span v-else>无</span>
                </template>
              </el-table-column>
              <el-table-column prop="deviceNum" align="center" label="设备号" sortable="custom">
                <template slot-scope="scope">
                  <div v-if="scope.row.deviceNum" class="one-line">{{scope.row.deviceNum}}</div>
                  <div v-else>无</div>
                </template>
              </el-table-column>
              <el-table-column prop="isException" label="是否异常" align="center" sortable="custom">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isException == 'Y'" disabled></el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="placeName" align="center" label="场所" sortable="custom">
                <template slot-scope="scope">
                  <div v-if="scope.row.placeName" class="one-line">{{scope.row.placeName}}</div>
                  <div v-else>无</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">

                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover">
                    <span slot="reference"
                          @click.stop="toEdit(scope.row.studentHisId)"><i
                      class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
                  </el-popover>

                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference"
                          @click.stop="toDetail(scope.row.studentHisId)"><i
                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">
                  <span slot="reference"
                        @click.stop="rowDel(scope.row.studentHisId)"><i
                    class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
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
    </div>



    <div v-show="showtow" class="two">
      <el-dialog title="宿舍管理" :visible.sync="chapterVisible" width="100%" >

        <div class="top flex row x-center">
          <div class="a" style="flex: 1"><img src="~@/assets/img/dormitory.png" alt=""></div>
          <div class="allNum" >宿舍总数:<span class="c428675"> {{liveingStudentNum}} </span>人 ｜ 来访人数:<span class="c428675"> 10 </span>人 请假人数:<span class="c428675"> 12 </span>人</div>
          &nbsp &nbsp
          <div class="top-linLogo"><img src="~@/assets/img/icon-shape-lin.png"/></div>
          &nbsp &nbsp
          <div class="top-userInfo bl flex row x-center" style="border: 1px solid #93BF88;padding: 5px;border-radius: 30px">
            <el-tooltip class="item" effect="dark" content="用户头像" placement="bottom">
              <img style="width: 30px;height: auto;border-radius: 50%;" class="top-userImg" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557290967723&di=f5ee0c93e97ebd1447d1f23e96943950&imgtype=0&src=http%3A%2F%2Fimg0.itiexue.net%2F1923%2F19239948.jpg"/>
            </el-tooltip>
            &nbsp &nbsp
            <el-dropdown>
          <span class="el-dropdown-link" >
            <span>{{dormitoryName}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
              <el-dropdown-menu slot="dropdown">
                <!--<el-dropdown-item  ><p>0000000</p></el-dropdown-item>-->
                <el-dropdown-item @click.native="logout" divided>退出</el-dropdown-item>
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
            <div class="videoLeft" >
              <div class="visitorData">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394102628&di=35ab287cd510a169a18affc1493d6dac&imgtype=0&src=http%3A%2F%2Fimg2.ctoutiao.com%2Fuploads%2F2018%2F05%2F26%2F149acd6d1fb78d9ca38e3f1228c1bc82.jpg" alt="">
              </div>
              <div class="getinNumberBox"></div>
              <div class="getinNumber">
                <i class="iconfont icon-qingjiaguanli left pl10 pr10 f20 pt5 cfff " ></i>
                <span class="left">进入人员</span>
                <span class="right">总人数:<span>600</span>人</span>
              </div>
              <div class="wantInVisitorlist " >
                <p class="pb5 pl10" v-for="(item,index) in option">
                  <img v-show="!item.src" style="width: 40px;height: 40px;border-radius: 50%;display:inline-block;vertical-align:middle" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559815360925&di=211ed55372884426c21029a56b86f7f0&imgtype=0&src=http%3A%2F%2Fimg.18183.com%2Fuploads%2Fallimg%2F180906%2F235-1PZ6102538.jpg" alt="">
                  <img v-show="item.src" style="width: 40px;height: 40px;border-radius: 50%;display:inline-block;vertical-align:middle" :src="item.src" alt="">
                  <span class="visitorList" v-show="item.visitorName">{{item.visitorName}}</span>
                  <span class="visitorList" v-show="!item.visitorName">陌生人</span>
                  <span class="visitorList">(</span>
                  <span class="visitorListLogin" @click="visitorToLogin(item,index)">登记</span>
                  <span class="visitorList">)</span>
                  <span class="visitorList" v-show="item.isIdCar">:无法识别到校园卡</span>
                  <span class="visitorList" v-show="item.isFiveClean">:无法识别五官</span>
                  <i class="iconfont icon-x1 pl10 pr5 f20 cFA6557 hover" @click="refuseThrough(index)"></i>
                  <i class="iconfont icon-gouzi pl10 pr10 f20 c93BF88 hover" @click="through(item,index,'1')" ></i>
                </p>
              </div>
            </div>

            <div class="videoRight">
              <div class="visitorData">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg" alt="">
              </div>
              <div class="getinNumberBox"></div>
              <div class="getinNumber">
                <i class="iconfont icon-qingjiaguanli left pl10 pr10 f20 pt5 cfff" ></i>
                <span class="left">离去人员</span>
                <span class="right">总人数:<span>600</span>人</span>
              </div>
              <!--<div class="wantInVisitorlist " >-->
                <!--<p class="pb5 pl10" v-for="item in option">-->
                  <!--<img v-show="!item.src" style="width: 40px;height: 40px;border-radius: 50%;display:inline-block;vertical-align:middle" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559815360925&di=211ed55372884426c21029a56b86f7f0&imgtype=0&src=http%3A%2F%2Fimg.18183.com%2Fuploads%2Fallimg%2F180906%2F235-1PZ6102538.jpg" alt="">-->
                  <!--<img v-show="item.src" style="width: 40px;height: 40px;border-radius: 50%;display:inline-block;vertical-align:middle" :src="item.src" alt="">-->
                  <!--<span class="visitorList">{{item.visitorName}}</span>-->
                  <!--<span class="visitorList">(4031)</span>-->
                <!--</p>-->
              <!--</div>-->

              <div class="getOutpicture"></div><!--//半透明背景-->
              <div class="getOutpictureList" @mouseleave="hiddenLetGO" ref="visitorPic" style="overflow: hidden;" >
                <i class="iconfont icon-icon_quxiaozhiding1 cFA6557" style="float: left;line-height: 60px;padding: 0 10px 0 0"></i>
                <span v-for="(item,index) in options" >
                  <span style="position: relative">
                    <img  class="getOutVisitorList"  @mouseover="show(item)"  :src="item.src" alt="">
                    <i v-show="item.isShow" @click="leave(item,index)" class="iconfont icon-gouzi cfff letGo" style="border:1px solid;border-radius: 50%"></i>
                  </span>
                </span>
                <div @click="showAll" class="" style="position: absolute;right:0;top: 0; width: 50px;height: 60px;">
                  <i v-show="!showVisitorPic" class="iconfont icon-icon_zuojiantoucopy1 cfff letGo" style="float: right;line-height: 60px;padding-top: 20px"></i>
                  <i v-show="showVisitorPic" class="iconfont icon-icon_zuojiantoucopy cfff letGo" style="float: right;line-height: 60px;padding-top: 20px"></i>
                </div>
                <!--<img  class="getOutVisitorList" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg" alt="">-->
              </div>
            </div>
          </div>
        </el-container>
        <!--<el-button @click="showVisitorLoginTable">外来来访登录</el-button>-->
        <!--<el-button @click="showStudentVisitorLoginTable">学生来访登录</el-button>-->
        <!--灰色空白区域-->
        <div class="line" style="width: 100%;height: 20px;background-color: #F5F5F5"></div>
        <div class="data"  v-show="VisitorDataTable">
          <el-row>
            <el-col :span="7">
              <div class="grid-content pd10AndBoxSizing">
                <div class="dataTop">
                  <i class="iconfont icon-icon_chakan1 left f15 pr10 c999999" style="line-height: 25px;margin-left: -10px"></i>
                  <span class="left inLeft">进入情况</span>
                  <span class="right inRight">人数: 600人</span>
                </div>
                <div class="clear center pt10" style="display: flex">
                  <span class="leftData">未出:60人</span>
                  <el-progress style="width: 70%"  :stroke-width="10" :percentage="80" color="#FA6557"></el-progress>
                  <span class="rightData">详情</span>
                </div>
                <div class="clear center pt10" style="display: flex">
                  <span class="leftData">已出:70人</span>
                  <el-progress style="width: 70%"  :stroke-width="10" :percentage="90" color="#FA6557"></el-progress>
                  <span class="rightData">详情</span>
                </div>
                <div class="clear center pt10" style="display: flex">
                  <span class="leftData">晚出:80人</span>
                  <el-progress style="width: 70%"  :stroke-width="10" :percentage="70" color="#FA6557"></el-progress>
                  <span class="rightData">详情</span>
                </div>

                <div class="center" style="display: flex">
                  <!--<el-button class="checkAll">全部</el-button>-->
                  <div class="checkAll" @click="checkGetInAllFloor">全部</div>
                  <div class="clear  mt10 checkFloors"  style="width: 80%">
                    <el-pagination style="width: 100%"layout="prev, pager, next"
                                   :total="100" @current-change="checkGetInFloor">
                    </el-pagination>
                  </div>
                </div>

              </div>
            </el-col>

            <el-col :span="7">
              <div class="grid-content pd10AndBoxSizing">
                <div class="dataTop">
                  <i class="iconfont icon-icon_chakan1 left f15 pr10 c999999" style="line-height: 25px;margin-left: -10px"></i>
                  <span class="left inLeft">离去情况</span>
                  <span class="right inRight">人数: 600人</span>
                </div>
                <div class="clear center pt10" style="display: flex">
                  <span class="leftData">未归:60人</span>
                  <el-progress style="width: 70%"  :stroke-width="10" :percentage="80" color="#FA6557"></el-progress>
                  <span class="rightData">详情</span>
                </div>
                <div class="clear center pt10" style="display: flex">
                  <span class="leftData">已归:70人</span>
                  <el-progress style="width: 70%"  :stroke-width="10" :percentage="90" color="#FA6557"></el-progress>
                  <span class="rightData">详情</span>
                </div>
                <div class="clear center pt10" style="display: flex">
                  <span class="leftData">晚归:80人</span>
                  <el-progress style="width: 70%"  :stroke-width="10" :percentage="70" color="#FA6557"></el-progress>
                  <span class="rightData">详情</span>
                </div>

                <div class="center" style="display: flex">
                  <div class="checkAll" @click="checkToLeaveAllFloor">全部</div>
                  <div class="clear  mt10 checkFloors"  style="width: 80%">
                    <el-pagination style="width: 100%"layout="prev, pager, next"
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
                  <i class="iconfont icon-icon_chakan1 left f15 pr10 c999999" style="line-height: 25px;margin-left: -10px"></i>
                  <span class="left inLeft">访问情况</span>
                  <span class="right inRight">人数: 130人</span>

                  <div class="clear center pt10" style="display: flex">
                    <span class="leftData">学生:80人 &nbsp</span>
                    <el-slider v-model="visitorNumber" style="width: 50%" disabled> </el-slider>
                    <span class="rightData"> &nbsp详情</span>
                  </div>
                  <div class="clear center pt10" style="display: flex">
                    <span class="leftData">其它:80人 &nbsp</span>
                    <el-slider v-model="visitorNumber" style="width: 50%" disabled> </el-slider>
                    <span class="rightData"> &nbsp详情</span>
                  </div>
                  <div class="center" style="display: flex">
                    <div class="checkAll" @click="checkGetVisitAllFloor">全部</div>
                    <div class="clear  mt10 checkFloors"  style="width: 100%">
                      <el-pagination style="width: 100%"layout="prev, pager, next" small
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
                  <i class="iconfont icon-qingjiaguanli left f15 pr10 c999999" style="line-height: 25px;margin-left: -10px"></i>
                  <span class="left inLeft">访问情况</span>
                  <span class="right inRight">人数: 130人</span>
                  <div class="clear center pt10" style="display: flex">
                    <el-progress type="circle"  :percentage="25"  color="#93BF88" :width="80"></el-progress>
                    <span class="rightData"> &nbsp详情</span>
                  </div>
                  <div class="center" style="display: flex">
                    <div class="checkAll" @click="checkGetAllVisitStatistics">全部</div>
                    <div class="clear  mt10 checkFloors"  style="width: 100%">
                      <el-pagination style="width: 100%"layout="prev, pager, next" small
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

        <!--校外人员来访登记-->
        <div class="data" v-show="VisitorLoginTable">
          <div class="right" style="padding: 10px;" @click="cancel" ><img src="~@/assets/img/close.png"/></div>
          <div class="visitorLogin">
            <el-form :label-position="'right'" class="edit-form"
                     label-width="120px" ref="outsiteVisitor" :inline="false" :model="outsiteVisitor"  size="small">
              <!---->
              <el-col :span="6">
                <el-form-item label="姓名 :" prop="visitorName" class="visitorMessage">
                  <el-input v-model="outsiteVisitor.visitorName" maxlength="32" placeholder="请输入姓名"></el-input>
                  <!--v-model="formData.studentId"-->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="性别 :" prop="sex" class="visitorMessage">
                  <el-select  v-model="outsiteVisitor.sex" placeholder="请选择性别">
                    <el-option v-for="item in sexOptions"
                               :key="item.gender"
                               :label="item.label" :value="item.gender">
                    </el-option>
                  </el-select>

                  <!--<el-input v-model="outsiteVisitor.sex" maxlength="32" placeholder="请选择性别"></el-input>-->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="宿舍号 :" prop="studentUserId" class="visitorMessage">
                  <el-input v-model="outsiteVisitor.dormitoryNumber" maxlength="32" placeholder="请输入访问的宿舍号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="找谁 :" prop="studentUserId" class="visitorMessage" style="padding-right: 20px">
                  <el-input v-model="outsiteVisitor.forWho" maxlength="32" placeholder="请输入姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="身份号 :" prop="cardNum" class="visitorMessage">
                  <el-input  v-model="outsiteVisitor.cardNum" maxlength="32" placeholder="请输入身份证"></el-input>
                  <!--v-model="formData.studentId"-->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="电话 :" prop="visitorPhonenum" class="visitorMessage">
                  <el-input  v-model="outsiteVisitor.visitorPhonenum" maxlength="32" placeholder="请输入手机号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注 :" prop="studentName" class="visitorMessage">
                  <el-input  v-model="outsiteVisitor.remarks" style="width: 90%" class="input-v2-rao" placeholder="请输入备注信息"
                            ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="来访头像 :" prop="imagePath"  class="visitorMessage">
                  <upload v-on:uploadData="uploadData" class="input-v2-rao" :imagelist="outsiteVisitor.imagePath"/>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item class="center">
                  <el-button type="primary" class="button-v2-rao b93BF88" @click="keepData('outsiteVisitor',outsiteVisitor)">保存</el-button>
                  <el-button  @click="cancel" >取消</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </div>

        <!--学生来访登录-->
        <div class="data" v-show="studentVisitorLoginTable" >
          <div class="right" style="padding: 10px;" @click="studentcancel" ><img src="~@/assets/img/close.png"/></div>
          <div class="visitorLogin">
            <el-form :label-position="'right'" class="edit-form"
                     label-width="120px" ref="insiteVisitor" :inline="false" :model="insiteVisitor"  size="small">
              <!---->
              <el-col :span="6">
                <el-form-item label="姓名 :" prop="visitorName" class="visitorMessage">
                  <el-input v-model="insiteVisitor.visitorName" placeholder="请输入姓名" disabled maxlength="32"></el-input>
                  <!--v-model="formData.studentId"-->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="性别 :" prop="sex" class="visitorMessage">
                  <el-input  v-model="insiteVisitor.sex" disabled placeholder="请选择性别" maxlength="32"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="宿舍号 :" prop="studentUserId" class="visitorMessage">
                  <el-input v-model="insiteVisitor.dormitoryNumber" placeholder="请输入访问的宿舍号码" maxlength="32"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="找谁 :" prop="studentUserId" class="visitorMessage" style="padding-right: 20px">
                  <el-input v-model="insiteVisitor.forWho" placeholder="请输入姓名" maxlength="32"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="身份号 :" prop="cardNum" class="visitorMessage">
                  <el-input v-model="insiteVisitor.cardNum" disabled placeholder="请输入身份证" maxlength="32"></el-input>
                  <!--v-model="formData.studentId"-->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="电话 :" prop="visitorPhonenum" class="visitorMessage">
                  <el-input v-model="insiteVisitor.visitorPhonenum" placeholder="请输入手机号码" maxlength="32"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注 :" prop="studentName" class="visitorMessage">
                  <el-input v-model="insiteVisitor.remarks" placeholder="请输入备注信息" style="width: 90%" class="input-v2-rao"
                            maxlength="32"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="来访头像 :" prop="imagePath" class="visitorMessage">
                  <upload v-on:uploadData="uploadData" class="input-v2-rao" :imagelist="insiteVisitor.imagePath"/>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item class="center">
                  <el-button type="primary" class="button-v2-rao b93BF88" @click="through(insiteVisitor)">放行</el-button>
                  <el-button type="primary" class="button-v2-rao b93BF88" @click="keepData('insiteVisitor',insiteVisitor)">保存</el-button>
                  <el-button type="danger"  @click="refuseThrough(insiteVisitor)">拒绝</el-button>
                  <el-button  @click="studentcancel" >取消</el-button>
                </el-form-item>
              </el-col>


            </el-form>
          </div>
        </div>

        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
    </div>

  </div>
</template>
<script>

  import {mapState, mapGetters} from "vuex";
  import {fullscreenToggel, listenfullscreen} from "@/util/util";
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import routerSchool from "@/const/routerSchool";

  import api from "./schoolplacestudentcheckUrl";
  import commonApi from "@/api/common/common";
  import preview from '@/util/preview';
  import editor from '@/components/editor/editor'
  import {coverData} from '@/util/util'
  export default {
    components: {editor, upload, uploads},
    directives: {preview},
    data() {
      return {
        liveingStudentNum:0,
        showVisitorPic:false,
        dormitoryName:null,
        sexOptions:[
          {
            gender:'F',
            label:'女',
          },
          {
            gender:'M',
            label:'男',
          }
        ],
        options:[
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            isShow:false,
          },

        ],
        option:[
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            visitorName:'君莫忘',
            id:'1111',
            isIdCar:true,
            isFiveClean:false,
            isStdent:true,
            sex:'F'
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            visitorName:'君莫笑',
            id:'2222',
            isIdCar:false,
            isFiveClean:false,
            isStdent:false,
            sex:'F'
          },
          {
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557394557416&di=c9242b425cbe50dcdfc21f2075f86ae0&imgtype=0&src=http%3A%2F%2Ftu.ossfiles.cn%3A9186%2Fgroup1%2FM00%2F20%2F64%2FrBgIBlyIsJmvOUiQAABmOpyKJHs948.jpg',
            visitorName:'君莫问',
            id:'3333',
            isIdCar:false,
            isFiveClean:true,
            isStdent:true,
            sex:'M'
          },
          {
            src:'',
            visitorName:'',
            id:'4444',
            isIdCar:false,
            isFiveClean:false,
            isStdent:false,
            sex:'M'
          },
        ],
        studentVisitorLoginTable:false,
        VisitorDataTable:true,
        VisitorLoginTable:false,
        formData:{
          imagePath:null,
        },
        outsiteVisitor:{
          visitorName:'',
          sex:'',
          dormitoryNumber:'',
          forWho:'',
          cardNum:'',
          visitorPhonenum:'',
          remarks:'',
          cardTypeCode:'A',//默认填写身份证
          visitedDt:null,
        },
        insiteVisitor:{
          visitorName:'',
          sex:'',
          dormitoryNumber:'',
          forWho:'',
          cardNum:'',
          visitorPhonenum:'',
          remarks:'',
          cardTypeCode:'A',//默认填写身份证
          visitedDt:null,

        },
        chapterVisible: false,
        visitorNumber:10,
        showtow:true,
        isLoaded: true,
        dialogDelete: false,
        isDel: false,
        msgShow: false,
        deviceTypeCodeOptions: [{"label": "全部", "name": ""}],
        ynOptions: [{"label": "全部", "name": ""}],
        form : {
          studentName :null,
          gradeName :null,
          className :null,
          leaveEnter :null,
          happenedDt :null,
          ynValue: null,
          placeName :null,
        },
        searchForm : {
          studentName :null,
          gradeName :null,
          className :null,
          leaveEnter :null,
          happenedDt :null,
          isException :null,
          placeName :null,
        },
        rules: {
          visitorName:
            [
              {required: true, message: "请输入姓名", trigger: "blur"},
            ],
          cardNum:
            [
              {required: true, message: "请输入身份证", trigger: "blur"},
            ],
          sex:
            [
              {required: true, message: "请选择性别", trigger: "blur"},
            ],
          visitorPhonenum:
            [
              {required: true, message: "请输入手机号码", trigger: "blur"},
            ],
        },

        data : "",
        onSwitchStatus :true,
        offSwitchStatus: false,
        multipleSelection : [],
        params :{
          page : 1,
          limit:10,
          studentName :null,
          gradeName :null,
          className :null,
          leaveEnter :null,
          happenedDt :null,
          isException :null,
          placeName :null,
        },
        showTimes:null,
      }
    },
    computed: {
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      }
    },
    created() {
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
      this.showTime();
    },
    mounted() {
      this.getCurrentPage(this.$route.path, this.params)
      this.getList();
      this.dormitoryName = this.$route.query.dormitoryName
      //给添加访问人员提供参数去
      this.insiteVisitor.placeId = this.outsiteVisitor.placeId = this.$route.query.placeId
      this.insiteVisitor.placeName = this.outsiteVisitor.placeName = this.$route.query.placeName
      commonApi.getCodeIntType("deviceType").then(res => {
        let viewList = res.data.data || [];
        for (let deviceTypeItem of viewList) {
          this.deviceTypeCodeOptions.push({
            "label": deviceTypeItem.codeDesc,
            "name": deviceTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("boolean_yn").then(res => {
        let viewList = res.data.data || [];
        for (let ynItem of viewList) {
          this.ynOptions.push({
            "label": ynItem.codeDesc,
            "name": ynItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      // 来访登录
      visitorToLogin(val,index){
        if (val.isStdent===true){ //来访为学生
          this.VisitorDataTable=false
          this.VisitorLoginTable=false
          this.studentVisitorLoginTable=true
          this.insiteVisitor.visitorName = val.visitorName
          this.insiteVisitor.sex = val.sex
          this.insiteVisitor.cardNum = val.id
          if (val.sex === 'F'){this.insiteVisitor.sex = '女'}
          if (val.sex === 'M'){this.insiteVisitor.sex = '男'}
          this.insiteVisitor.imagePath = val.src
          this.insiteVisitor.index = index
        }else{
          this.VisitorDataTable=false
          this.studentVisitorLoginTable=false
          this.VisitorLoginTable=true
          this.outsiteVisitor.visitorName = val.visitorName
          this.outsiteVisitor.cardNum = val.id
          this.outsiteVisitor.imagePath = val.src
          this.outsiteVisitor.index = index
        }
      },
      //放行
      through(data,index,num){
        if (num==1){
            this.option.splice(index,1)  //快捷放行
        } else{
          this.option.splice(data.index,1)
        }
        // console.log(index)
        this.studentcancel();
      },
      //拒绝放行
      refuseThrough(index){
        if (typeof index==="number") {
          this.option.splice(index,1)
        }else{
          this.option.splice(index.index,1)
        }
        this.studentcancel();
      },
      //进入情况
      checkGetInFloor(size){
        alert('进入'+size)
      },
      //离去情况
      checkToLeaveFloor(size){
        alert('离去'+size)
      },
      //访问情况
      checkGetVisitFloor(size){
        alert('访问'+size)
      },
      //访问统计
      checkGetVisitStatistics(size){
        alert('统计'+size)
      },
      checkGetInAllFloor(){
        alert('进入所有')
      },
      checkToLeaveAllFloor(){
        alert('离开所有')
      },
      checkGetVisitAllFloor(){
        alert('访问所有')
      },
      checkGetAllVisitStatistics(){
        alert('访问统计所有')
      },

      showAll(){
        // this.$refs.visitorPic.style.display='hidden'
        // document.getElementsByClassName('getOutpictureList')[0].style.overflow='none'
        if (this.showVisitorPic){
          this.showVisitorPic = false
          this.$refs.visitorPic.style.overflow="hidden";
        } else{
          this.showVisitorPic = true
          this.$refs.visitorPic.style.overflow="visible";
        }
        // this.$refs.visitorPic.style.overflow="hidden";
        // console.log(this.$refs.visitorPic.style.overflow)
        // this.$refs.visitorPic.style.display='hidden'
      },
      leave(val,index){
        this.options.splice(index,1)
        // console.log(index)
      },
      show(val){
        this.options.map(item=>{
          item.isShow = false
        })
        val.isShow = true
        // alert(val)
      },
      hiddenLetGO(){
        this.options.map(item=>{
          item.isShow = false
        })
      },
      keepData(formName,deleteOne){
        // console.log(deleteOne)

        const set = this.$refs;
        set[formName].validate(valid => {
          this.outsiteVisitor.visitedDt = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
          if (valid) {
            if (formName === 'outsiteVisitor'){
              api.addVisitor(this.outsiteVisitor).then(res => {
                if (res.data.resultCode === "000000") {
                  this.$message.success("添加成功");
                  this.cancel()
                  for (let i=0;i<this.option.length;i++){
                    if (this.option[i].id === deleteOne.cardNum) {
                      this.option.splice(deleteOne.index,1)
                    }
                  }
                  // console.log(deleteOne.visitorName)
                  // console.log(deleteOne.index)

                } else {
                  this.$message.error(res.data.message);
                }
              })
          } else{
              if (this.insiteVisitor.sex === '男'){this.insiteVisitor.sex = 'M' }
              if (this.insiteVisitor.sex === '女'){this.insiteVisitor.sex = 'F' }
              this.insiteVisitor.visitedDt = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
              // this.insiteVisitor.isParent='N'
              // console.log(this.insiteVisitor.visitedDt)
              api.addVisitor(this.insiteVisitor).then(res => {
                if (res.data.resultCode === "000000") {
                  this.$message.success("添加成功");
                  this.studentcancel()
                  for (let i=0;i<this.option.length;i++){
                    if (this.option[i].id === deleteOne.cardNum) {
                      this.option.splice(deleteOne.index,1)
                      // // console.log(deleteOne.visitorName)
                    }
                  }
                  // console.log(deleteOne.visitorName)
                  // console.log(deleteOne.index)

                } else {
                  this.$message.error(res.data.message);
                }
              })

          }
          }
        })
      },
      cancel(){
        this.VisitorLoginTable=false
        this.VisitorDataTable=true
      },
      studentcancel(){
        this.VisitorDataTable=true
        this.VisitorLoginTable=false
        this.studentVisitorLoginTable=false
      },

      showVisitorLoginTable(){
        this.VisitorDataTable=false
        this.studentVisitorLoginTable=false
        this.VisitorLoginTable=true
      },
      showStudentVisitorLoginTable(){
        this.VisitorDataTable=false
        this.VisitorLoginTable=false
        this.studentVisitorLoginTable=true
      },


      uploadData(res) {
        this.formData.imagePath = res;
      },
      showTime(){
        // setInterval(function () {
        //    this.showTimes = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
        //   document.getElementById("times").innerHTML = this.showTimes
        //   // // console.log(document.getElementById("times").innerHTML)
        // },1000)
      },
      addChapter () {
        this.showTime(); //开启时间
        this.chapterVisible = true
        this.getAllStudents()
      },
      getAllStudents(){
        let getStudentsForm = {}
        getStudentsForm.dormitoryId=this.$route.query.dormitoryId
        getStudentsForm.page=1
        getStudentsForm.limit=9999
        api.getAllStudents(getStudentsForm).then(res => {
          let data = res.data.data.records;
          this.liveingStudentNum = 0
          //统计可用学生
          data.map(item=>{
            if (item.accommodationStatusCodeStr !== '' && item.accommodationStatusCodeStr !== undefined) {
              if (item.accommodationStatusCodeStr.split(';')[0] === '可用') {
                this.liveingStudentNum += 1
              }
            }
          })
          // console.log(res.data.data.records.length)

          this.isLoaded = false;
        }, res => {
          this.$message.error(res.message);
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.studentHisId
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
        this.params.isAsc = obj.order == "ascending" ;
        this.setCurrentPage(this.$route.path, this.params)
        this.isLoaded = true;
        this.getList();
      },
      getList() {
        api.fetchList(this.params).then(res => {
          this.data = res.data.data;
          this.isLoaded = false;
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
        let opath = '/dormitory/detailSchoolPlaceStudentCheck/add/' + 0;
        this.$router.push({path: opath})
      },
      toTotal (){
        let opath = '/dormitory/SchoolPlaceStudentCheckTotal';
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/dormitory/detailSchoolPlaceStudentCheck/edit/' + id;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/dormitory/detailSchoolPlaceStudentCheck/detail/' + id;
        this.$router.push({path: opath})
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  /*.el-progress-circle{*/
  /*width: 96px!important;*/
  /*height: 96px!important;*/
  /*}*/
  .checkAll{
    margin: 13px 0 0 0;
    width:48px;
    height:26px;
    background:rgba(147,191,136,1);
    border-radius:4px;
    color: white;
    text-align: center;
    line-height: 26px;
  }

  .hover:hover{
    cursor: pointer;
  }
  .allNum{
    font-size:16px;
    font-family:MicrosoftYaHei;
    color:rgba(153,153,153,1);
  }
  .visitorMessage{
    font-size:14px;
    font-family:MicrosoftYaHei;
    color:rgba(153,153,153,1);
    line-height:14px;
  }
  .visitorLogin{
    clear: both;
  }
  .border{
    height: 100%;
    border-left: 1px solid #E8E8E8;
    border-right: 1px solid #E8E8E8;
  }
  .dataTop{
    width: 100%;
    height: auto;
  }
  .leftData{
    font-size:14px;
    font-family:MicrosoftYaHei;
    color:rgba(153,153,153,1);
    line-height:19px;
  }
  .rightData{
    font-size:14px;
    font-family:MicrosoftYaHei;
    color:rgba(147,191,136,1);
    line-height:19px;
  }
  .clear{
    clear: both;
  }
  .inLeft{
    font-size:18px;
    font-family:MicrosoftYaHei;
    color:rgba(53,53,53,1);
    line-height:24px;
  }
  .inRight{
    width:90px;
    height:24px;
    font-size:18px;
    font-family:MicrosoftYaHei;
    color:rgba(153,153,153,1);
    line-height:24px;
    white-space: nowrap;

  }
  .data{
    overflow: hidden;
    width: 100%;
    height: auto;
    margin-top: 20px;
    border: 1px solid #E8E8E8;
    border-radius: 5px;
  }
  .pd10AndBoxSizing{
    padding: 10px 20px;
    box-sizing: border-box;
  }

  .three{
    background-color: #3c7373;
  }
  .four{
    background-color: #353535;

  }
  .video{
    width: 100%;
    display: flex;
    height: auto;
    border: 1px solid;
    margin-top: 10px;
  }
  .visitorData{
    border-radius: 10px;
    overflow: hidden;
  }
  .visitorData>img{
    width: 100%;
  }

  .videoLeft{
    width: 50%;
    height: auto;
    margin: 0 10px 0 0 ;
    position: relative;
  }
  .wantInVisitorlist{
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 80px;
    font-size:16px;
    font-family:MicrosoftYaHeiSemibold;
    color:rgba(255,255,255,1);
  }
  .visitorList{
    text-shadow:0px 2px 4px rgba(0,0,0,0.5);
  }
  .visitorListLogin{
    color:#FA6557;
    text-shadow:0px 2px 4px rgba(0,0,0,0.5);
  }
  .visitorListLogin:hover{
    cursor: pointer;
  }
  .getinNumberBox{
    width: 100%;
    height: 80px;
    background-color: #353535;
    opacity: 0.3;
    position: absolute;
    left: 0;
    bottom: 5px;
  }
  .getOutpicture{
    width: 90%;
    height: 60px;
    background-color: #353535;
    opacity: 0.3;
    position: absolute;
    border-radius: 5px;
    margin:auto;
    top: 20px;
    left:0;
    right:0;
    box-sizing: border-box;
  }
  .getOutpictureList{
    width: 90%;
    height: 60px;
    position: absolute;
    border-radius: 5px;
    margin:auto;
    top: 20px;
    left:0;
    right:0;
    /*overflow: hidden;*/
    box-sizing: border-box;
    padding: 0 50px 20px 20px;
  }
  .getOutVisitorList{
    width: 50px;
    height: 50px;
    margin-top: 5px;
    border-radius: 50%;
    border: 1px solid #FA6557;
  }
  .getOutVisitorList:hover{
    cursor: pointer;
  }
  .letGo{
    position: absolute;
    left: 17px;
    top: -24px;
    z-index: 5;
  }
  .letGo:hover{
    color: #93BF88;
    cursor: pointer;
  }
  .getinNumber{
    padding: 10px;
    box-sizing: border-box;
    font-size:24px;
    /*font-family:MicrosoftYaHei;*/
    color:rgba(255,255,255,1);
    width: 100%;
    position: absolute;
    bottom: 20px;
    color: white;
  }
  .videoRight{
    width: 50%;
    height: auto;
    margin: 0 0 0 10px;
    position: relative;
  }
  .time{
    width:134px;
    height:22px;
    font-size:18px;
    font-family:Impact;
    color:rgba(153,153,153,1);
    line-height:22px;
  }
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .rightcolor{
    color:rgba(147,191,136,1);
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
