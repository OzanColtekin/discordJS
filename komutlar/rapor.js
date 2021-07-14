const fs = require('fs');
module.exports = {
	name:"rapor",
	cooldown:0,
	aliases:["report"],
	async execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag,KanalBul,kural){
		if(!args[0] || !args[1]) return MesajGönder(message,"!rapor @kullanıcı [sebep]")
		const member = message.mentions.members.first()
		if(!member) return 0;
		await fs.writeFile(`./logs/${message.id}-report.txt`,"",{ flag: 'w+' },function (err) {
			if (err) return console.log(err);
		});
		const sebep = args.splice(1,args.length-1).join(" ")
		var date = new Date(message.createdTimestamp)
		var dosyaName = `${message.channel.id}-${date.toLocaleString('tr-TR',{timeZone:'Europe/Athens', month:'numeric'})}-${date.toLocaleString('tr-TR',{timeZone:'Europe/Athens', day:'numeric'})}`
		const logsFiles = fs.readdirSync(`./logs/${message.guild.id}/${message.channel.name}`).filter(file => file.endsWith(".txt"))
		logsFiles.forEach(async file => {
			const log_channel = file.split(".txt")[0]
			if(log_channel == dosyaName){
				await fs.readFile(`./logs/${message.guild.id}/${message.channel.name}/${log_channel}.txt`, 'utf8', async function(err, data) {
					const rows = data.split('\n')
					await rows.forEach(async row =>{
						if(row.includes(`(${member.id})`)){
							await fs.writeFile(`./logs/${message.id}-${message.channel.name}-report.txt`,row+"\n",{ flag: 'a+' },function (err) {
								if (err) return console.log(err);
							});
						}
					})
				})
			}
		})
		message.react('👍')
		setTimeout(()=>{
			log.send(`**${message.member}** adlı kişi ${member} adlı kişiyi **${sebep}** sebebiyle raporladı.`,{
				files: [`./logs/${message.id}-${message.channel.name}-report.txt`]
			});
		},3000)
		setTimeout(()=>{
			fs.unlink(`./logs/${message.id}-${message.channel.name}-report.txt`, (err) => {
				if (err) return console.log(err)
			  })
		},2000)
	}
}