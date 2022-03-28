interface ResponseRequest{
    statusCode:number,
    data:any,
    operation:string,
    operand:string,
    custom?: any
}

interface Response{
    success: boolean,
    msg: string,
    data: any,
    custom?:any
}

export class ResponseHandler{
    response:Response;
    constructor(public responseR:ResponseRequest){}

    respond(){
        if(this.responseR.statusCode !== 200 && this.responseR.statusCode !== 201){
            if(this.responseR.statusCode === 500){
                return this.response = {
                    success: false,
                    msg: `Internal Server While ${this.responseR.operation} ${this.responseR.operand}`,
                    data: this.responseR.data,
                    custom: this.responseR.custom
                }
            }
            this.response = {
                success: false,
                msg: `Somehting Went Wrong While ${this.responseR.operation} ${this.responseR.operand}`,
                data: null,
                custom: this.responseR.custom
            }
        }else{
            this.response = {
                success: true,
                msg: `${this.responseR.operation} ${this.responseR.operand} Done SUCCESSFULLY`,
                data: this.responseR.data,
                custom: this.responseR.custom
            }
        }
    }
}