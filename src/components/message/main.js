import Vue from 'vue'
import Main from './main.vue'

let MessageConstructor = Vue.extend(Main)

const Message = function(options) {

        let instance = new MessageConstructor({
            data: options
        });
        instance.vm = instance.$mount();
        document.body.appendChild(instance.vm.$el);
        return instance.vm;
}

export default Message;