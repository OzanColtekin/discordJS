module.exports = (client,fs) =>{
    client.on("messageUpdate", async message =>{
        var date = new Date(message.createdTimestamp)
		var mesaj = `[Tarih :${date.toLocaleString('tr-TR', { timeZone: 'UTC' })}] ${message.author.username}#${message.author.discriminator} (${message.author.id}): ${message.content} olan mesajı ${message.reactions.message.content} olarak editledi.  \n`
        await fs.writeFile(`./logs/${message.guild.id}/${message.channel.id}.txt`, mesaj,{ flag: 'a+' },function (err) {
            if (err) return console.log(err);
        });
        await fs.readFile(`./logs/${message.guild.id}/${message.channel.id}.txt`, 'utf8', function(err, data) {
            if (err) throw console.log(err);
            if(data.split("|| Zaman :").length >= 100){
                fs.writeFile(`./logs/${message.guild.id}/${message.channel.id}.txt`, mesaj, {flag: 'w+' },function (err) {
                if (err) return console.log(err);
              });
            }
        })
    })
}