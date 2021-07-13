const {MessageButton} = require("discord-buttons") 
module.exports = {
    name:"ticket",
    aliases:["destek"],
    async execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag,KanalBul,kural){
        if(!RolVarMi(message,Roller["Management"])) return MesajGönder(message,"Bu komutu kullanamazsınız.")
        if(!args[0]) return MesajGönder(message,"!ticket [kategori/arsiv/paylas]")
        const tickets = tag.get("ticketMessage")
        if(args[0]=="kategori"){
            if(!args[1]) return MesajGönder(message,"!ticket kategori [kategori id]")
            tickets.parent_id = args[1]
            Tags.update({ticketMessage:tickets},{where:{guild_id:message.guild.id}})
            message.react("👍")
        }
        else if(args[0] == "arsiv"){
            if(!args[1]) return MesajGönder(message,"!ticket arsiv [arsiv channel id]")
            tickets.arsiv_id = args[1]
            Tags.update({ticketMessage:tickets},{where:{guild_id:message.guild.id}})
            message.react("👍")
        }
        else if(args[0] == "paylas"){
            if(!args[1]) return MesajGönder(message,"!ticket paylas [#kanal]")
            const channel = message.mentions.channels.first()
            const embed = new Discord.MessageEmbed()
            .setColor("#33FFCA")
            .setTitle('Destek Paneli')
            .setDescription(`Destek talebi oluşturmak için aşağıdaki butona tıklayabilirsin.`)
            .setFooter('19 Police Pursuit', 'https://i.hizliresim.com/3atro9p.png');
            let button = new MessageButton()
            .setLabel('📩 Talep Aç')
            .setID('createticket')
            .setStyle('grey');
            channel.send("",{
                buttons:[button],
                embed:embed
            }).then(async msg =>{
                tickets.message_id = msg.id
                await Tags.update({ticketMessage:tickets},{where:{guild_id:msg.guild.id}})

            })
        }
        
    }
}