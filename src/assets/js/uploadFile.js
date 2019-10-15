// uploadFile.js
import Vue from 'vue'
import SparkMD5 from 'spark-md5'
import {getFile, uploadFile} from "@/api/admin/upload";

export default function () {
  Vue.prototype.uploadFile = uploadFiles;

  function uploadFiles(file, callback) {
    // 得到md5码
    getFileMD5(file, md5 => {
      // 存储文件的md5码
      // 拿md5码查询后台数据库是否存在此md5码，如果存在则无需上传
      // handleAjax为封装好的ajax方法
      getFile(md5).then(resp => {
        if (resp.data.code === '1') { // 不存在
          let formData = new FormData();
          formData.append('file', file);
          // 文件上传成功
          uploadFile(formData, md5).then((res) => {
            this.$notify({
              title: '成功',
              message: '上传成功！',
              type: 'success'
            });
            callback(res.data.data)
          })
        } else { // 秒传
          this.$notify({
            title: '成功',
            message: '上传成功！',
            type: 'success'
          });
          callback(resp.data.data)
        }
      })
    })
  }

// 获得文件md5
  function getFileMD5(file, callback) {
    //声明必要的变量
    var fileReader = new FileReader(),
      //创建md5对象（基于SparkMD5）
      spark = new SparkMD5()
    //每块文件读取完毕之后的处理
    fileReader.onload = function (e) {
      spark.appendBinary(e.target.result)
      callback(spark.end())
    }
    fileReader.readAsBinaryString(file.slice(0, file.size))
  }
}
