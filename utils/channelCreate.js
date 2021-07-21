module.exports = async (client,fs)=>{
    client.on("channelCreate",async (channel)=>{
        if(channel.type != "text") return 0;
        if(!fs.existsSync(`./logs/${channel.guild.id}/${channel.name}`)){
            fs.mkdirSync(`./logs/${channel.guild.id}/${channel.name}`,0766,function(err){
                if(err) return console.log(err)
            })
        }
    })
}