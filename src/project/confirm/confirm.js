export function checkComfirm(context,event) {
    if(context.flag) {
        if (!window.confirm("Do you want to exit this page:\n" + context.text)) {
             event.preventDefault()
        } else {
            context.flag = false;
            context.text = '';}
    }
}