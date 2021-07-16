module.exports = (client,RolVarMi,Roller,Tags,Discord) =>{
    client.on("message" , async message =>{
        if(message.author.bot || message.webhookID) return 0;
		if(RolVarMi(message,Roller["Management"])) return 0;
        const tag = await Tags.findOne({where: {guild_id : message.guild.id}})
        const kelimeler = await tag.get("yasakliKelime")
        kelimeler.some(word =>{
            if(message.content.toLowerCase().includes(word)){
                message.delete()
                let embed = new Discord.MessageEmbed()
                .setAuthor('19 Police Pursuit', 'https://i.hizliresim.com/rtbr3kh.png','https://19-pp.com/')
                .setDescription(`${message.member} yasaklı kelime kullandığınız için mesajınız silindi.`)
                message.channek.send(embed).then(msg =>{
                    setTimeout(msg.delete(),2000)
                })
            }
        })
    })
}