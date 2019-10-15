export default {
    state : {
        dialogVisible : false,
        loading : false
    },
    mutations : {
        SET_DIALOG_VISIBLE(state,played){
            state.dialogVisible = played;
        },
        SET_DIALOG_LOADING(state,played){
            state.loading = played;
        }
    }
}