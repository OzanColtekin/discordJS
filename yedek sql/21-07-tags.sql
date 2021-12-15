BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "tags" (
	"id"	INTEGER,
	"guild_id"	VARCHAR(255) NOT NULL,
	"logchannel"	TEXT DEFAULT '',
	"welcomelog"	TEXT DEFAULT '',
	"giveaway"	JSON DEFAULT '{}',
	"muteList"	JSON DEFAULT '{}',
	"cekilisList"	JSON DEFAULT '{"messages_id":[]}',
	"inviteList"	JSON DEFAULT '{}',
	"inviteTakipDurumu"	INTEGER DEFAULT 0,
	"linkEngellemeDurum"	INTEGER DEFAULT 0,
	"ticketMessage"	JSON DEFAULT '{"parent_id":"","message_id":"","arsiv_id":""}',
	"usersTickets"	JSON DEFAULT '{}',
	"memberCountChannel"	TEXT,
	"createdAt"	DATETIME NOT NULL,
	"updatedAt"	DATETIME NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
COMMIT;
