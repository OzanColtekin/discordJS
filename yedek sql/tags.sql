BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "tags" (
	"id"	INTEGER,
	"guild_id"	VARCHAR(255) NOT NULL,
	"welcome_message"	JSON DEFAULT '{}',
	"giveaway"	JSON DEFAULT '{}',
	"muteList"	JSON DEFAULT '{}',
	"cekilisList"	JSON DEFAULT '{"messages_id":[]}',
	"inviteList"	JSON DEFAULT '{}',
	"createdAt"	DATETIME NOT NULL,
	"updatedAt"	DATETIME NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

COMMIT;
