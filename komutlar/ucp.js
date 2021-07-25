module.exports = {
    name:"ucp",
    async execute(message,args,Discord){
        let embed = new Discord.MessageEmbed()
        .setTitle('19pursuit UCP')
        .setDescription('https://19-pp.com/ucp')
        .setThumbnail('https://i.hizliresim.com/3atro9p.png')
        message.channel.send(embed)
    }
}