<template>
    <el-dialog title="提示" :visible.sync="dialog.dialogVisible" center width="22%">
        <slot>
            <div class="text-center">
                <img src="~@/assets/img/dialog-delete.png" />
                <p class="text-center fs-16 color333 mt-20">是否确认删除?</p>
            </div>
        </slot>
        <slot name="footer">
            <div slot="footer" class="dialog-footer text-center mt20">
                <el-button @click="dialogComfireHandler">是</el-button>
                <el-button type="primary" @click="dialogCancelHandler">否</el-button>
            </div>
        </slot>
    </el-dialog>
</template>
<script>
    import { mapGetters,mapMutations } from 'vuex'
    export default {
        name : "xx-dialog",
        data(){
            return {
            }
        },
        computed : {
            ...mapGetters(['dialog'])
        },
        created(){
        },
        methods : {
            ...mapMutations(['SET_DIALOG_VISIBLE']),
            dialogComfireHandler(){
                this.SET_DIALOG_VISIBLE(false);
            },
            dialogCancelHandler(){
                this.SET_DIALOG_VISIBLE(false);
            }
        }
    }
</script>
