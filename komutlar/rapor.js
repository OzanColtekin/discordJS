const fs = require('fs');
module.exports = {
	name:"rapor",
	cooldown:0,
	aliases:["report"],
	async execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag,KanalBul,kural){
		if(!args[0] || !args[1]) return MesajGönder(message,"!rapor @kullanıcı [sebep]")
		const member = message.mentions.members.first()
		const sebep = args.splice(1,args.length-1).join(" ")
		const logsFiles = fs.readdirSync(`./logs/${message.guild.id}/`).filter(file => file.endsWith(".txt"))
		logsFiles.forEach(file => {
			const log_channel = file.split(".txt")[0]
			if(log_channel == message.channel.id){
				log.send(`**${message.member}** adlı kişi ${member} adlı kişiyi **${sebep}** sebebiyle raporladı.`,{
			    files: [`./logs/${message.guild.id}/${log_channel}.txt`]
			});
			}
		})
	}
}