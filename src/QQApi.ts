export class QQApi{

    appId:string
    clientSecret:string
    appAccessToken
    reHeaders=new Map<string, string>()
    qqurl="https://api.sgroup.qq.com"

    login(appId:string,clientSecret:string){
        this.appId=appId
        this.clientSecret=clientSecret
        this.getAppAccessToken()
        console.log(this.getWebSocketAddress())
    }

    getAppAccessToken(){
        fetch("https://bots.qq.com/app/getAppAccessToken",{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                "appId":this.appId,
                "clientSecret":this.clientSecret
            })
        }).then(
            (response)=>{
                response.json().then(
                    (value)=>{
                        this.appAccessToken=value
                        this.reHeaders.set("Authorization","QQBot "+this.appAccessToken.access_token)
                        this.reHeaders.set('Content-Type','application/json')
                    }
                )
            }
        )
    }

    getWebSocketAddress(){
        fetch(this.qqurl+"/gateway",{
            headers:this.reHeaders
        }).then(
            (response)=>{
                response.json().then(
                    (value)=>{
                        return value.url
                    }
                )
            }
        )
    }
}