module.exports = {
	name: "ban",
	cooldown: 2 ,
	guildOnly: true,
	execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder){
		 if(!RolVarMi(message,Roller["Management"]) && !RolVarMi(message,Roller["Head Admin"])) return MesajGönder(message,"Bu komutu kullanmazsınız.")
		 if(!args[0] || !args[1]) return MesajGönder(message,"!ban @kullanıcı [sebep] [süre (opsiyonel)]")
		 const member = message.mentions.members.first();
		 if(!member) return message.channel.send("Etiketlediğiniz kişi bulunamadı.").then(msg => {
		 	setTimeout(() =>{
		 		message.channel.bulkDelete(2)
		 	},2000)
		 })
		 if(member.roles.cache.find(r=> r.id === Roller["Management"]) || member.roles.cache.find(r=> r.id === Roller["Head Admin"]) || member.roles.cache.find(r=> r.id === Roller["Game Admin"]) || member.roles.cache.find(r=> r.id === Roller["Trial Admin"]) || member.roles.cache.find(r=> r.id === Roller["Support"])) return log.send(`**${message.member.user.username}** adlı kişi **${member.user.username}** adlı kişiyi ${args[1]} sebebiyle banlamaya çalıştı.`)
		 if(args[2]){
		 	member.ban()
		 	log.send(`**${member.user.username}** adlı kişi **${message.member.user.username}** adlı kişi tarafından ${args[1]} sebebiyle ${args[2]} dakika süresince banlandı.`)
		 	setTimeout(()=>{
		 		message.guild.members.unban(member.id)
		 	},args[2]*60000)
		 }else{
		 	member.ban()
		 	log.send(`**${member.user.username}** adlı kişi **${message.member.user.username}** adlı kişi tarafından ${args[1]} sebebiyle sınırsız banlandı.`)
		 }
	}
}