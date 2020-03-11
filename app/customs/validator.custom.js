exports.isValidPassword = function(input){
    let password = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if(password.test(input)){
        return true;
    }else{
        return false;
    }
}