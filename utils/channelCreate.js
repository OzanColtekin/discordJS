module.exports = async (client,fs)=>{
    client.on("channelCreate",async (channel)=>{
        if(channel.type != "text") return 0;
        fs.writeFile(`./logs/${channel.guild.id}/${channel.id}.txt`, "",{ flag: 'a+' },function (err) {
			if (err) return console.log(err);
	    });
    })
}