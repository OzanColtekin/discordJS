module.exports = (client,Tags) => {

	client.on('messageReactionAdd', async (reaction, user) => {
		if(user.bot) return 0;
		if(reaction.partial){
			await reaction.fetch();
		}

		const tag = await Tags.findOne({where:{guild_id: reaction.message.guild.id}})
		const data = tag.get("giveaway")

		if (reaction.emoji.name == '🎉' ) {
			if(data[reaction.message.id]){
				if(data[reaction.message.id].messages_id == reaction.message.id){
					if(!data[reaction.message.id].user_list.includes(user.id)){
						await data[reaction.message.id].user_list.push(user.id)
						await Tags.update({giveaway:data},{where:{guild_id:reaction.message.guild.id}})
					}
				}
			}
			
		}
	})

	client.on('messageReactionRemove', async (reaction, user) => {

		if(reaction.partial){
			await reaction.fetch();
		}

		const tag = await Tags.findOne({where:{guild_id: reaction.message.guild.id}})
		const data = tag.get("giveaway")

		if (reaction.emoji.name == '🎉' ) {
			if(data[reaction.message.id]){
				if(data[reaction.message.id].messages_id == reaction.message.id){
					if(data[reaction.message.id].user_list.includes(user.id)){
						data[reaction.message.id].user_list.splice(data[reaction.message.id].user_list.indexOf(user.id),1)
						await Tags.update({giveaway:data},{where:{guild_id:reaction.message.guild.id}})
					}
				}
			}
			
		}

	})
}
