module.exports = () => {
		const mysql = require('mysql');

		const conn = mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database: 'discord'
		});
		return conn
}