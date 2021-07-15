module.exports = async (client,Roller,Tags) => {	
	const invites = {};
	
	client.guilds.cache.forEach(g => {
	    g.fetchInvites().then(guildInvites => {
	      invites[g.id] = guildInvites;
	    });
    });

	client.on("guildMemberAdd",async member =>{
		const tag = await Tags.findOne({where: {guild_id: member.guild.id}})
		const guild = client.guilds.cache.get(member.guild.id);
    	const MuteRol = guild.roles.cache.find(role => role.id === Roller['Mute'])
    	
    	const data = await tag.get("muteList")
    	const invitelistem = await tag.get("inviteList")
		const ticketlistem = await tag.get("usersTickets")
    	const inviteTakipDurum = await tag.get("inviteTakipDurumu")
		const logdata = await tag.get("welcomelog")
		const kisisayisi = await tag.get("memberCountChannel")
		const channel = guild.channels.cache.find(c => c.id === kisisayisi)
		channel.setName(`Kişi Sayısı: ${guild.memberCount}`)
    	invitelistem[member.id] = {user_list:[]}
		ticketlistem[member.id] = {channel_id:"",kapatmaDurum:0}
    	await Tags.update({inviteList:invitelistem},{where:{guild_id:guild.id}})
		await Tags.update({usersTickets:ticketlistem},{where:{guild_id:guild.id}})
    	if(data[member.id]){
    		if(data[member.id].muteDurum == 1){
    		member.roles.add(MuteRol)
    		}
    	}

    	if(inviteTakipDurum == 0) return 0;

    	member.guild.fetchInvites().then(async guildInvites => {
			const ei = invites[member.guild.id];
			invites[member.guild.id] = guildInvites;
			try{
				const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
				const inviter = client.users.cache.get(invite.inviter.id);
				if(!inviter) return log.send(`Hoşgeldin ${member}! Seni davet eden kişiyi bulamıyorum.`)
				const log = member.guild.channels.cache.get(logdata)
				if(!invitelistem[inviter.id].user_list.includes(member.id)){
					await invitelistem[inviter.id].user_list.push(member.id)
					await Tags.update({inviteList:invitelistem},{where:{guild_id:guild.id}})
				}
				var davetSayi = invitelistem[inviter.id].user_list.length
				log.send(`Hoşgeldin ${member}! Seni davet eden kişi: **${inviter.username}**, toplam **${davetSayi} daveti oldu!**`)
			}catch{
				return 0;			
			}			
			
		})

	})


	client.on("guildMemberRemove",async member => {
		const tag = await Tags.findOne({where: {guild_id: member.guild.id}})
		const inviteListe = await tag.get("inviteList")
		const ticketlistem = await tag.get("usersTickets")
		const guild = await client.guilds.cache.get(member.guild.id);
		const logdata = await tag.get("welcomelog")
		const inviteTakipDurum = await tag.get("inviteTakipDurumu")
		const kisisayisi = await tag.get("memberCountChannel")
		const channel = guild.channels.cache.find(c => c.id === kisisayisi)
		channel.setName(`Kişi Sayısı: ${guild.memberCount}`)
		const log = member.guild.channels.cache.get(logdata)
		const members = await guild.members.fetch()
		var control = []
		await members.forEach(async user =>{
			if(typeof(inviteListe[user.id]) != "undefined"){
				if(inviteListe[user.id].user_list.includes(member.id)){
					control.push(false)
					control.push(user.id)
				}
				return control
			}
			
		})
		if(control[0] == false){
			const davetEden = member.guild.member(control[1])
			inviteListe[control[1]].user_list.splice(inviteListe[control[1]].user_list.indexOf(member.id),1)
			await Tags.update({inviteList:inviteListe},{where:{guild_id:member.guild.id}})
			if(inviteTakipDurum ==1){
				log.send(`**${member}** ayrıldı, **${davetEden.user.username}** tarafından davet edilmişti.`)
			}
			
		}
		else{
			if(inviteTakipDurum ==1){
			log.send(`**${member}** ayrıldı, hâlâ kimin davet ettiğini bulamıyorum. `)
			}
		}
		delete inviteListe[member.id]
		delete ticketlistem[member.id]
		await Tags.update({usersTickets:ticketlistem},{where:{guild_id:member.guild.id}})
		await Tags.update({inviteList:inviteListe},{where:{guild_id:member.guild.id}})

	})
}