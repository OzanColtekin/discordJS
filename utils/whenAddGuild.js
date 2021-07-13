module.exports = (client,Tags) => {
    client.on('guildCreate', async guild => {
        const tag = Tags.findOne({where: {guild_id:guild.id}})
        if(tag == null){
            await Tags.create({guild_id:guild.id});
        }
        const invitelistesi = {}
        const ticketList = {}
        const members = await guild.members.fetch()
        members.forEach(async member => {
            invitelistesi[member.id] = {user_list:[]}
            ticketList[member.id] = {channel_id:""}
        })
        await Tags.update({inviteList:invitelistesi},{where:{guild_id:guild.id}})
        await Tags.update({usersTickets:ticketList},{where:{guild_id:guild.id}})
        const channels = await guild.channels.fetch()
        channels.forEach(async channel => {
            if(channel.type == "text"){
                if(!fs.existsSync(`./logs/${guild.id}/${channel.id}.txt`)){
                    await fs.writeFile(`./logs/${guild.id}/${channel.id}.txt`, "",{ flag: 'w+' },function (err) {
                      if (err) return console.log(err);
                    })
                }
            }
            
        })
    
    })
}