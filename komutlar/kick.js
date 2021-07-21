module.exports = {
	name: "kick",
	cooldown: 2 ,
	guildOnly: true,
	execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder){
		 if(!RolVarMi(message,Roller["Management"]) && !RolVarMi(message,Roller["Head Admin"]) && !RolVarMi(message,Roller["Game Admin"])) return MesajGönder(message,"Bu komutu kullanmazsınız.")
		 if(!args[0] || !args[1]) return MesajGönder(message,"!kick @kullanıcı [sebep]")
		 const member = message.mentions.members.first();
		 const sebep = args.splice(1,args.length-1).join(" ")
		 if(!member) return MesajGönder(message,"Etiketlediğiniz kişi bulunmadı.")
		 if(member.roles.cache.find(r=> r.id === Roller["Management"]) || member.roles.cache.find(r=> r.id === Roller["Head Admin"]) || member.roles.cache.find(r=> r.id === Roller["Game Admin"]) || member.roles.cache.find(r=> r.id === Roller["Trial Admin"]) || member.roles.cache.find(r=> r.id === Roller["Support"])) return log.send(`**${message.member.user.username}** adlı kişi **${member.user.username}** adlı kişiyi ${sebep} sebebiyle kicklemeye çalıştı.`)
		 member.kick()
		 log.send(`**${member.user.username}** adlı kişi **${message.member.user.username}** adlı kişi tarafından ${sebep} sebebiyle kicklendi.`)
		 try {
			member.send(`**${message.member.user.username}** adlı kişi tarafından ${sebep} sebebiyle kicklendin.`)
		 }
		 catch (err){
			 throw err
		 }
		 
	}
}