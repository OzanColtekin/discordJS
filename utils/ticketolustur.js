const {MessageButton} = require("discord-buttons"); 
const fs = require('fs')
module.exports =(client,Tags,Roller,Discord) => {
    client.on('clickButton', async (button) => {
       if(button.id != "createticket") return 0;
        const guild = button.guild;
        const tag = await Tags.findOne({where:{guild_id: button.guild.id}})
        const ticketlar = await tag.get("usersTickets")
        const ticketmesajı = await tag.get("ticketMessage")
        const user_id = await button.clicker.id
        const member = await guild.members.fetch(user_id)
        if(ticketlar[user_id].channel_id.length != 0) return 0;
        const channel_name = member.user.username + member.user.discriminator + "-destek";
        guild.channels.create(channel_name,{type:"text"}).then(async channel => {
            if(!fs.existsSync(`./logs/${guild.id}/${channel.id}.txt`)){
                await fs.writeFile(`./logs/${guild.id}/${channel.id}.txt`, "",{ flag: 'w+' },function (err) {
                  if (err) return console.log(err);
                })
            }
            await channel.setParent(ticketmesajı.parent_id);
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
        
            ticketlar[user_id].channel_id = channel.id
            await Tags.update({usersTickets:ticketlar},{where:{guild_id:guild.id}})
            let closebutton = new MessageButton()
            .setID("closeticket")
            .setLabel('🔒 Destek Kapat')
            .setStyle('red')
            let ticket_embed = new Discord.MessageEmbed()
            .setColor("#33FFCA")
            .setDescription(`Destek ekibi en kısa sürede talebini yanıtlayacak.\nTalebi kapatmak için aşağıda bulunan butona tıklaman yeterli.`)
            .setFooter('19 Police Pursuit', 'https://i.hizliresim.com/3atro9p.png');
            channel.send(ticket_embed,{
            buttons:[closebutton]
            })
            channel.send(`Merhaba ${member}! Talebi oluşturma sebebini kısaca özetler misin?`)
        })
    });
}
