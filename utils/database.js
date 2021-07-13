module.exports = () => {
	const Sequelize = require('sequelize')
	const sequelize = new Sequelize('database','user','password',{
		host:"localhost",
		dialect:"sqlite",
		logging:false,
		storage:'database.sqlite'
	})
	const Tags = sequelize.define('tags',{
		guild_id:{type:Sequelize.STRING, uniqe:true,allowNull:false},
		logchannel:{type:Sequelize.TEXT,defaultValue:""},
		welcomelog:{type:Sequelize.TEXT,defaultValue:""},
		giveaway:{type:Sequelize.JSON,defaultValue:{}},
		muteList:{type:Sequelize.JSON,defaultValue:{}},
		cekilisList:{type:Sequelize.JSON,defaultValue:{messages_id:[]}},
		inviteList:{type:Sequelize.JSON,defaultValue:{}},
		inviteTakipDurumu:{type:Sequelize.INTEGER,defaultValue:0},
		linkEngellemeDurum:{type:Sequelize.INTEGER,defaultValue:0},
		ticketMessage:{type:Sequelize.JSON,defaultValue:{parent_id: "",message_id:"",arsiv_id:""}},
		usersTickets:{type:Sequelize.JSON,defaultValue:{}}
	})
	return Tags
}