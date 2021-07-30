module.exports = (client,RolVarMi,Roller,Tags,Discord) => {
	client.on("message" , async message =>{
		if(message.author.bot || message.webhookID) return 0;
		if(RolVarMi(message,Roller["Management"])) return 0;
		const tag = await Tags.findOne({where: {guild_id : message.guild.id}})
		const linkEngel = await tag.get("linkEngellemeDurum")
		const logid = await tag.get("logchannel")
		const log = message.guild.channels.cache.find(c => c.id === logid)
		if(linkEngel==0) return 0;
		const probablyLinks = [".com",".tv",".net",".xyz",".gg",".io",".io","www.","https:","http:",".org",".biz",".party",".me"]
		probablyLinks.some(async word => {
			if(message.content.toLowerCase().includes(word)){
				if(!message.content.toLowerCase().includes("19-pp.com")){
					if(message.channel.id != "868974761487761418"){
						await message.delete();
						let embed = new Discord.MessageEmbed()
						.setAuthor('19 Police Pursuit', 'https://i.hizliresim.com/rtbr3kh.png','https://19-pp.com/')
						.setTitle('Link Engelleme Sistemi')
						.setDescription(`**${message.member}** adlı kişi reklam yapıyor olabilir : ${message.content}`)
						.setFooter('19 Police Pursuit', 'https://i.hizliresim.com/3atro9p.png');
						log.send(embed)
					}else{
						if(!message.content.toLowerCase().includes("youtube.com") && !message.content.toLowerCase().includes("https://cdn.discordapp.com/attachments/")){
							await message.delete();
							let embed = new Discord.MessageEmbed()
							.setAuthor('19 Police Pursuit', 'https://i.hizliresim.com/rtbr3kh.png','https://19-pp.com/')
							.setTitle('Link Engelleme Sistemi')
							.setDescription(`**${message.member}** adlı kişi reklam yapıyor olabilir : ${message.content}`)
							.setFooter('19 Police Pursuit', 'https://i.hizliresim.com/3atro9p.png');
							log.send(embed)
						}
					}
				}
				return 0;
			}
		})
	})
}