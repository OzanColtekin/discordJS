module.exports = {
	name: "temizle",
	cooldown: 0,
	aliases:["sil","clear","clean"],
	execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder){
		if(!RolVarMi(message,Roller["Developer"]) && !RolVarMi(message,Roller["Special"])) return MesajGönder(message,"Bu komutu kullanmazsınız.")
		const sayi = parseInt(args[0])
		if(!args[0] || isNaN(sayi)) return MesajGönder(message,"!temizle [mesaj sayisi]")
		if(sayi>100) return MesajGönder(message,"100'den küçük bir değer girmelisiniz.")
		message.channel.bulkDelete(sayi,true)
		message.channel.send(`${sayi} adet mesaj temizlendi.`).then((msg) => {
			setTimeout(()=>{
				msg.delete()
			},2000)
		})
		log.send(`${message.channel.name} adlı kanalda ${message.member.user.username} adlı kişi tarafından ${sayi} adet mesaj temizlendi.`)
	}
}