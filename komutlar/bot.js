module.exports={
    name:"bot",
    async execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag,KanalBul,kural){
        if(!RolVarMi(message,Roller["Developer"])) return MesajGönder(message,"Bu komutu kullanmazsınız.")
        if(!args[0] || !args[1]) return  MesajGönder(message,"!bot [log/welcomelog] [kanalid]")
        if(args[0] == "log"){
            await Tags.update({logchannel:args[1]},{where:{guild_id:message.guild.id}})
            message.react("👍")
        }
        else if(args[0] == "welcome" || args[0] == "welcomelog"){
            await Tags.update({welcomelog:args[1]},{where:{guild_id:message.guild.id}})
            message.react("👍")
        }
    
    }
}