<template>
    <transition name="el-message-fade">
        <div class="tips-school tips-rao" :style="css" v-if="msgShow">
            <slot>
                <img src="~@/assets/img/icon-warning.png" width="20" />
                {{msg}}
            </slot>
        </div>
    </transition>
</template>
<script>
export default {
    data(){
        return {
            msgShow : true,
            css : {
              position: "absolute",
              top:"40%",
              left:"47%"
            },
            duration : 800,
        }
    },
    created(){
        setTimeout(() => {
        this.msgShow = false;
        },this.duration)
    }
}
</script>

<style>

</style>
