const {MessageButton} = require("discord-buttons"); 
const fs = require('fs')
module.exports =(client,Tags,Roller,Discord,RolVarMiMember) => {
    client.on('clickButton', async (button) => {
        if(button.id != "openticket") return 0;
        const guild = button.guild
        const tag = await Tags.findOne({where:{guild_id:button.guild.id}})
        const tickets = await tag.get("usersTickets")
        const user_id = await button.clicker.id
        if(tickets[user_id].kapatmaDurum == 0) return 0;
        const channel = guild.channels.cache.find(c => c.id == button.channel.id)
        const message = await channel.messages.fetch(button.message.id)
        message.delete()

        tickets[user_id].kapatmaDurum = 0
        await Tags.update({usersTickets:tickets},{where:{guild_id: button.guild.id}})

        await channel.overwritePermissions([{
            id: user_id,
            allow:["VIEW_CHANNEL"],
        },
        {
            id: Roller["Developer"],
            allow:["VIEW_CHANNEL"],
        },
        {
            id:"763172319178522675",
            deny:["VIEW_CHANNEL"],
        }])
    })
}