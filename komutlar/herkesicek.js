module.exports ={
	name:"herkesicek",
	cooldown:3,
	aliases:["herkesitasi","etasi","ecek"],
	async execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag,KanalBul){
		if(!RolVarMi(message,Roller["Management"])) return MesajGönder(message,"Bu komutu kullanamazsınız.")
		if(!message.member.voice.channel) return MesajGönder(message,"Bu komutu kullanmak için sesli kanalda olmalısınız.")
		if(!args[0]) return MesajGönder(message,"!herkesicek [kanal adı]")
			const channel_1 = message.guild.channels.cache.find(channel => channel.name == message.member.voice.channel.name)
			const channel_name = args.splice(0,args.length).join(" ")
	        const chan1 =message.guild.channels.cache.find(channel => channel.name ==channel_name)
	        channel_1.members.forEach(member => {
	            member.voice.setChannel(chan1)
	        });	
	}
}