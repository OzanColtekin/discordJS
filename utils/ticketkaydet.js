const {MessageButton} = require("discord-buttons"); 
const fs = require('fs')
module.exports =(client,Tags,Roller,Discord,RolVarMiMember) => {
    client.on('clickButton', async (button) => {
        if(button.id != "kaydetticket") return 0;
        const guild = await button.guild
        const tag = await Tags.findOne({where:{guild_id:guild.id}})
        const arsiv = await tag.get("ticketMessage")
        const member = await guild.members.fetch(button.clicker.id)
        const log = await guild.channels.cache.find(c => c.id == arsiv.arsiv_id)
        if(!RolVarMiMember(member,Roller["Management"]) && !RolVarMiMember(member,Roller["Head Admin"]) && !RolVarMiMember(member,Roller["Game Admin"])) return 0;
        const logsFiles = fs.readdirSync(`./logs/${guild.id}`).filter(file => file.endsWith(".txt"))
        logsFiles.forEach(file=>{
            const log_channel = file.split(".txt")[0]
            if(log_channel == button.channel.id){
                log.send(`**${member.user.username}** adlı kişi transcripti kayıt etti.`,{files: [`./logs/${guild.id}/${log_channel}.txt`]})
            }
        })
    })
}