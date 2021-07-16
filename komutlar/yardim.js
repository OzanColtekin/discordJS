module.exports ={
	name:"yardim",
	cooldown:3,
	aliases:["help","yardım"],
	execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag){
		if(RolVarMi(message,Roller["Management"])){
			 let embed = new Discord.MessageEmbed()
                .setColor("#33FFCA")
                .setTitle(`Management Yardım`)
                .addFields(
                			{ name: '!cekilis - !c - !ckls', value : `!cekilis [süre(dakika)] [Kaç kişinin kazanacağı] [kanal etiketi] [Verilecek Hediye]`},
                			{ name: '!invitelog - !iv - ivlogger - ilogger', value : `!invitelog [baslat/durdur/sıfırla]`},
                			{ name: '!kural', value : `!kural [baslık/acıklama/ceza/paylas] [metin]`},
							{ name: '!bot', value: '!bot [log/welcomelog] [kanalid]'},
							{ name: '!linkengel - !lengel - !link', value: '!linkengel [aç/kapat]'},
							{ name: '!yasaklikelime', value:'!yasaklikelime [ekle/cikar] [kelime]'},
							{ name: '!ticket - !destek', value: '!ticket [kategori/arsiv/paylas]'},
                			{ name: '!reload - !r - !rl', value : `!reload [komut adı]`},
                			{ name: '!herkesicek - !herkesitasi - !etasi - !ecek', value : `!herkesicek [kanal adı]`},
                			{ name: '!ban', value : `!ban @kullanıcı [sebep] [süre (opsiyonel)]`},	
                			{ name: '!kick', value : `!kick @kullanıcı [sebep]`},
                			{ name: '!temizle - !sil - !clean ', value : `!temizle [mesaj sayisi]`},
                			{ name: '!mute - sustur', value : `!mute @kullanıcı [süre(dakika)] [sebep]`},
                			{ name: '!unmute', value : `!unmute @kullanıcı [sebep]`},
                			{ name: '!hakkında - !hk - !whois - !who', value : `!hakkında @kullanıcı`},
							//{ name: '\u200B', value: '\u200B',inline: true },
						)
                .setThumbnail('https://i.hizliresim.com/3atro9p.png')
                .setFooter('19 Police Pursuit', 'https://i.hizliresim.com/3atro9p.png');
            message.channel.send(embed)

		}
		else if(RolVarMi(message,Roller["Head Admin"])){
			 let embed = new Discord.MessageEmbed()
                .setColor("#33FFCA")
                .setTitle(`Head Admin Yardım`)
                .addFields(
                			{ name: '!ban', value : `!ban @kullanıcı [sebep] [süre (opsiyonel)]`},	
                			{ name: '!kick', value : `!kick @kullanıcı [sebep]`},
                			{ name: '!temizle - !sil - !clean', value : `!temizle [mesaj sayisi]`},
                			{ name: '!mute - sustur', value : `!mute @kullanıcı [süre(dakika)] [sebep]`},
                			{ name: '!unmute', value : `!unmute @kullanıcı [sebep]`},
                			{ name: '!hakkında', value : `!hakkında @kullanıcı`},
							//{ name: '\u200B', value: '\u200B',inline: true },
						)
                .setThumbnail('https://i.hizliresim.com/3atro9p.png')
                .setFooter('19 Police Pursuit', 'https://i.hizliresim.com/3atro9p.png');
            message.channel.send(embed)
		}
		else if(RolVarMi(message,Roller["Game Admin"])){
			let embed = new Discord.MessageEmbed()
                .setColor("#33FFCA")
                .setTitle(`Game Admin Yardım`)
                .addFields(
                			{ name: '!mute - sustur', value : `!mute @kullanıcı [süre(dakika)] [sebep]`},
                			{ name: '!unmute', value : `!unmute @kullanıcı [sebep]`},
                			{ name: '!hakkında', value : `!hakkında @kullanıcı`},
							//{ name: '\u200B', value: '\u200B',inline: true },
						)
                .setThumbnail('https://i.hizliresim.com/3atro9p.png')
                .setFooter('19 Police Pursuit', 'https://i.hizliresim.com/3atro9p.png');
            message.channel.send(embed)
		}
		else{
			let embed = new Discord.MessageEmbed()
                .setColor("#33FFCA")
                .setTitle(`19PP Yardım`)
                .addFields(
                			{ name: '!rapor - report', value : `!rapor @kullanıcı [sebep]`},
                			{ name: '!ip', value : `Sunucu ip'sini verir.`},
							//{ name: '\u200B', value: '\u200B',inline: true },
						)
                .setThumbnail('https://i.hizliresim.com/3atro9p.png')
                .setFooter('19 Police Pursuit', 'https://i.hizliresim.com/3atro9p.png');
            message.channel.send(embed)
		}
	}
}