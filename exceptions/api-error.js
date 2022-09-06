module.exports = class  ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors=[]) {
        super(message);
        this.status = status;
        this.errors = errors

    }

    static UnauthorizedError(){
        return new ApiError(401, 'unauthorized 401')
    }

    static BadRequest(message, errors=[],status){
        return new ApiError(400, message,errors)
    }

}