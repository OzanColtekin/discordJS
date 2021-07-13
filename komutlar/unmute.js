module.exports = {
	name: "unmute",
	cooldown: 0,
	async execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag,KanalBul,kural){
		if(!RolVarMi(message,Roller["Management"]) && !RolVarMi(message,Roller["Head Admin"]) && !RolVarMi(message,Roller['Game Admin'])) return MesajGönder(message,"Bu komutu kullanmazsınız.")
		if(!args[0] || !args[1]) return MesajGönder(message,"!unmute @kullanıcı [sebep]")
		const member = message.mentions.members.first();
		const muteRol = message.guild.roles.cache.find(role => role.id === Roller['Mute'])
		const sebep = args.splice(2,args.length-1).join(" ")
		if(!member) return 0;
		if(!member.roles.cache.find(r => r.id === Roller['Mute'])) return MesajGönder(message,"Bu kişi muteli değil.")
		member.roles.remove(muteRol)
		const data = await tag.get("muteList")
		data[member.id] = {muteDurum:0}
		await Tags.update({muteList:data},{where:{guild_id:message.guild.id}})
		log.send(`**${member.user.username}** adlı kişinin mutesi **${message.member.user.username}** adlı kişi tarafından ${sebep} sebebiyle kaldırıldı.`)
	}
}