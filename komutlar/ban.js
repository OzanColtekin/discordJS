module.exports = {
	name: "ban",
	cooldown: 2 ,
	guildOnly: true,
	execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder){
		 if(!RolVarMi(message,Roller["Developer"])) return MesajGönder(message,"Bu komutu kullanmazsınız.")
		 if(!args[0] || !args[1]) return MesajGönder(message,"!ban @kullanıcı [sebep]")
		 const member = message.mentions.members.first();
		 const sebep = args.splice(1,args.length-1).join(" ")
		 if(!member) return message.channel.send("Etiketlediğiniz kişi bulunamadı.").then(msg => {
		 	setTimeout(() =>{
		 		message.channel.bulkDelete(2)
		 	},2000)
		 })
		 if(member.roles.cache.find(r=> r.id === Roller["Developer"])) return log.send(`**${message.member.user.username}** adlı kişi **${member.user.username}** adlı kişiyi ${args[1]} sebebiyle banlamaya çalıştı.`)
		 member.ban()
		 log.send(`**${member.user.username}** adlı kişi **${message.member.user.username}** adlı kişi tarafından ${sebep} sebebiyle banlandı.`)
		 try{
			member.send(`**${message.member.user.username}** adlı kişi tarafından ${sebep} sebebiyle banlandın.`)
		 }
		 catch (err){
			 throw err
		 }
		 
	}
}