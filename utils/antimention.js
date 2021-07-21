module.exports = (client,RolVarMi,RolVarMiMember,Tags,Roller) =>{
    client.on("message", async message =>{
        if(message.author.bot) return 0;
        const member = message.member
        if(RolVarMi(message,Roller["Management"]) || RolVarMi(message,Roller["Head Admin"]) || RolVarMi(message,Roller["Trial Admin"]) || RolVarMi(message,Roller["Support"])) return 0 ;
        const etiket = message.mentions.members.first()
        if(etiket == undefined) return 0;
        const tag = await Tags.findOne({where:{guild_id:message.guild.id}})
        const data = tag.get("antimention")
        data[member.id].etiketsayi = data[member.id].etiketsayi+1
        if(data[member.id].etiketsayi >=3){
            const muteRol = message.guild.roles.cache.find(role => role.id === Roller['Mute'])
            member.roles.add(muteRol)
            const mute = await tag.get("muteList")
			mute[member.id] = {muteDurum:1}
			await Tags.update({muteList:mute},{where:{guild_id:message.guild.id}})
            data[member.id].etiketsayi = 0
            await Tags.update({antimention:data},{where:{guild_id:message.guild.id}})
        }
        else{
            member.send("Kanallar üzerinden birini etiketlemeye devam edersen mutelenceksin.")
            await Tags.update({antimention:data},{where:{guild_id:message.guild.id}})
        }
        
    })
}