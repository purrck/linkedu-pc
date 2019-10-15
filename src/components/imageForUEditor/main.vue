<template>
    <div>
        <input type="file" @change="change" id="imageForUEditor" style="position: absolute; width: 1px; height: 1px; opacity: 0; z-index: -1;"/>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        created(){
        },
        mounted(){
            this.$nextTick(() => {
                document.getElementById("imageForUEditor").click();
            })
            
        },
        methods : {
            change(event){
                console.log(event);
                this.uploadFile(event.target.files[0], res => {
                    this.callback(res);
                    console.log(res)
                })
            }
        }
    }
</script>
