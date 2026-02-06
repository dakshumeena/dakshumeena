class ExpressError extends Error{
    constructor(message,statuscode){
        super();
        console.log(message)
        this.message=message
        this.statuscode=statuscode
    }
}
module.exports=ExpressError