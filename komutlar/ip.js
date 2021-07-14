module.exports = {
    name:"ip",
    async execute(message,args,Discord){
        let embed = new Discord.MessageEmbed()
        .setTitle('19 Police Pursuit')
        .setDescription('samp.19-pp.com:7777')
        .setThumbnail('https://i.hizliresim.com/3atro9p.png')
        message.channel.send(embed)
    }
}