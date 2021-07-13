const {MessageButton} = require("discord-buttons"); 
module.exports =(client,Tags,Roller,Discord) => {
    client.on('clickButton', async (button) => {
        if(button.id != "closeticket") return 0;

        const guild = button.guild;
        const tag = await Tags.findOne({where:{guild_id: button.guild.id}})
        const ticketlar = await tag.get("usersTickets")
        const user_id = await button.clicker.id
        var ticket_sahip = ""
        const members = await guild.members.fetch()
        const member = await guild.members.fetch(user_id)
        const channel = guild.channels.cache.find(c => c.id == button.channel.id)
        
        

        // ticket sahibi
        members.forEach(member => {
            if(ticketlar[member.id].channel_id == channel.id){
                ticket_sahip = member.id
            } 
        })

        if(ticketlar[ticket_sahip].kapatmaDurum == 1) return 0;
       
        // Database update

        // embed
        let embed = new Discord.MessageEmbed()
        .setDescription(`Destek talebi ${member} tarafından kapatıldı.`)


        // BUTTONS 
        let transcript = new MessageButton()
        .setStyle('grey')
        .setLabel('📝 Transcript')
        .setID("kaydetticket")
        let deletebtn = new MessageButton()
        .setStyle('red')
        .setLabel('⛔️ Sil')
        .setID('deleteticket')
        let openbtn = new MessageButton()
        .setStyle('green')
        .setLabel('🔓 Aç')
        .setID("openticket")

        // channel ayarları 
        channel.send(embed,{
            buttons:[transcript,openbtn,deletebtn]
        })

        await channel.overwritePermissions([{
            id: ticket_sahip,
            allow:["VIEW_CHANNEL"],
        },
        {
            id: Roller["Management"],
            allow:["VIEW_CHANNEL"],
        },
        {
            id: Roller["Head Admin"],
            allow:["VIEW_CHANNEL"],
        },
        {
            id: Roller["Game Admin"],
            allow:["VIEW_CHANNEL"],
        },
        {
            id: Roller["Trial Admin"],
            allow:["VIEW_CHANNEL"],
        },
        {
            id: Roller["Support"],
            allow:["VIEW_CHANNEL"],
        },
        {
            id: Roller["Bot"],
            allow:["VIEW_CHANNEL"],
        },
        {
            id:"772506278790561802",
            deny:["VIEW_CHANNEL","SEND_MESSAGES"],
        }])

        ticketlar[ticket_sahip].kapatmaDurum = 1
        await Tags.update({usersTickets:ticketlar},{where:{guild_id: button.guild.id}})
    })
}