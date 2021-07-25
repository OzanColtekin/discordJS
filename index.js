const Discord = require('discord.js');
const client = new Discord.Client({partials:["MESSAGE","REACTION","USER","GUILD_PRESENCES"]});
const fs = require('fs');
require("discord-buttons")(client)
const chalk = require('chalk');
const {token,prefix} = require('./config.json')

// UTILS

const database = require('./utils/database.js')
const Tags = database()

const databasemysql = require('./utils/databasemysql.js')
const conn = databasemysql()

const bantakip = require('./utils/guildBanAdd.js')
const guildCreate = require('./utils/whenAddGuild.js')
const playerJoinLeave = require('./utils/player-join-leave.js');
const hediye = require('./utils/hediye.js')
const mesajLog = require('./utils/mesajLoglama.js')
const linkEngelleme = require('./utils/linkengelleme.js')
const kanalacınca = require('./utils/channelCreate.js')
const kanalsilince = require('./utils/channelDelete.js')
const mesajdüzenleme = require('./utils/messageUpdate.js')
const yasakliKelime = require('./utils/yasaklikelime.js')
const antimention = require('./utils/antimention.js')

// ticket sistemi

const ticketolustur = require('./utils/ticketolustur.js')
const ticketkapat = require('./utils/ticketkapat.js')
const ticketsil = require('./utils/ticketsil.js')
const ticketac = require('./utils/ticketac.js');
const ticketkaydet = require('./utils/ticketkaydet');

// collections

client.commands = new Discord.Collection();
client.utils 	= new Discord.Collection();
const kural = new Discord.Collection();
//const cooldowns = new Discord.Collection();

// İşe Yarayacak Kısaltmalar 

function RolVarMi(message,role) {
    return message.member.roles.cache.find(r=> r.id === role) ? true : false
}

function RolVarMiMember(member,role) {
    return member.roles.cache.find(r=> r.id === role) ? true : false
}

function KanalBul(message,kanal){
    return message.guild.channels.cache.find(channel => channel.name === kanal)
}

function MesajGönder(message,msj) {
    message.channel.send(msj)
}


function handleDisconnection() {
	conn.connect(function (err) {
		if (err) {
            setTimeout('handleDisconnection()', 2000);
        }
		console.log(chalk.blue('MYSQL Bağlandı'));
	})
}

function ZamanHesapla(coutdown){
	var now = new Date().getTime();
	var sonuc = []
	var distance = coutdown - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    sonuc.push(days)
    sonuc.push(hours)
    sonuc.push(minutes)
	sonuc.push(seconds)
	sonuc.push(distance)
	return sonuc
}

const Roller = {"Management":"855825686798663690",
				"Head Admin":"855825821197533194",
				"Game Admin":"855826075212840991",
				"Trial Admin":"855826155704418314",
				"Support":"855826235933851679",
				"Bot":"772526719658885200",
				"Mute": "857545873948934145",
				}

// Kısaltma Bitiş


// UTILS KLASORU

const utilFiles = fs.readdirSync('./utils').filter(file => file.endsWith(".js"))
utilFiles.forEach(file=>{
	const util = require(`./utils/${file}`)
	const fileName = file.split(".js")[0]
	client.utils.set(fileName,util)
})

// KOMUTLAR KLASORU

const commandFiles = fs.readdirSync('./komutlar').filter(file => file.endsWith(".js"))
commandFiles.forEach(file=>{
	const command = require(`./komutlar/${file}`)
	client.commands.set(command.name,command)
})

client.commands.forEach(cmd => {
	console.log(chalk.green(`${cmd.name}`)+ ' adlı komut yüklendi.')

})

client.once('ready', async () => {

	console.log(chalk.red("19-PP Bot Başladı."))
	
	//Oynuyor Bölümü
	client.user.setActivity("19 Police Pursuit", { type: "PLAYING" });

	// kişi sayısı
	client.guilds.cache.forEach(async guild =>{
		const tag = await Tags.findOne({where:{guild_id:guild.id}})
		const channelId = await tag.get("memberCountChannel")
		if(channelId != undefined){
			const channel = guild.channels.cache.find(c => c.id == channelId)
			channel.setName(`Kişi Sayısı: ${guild.memberCount}`)
		}
	})

	// LOG KANALLARI KONTROL //

	client.guilds.cache.forEach(async guild =>{
		guild.channels.cache.forEach(async channel => {
			if(!fs.existsSync(`./logs/${guild.id}`)){
				fs.mkdirSync(`./logs/${guild.id}`,0766,function(err){
					if(err) return console.log(err)
				})
			}
			if(!fs.existsSync(`./errorlog/${guild.id}.txt`)){
				await fs.writeFile(`./errorlog/${guild.id}.txt`, "",{ flag: 'w+' },function (err) {
					  if (err) return console.log(err);
				})
			}
			if(channel.type == "text"){
				if(!fs.existsSync(`./logs/${guild.id}/${channel.name}`)){
                    await fs.mkdirSync(`./logs/${guild.id}/${channel.name}`,0766,function(err){
						if(err) return console.log(err)
					})
                }
			}
			
		})

	})
	

	//UTILS

	/*
	client.utils.forEach(util => {
		util(client,Discord,conn,Roller,tag)
	}) 
	*/ 

	playerJoinLeave(client,Roller,Tags)
	hediye(client,Tags)
	mesajLog(client,fs)
	linkEngelleme(client,RolVarMi,Roller,Tags,Discord)
	bantakip(client)
	guildCreate(client,Tags)
	kanalacınca(client,fs)
	kanalsilince(client,fs)
	mesajdüzenleme(client,fs)
	yasakliKelime(client,RolVarMi,Roller,Discord,fs,Tags)
	antimention(client,RolVarMi,RolVarMiMember,Tags,Roller)

	// ticket sistemi

	ticketolustur(client,Tags,Roller,Discord)
	ticketkapat(client,Tags,Roller,Discord)
	ticketsil(client,Tags,Roller,Discord,RolVarMiMember)
	ticketac(client,Tags,Roller,Discord,RolVarMiMember)
	ticketkaydet(client,Tags,Roller,Discord,RolVarMiMember)
	
	//MYSQL

	conn.connect(function (err) {
		if (err) {
            setTimeout('handleDisconnection()', 2000);
        }
		console.log(chalk.blue('MYSQL Bağlandı'));
	})

	connection.on('error', function (err) {
        logger.error('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                         logger.error ( 'db error perform reconnection:' + err.message);
            handleDisconnection();
        } else {
            throw err;
        }
    });


	// SQLİTE 3
	await Tags.sync();

	//Database check
	client.guilds.cache.forEach(async guild=>{
		const tag = await Tags.findOne({where:{guild_id:guild.id}})
		if(tag == null){
			await Tags.create({guild_id:guild.id})
			const invitelistesi = {};
			const ticketList = {}
			const members = await guild.members.fetch()
			members.forEach(async member => {
				invitelistesi[member.id] = {user_list:[]}
				ticketList[member.id] = {channel_id:"",kapatmaDurum:0}
			})
			await Tags.update({inviteList:invitelistesi},{where:{guild_id:guild.id}})
			await Tags.update({usersTickets:ticketList},{where:{guild_id:guild.id}})
		}	

		// Cekilis Var Mı Kontrol
		else if(tag !=  null){
			const data = await tag.get("cekilisList")
			if(data.messages_id.length == 0) return 0;
				var kaccekilisvar = data.messages_id.length
				for(let x=0;x<kaccekilisvar;x++){
					message_id = data.messages_id[x]
					const cekilis = await tag.get("giveaway")
					const channel_id = cekilis[message_id].channel_id
					const odul = cekilis[message_id].odul
					const channel = guild.channels.cache.find(c => c.id === channel_id)
					channel.messages.fetch(message_id).then(async message => {
						var countdown = cekilis[message_id].bitme_zamanı
						var kalanvakit = ZamanHesapla(countdown)
						if(kalanvakit[4] > 0){
								var edit = setInterval(async function() {
								 kalanvakit = ZamanHesapla(countdown)
								 let embed = new Discord.MessageEmbed()
									.setColor("#FFFF00")
									.setTitle(`Ödül : ${odul}`)
									.addField(`19pursuit`,` \nÇekilişe katılmak için :tada: emojisine tıkla.\n Kalan süre ${days} gün ${hours} saat ${minutes} dakika ${seconds} saniye`)
									.setThumbnail('https://i.hizliresim.com/3atro9p.png')
									.setFooter('19 Police Pursuit - '+TimeStamp, 'https://i.hizliresim.com/3atro9p.png');
								message.edit(embed)
	                            if(kalanvakit[4]<=0){

		                            const new_tag = await Tags.findOne({where: {guild_id : guild.id}})
		                           	let sonuc = await new_tag.get("giveaway");
		    						console.log(message_id)
		                           	let userIDs = sonuc[message_id].user_list
		                           	var kazancakkisisayisi = sonuc[message_id].winner_count
		                           	var kazananlar = [];
									for (let c = 0; c<kazancakkisisayisi;c++){
										var control = true
										while (control==true){
											let index = Math.floor(Math.random() * userIDs.length)
											var kazanan = '<@'+userIDs[index]+'>'
							                if(!kazananlar.includes(kazanan)){
							                	kazananlar.push(kazanan)
							                	control=false
							                }
										}
										
						                
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
	                            }
							},2000)
						}
						else{
							await delete cekilis[message_id]
	                        data.messages_id.splice(data.messages_id.indexOf(message_id),1)
	                        await Tags.update({giveaway:cekilis},{where:{guild_id:guild.id}})
	                        await Tags.update({cekilisList:data},{where:{guild_id:guild.id}})
						}
					})
					
				}
			}
			
	})

	// tickets kontrol //
	client.guilds.cache.forEach(async guild =>{
		const tag = await Tags.findOne({where:{guild_id:guild.id}})
		const members = await guild.members.fetch()
		const data = await tag.get("usersTickets")
		members.forEach(async member =>{
			if(data[member.id] == undefined){
				data[member.id] = {channel_id :"",kapatmaDurum:0}
				await Tags.update({usersTickets:data},{where:{guild_id:guild.id}})
			}
		})
	})

	// user invite control //
	client.guilds.cache.forEach(async guild =>{
		const tag = await Tags.findOne({where:{guild_id:guild.id}})
		const members = await guild.members.fetch()
		const data = await tag.get("inviteList")
		members.forEach(async member =>{
			if(data[member.id] == undefined){
				data[member.id] = {user_list:[]}
				await Tags.update({inviteList:data},{where:{guild_id:guild.id}})
			}
		})
	})

	// anti mention control
	client.guilds.cache.forEach(async guild =>{
		const tag = await Tags.findOne({where:{guild_id:guild.id}})
		const members = await guild.members.fetch()
		const data = await tag.get("antimention")
		members.forEach(async member =>{
			if(data[member.id] == undefined){
				data[member.id] = {etiketsayi:0}
				await Tags.update({antimention:data},{where:{guild_id:guild.id}})
			}
		})
	})

	


})


client.on('message',async (message) => {
	
	if(message.author.bot) return 0;
	if(message.channel.type === "dm") return 0;

	const args = message.content.slice(prefix.length).trim().split(/ +/)
	const commandName = args.shift().toLowerCase();
	

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if(!message.content.startsWith(prefix) || !command) return 0;
	if(command.guildOnly && message.channel.type == "dm") return 0;

	// Command CoolDown
	/*
	if(!cooldowns.has(commandName)){
		cooldowns.set(commandName, new Discord.Collection());
	}

	const timeStamp = cooldowns.get(commandName)
	const now = Date.now();
	const cooldownTime = (command.cooldown || 5) * 1000;

	if(timeStamp.has(message.author.id)){
		const expirationTime = timeStamp.get(message.author.id) + cooldownTime;
		if(expirationTime>now){
			const timeLeft = (expirationTime - now) / 1000
			return message.channel.send(`Bu komutu tekrar kullanmak için ${parseInt(timeLeft)} saniye beklemelisin.`)
		}
	}

	timeStamp.set(message.author.id,now);
	setTimeout(()=>{
		timeStamp.delete(message.author.id)
	},cooldownTime)
	*/
 	// Command CoolDown Bitiş

 	const tag = await Tags.findOne({where: {guild_id : message.guild.id}})
	const logdata = await tag.get("logchannel")

	const log = message.guild.channels.cache.get(logdata)

	try{
		command.execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag,KanalBul,kural,fs)
	}
	catch(e){
		console.log(e)
	// 	 fs.writeFile(`./logs/${message.guild.id}.txt`, e,{ flag: 'a+' },function (err) {
	// 		if (err) return console.log(err);
	//   });
	}

	

})

client.login(token)
