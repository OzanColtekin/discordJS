module.exports = {
	name: "cekilis",
	cooldown: 0,
	aliases:["c","ckls"],
	async execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag,cekilisList){
		if(RolVarMi(message,Roller["Developer"]) == false) return MesajGönder(message,"Bu komutu kullanmazsınız.")
		if(!args[0] || !args[1] || !args[2] || !args[3]) return MesajGönder(message,"!cekilis [süre(dakika)] [Kaç kişinin kazanacağı] [kanal etiketi] [Verilecek Hediye]")

		const data = tag.get("giveaway")
        const dataList = tag.get("cekilisList")
        const channel = message.mentions.channels.first()

		var time = Math.round(args[0])
        var d = new Date;
        var gun = d.getDate();
        var month = d.getUTCMonth();
        var year = d.getUTCFullYear();
        var hour = d.getHours()
        var minutes = d.getMinutes()
        var seconds = d.getSeconds()
        var odul = args.splice(3,args.length-1).join(" ")

        //
        var TimeStamp = `${hour}:${minutes}`

                minutes += parseInt(args[0])
        		var end = new Date(year, month, gun, hour, minutes, seconds)
                var countdowna = end.getTime()
                var now = new Date().getTime();

                var distance = countdowna - now;

                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
                var kazancakkisisayisi = args[1]

                let embed = new Discord.MessageEmbed()
                    .setColor("#FFFF00")
                    .setTitle(`Ödül : ${odul}`)
                    .addField(`19pursuit`,` \nÇekilişe katılmak için :tada: emojisine tıkla.\n Kalan süre ${days} gün ${hours} saat ${minutes} dakika ${seconds} saniye`)
                    .setThumbnail('https://i.hizliresim.com/3atro9p.png')
                    .setFooter('19 Police Pursuit - '+TimeStamp, 'https://i.hizliresim.com/3atro9p.png');
                channel.send(embed)
                      .then(async msg => {
                        msg.react('🎉')

                   		data[msg.id] = {messages_id:msg.id,channel_id:msg.channel.id,bitme_zamanı:countdowna,winner_count:kazancakkisisayisi,odul:odul,user_list:[] };
                        dataList.messages_id.push(msg.id);
                   		await Tags.update({giveaway:data},{where:{guild_id:msg.guild.id}})
                        await Tags.update({cekilisList:dataList},{where:{guild_id:msg.guild.id}})

                      var edit= setInterval(async function() {
                            var now = new Date().getTime();

                            var distance = countdowna - now;

                            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                            
                            let embed = new Discord.MessageEmbed()
                            .setColor("#FFFF00")
                            .setTitle(`Ödül : ${odul}`)
                            .addField(`19pursuit`,`Çekilişe katılmak için :tada: emojisine tıkla.\n Kalan süre ${days} gün ${hours} saat ${minutes} dakika ${seconds} saniye.`)
                            .setThumbnail('https://i.hizliresim.com/3atro9p.png')
                            .setFooter('19 Police Pursuit - '+TimeStamp, 'https://i.hizliresim.com/3atro9p.png');
                            msg.edit(embed);
                            
                            if(distance <= 0) {
                            
                           	const new_tag = await Tags.findOne({where: {guild_id : msg.guild.id}})
                           	let sonuc = await new_tag.get("giveaway");
                           	let userIDs = sonuc[msg.id].user_list
                           	var kazananlar = [];
							for (let c = 0; c<kazancakkisisayisi;c++){
								var control = true
								while (control==true){
									let index = Math.floor(Math.random() * userIDs.length)
					                var kazanan = msg.guild.member(userIDs[index])
					                if(!kazananlar.includes(kazanan)){
					                	control=false
					                }
								}
								kazananlar.push(kazanan)
				                
				            }

                            let embed = new Discord.MessageEmbed()
                            .setColor("#FFFF00")
                            .setTitle(`Ödül :${odul}`)
                            .addField(`19pursuit`,`Çekiliş bitti. Katıldığınız için teşekkür ederiz. \n Kazanan: ${kazananlar}`)
                            .setThumbnail('https://i.hizliresim.com/3atro9p.png')
                            .setFooter('19 Police Pursuit - '+TimeStamp, 'https://i.hizliresim.com/3atro9p.png');
                            msg.edit(embed)
                            msg.channel.send(`Tebrikler, çekilişi kazandın. ${kazananlar}`)

                                clearInterval(edit)
                                await delete data[msg.id]
                                dataList.messages_id.splice(dataList.messages_id.indexOf(msg.id),1)
                                await Tags.update({giveaway:data},{where:{guild_id:msg.guild.id}})
                                await Tags.update({cekilisList:dataList},{where:{guild_id:msg.guild.id}})

                            }
                      }, 2000)});
                     

	}
}