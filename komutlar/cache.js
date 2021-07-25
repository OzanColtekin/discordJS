module.exports = {
    name:"cache",
    async execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag,KanalBul,kural,fs){
        const data = await tag.get("cacheLink")
        let embed = new Discord.MessageEmbed()
        .setTitle('19pursuit Cache')
        .setDescription(`${data.cache_link}`)
        .setFooter(`Güncelleme tarihi : ${data.cache_tarih}`)
        .setThumbnail('https://i.hizliresim.com/3atro9p.png')
        message.channel.send(embed)
    }
}