module.exports = (client,fs) => {
	client.on("message" , async message => {
		var date = new Date(message.createdTimestamp)
		var Attachment = (message.attachments)
		var dosyaName = `${message.channel.id}-${date.toLocaleString('tr-TR',{timeZone:'Europe/Athens', month:'numeric'})}-${date.toLocaleString('tr-TR',{timeZone:'Europe/Athens', day:'numeric'})}`
		if(Attachment.array()[0] != null){
			var mesaj = `[${date.toLocaleString('tr-TR', { timeZone: 'UTC' })}] ${message.author.username}#${message.author.discriminator} (${message.author.id}): ${Attachment.array()[0].url} ${message.content}  \n`
		}else{
			var mesaj = `[${date.toLocaleString('tr-TR', { timeZone: 'UTC' })}] ${message.author.username}#${message.author.discriminator} (${message.author.id}): ${message.content}  \n`
		}
		if(!fs.existsSync(`./logs/${message.guild.id}/${message.channel.name}/${dosyaName}.txt`)){
			await fs.writeFile(`./logs/${message.guild.id}/${message.channel.name}/${dosyaName}.txt`, "",{ flag: 'w+' },function (err) {
				if (err) return console.log(err);
		  });
		}
		await fs.writeFile(`./logs/${message.guild.id}/${message.channel.name}/${dosyaName}.txt`, mesaj,{ flag: 'a+' },function (err) {
			  if (err) return console.log(err);
		});

		// await fs.readFile(`./logs/${message.guild.id}/${message.channel.id}.txt`, 'utf8', function(err, data) {
		//   if (err) throw console.log(err);
		//   if(data.split("Tarih :").length >= 100){
		//   	fs.writeFile(`./logs/${message.guild.id}/${message.channel.id}.txt`, mesaj, {flag: 'w+' },function (err) {
		// 	  if (err) return console.log(err);
		// 	});
		//   }
		// })
	})
}