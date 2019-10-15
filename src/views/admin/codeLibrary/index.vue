 <template>
    <div class="box">
      <div class="tree">
        <el-tree
          :props="props"
          :data="treeList"
          @node-click="handleNodeClick">
        </el-tree>
      </div>
      <div class="content">
        <div class="content-search">
          <el-form ref="seacchForm" v-model="seacchForm" :inline="true" size="small" label-width="120px">
            <el-form-item label="条件搜索">
              <el-checkbox  v-model="seacchForm.selectBox"></el-checkbox>
            </el-form-item>
            <el-form-item label="数据项名称">
              <el-input v-model="seacchForm.itemName"  placeholder="请输入数据项名称"  maxlength="30"></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button class=" filter-item" style="margin-right: 20px;float:right" @click="handleCreateHeader()" type="primary" icon="edit" >添加头接节点</el-button>
          </el-form>
        </div>
        <div class="content-main">
          <el-table  border fit :data="sonList.records" highlight-current-row   v-loading="listLoading" element-loading-spinner="el-icon-loading"
                     element-loading-background="rgba(0, 0, 0, 0.1)" >
            <!--:style ="{height: fullHeight+'px'}"-->
            <el-table-column align="center" type="selection" ></el-table-column>
            <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
            <el-table-column align="center" label="字典主键id" v-if="false">
              <template slot-scope="scope">
                <span>{{ scope.row.codeId }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="组编号">
              <template slot-scope="scope">
                <span>{{ scope.row.groupNo }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="数据项名称">
              <template slot-scope="scope">
                <span>{{ scope.row.itemName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="数据项属性">
              <template slot-scope="scope">
                <span>{{ scope.row.itemAttribute }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="排序号"   >
              <template slot-scope="scope">
                <span>{{ scope.row.itemSort }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="数据状态 0停用，1启用" v-if="false">
              <template slot-scope="scope">
                <span>{{ scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="数据项父节点序号" v-if="false">
              <template slot-scope="scope">
                <span>{{ scope.row.parentId }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="备注">
              <template slot-scope="scope">
                <span>{{ scope.row.remark }}</span>
              </template>
            </el-table-column>


            <el-table-column label="操作" algin = "center" width="240px">
              <template slot-scope="scope">
                <div style="display: flex;flex-direction: row ;">
                  <el-button size="small" type="success" @click="handleEdit(scope.row)"    >编辑</el-button>
                  <el-button size="small" type="primary" @click="handleCreate(scope.row)"  >添加子节点</el-button>
                  <el-button size="small" type="danger"  @click="handerDelete(scope.$index, scope.row)"  >删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="showPage" style=" margin: 20px 20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="sonList.current" :page-sizes="[10,20,30,50]"
                           :page-size="sonList.size" layout="total, sizes, prev, pager, next, jumper" :total="sonList.pages">
            </el-pagination>
          </div>
        </div>

        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <el-form-item label="字典主键id" prop="codeId" v-if="false" >
              <el-input v-model="form.codeId" placeholder="字典主键id"></el-input>
            </el-form-item>
            <el-form-item label="组编号" prop="groupNo"  >
              <el-input v-model="form.groupNo" :disabled="canSelect" placeholder="组编号"></el-input>
            </el-form-item>
            <el-form-item label="数据项名称" prop="itemName"  >
              <el-input v-model="form.itemName" placeholder="数据项名称"></el-input>
            </el-form-item>
            <el-form-item label="数据项属性" prop="itemAttribute" >
              <el-input type="number" v-model="form.itemAttribute" placeholder="数据项属性"></el-input>
            </el-form-item>
            <el-form-item label="数据项序号" prop="itemSort" >
              <el-input v-model="form.itemSort" placeholder="数据项序号"></el-input>
            </el-form-item>
            <el-form-item label="数据状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option  label="启用" value="1"></el-option>
                <el-option  label="停用" value="0"></el-option>
              </el-select>
              <!--0停用，1启用-->
            </el-form-item>
            <el-form-item label="数据项父节点" prop="parentId"  >
              <el-input v-model="form.parentId" disabled  placeholder="数据项父节点序号,为空说明为头节点"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark"  >
              <el-input v-model="form.remark" placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item label="机构id" prop="appOrgId" v-if="false" >
              <el-input v-model="form.appOrgId" placeholder="机构id"></el-input>
            </el-form-item>
            <el-form-item label="应用id" prop="appId" v-if="false" >
              <el-input v-model="form.appId" placeholder="应用id"></el-input>
            </el-form-item>
            <el-form-item label="创建人id" prop="createdBy" v-if="false" >
              <el-input v-model="form.createdBy" placeholder="创建人id"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="createdDt" v-if="false" >
              <el-input v-model="form.createdDt" type="date" placeholder="创建时间"></el-input>
            </el-form-item>
            <el-form-item label="更新人id" prop="updatedBy" v-if="false" >
              <el-input v-model="form.updatedBy" placeholder="更新人id"></el-input>
            </el-form-item>
            <el-form-item label="更新时间" prop="updatedDt" v-if="false" >
              <el-input v-model="form.updatedDt" type="date" placeholder="更新时间"></el-input>
            </el-form-item>
            <el-form-item label="数据版本" prop="version" v-if="false" >
              <el-input v-model="form.version" placeholder="数据版本"></el-input>
            </el-form-item>
            <el-form-item label="是否删除，0为删除，1为存在" prop="isDeleted" v-if="false" >
              <el-input v-model="form.isDeleted" placeholder="是否删除，0为删除，1为存在"></el-input>
            </el-form-item>
            <el-form-item label="应用周期" prop="peridoInfo" v-if="false" >
              <el-input v-model="form.peridoInfo" placeholder="应用周期"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel('form')">取 消</el-button>
            <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
            <el-button v-else type="primary" @click="update('form')">修 改</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>
<script>
  import api from '@/api/admin/codeLibrary'
  export default {
    data() {
      return {
        fullHeight: document.documentElement.clientHeight,

        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogStatus: '',
        count: 1,
        data: [],
        treeList: [],
        sonList: [],
        rules: {
          codeId:[
            { message: '请填写:字典主键id',trigger: 'blur' },
          ],
          groupNo:[
            { required: true,message: '请填写:组编号',trigger: 'blur' },
          ],
          itemName:[
            { required: true,message: '请填写:数据项名称',trigger: 'blur' },
          ],
          itemAttribute:[
            { required: true,message: '请填写:数据项属性',trigger: 'blur' },
          ],
          itemSort:[
            { required: true,message: '请填写:数据项序号',trigger: 'blur' },
          ],
          status:[
            { required: true,message: '请选择:数据状态 ',trigger: 'blur' },
          ],
          parentId:[
            {message: '请填写:数据项父节点序号,为空说明为头节点',trigger: 'blur' },
          ],
          remark:[
            { message: '请填写:备注',trigger: 'blur' },
          ],
          appOrgId:[
            { message: '请填写:机构id',trigger: 'blur' },
          ],
          appId:[
            {message: '请填写:应用id',trigger: 'blur' },
          ],
        },
        selectBox: false,
        listLoading: true,
        showPage: false,
        canSelect: false,
        dialogFormVisible: false,
        seacchForm: {
          codeId: '',
          selectBox: false,
          itemName: '',

        },
        form:{
          parentId:'-1'
        },
        params: {
          codeId: '-1'
        },
        props: {
          label: 'itemName',
          children: 'children',
          codeId: 'id'
        },
        defaultProps: {
          children: 'children',
          label: 'itemName',
          codeId:'id'
        }
      }
  },
    created() {
      this.getList()
      // this.loadNode
    },
    methods: {
      //加载树状图
      async getList() {
        await api.fecthList(this.params).then((res) => {
          const treeList = res.data.data;
          this.treeList = treeList.children;
          this.sonList.records = treeList.children;
          this.listLoading = false;
        }).catch((error) => {
          console.log(error)
        })
      },
      //加载列表
      async search() {
        this.seacchForm.codeId = this.params.codeId;
        // this.showPage = true;
        await api.searchList(this.form).then((res) => {
          const sonList = res.data.data;
          this.sonList = sonList;
          this.listLoading = false
        }).catch((error) => {
          console.log(error)
        });
      },
      handleNodeClick(data) {
        console.log('handleNodeClick');
        console.log(data);
        let arr = [];
        arr.push(data)
        if(data.children.length){
          let children = data.children
          arr = arr.concat(children);
        }
        data.records = arr;
        // 改变右边搜索条件 codeId
        this.params.codeId = data.id;
        // 改变右边列表
        this.sonList = data
      },
      handerDelete(index,row) {
        let length = row.children.length;
        this.$confirm('此操作将删除条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(length>0) {
            this.$notify({
              title: '错误',
              message: '不能删除有子节点的项',
              type: 'warning',
              duration: 2000
            })
          }else{
            api.delObj(row.id).then((res)=>{
              if(res.data.resultCode === '000000'){
                this.getList();
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleCreate(row) {
        this.form = {};

        // 如果是点击某列表添加
        this.canSelect  =  true;
        this.form.parentId = row.id;
        this.form.groupNo = row.groupNo
        this.dialogFormVisible = true;
        this.$refs['form'].resetFields();
        this.dialogStatus = 'create';
      },
      handleCreateHeader() {
        // 如果是头结点添加
        this.form = {};
        this.form.parentId = '-1';
        this.canSelect  =  false;
        this.dialogFormVisible = true;

        this.$refs['form'].resetFields();
        this.dialogStatus = 'create';
      },
      handleEdit(row, index) {
        this.dialogStatus = 'update'
        this.dialogFormVisible = true;
        // this.$refs['form'].resetFields();
        this.form = row;
      },
      handleSizeChange : function (size) {
        this.seacchForm.limit = size;
        this.listLoading = true;
        // this.getList();
      },
      handleCurrentChange : function(currentPage) {
        this.seacchForm.page = currentPage;
        this.listLoading = true;
        // this.getList();
      },
      // 分页按找正常序列开始
      typeIndex(index) {
        return index + this.seacchForm.limit * (this.seacchForm.page - 1) + 1;
      },
      sortChange(obj) {
        this.seacchForm.orderByField = obj.prop;
        this.seacchForm.isAsc = obj.order==='ascending'? 1 : 0;
        this.setCurrentPage(this.$route.fullPath, this.params)
        this.listLoading = true;
        // this.getList();
      },

      create(formName) {

        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.listLoading = true
            api.addObj(this.form)
              .then(() => {
                this.dialogFormVisible = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              })
            this.listLoading = false
          } else {
            return false
          }
        })
      },
      cancel(formName) {
        this.dialogFormVisible = false
        const set = this.$refs
        set[formName].resetFields()
      },
      update(formName) {
        const set = this.$refs
        console.log('this.form');
        this.form.records = null;
        console.log(this.form);
        set[formName].validate(valid => {
          if (valid) {
            this.listLoading = true
            api.putObj(this.form)
              .then(() => {
                this.dialogFormVisible = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              })
            this.listLoading = false
          } else {
            return false
          }
        })
      },
    }
  }
</script>

<style scoped>
  .box {
    border: 1px solid #ccc;
    padding: 0px;
    display: flex;
    flex-direction: row;
  }
  .tree{
    width: 180px;
    /*height: 800px;*/
    padding: 20px;
    border-right: 1px solid #ccc;
    overflow-x: auto;
  }
  .content{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .content-search{
    padding: 20px 0;
  }
  .content-main{
    padding-bottom: 20px;
    width: 100%;
  }
  .item-li {
    overflow: hidden;
    height: 50px;
    padding-top: 20px;
    padding-left: 20px;
    border-bottom: 1px solid #ccc;
  }
  .title {
    color: blue;
    font-size: 20px;
    font-weight: 400;
  }
</style>
