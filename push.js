var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BOhoACl14WsTPwhNh8d3YCiu-ZlQVCse3Ol8RnuwykXJxb6-tw1XOqHR1TkIA1EsmyqEw_aFv0u1d6cOu4-HWoY",
    "privateKey": "1Ittv2F5lTb69WzUrsPf259zDGoMX50NBvjsxfpDXgw"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);


var pushSubcription = {
    "endpoint" : "https://fcm.googleapis.com/fcm/send/e6EG6wme_aU:APA91bHb7f0Kl77OeHFtx2qnwTZsB9kL6En6BY1ikVegLGsxMtAMPoaF9zWlr5k9LIUxlSfO_10VF-oJk_EefBgyGiwfbWpjsZJPv8KgBej2swLu827LkAWvH3ZOmc_wEH4fTGp4Fp0A",
    "keys": {
        "p256dh": "BB5JA26r7U79WuBPEv5Wer9+xVzv4yyLL48ahPhKeu+R0PTa/u8kMiGM08iZOhSjqWekQI1PZ17vHb2Xz2atmPs=",
        "auth": "tFTJeT132LecR2Q5SD10ow=="
    }
};

var payload = 'Terima kasih telah menerima push notifikasi!';
var option = {
    gcmAPIKey: '497554987148',
    TTL : 60
};


webPush.sendNotification(
    pushSubcription,
    payload,
    option
);