BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "tags" (
	"id"	INTEGER,
	"guild_id"	VARCHAR(255) NOT NULL,
	"giveaway"	JSON DEFAULT '{}',
	"muteList"	JSON DEFAULT '{}',
	"cekilisList"	JSON DEFAULT '{"messages_id":[]}',
	"inviteList"	JSON DEFAULT '{}',
	"inviteTakipDurumu"	INTEGER DEFAULT 0,
	"linkEngellemeDurum"	INTEGER DEFAULT 0,
	"ticketMessage"	TEXT DEFAULT '',
	"createdAt"	DATETIME NOT NULL,
	"updatedAt"	DATETIME NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "tags" VALUES (1,'690336184085512619','{}','{}','{"messages_id":[]}','{"337371672715853824":{"user_list":[]},"312643998600658954":{"user_list":[]},"299643415531094027":{"user_list":[]},"227037205082800139":{"user_list":[]},"135684988292169728":{"user_list":[]},"859779522227732510":{"user_list":[]},"328982140198977576":{"user_list":[]},"321985589186396170":{"user_list":[]},"821729223911145574":{"user_list":[]},"683723721101279302":{"user_list":[]},"764942765602766850":{"user_list":[]},"690341835528208385":{"user_list":[]},"668244154349912074":{"user_list":[]},"703750143601541150":{"user_list":[]},"782338872787861535":{"user_list":[]},"268682554536755202":{"user_list":[]},"235088799074484224":{"user_list":[]},"690250707688882312":{"user_list":[]},"727291437388922910":{"user_list":[]},"184405311681986560":{"user_list":[]},"198813513416835073":{"user_list":[]},"140466848792576000":{"user_list":[]},"559798700357058594":{"user_list":[]},"402348449405861908":{"user_list":[]},"763132755105677372":{"user_list":[]},"474041654605512704":{"user_list":[]},"701439473715773451":{"user_list":[]},"762290646580854785":{"user_list":[]},"464050804324564992":{"user_list":[]},"744190322568986654":{"user_list":[]},"611477938285838336":{"user_list":[]},"276107653221056513":{"user_list":[]},"784219733494071326":{"user_list":[]},"184449619449610240":{"user_list":[]},"158270794252681216":{"user_list":[]},"576140161881210914":{"user_list":[]},"326512499186860032":{"user_list":[]},"799245820871573534":{"user_list":[]},"319898068864729088":{"user_list":[]},"728190978950692884":{"user_list":[]},"827234395383005206":{"user_list":[]},"550246083645669376":{"user_list":[]},"762603460532109342":{"user_list":[]},"766613311516442645":{"user_list":[]},"239048615643971585":{"user_list":[]},"718218684610510921":{"user_list":[]},"346964376760090625":{"user_list":[]},"544194759749664768":{"user_list":[]},"698977938829475852":{"user_list":[]},"374943966900256768":{"user_list":[]},"823357269231927328":{"user_list":[]},"784916671693062146":{"user_list":[]},"688328208516775962":{"user_list":[]},"623263579101200384":{"user_list":[]},"226003336975876107":{"user_list":[]},"762995315199442964":{"user_list":[]},"358992468739358720":{"user_list":[]},"311608683618500608":{"user_list":[]},"405690629524553728":{"user_list":[]},"851455372165120001":{"user_list":[]},"317672510655168523":{"user_list":[]},"604283385749176341":{"user_list":[]},"391283433684467714":{"user_list":[]},"302118357006548992":{"user_list":[]},"301761510294945793":{"user_list":[]},"234395307759108106":{"user_list":[]},"778753617632690248":{"user_list":[]},"333172885982019586":{"user_list":[]},"650094691332784139":{"user_list":[]},"630192839330103337":{"user_list":[]},"690193607327613123":{"user_list":[]},"292691140367351819":{"user_list":[]}}',0,0,'863028866708013077','2021-07-09 11:43:10.604 +00:00','2021-07-09 12:08:36.006 +00:00');
INSERT INTO "tags" VALUES (2,'715742363477082212','{}','{}','{"messages_id":[]}','{"859779522227732510":{"user_list":[]},"611477938285838336":{"user_list":[]},"727182895352905811":{"user_list":[]},"762290646580854785":{"user_list":[]},"766290836279132200":{"user_list":[]},"852669507709304832":{"user_list":[]},"862497743414493214":{"user_list":[]}}',0,0,'','2021-07-09 11:43:10.611 +00:00','2021-07-09 11:43:10.808 +00:00');
COMMIT;
