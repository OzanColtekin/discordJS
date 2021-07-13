module.exports = {
	name:"kural",
	cooldown:0,
	execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag,KanalBul,kural){
	if(!RolVarMi(message,Roller["Management"])) return MesajGönder(message,"Bu komutu kullanamazsınız.")
	if(!args[0]) return MesajGönder(message,"!kural [baslık/acıklama/ceza/paylas] [metin]")
	if(args[0] == "baslık"){
		kural.set("baslık",args.splice(1,args.length-1).join(" "))
		message.react("👍")
	}
	else if(args[0] == "acıklama"){
		kural.set("acıklama",args.splice(1,args.length-1).join(" "))
		message.react("👍")
	}
	else if(args[0] == "ceza"){
		kural.set("ceza",args.splice(1,args.length-1).join(" "))
		message.react("👍")
	}
	else if(args[0] == "paylas"){
		if(!args[1]) return MesajGönder(message,"")
		const date = new Date(message.createdTimestamp)
		const tarih = date.toLocaleString('tr-TR', { timeZone: 'UTC', dateStyle:"short"})
		let embed = new Discord.MessageEmbed()
					.setAuthor('19 Police Pursuit', 'https://i.hizliresim.com/rtbr3kh.png','https://19-pp.com/')
					.setTitle(`${kural.get("baslık")}`)
					.setURL('https://19-pp.com/')
					.setDescription(`${kural.get("acıklama")}`)
					.addField('\u200B',`[CEZA: ${kural.get("ceza")}](https://19-pp.com/)`)
					.setColor("#B70000")
					.setFooter(`Bu kural ${tarih} tarihinde güncellenmiştir.`)
		message.channel.send(embed)
		}
	}
	
}