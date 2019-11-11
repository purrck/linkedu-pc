<template>
  <div>
    <div v-if="message.studentName" class="one-line">
      <div class="img_place">
        <el-popover placement="top-start" title trigger="hover">
          <img
            :src="message.studentUserPreviewVO.headPicture"
            alt="头像"
            style="width: 150px;height: 150px"
          />
          <img
            slot="reference"
            :src="message.studentUserPreviewVO.headPicture"
            alt
            class="img_size"
          />
        </el-popover>
        <img
          v-if="message.studentUserPreviewVO.gender == 'F'"
          src="../../../../assets/img/headerImg-nan.png"
          alt
          class="sex_img"
        />
        <img v-else src="../../../../assets/img/headerImg-nv.png" alt class="sex_img" />
        <span class="font_set">{{message.studentName}}</span>
      </div>
    </div>
    <div v-else-if="message.teacherUserPreviewVO" class="one-line">
      <div class="img_place">
        <el-popover placement="top-start" title trigger="hover">
          <img
            :src="message.teacherUserPreviewVO.headPicture"
            alt="头像"
            style="width: 150px;height: 150px"
          />
          <img
            slot="reference"
            :src="message.teacherUserPreviewVO.headPicture"
            alt
            class="img_size"
          />
        </el-popover>
        <img
          v-if="message.teacherUserPreviewVO.gender == 'F'"
          src="../../../../assets/img/headerImg-nan.png"
          alt
          class="sex_img"
        />
        <img v-else src="../../../../assets/img/headerImg-nv.png" alt class="sex_img" />
        <span class="font_set">{{message.teacherName}}</span>
      </div>
    </div>
    <div v-else>无</div>
  </div>
</template>

<script>
export default {
  name: "picureView",
  props: ["message"]
};
</script>

<style lang="scss">
.img_place {
  position: absolute;
  display: flex;
  flex-wrap: nowrap;
  top: 25%;
}
.img_size {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-block;
}
.font_set {
  display: inline-block;
  margin-top: 12px;
  margin-left: 6px;
}
.sex_img {
  position: absolute;
  width: 16px;
  height: 16px;
  left: 20px;
  top: 22px;
}
</style>