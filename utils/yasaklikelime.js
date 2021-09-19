module.exports = (client,RolVarMi,Roller,Discord,fs,Tags) =>{
    client.on("message" , async message =>{
        if(message.author.bot || message.webhookID) return 0;
        if(RolVarMi(message,Roller["Developer"])) return 0 ;
        const tag = await Tags.findOne({where: {guild_id : message.guild.id}})
        const logdata = await tag.get("logchannel")
	    const log = message.guild.channels.cache.get(logdata)
        await fs.readFile(`./utils/kelimeler.txt`, 'utf8', function(err, data) {
            var kelimeler = data.split(",")
            for(let i =0;i<kelimeler.length-1;i++){
                if(message.content.toLowerCase().includes(kelimeler[i])){
                    message.delete()
                    let embed = new Discord.MessageEmbed()
                    .setAuthor('19 Police Pursuit', 'https://i.hizliresim.com/rtbr3kh.png','https://19-pp.com/')
                    .setDescription(`${message.member} yasaklı kelime kullandığınız için mesajınız silindi.`)
                    message.channel.send(embed).then(msg =>{
                        setTimeout(()=>{
                            msg.delete()
                        },2000)
                    })
                    let embed2 = new Discord.MessageEmbed()
					.setAuthor('19 Police Pursuit', 'https://i.hizliresim.com/rtbr3kh.png','https://19-pp.com/')
					.setTitle('Kelime Engelleme Sistemi')
					.setDescription(`**${message.member}** adlı kişi yasaklı kelime kullandı: ${message.content}`)
					.setFooter('19 Police Pursuit', 'https://i.hizliresim.com/3atro9p.png');
					log.send(embed2)
                }
            }
        })
        
    })
}