const Discord = require('discord.js')

module.exports =() => {
	const infoEmbed = new Discord.MessageEmbed(title,description,footer,color)
		.setTitle(title)
		.SetDescription(description)
		.setColor(color)
		.setFooter(footer)
		.setThumbnail('https://i.hizliresim.com/3atro9p.png')
		return infoEmbed
}