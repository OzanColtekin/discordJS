module.exports = (client,RolVarMi,Roller,Tags) => {
	client.on("message" , async message =>{
		if(message.author.bot || message.webhookID) return 0;
		if(RolVarMi(message,Roller["Management"])) return 0;
		const tag = await Tags.findOne({where: {guild_id : message.guild.id}})
		const linkEngel = await tag.get("linkEngellemeDurum")
		if(linkEngel==0) return 0;
		const probablyLinks = [".com",".tv",".net",".xyz",".gg",".io",".io","www.","https:","http:",".org",".biz",".party",".me"]
		probablyLinks.some(async word => {
			if(message.content.toLowerCase().includes(word)){
				if(!message.content.toLowerCase().includes("19-pp.com")){
					await message.delete();
				}
				return 0;
			}
		})
	})
}