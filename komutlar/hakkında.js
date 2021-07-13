module.exports = {
	name:"hakkında",
	aliases:["hk","whois","who"],
	cooldown:0,
	guildOnly:true,
	execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag){
		var now = Date.now()

		var collection = new Discord.Collection();
		
		// Genel bilgileri //
		const member = message.mentions.members.first();
		const username = member.user.username + "#" + member.user.discriminator;
		const ID = member.user.id;
		const avatarURL = member.user.avatarURL();
		var ay_olusma = "";
		var ay_katılma = "";


		// Katılma Tarihleri // 	
		const createdAt = member.user.createdAt.toString().split("GMT")[0].split(" ");
		const joinedAt = member.joinedAt.toString().split("GMT")[0].split(" ");

		switch(createdAt[1]){
			case "Jan":
				ay_olusma = "Ocak"
				break;
			case "Feb":
				ay_olusma = "Şubat"
				break;
			case "Mar":
				ay_olusma = "Mart"
				break;
			case "Apr":
				ay_olusma = "Nisan"
				break;
			case "May":
				ay_olusma = "Mayıs"
				break;
			case "Jun":
				ay_olusma = "Haziran"
				break;
			case "Jul":
				ay_olusma = "Temmuz"
				break;
			case "Aug":
				ay_olusma = "Ağustos"
				break;
			case "Sep":
				ay_olusma = "Eylül"
				break;
			case "Nov":
				ay_olusma = "Ekim"
				break;
			case "Dec":
				ay_olusma = "Kasın"
				break;
			case "Oct":
				ay_olusma = "Aralık"
				break;
		}

		switch(joinedAt[1]){
			case "Jan":
				ay_katılma = "Ocak"
				break;
			case "Feb":
				ay_katılma = "Şubat"
				break;
			case "Mar":
				ay_katılma = "Mart"
				break;
			case "Apr":
				ay_katılma = "Nisan"
				break;
			case "May":
				ay_katılma = "Mayıs"
				break;
			case "Jun":
				ay_katılma = "Haziran"
				break;
			case "Jul":
				ay_katılma = "Temmuz"
				break;
			case "Aug":
				ay_katılma = "Ağustos"
				break;
			case "Sep":
				ay_katılma = "Eylül"
				break;
			case "Nov":
				ay_katılma = "Ekim"
				break;
			case "Dec":
				ay_katılma = "Kasın"
				break;
			case "Oct":
				ay_katılma = "Aralık"
				break;
		}



		var hesapOlusma = `${createdAt[2]} ${ay_olusma} ${createdAt[3]} ${createdAt[4]}`
		var sunucuKatılma = `${joinedAt[2]} ${ay_katılma} ${joinedAt[3]} ${joinedAt[4]}`

		// Sunucuya Girme Süresi Hesaplama //
		var countdown = member.joinedTimestamp
		var distance = now - countdown;

		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var years = Math.floor(days / 365)
        var weeks = Math.floor((days - (years * 365)) / 7)
        var days2 = days - (years * 365) - (7 * weeks)

        // Hesap Oluşturma Süresi Hesaplama //

        var countdown_created = member.user.createdTimestamp
		var distance_created = now - countdown_created;

		var days_created = Math.floor(distance_created / (1000 * 60 * 60 * 24));
        var years_created = Math.floor(days_created / 365)
        var weeks_created = Math.floor((days_created - (years_created * 365)) / 7)
        var days2_created = days_created - (years_created * 365) - (7 * weeks_created)

        // Davet Ettiği Kişi Sayısı
        var data = tag.get("inviteList")
        var inviteSayi = data[member.id].user_list.length

        // embed //

        let sqlsorgu = "SELECT isim,DiscordID from hesaplar";
		conn.query(sqlsorgu,function(err,results,fields){
			for(let x=0;x<results.length;x++){
				collection.set(results[x].DiscordID,results[x].isim)
			}
			var oyunAdı = collection.get(ID) || "Kayıtlı Değil";
			const embed = new Discord.MessageEmbed()
					.setTitle(username)
					.addFields(
								{ name: 'ID', value: ID, inline: true },
								{ name: 'Avatar', value : `[Link](${avatarURL})`, inline: true },
								//{ name: '\u200B', value: '\u200B',inline: true },
								{ name: 'Hesap Oluşturma Tarihi', value:hesapOlusma, inline:true},
								{ name: 'Sunucuya Katılma Tarihi', value:sunucuKatılma, inline:true},
								{ name: 'Sunucuda Bulunma Süresi', value:`${years} yıl , ${weeks} hafta , ${days2} gün`, inline:true},
								{ name: 'Hesap Oluşturma Süresi', value:`${years_created} yıl , ${weeks_created} hafta , ${days2_created} gün`, inline:true},
								{ name: 'Oyun Adı:', value:`${oyunAdı}`, inline:true},
								{ name: 'Davet Sayısı', value:`${inviteSayi}`, inline:true},
								{ name: '\u200B', value: '\u200B',inline: true },
								)
					.setThumbnail(avatarURL)
					message.channel.send(embed)

		})
       
    }
    
}