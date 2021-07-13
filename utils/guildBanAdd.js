module.exports = (client) =>{
	client.on("guildBanAdd", async function (guild, user) {
		const fetchedLogs = await guild.fetchAuditLogs({
			limit: 1,
			type: 'MEMBER_BAN_ADD',
		});

		const banLog = fetchedLogs.entries.first();
		if (!banLog) return 0;

		const { executor, target } = banLog;

		if (target.id === user.id) {
		console.log(`${user.tag} adlı kişi ${executor.tag} adlı kişi tarafından banlandı.`);
		}
	})

}