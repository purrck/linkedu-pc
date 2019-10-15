<template>

    <!-- 预览 -->
    

        <div class="p100 text-center pt20 pb20">
            <div :style="css">
            <iframe width="100%" height="500" src="/static/review/index.html" frameborder="0"></iframe>
            </div>
        <!--<div style="width:414px;border:24px solid #E8E8E8;margin:0 auto;height:500px; border-radius: 50px;">
            <iframe v-if="bulletinReviewVisible" src="/static/review/index.html" width="414" height="500" frameborder="0"></iframe>
        </div>-->
        </div>


</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props : ['bulletinReviewVisible'],
    data(){
        return {
            widthValue : 0,
            value8 : 0 +"%",
            css : {
                width:"320px",
                border:"24px solid #E8E8E8",
                margin: "0 auto",
                height : "500px",
                borderRadius: "50px",
                position:"relative"
            }
        }
    },
    created(){
        
    },
    watch:{
        value8(val){
            console.log(val)
            this.widthValue = 320+(320*(val*0.01)) 
            this.css.width = this.widthValue +"px"
        }
    },
    computed:{
        ...mapGetters([
        'review'
      ]),
    }
}
</script>
<style scoped lang="scss">

</style>

