const {MessageButton} = require("discord-buttons"); 
module.exports =(client,Tags,Roller,Discord,RolVarMiMember) => {
    client.on('clickButton', async (button) => {
        if(button.id != "deleteticket") return 0;
        const guild = await button.guild
        const tag = await Tags.findOne({where:{guild_id:guild.id}})
        const data = await tag.get("usersTickets")
        const member = await guild.members.fetch(button.clicker.id)
        if(!RolVarMiMember(member,Roller["Management"]) && !RolVarMiMember(member,Roller["Head Admin"]) && !RolVarMiMember(member,Roller["Game Admin"])) return 0;
        const channel = button.message.channel
        const members = await guild.members.fetch()
        members.forEach(async member =>{
            if(data[member.id].channel_id == channel.id){
                data[member.id].channel_id = ""
                data[member.id].kapatmaDurum = 0
                await Tags.update({usersTickets:data},{where:{guild_id:guild.id}})
            }
        })
        channel.delete()
    })
}