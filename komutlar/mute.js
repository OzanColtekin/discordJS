module.exports = {
	name: "mute",
	cooldown: 0,
	aliases:["sustur"],
	async execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag){
		if(!RolVarMi(message,Roller["Management"]) && !RolVarMi(message,Roller["Head Admin"]) && !RolVarMi(message,Roller['Game Admin'])) return MesajGönder(message,"Bu komutu kullanmazsınız.")
		if(!args[0] || !args[1] || !args[2]) return MesajGönder(message,"!mute @kullanıcı [süre(dakika)] [sebep]")
		const member = message.mentions.members.first();
		const sebep = args.splice(2,args.length-1).join(" ")
		const time = parseInt(args[1])
		if(!member) return 0;
		if(member.roles.cache.find(r=> r.id === Roller["Management"]) || member.roles.cache.find(r=> r.id === Roller["Head Admin"]) || member.roles.cache.find(r=> r.id === Roller["Game Admin"]) || member.roles.cache.find(r=> r.id === Roller["Trial Admin"]) || member.roles.cache.find(r=> r.id === Roller["Support"])) return log.send(`**${message.member.user.username}** adlı kişi **${member.user.username}** adlı kişiyi ${sebep} sebebiyle ${time} dakika mutelemeyi denedi.`)
		const muteRol = message.guild.roles.cache.find(role => role.id === Roller['Mute'])
		if(time == 0 ){
			member.roles.add(muteRol)
			const data = await tag.get("muteList")
			data[member.id] = {muteDurum:1}
			await Tags.update({muteList:data},{where:{guild_id:message.guild.id}})
			log.send(`**${member.user.username}** adlı kişi **${message.member.user.username}** adlı kişi tarafından ${sebep} sebebiyle sınırsız mutelendı.`)
		}else{
			member.roles.add(muteRol)
			const data = await tag.get("muteList")
			data[member.id] = {muteDurum:1}
			await Tags.update({muteList:data},{where:{guild_id:message.guild.id}})
			
			setTimeout(async ()=>{
				if(member.roles.cache.find(r => r.id == Roller['Mute'])) member.roles.remove(muteRol)
				data[member.id] = {muteDurum:0}
				await Tags.update({muteList:data},{where:{guild_id:message.guild.id}})
			},time*60000)
			log.send(`**${member.user.username}** adlı kişi **${message.member.user.username}** adlı kişi tarafından ${sebep} sebebiyle ${time} dakika mutelendı.`)
		}
		
	}
}