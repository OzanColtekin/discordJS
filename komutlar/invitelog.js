module.exports = {
	name:"invitelog",
	aliases:["iv","invitelogger","ilogger","ilog"],
	cooldown:0,
	async execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag){
		if(!RolVarMi(message,Roller["Management"])) return MesajGönder(message,"Bu komutu kullanmazsınız.")
		if(!args[0]) return MesajGönder(message,"!invitelog [baslat/durdur/sıfırla]")
			if(args[0] == "baslat"){
				var inviteTakip = await tag.get("inviteTakipDurumu")
				inviteTakip = 1
				await Tags.update({inviteTakipDurumu:inviteTakip},{where:{guild_id:message.guild.id}})
				message.react("👍")
			}
			else if(args[0] == "durdur"){
				var inviteTakip = await tag.get("inviteTakipDurumu")
				inviteTakip = 0
				await Tags.update({inviteTakipDurumu:inviteTakip},{where:{guild_id:message.guild.id}})
				message.react("👍")
			}
			else if(args[0] == "sıfırla"){
				var invitelistesi = {}
				const members = await message.guild.members.fetch()
				members.forEach(member => {
					invitelistesi[member.id] = {user_list:[]}
				})
				await Tags.update({inviteList:invitelistesi},{where:{guild_id:guild.id}})
				message.react("👍")
			}
	}
	
}