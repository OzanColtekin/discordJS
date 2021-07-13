module.exports = {
	name:"reload",
	aliases:["r","rl"],
	execute(message,args,Discord,RolVarMi,log,Roller,MesajGönder,conn,Tags,client,tag){
		if(!RolVarMi(message,Roller["Management"])) return 0;
		if(!args.length) return 0;

		const commandName = args[0];
		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if(!command) return 0;

		delete require.cache[require.resolve(`./${command.name}.js`)];

		const newCommand = require(`./${command.name}`)
		client.commands.set(command.name,newCommand)
	}
}