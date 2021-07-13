module.exports = {
	name:"linkengel",
	aliases:["lengel","link"],
	async execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag,KanalBul,kural){
		if(!RolVarMi(message,Roller["Management"])) return MesajGönder(message,"Bu komutu kullanmazsınız.")
		if(!args[0]) return MesajGönder(message,"!linkengel [aç/kapat]")
		switch(args[0]){
			case "aç":
				await Tags.update({linkEngellemeDurum:1},{where:{guild_id:message.guild.id}})
				message.react("👍")
				break;
			case "kapat":
				await Tags.update({linkEngellemeDurum:0},{where:{guild_id:message.guild.id}})
				message.react("👍")
				break;
		}
	}
}