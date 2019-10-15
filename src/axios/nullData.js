/* 防止后台返回null值,导致页面报错.这里进行拦截处理,把null都换成空字符串 */
export default function(_data){

    //如果data是单一对象
    if(Object.prototype.toString.call(_data) == "[object Object]"){
        //循环检查
        for(let key in _data){
        //循环检查字段是否null,有就赋值空字符串
        if(_data[key] == null){
            _data[key] = "";
        }
        }

        //循环是否包括records字段
        if(_data.hasOwnProperty("records")){
        //如果records是空字符串就赋值空数组
        if(_data.records == ""){
            _data.records = []
        }else{
            //如果不是空值..并且是数组
            if(Object.prototype.toString.call(_data.records) == "[object Array]"){
            //循环检查
            for(let i=0; i<_data.records.length; i++){
                //判断这个records数组每一项有没有null,有就赋值空字符串
                if(Object.prototype.toString.call(_data.records[i]) == "[object Null]"){
                _data.records[i] = "";
                }
                //如果这个records数组每一项是单一对象
                if(Object.prototype.toString.call(_data.records[i]) == "[object Object]"){
                //循环检查
                for(let key in _data.records[i]){
                    //循环检查这个records数组每一项是否null,有就赋值空字符串
                    if(_data.records[i][key] == null){
                    _data.records[i][key] = "";
                    }
                }
                }
            }
            }
        }
        }
    }

    //如果data是数组
    if(Object.prototype.toString.call(_data) == "[object Array]"){
        for(let i=0; i<_data.length; i++){
        //判断这个数组每一项有没有null,有就赋值空字符串
        if(Object.prototype.toString.call(_data[i]) == "[object Null]"){
            _data[i] = "";
        }
        //判断这个数组每一项是单一对象
        if(Object.prototype.toString.call(_data[i]) == "[object Object]"){
            //循环检查
            for(let key in _data[i]){
            //循环检查字段是否null
            if(_data[i][key] == null){
                _data[i][key] = "";
            }
            }
        }
        }
    }
    return _data;
}