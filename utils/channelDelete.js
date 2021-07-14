module.exports = async (client,fs)=>{
    client.on("channelDelete",async (channel)=>{
        if(channel.type != "text") return 0;
        fs.unlink(`./logs/${channel.guild.id}/${channel.name}`, (err) => {
            if (err) return console.log(err)
          })
    })
}