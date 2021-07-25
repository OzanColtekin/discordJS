module.exports={
    name:"cacheayarla",
    async execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag,KanalBul,kural){
        if(!RolVarMi(message,Roller["Management"])) return MesajGönder(message,"Bu komutu kullanmazsınız.")
        if(!args[0]) return  MesajGönder(message,"!cacheayarla [link]")
        var date = new Date(message.createdTimestamp)
        const data = await tag.get("cacheLink")
        data.cache_link = args[0]
        data.cache_tarih = date.toLocaleString('tr-TR', { timeZone: 'UTC' })
        await Tags.update({cacheLink:data},{where:{guild_id:message.guild.id}})
        message.react("👍")
    }
}