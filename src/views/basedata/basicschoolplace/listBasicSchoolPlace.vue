


<template>
  <div class="BasicSchoolPlace">
    <el-container  v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">
          <!--<el-form-item label="上级场所id:"  prop="parentPlaceId" class="w140">-->
          <!--<el-input class="input-v2-rao" v-model="searchForm.parentPlaceId" maxlength="30"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="场所编号:"  prop="placeNum" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.placeNum" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="场地名称:"  prop="placeName" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.placeName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="允许最大人数:"  prop="maxUser" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.maxUser" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
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
            <el-button v-show="hiddenAdd" type="primary" size="small" class="button-v2-rao b93BF88 " @click="toAdd">
              <i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增
            </el-button>
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
            <!--<el-table-column prop="parentPlaceId" align="center" label="上级场所id" sortable="custom">-->
            <!--<template slot-scope="scope">-->
            <!--<div v-if="scope.row.parentPlaceId" class="one-line">{{scope.row.parentPlaceId}}</div>-->
            <!--<div v-else>无</div>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="placeNum" align="center" label="场所编号" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.placeNum" class="one-line">{{scope.row.placeNum}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="placeName" align="center" label="场地名称" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.placeName" class="one-line">{{scope.row.placeName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="placeTypeCode" label="场所类型" align="center" sortable="custom">
              <template slot-scope="scope">
                            <span :style="{color:scope.row.placeTypeCodeStr.split(';')[1]}"
                                  v-if="scope.row.placeTypeCodeStr">{{scope.row.placeTypeCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="ucs" align="center" label="三维坐标" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.ucs" class="one-line">{{scope.row.ucs}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="maxUser" align="center" label="允许最大人数" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.maxUser" class="one-line">{{scope.row.maxUser}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column label="操作"  >
              <template slot-scope="scope" >

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover">
                    <span slot="reference"
                          @click.stop="toEdit(scope.row.placeId)"><i
                      class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
                </el-popover>

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference"
                          @click.stop="toDetail(scope.row.placeId)"><i
                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">
                  <span slot="reference"
                        @click.stop="rowDel(scope.row.placeId)"><i
                    class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover v-show="showListTwo" placement="top-start" popper-class="popover-v2-rao" title="子场所" trigger="hover">
                  <span slot="reference"
                        @click.stop="chilrenPlace(scope.row.placeId,scope.row.placeName)"><i
                    class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover v-show="showListTwo" placement="top-start" popper-class="popover-v2-rao" title="监控" trigger="hover">
                  <span slot="reference"
                        @click.stop="openMonitor(scope.row)" >
                    <i class="iconfont icon-qingjiaguanli ml5 f20 c999999"></i></span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>

      <div class="two">
        <el-dialog title="" :visible.sync="chapterVisible" width="100%">
          <!--<el-button size="small" type="primary" @click="chooseStdent=!chooseStdent">打开选择学生</el-button>-->
          <div class="top flex row x-center">
            <div class="a" style="flex: 1">
              <img v-show="onleGate" src="~@/assets/img/dormitory.png" alt="">
              <img v-show="!onleGate" src="~@/assets/img/dra.png" alt="">
              <!--<span class="visitorListLogin" @click="visitorToLogin(item,index)">登记</span>-->
              <!--<span class="visitorListLogin" @click="filterGateData()">来人了</span>-->



            </div>
            <div class="allNum" >
              <span v-show="onleGate">宿舍总数:</span>
              <span class="c428675" v-show="onleGate">{{liveingStudentNum}} </span>
              <span v-show="onleGate">人 ｜ </span>
              <span> 来访人数:</span>
              <span class="c428675"> {{visitNum}} </span>
              <span v-show="onleGate">人 请假人数:</span>
              <span class="c428675" v-show="onleGate"> {{studentsLeaveNum}} </span>
              <span v-show="onleGate">人</span>
            </div>
            <!--<el-button size="small" type="primary" @click="filterData" v-show="true">添加数据</el-button>-->
            <div class="top-linLogo pl10"><img src="~@/assets/img/icon-shape-lin.png"/></div>
            <div class="top-userInfo bl flex row x-center ml-10"
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
                  <!--<el-dropdown-item v-for="(item,index) in getDormitoryIdList" :key="index" @click.native="SeeDormitory(item)">-->
                    <!--<p>{{item.dormitoryName}}</p>-->
                  <!--</el-dropdown-item>-->

                  <!--<el-dropdown-item @click.native="logout" divided>退出</el-dropdown-item>-->
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                        element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
            <el-header style="height: auto">
              <span class="time" id="times"></span>
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
                    <i class="iconfont icon-icon_chakan1 left f15 pl10 pr10 c999999"
                       style="line-height: 25px;margin-left: -10px"></i>
                    <span class="left inLeft">进入情况</span>
                    <span class="right inRight">人数: 60人</span>
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
                    <i class="iconfont icon-icon_chakan1 left f15 pl10 pr10 c999999"
                       style="line-height: 25px;margin-left: -10px"></i>
                    <span class="left inLeft">离去情况</span>
                    <span class="right inRight">人数: 60人</span>
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
                </div>
              </el-col>
              <el-col :span="5" class="border">
                <div class="grid-content pd10AndBoxSizing ">
                  <div class="dataTop">
                    <i class="iconfont icon-icon_chakan1 left f15 pl10 pr10 c999999"
                       style="line-height: 25px;margin-left: -10px"></i>
                    <span class="left inLeft">访问情况</span>
                    <span class="right inRight">人数: {{this.visitNum}}人</span>

                    <div class="clear center pt10" style="display: flex">
                      <span class="leftData">学生:80人 &nbsp</span>
                      <el-slider v-model="visitorNumber" style="width: 50%" disabled></el-slider>
                      <span class="rightData"> &nbsp详情</span>
                    </div>
                    <div class="clear center pt10" style="display: flex">
                      <span class="leftData">其它:{{this.visitNum}}人 &nbsp</span>
                      <el-slider v-model="visitNum" style="width: 50%" disabled></el-slider>
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
                    <i class="iconfont icon-qingjiaguanli left f15 pl10 pr10 c999999"
                       style="line-height: 25px;margin-left: -10px"></i>
                    <span class="left inLeft">访问情况</span>
                    <span class="right inRight">人数: {{this.visitNum}}人</span>
                    <div class="clear center pt10" style="display: flex">
                      <el-progress type="circle" :percentage="this.visitNum" color="#93BF88" :width="80"></el-progress>
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

          <!--来访登录-->
          <div class="data" v-show="studentVisitorLoginTable">
            <div class="right" style="padding: 10px;" @click="studentcancel"><img src="~@/assets/img/close.png"/></div>
            <div class="visitorLogin">
              <el-form :label-position="'right'" class="edit-form"
                       label-width="120px" ref="insiteVisitor" :inline="false" :model="insiteVisitor" :rules="rules" size="small">

                <!---->
                <el-col :span="12">
                  <el-form-item label="姓名 :" prop="visitorName" class="visitorName">
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
                  <el-form-item label="证件号 :" prop="cardNum" class="">
                    <el-input v-model="insiteVisitor.cardNum" placeholder="请输入证证号" maxlength="32"></el-input>
                    <!--v-model="formData.studentId"-->

                  </el-form-item>
                </el-col>
                <el-col :span="12" style="position: relative">
                  <el-form-item label="电话 :" prop="visitorPhonenum" class="phoneNumber">
                    <el-input v-model="insiteVisitor.visitorPhonenum" placeholder="请输入手机号码" maxlength="32"></el-input>
                    <span class="c93BF88 f12" style="position: absolute;top: 0px;right: 10px;" v-show="phoneAllow">手机号码正确</span>
                    <span class="cFA6557 f12" style="position: absolute;top: 0px;right: 10px;" v-show="phoneNoAllow">手机号码输入有误</span>

                  </el-form-item>
                </el-col>

                <!--<el-col :span="12">-->
                  <!--<el-form-item label="宿舍号 :" prop="studentUserId" class="visitorMessage">-->
                    <!--<el-input v-model="insiteVisitor.dormitoryNumber" placeholder="请输入访问的宿舍号码" maxlength="32"></el-input>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="6">-->
                  <!--<el-form-item label="找谁 :" prop="studentUserId" class="visitorMessage">-->
                    <!--<el-input v-model="insiteVisitor.forWho" placeholder="请输入姓名" maxlength="32"></el-input>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->


                <el-col :span="12">
                  <el-form-item label="来访事由 :" prop="studentName" class="forSomething">
                    <el-input v-model="insiteVisitor.remark" placeholder="请输入来访事由" style="width: 90%" class="input-v2-rao"
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
    <!--<monitor :="showMonitor"></monitor>-->
  </div>
</template>
<script>
  import api from "./basicschoolplaceUrl";
  import commonApi from "@/api/common/common";
  import preview from '@/util/preview';
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import {dateFilter} from '@/filters/index';
  // import monitor from '@/components/monitor/listmonitor';
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
        phoneNoAllow:false,
        phoneAllow:false,
        onleGate:true,
        chapterVisible: false,
        isLetgoOut:false,
        showEnterVisitorPic: false,
        showEnter: false,
        showVisitorPic: false,
        studentVisitorLoginTable: false,
        VisitorDataTable: true,
        VisitorLoginTable: false,
        hiddenAdd:false,
        isLoaded: true,
        dialogDelete: false,
        isDel: false,
        msgShow: false,
        showListTwo:true,
        inManPic:null,
        outManPic:null,
        dormitoryName: null,
        getInNum:0,
        getOutNum:0,
        visitNum:0,
        visitorNumber: 10,
        liveingStudentNum: 0,
        getInAll:[],
        getInStudents:[],
        getInStrangers:[],
        getOutAll:[],
        getOutStudents:[],
        getOutStrangers:[],
        newData:null,
        insiteVisitor: {
          visitorName: '',
          placeTypeCode:null,
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
          placeName:null,
        },
        studentsLeaveNum:0,//学生请假人数
        placeType:null,
        // placeId:null,//
        connectionNum:1,//设备断开后重连次数
        isbeginSetInterval:null,//定时器去获取时间
        placeTypeCodeOptions: [{"label": "全部", "name": ""}],
        cardTypeCodeOptions: [{"label": "全部", "name": ""}],
        getWatch:{
          placeId:null,
          schoolId:null,
        },
        form : {
          parentPlaceId :null,
          placeNum :null,
          placeName :null,
          maxUser :null,
        },
        searchForm : {
          parentPlaceId :null,
          placeNum :null,
          placeName :null,
          maxUser :null,
        },
        data : "",
        multipleSelection : [],
        params :{
          page : 1,
          limit:10,
          placeNum :null,
          schoolId:null,
          parentPlaceId:-1,
          placeName :null,
          maxUser :null,
        },
        childrenParams:{
          page : 1,
          limit:10,
          parentPlaceId:null,
          placeNum :null,
          schoolId:null,
          placeName :null,
          maxUser :null,
        },
        schoolId:null,
        schoolOrgName:null,
        parentPlaceId:-1,
        forChangeArray:null,
        studentsLeaveNumForm:{
          dormitoryId:null,
          leaveDt:null,
        },
        shoosePlaceTypeCode:null,//要查看的宿舍类型
        getDormitoryIdList:[],//获取宿舍列表
      }
    },
    watch:{
      insiteVisitor:{
        handler:function(){
          if (this.insiteVisitor.visitorPhonenum !== ''){   //验证手机号码是否正确
            let value = this.insiteVisitor.visitorPhonenum
            let  reg=/^1[3456789]\d{9}$/;
            if(!reg.test(value)){   //是否不正确  否为true
              this.phoneAllow = false
              this.phoneNoAllow = true
            }else{
              this.phoneAllow = true
              this.phoneNoAllow = false
            }
          }else{
            this.phoneAllow = false
            this.phoneNoAllow = false
          }
        },
        deep:true
      },

  chapterVisible() {
        if (this.chapterVisible === false){
          this.closeWebSocket()
          // console.log('断开连接')
          clearInterval(this.isbeginSetInterval)
          // console.log('已清除定时器')
            this.getInAll=[];
            this.getInStudents=[];
            this.getInStrangers=[];
            this.getOutAll=[];
            this.getOutStudents=[];
            this.getOutStrangers=[];
          this.getDormitoryIdList=[];
          this.studentData = []
        }
      },
      forChangeArray(){
        if (this.shoosePlaceTypeCode !== 'B' || this.studentData===[]) { //其他过滤，判断是否是本学校
          this.filterGateData()

        }else if(this.shoosePlaceTypeCode === 'B'){    //宿舍过滤，判断是否是本宿舍
          this.filterDormitoryData()

        }
      // },
    },
    },

    computed: {
        indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      }
    },
    // activated() {
    //   //只刷新数据，不改变整体的缓存
    //   // console.log('重新活跃路由');
    //   let query = this.$route.query;
    //   for (let item in query) {
    //     this.params[item] = query[item]
    //   }
    //   this.getList()
    // },
    created() {
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
      this.params.schoolId=this.$route.query.schoolId
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
      this.getCurrentPage(this.$route.path, this.params)
      this.getList();
      commonApi.getCodeIntType("placeType").then(res => {
            let viewList = res.data.data || [];
            for (let placeTypeItem of viewList) {
              this.placeTypeCodeOptions.push({
                "label": placeTypeItem.codeDesc,
                "name": placeTypeItem.codeId
              });
            }
          }, res => {
            this.$message.error(res.data.message);
          });
    },
    methods: {
      isSchoolStdent(){
        // // console.log(this.newData);
        // for (let i=0;i<this.newData.inCheck.length;i++){
        //   // console.log(this.newData.inCheck[i].studentId)
        //   let studentId = this.newData.inCheck[i].studentId
        //     api.isSchoolStdent(studentId).then(res => {
        //       // console.log(res)
        //     }, res => {
        //       this.$message.error(res.message);
        //     });
        // }
        //
        // for (let i=0;i<this.newData.outCheck.length;i++){
        //   let studentId = this.newData.outCheck[i].studentId
        //   api.isSchoolStdent(studentId).then(res => {
        //     // console.log(res)
        //   }, res => {
        //     this.$message.error(res.message);
        //   });
        // }

      },
      //宿舍过滤（是否是本宿舍的学生）
      filterDormitoryData(){
        // console.log('宿舍过滤1')

        if(this.newData.inCheck.length>0) {
          for (let i=0;i<this.newData.inCheck.length;i++) {
            let isStranger = true  //默认是陌生人
            for (let j = 0; j < this.studentData.length; j++) {
              if (this.newData.inCheck[i].studentId === this.studentData[j].studentId) {
                isStranger = false  //不是陌生人
                this.getInStudents.push(this.newData.inCheck[i])  //免登记学生列表（进）
                this.newData.inCheck[i].hiddenOparetion = true
              }
            }
            if (isStranger){  //是陌生人  插到陌生人数组
              this.getInStrangers.push(this.newData.inCheck[i])  //要登记列表（进）
            }
          }
          this.getInAll = this.getInStudents.concat(this.getInStrangers)
          this.inManPic=this.newData.inCheck[this.newData.inCheck.length-1].imagePath
        }
        if(this.newData.outCheck.length>0){
          for (let i=0;i<this.newData.outCheck.length;i++) {
            this.getOutAll.push(this.newData.outCheck[i])  //所以出去的人直接显示
          }
          this.outManPic=this.newData.outCheck[this.newData.outCheck.length-1].imagePath
        }

        this.getInNum = this.newData.inNum                   //进入人数
        this.getOutNum = this.newData.outNum               //离开人员
        this.visitNum = this.newData.visitNum               //访问人员
      },
      //大门过滤（是否是本校的学生）
      filterGateData(){



        // console.log('大门过滤1')
        if(this.newData.inCheck.length>0) {
          for (let i=0;i<this.newData.inCheck.length;i++) {
            let isStranger = true  //默认是陌生人
            // for (let j = 0; j < this.studentData.length; j++) {
            //   if (this.newData.inCheck[i].studentId === this.studentData[j].studentId) {
            //     isStranger = false  //不是陌生人
            //     this.getInStudents.push(this.newData.inCheck[i])  //免登记学生列表（进）
            //     this.newData.inCheck[i].hiddenOparetion = true
            //   }
            // }
            if (isStranger){  //是陌生人  插到陌生人数组
              this.getInStrangers.push(this.newData.inCheck[i])  //要登记列表（进）
            }
          }
          // this.getInAll = this.getInStudents.concat(this.getInStrangers)
          this.getInAll = this.getInStrangers  //默认都是默生人

          this.inManPic=this.newData.inCheck[this.newData.inCheck.length-1].imagePath
        }
        if(this.newData.outCheck.length>0){
          for (let i=0;i<this.newData.outCheck.length;i++) {
            this.getOutAll.push(this.newData.outCheck[i])  //所以出去的人直接显示
          }
          this.outManPic=this.newData.outCheck[this.newData.outCheck.length-1].imagePath
        }

        this.getInNum = this.newData.inNum                   //进入人数
        this.getOutNum = this.newData.outNum               //离开人员
        this.visitNum = this.newData.visitNum               //访问人员

        this.isSchoolStdent()

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
        // console.log('已连接')
      },
      websocketonerror(){//连接建立失败重连
        // console.log('已断开连接')
        if (this.connectionNum<4){   //只会重连3次
          this.connectionNum++
          this.initWebSocket();
        }else{
          alert('监控已断开，请刷新后再连接')
          // console.log('已重连了3次，请刷新再连接')
        }
      },
      websocketonmessage(e){ //数据接收
        this.forChangeArray = this.newData = JSON.parse(e.data);
        // console.log(this.newData)
      },
      websocketsend(Data){//数据发送
        // this.websock.send(Data);
      },
      websocketclose(e){  //关闭
        // console.log('断开连接',e);
      },
      closeWebSocket(){
        this.websock.close()
      },
      keepData(formName, deleteOne) {   //添加数据后删除显示
        const set = this.$refs;

        set[formName].validate(valid => {
          if (valid) {
            api.addVisitor(this.insiteVisitor).then(res => {
              if (res.data.resultCode === "000000") {
                this.$message.success("添加成功");
                this.studentcancel()   //关闭添加信息页面
                // this.optionsEnterTwo[this.insiteVisitor.index].studentName = this.insiteVisitor.studentName
                this.getInAll[this.insiteVisitor.index].hiddenOparetion = true
                this.getInAll[this.insiteVisitor.index].studentName = this.insiteVisitor.visitorName + '(已登记)'
                //将添加来访人员的返回的id添加到数组，方便放行时直接调用
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
        // if (val.studentId !== '' && val.studentId !== undefined) {
        this.VisitorDataTable = false
        this.VisitorLoginTable = false
        this.studentVisitorLoginTable = true
        this.insiteVisitor.imagePath=null
        this.insiteVisitor.imagePath = val.imagePath
        this.insiteVisitor.visitedDt = dateFilter(val.happenedDt)
        this.insiteVisitor.index = index
        if(val.studentName==='未登记人员'){
          this.insiteVisitor.visitorName = ''
        }else{
          this.insiteVisitor.visitorName = val.studentName
        }
        this.$forceUpdate()   //手动渲染数据，
        // console.log(this.insiteVisitor)
      },
      //放行
      through(data, index, num) {
        this.insiteVisitor.visitorName = data.studentName
        this.insiteVisitor.imagePath = data.imagePath
        this.insiteVisitor.visitedDt = dateFilter(data.happenedDt)
        this.insiteVisitor.index = index
        this.option.splice(index, 1)
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

      //打开监控
      openMonitor(val) {
        // console.log(val)
        this.shoosePlaceTypeCode = this.insiteVisitor.placeTypeCode = val.placeTypeCode   //场所类型
        this.insiteVisitor.placeName = val.placeName   //场所
        // console.log(this.insiteVisitor)
        this.chapterVisible = true
        //提供参数给添加访问
        // this.getWatch.dormitoryId = this.insiteVisitor.dormitoryId = this.studentsLeaveNumForm.dormitoryId = val.dormitoryId  //给监控提供参数 and 来访  and 学生请假
        this.getWatch.placeId = this.insiteVisitor.placeId = val.placeId
        this.getWatch.schoolId =this.insiteVisitor.schoolId = val.schoolId
        this.connectionNum = 1  //初始化断开重连次数

        if (val.placeTypeCode !== 'B'){   //不是宿舍
          this.initWebSocket()//
          this.dormitoryName = val.placeName  //显示校门
          // console.log('校门')
          this.onleGate = false  //去除宿舍的数据
        }else if(val.placeTypeCode==='B'){  //宿舍
          this.dormitoryName = val.placeName  //显示宿舍
          this.once = true
          this.onleGate = true
          this.getDormitoryId(val)
          // console.log('宿舍')
        }
        // this.searchStudentForm.dormitoryId = this.insiteVisitor.dormitoryId = this.outsiteVisitor.dormitoryId = val.dormitoryId  //去获取学生  和学生来访
        // this.insiteVisitor.placeId = this.outsiteVisitor.placeId = val.placeId
        // this.insiteVisitor.placeName = this.outsiteVisitor.placeName = val.placeName
        // this.placeId = val.placeId
        // this.getPlaceType()  //获取场所类型去添加来访时提供场所类型
      },
      //获取宿舍
      getDormitoryId(val){
        // console.log(val)
        let getDormitoryIdForm = {}
        getDormitoryIdForm.page = 1
        getDormitoryIdForm.limit = 9999
        getDormitoryIdForm.schoolId = val.schoolId
        getDormitoryIdForm.placeId = val.placeId
        api.getDormitoryId(getDormitoryIdForm).then(res => {
          if (res.data.resultCode === "000000") {
            this.getDormitoryIdList = res.data.data.records;
            // console.log(this.getDormitoryIdList)
            this.getStudentsLeaveNum(this.getDormitoryIdList[0]) //获取学生请假人数
            this.beginSetInterval(this.getDormitoryIdList[0]) //开启定时器去获取请假人数
            this.getAllStudents(this.getDormitoryIdList[0])  //获取宿舍居住学生人数（包含开启监控）
            // this.dormitoryName = this.getDormitoryIdList[0].dormitoryName  //(默认第一个宿舍名)
          }
          this.isLoaded = false;
        }, res => {
          this.$message.error(res.message);
        });
      },
      //下拉框选择要查看的宿舍/大门（未调用，思路错误，切换应该是不同场所下的宿舍，不该直接是宿舍）
      SeeDormitory(val){
        if (this.shoosePlaceTypeCode !== 'B'){   //不是宿舍

        } else if (this.shoosePlaceTypeCode === 'B'){   //是宿舍
          // console.log('监控'+val.dormitoryName)
          // this.dormitoryName = val.dormitoryName
          this.getWatch.placeId = this.insiteVisitor.placeId = val.placeId
          this.getWatch.schoolId =this.insiteVisitor.schoolId = val.schoolId
          this.getAllStudents(val)
          clearInterval(this.isbeginSetInterval)   //调用前要先清除定时器，否则定时器会累加
          this.getStudentsLeaveNum(val) //获取学生请假人数
          this.beginSetInterval(val) //开启定时器去获取请假人数
        }
      },
      beginSetInterval(val){
        this.isbeginSetInterval = setInterval(()=>{
          this.showLeave(val)
        },3600000)
      },
      showLeave(val){
        // console.log(val.dormitoryName)
        let todaySix = Number(new Date(new Date(new Date().toLocaleDateString()).getTime()+6*60*60*1000-1)) ;  //获取今天6点的时间戳
        let todayNow = Number(new Date());  //获取现在的时间戳
        // // console.log(this.isToDay)
        if (this.isToDay !== todaySix){
          this.once = true
        }
        if (todayNow > todaySix && this.once===true){
          this.once = false
          this.getStudentsLeaveNum(val)
          // alert('重新获取数据了')
        }
        this.isToDay = todaySix
      },
      getStudentsLeaveNum(val){
        let date = new Date();
        let y = date .getFullYear(); //获取完整的年份(4位)
        let m = date .getMonth(); //获取当前月份(0-11,0代表1月)
        let d = date .getDate(); //获取当前日(1-31)
        let time = y+'-'+m+'-'+d
        let studentsLeaveNumForm = {}
             studentsLeaveNumForm.leaveDt=time
             studentsLeaveNumForm.dormitoryId=val.dormitoryId
        api.getStudentsLeaveNum(studentsLeaveNumForm).then(res => {
          if (res.data.resultCode === "000000") {
            this.studentsLeaveNum = res.data.data;
            // // console.log(this.studentsLeaveNum)
          }
          this.isLoaded = false;
        }, res => {
          this.$message.error(res.message);
        });
      },
      //获取宿舍学生
      getAllStudents(val) {
        let getStudentsForm = {}
        getStudentsForm.dormitoryId = val.dormitoryId
        getStudentsForm.page = 1
        getStudentsForm.limit = 9999
        api.getAllStudents(getStudentsForm).then(res => {
          if (res.data.resultCode === "000000") {
            let data = this.studentData = res.data.data.records;
          this.liveingStudentNum = 0
          //统计可用学生
          data.map(item => {
            if (item.accommodationStatusCodeStr !== '' && item.accommodationStatusCodeStr !== undefined) {
              if (item.accommodationStatusCodeStr.split(';')[0] === '可用') {
                this.liveingStudentNum += 1
              }
            }
          })
          }
          this.initWebSocket()//
          this.isLoaded = false;
        }, res => {
          this.$message.error(res.message);
        });
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

      uploadData(res) {
        this.formData.imagePath = res;
      },


      chilrenPlace(id,name){
        // this.$router.push({query:{parentPlaceId:id}})
        this.childrenParams.parentPlaceId = id
        this.schoolId = this.$route.query.schoolId
        this.schoolOrgName = name;
        this.showListTwo=false;
        this.parentPlaceId=id
        this.params.parentPlaceId=id
        this.getList();
        // api.getChildrenList(this.childrenParams).then(res => {
        //   this.data = res.data.data;
        //   this.isLoaded = false;
        // }, res => {
        //   this.$message.error(res.message);
        // });

      },

      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
                                    return item.placeId
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
        if (this.$route.query.schoolId!==undefined){
          this.hiddenAdd=true
        }
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        this.params.schoolId=userInfo.content.extValues.schoolOrg.schoolOrgId   //学校id
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
                let opath = '/basedata/detailBasicSchoolPlace/add/' + this.$route.query.schoolId+'?schoolOrgName='+this.$route.query.schoolOrgName+'&parentPlaceId='+this.parentPlaceId;
                this.$router.push({path: opath})
      },
      // toAddChildren() {
      //   // console.log(this.schoolId,this.schoolOrgName)
      //   //safety safetyEdu basedata
      //   let opath = '/basedata/detailBasicSchoolPlace/add/' + this.schoolId+'?schoolOrgName='+this.schoolOrgName+'parentPlaceId='+this.$route.query.parentPlaceId;
      //   this.$router.push({path: opath})
      // },
            toTotal (){
        let opath = '/basedata/BasicSchoolPlaceTotal';
        this.$router.push({path: opath})
      },
            toEdit(id) {
        let opath = '/basedata/detailBasicSchoolPlace/edit/' + id;
        this.$router.push({path: opath})
      },
                  toDetail(id) {
        let opath = '/basedata/detailBasicSchoolPlace/detail/' + id;
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
    padding: 10px 10px;
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
