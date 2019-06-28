const config = {
    // Bot Owner, level 10 by default. A User ID. Should never be anything else than the bot owner's ID.
    "ownerID": "162320756489977856",

    // Bot Admins, level 9 by default. Array of user ID strings.
    "admins": ["530491387267776513"],

    // Bot Support, level 8 by default. Array of user ID strings
    "support": [],

    // Your Bot's Token. Available on https://discordapp.com/developers/applications/me
    "token": "NTgwNTkyOTI3NjgwNjI2Njkx.XOS9wg.WGzvtaebZX5u4OZ_8FdncWHZtB0",

    // Default per-server settings. New guilds have these settings.

    // DO NOT LEAVE ANY OF THESE BLANK, AS YOU WILL NOT BE ABLE TO UPDATE THEM
    // VIA COMMANDS IN THE GUILD.

    "defaultSettings": {
        "prefix": "%",
        "modLogChannel": "mod-log",
        "modRole": "Moderator",
        "adminRole": "Administrator",
        "systemNotice": "true", // This gives a notice when a user tries to run a command that they do not have permission to use.
        "welcomeChannel": "cancer",
        "welcomeMessage": "oWo? Heyy guys! We got a new guy. Hehe say Hi to @{{user}} everyone!💖",
        "welcomeEnabled": "false"
    },

    // PERMISSION LEVEL DEFINITIONS.

    permLevels: [
        // This is the lowest permisison level, this is for non-roled users.
        {
            level: 0,
            name: "User",
            // Don't bother checking, just return true which allows them to execute any command their
            // level allows them to.
            check: () => true
        },

        // This is your permission level, the staff levels should always be above the rest of the roles.
        {
            level: 2,
            // This is the name of the role.
            name: "Moderator",
            // The following lines check the guild the message came from for the roles.
            // Then it checks if the member that authored the message has the role.
            // If they do return true, which will allow them to execute the command in question.
            // If they don't then return false, which will prevent them from executing the command.
            check: (message) => {
                try {
                    const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
                    if (modRole && message.member.roles.has(modRole.id)) return true;
                } catch (e) {
                    return false;
                }
            }
        },

        {
            level: 3,
            name: "Administrator",
            check: (message) => {
                try {
                    const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
                    return (adminRole && message.member.roles.has(adminRole.id));
                } catch (e) {
                    return false;
                }
            }
        },
        // This is the server owner.
        {
            level: 4,
            name: "Server Owner",
            // Simple check, if the guild owner id matches the message author's ID, then it will return true.
            // Otherwise it will return false.
            check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
        },

        // Bot Support is a special inbetween level that has the equivalent of server owner access
        // to any server they joins, in order to help troubleshoot the bot on behalf of owners.
        {
            level: 8,
            name: "Bot Support",
            // The check is by reading if an ID is part of this array. Yes, this means you need to
            // change this and reboot the bot to add a support user. Make it better yourself!
            check: (message) => config.support.includes(message.author.id)
        },

        // Bot Admin has some limited access like rebooting the bot or reloading commands.
        {
            level: 9,
            name: "Bot Admin",
            check: (message) => config.admins.includes(message.author.id)
        },

        // This is the bot owner, this should be the highest permission level available.
        // The reason this should be the highest level is because of dangerous commands such as eval
        // or exec (if the owner has that).
        {
            level: 10,
            name: "Bot Owner",
            // Another simple check, compares the message author id to the one stored in the config file.
            check: (message) => message.client.config.ownerID === message.author.id
        }
    ],
    //Firebase config
    // Your web app's Firebase configuration
    firebaseConfig: {
        apiKey: "AIzaSyCiLIpLcBbNiKIV8oHPIgPU4Va_nhbZePQ",
        authDomain: "gal-bot.firebaseapp.com",
        databaseURL: "https://gal-bot.firebaseio.com",
        projectId: "gal-bot",
        storageBucket: "gal-bot.appspot.com",
        messagingSenderId: "633250617894",
        appId: "1:633250617894:web:f4efefeafd277313"
    },
    firestoreConfig: 
        {
            "type": "service_account",
            "project_id": "gal-bot",
            "private_key_id": "ddcb4384a9f6244075857b88eb44c9a1a58a25ae",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCMkkL3WZ/1hvdJ\nJhbjyquWqaqqGLtF45LiACY7rH7RXW6tpJuqwrXotCr153glRck2uLgmcjFXyY2M\njsJcSljAHlibjT38XPzyHJbelusrjl14K82HIAl0mOXVCyN/ZE1qoiNCzw0268cu\nK5Dg3wGOn5hS/OmIfJaSLapZ40uE3C7pQns2XzOqL7BcT7OZDzXI5rNe149B/h12\njZj4QkjMajpYDtJrc3zDa2ydgkH022danwzdD0vxqIJV68iJJvuZhE2EUP++nHwU\noScEbchz6Tp4CxojG1ER0Hn3LP2laCK4oiLVMoy1TqkhMCENsHOttDIpdJUZg13a\nB6QHxuERAgMBAAECggEABqRRR9PHNSQdNmqHX7hbdMsj3EU+gYAOCFHInK6TAChX\njrqxrH8GVnY/Vqa7AHtYdVaDZHUmL9M/FfxnknHkmUDBz+k7u9smrDeluQMVXeWs\nVM2QiK0+xyCjkOY1pVr3VbXPH9Stx5nau5utPPPKhHs12Lt4mxVkbagc1cIRpxeI\njUzROB585ZqY3/WPTLiBobTKUDxWYyPpzh4WMPt+5Rf5N7ZKJyLGSgYS9GKp1F4h\noqepDZ9IvYCaAh9pYyT7qEVd9UVG+jkRtGm7FMyZ+dj8SgvzF27IyhVFdcWJbrN0\nK/i8NUCthjjeSLqgA9Bls/njEhZ1t+ThGIQSiNdPgQKBgQDB+QnkwbjpGUDmXA/b\nFAswAKkbd3iyeHpEmxmOBBsHqfM1GmDtsHEmRAjQj9R8fQWmrlAtPnUyEeUrNOWW\nKVsN9zD43iHQ8TUcLtBOF1wSsG83yw+F9IDfWSL9SFWzpRvUna2tw/bogTaWk+6b\nY59HnUjn8TYzHQ/58vsFiRS/gQKBgQC5ha7IHbEykW3mRoFvaNh8tZwPdMY1S34N\n4O8hwASlQkiyv+cvrIgvdkGMMFmedwGdfjWW7rBPWYbQIJIqVGYGch7QluQhzAU2\nXd8mcG+WZ2tDRrvGf3TtxZcYQ3h2aacVrA7EtnfcXe9jB8ipLqpM7oLGe8OG7Umt\nf/lY3brpkQKBgEL8JZaB78FPn0Ht+OvG+DYThFKf52Z6hH68sQ6CDHORFRP5kA+F\nJw334LNleBOleRYejEGTmBU6aNGK6t34WiFwg9DtpO/q3FRnNjhBiOJLW50A2tN/\npCF9PsAJAs+O7RV3fkrLqbCRLrDBVV0EAjVQ86RlgDoWhzXh2x4GQMwBAoGBALiK\n8RSg7I3XuhFxGvneulI7ORTq3OtQwABAOr9AyZ419CjS2b5Dimhj4sn3on4N9S5b\nyCTuI7Wa4Y6Qh7TRpXdN97cYEbBIyPqOoBYVi/p5v2n5p3nJeV+3yBfbra1kZU8a\nispEk7BCRIkmygT4pXDHZJDZteK2kS6j+T3bujzxAoGAWt+iFRliXHKxZVIk3VWS\nhf9wbd/XfIvbAc7SDlD5AxPuNyt9wdeJaIAuaY/3unjAPHtNsl0p0WUh4HGtY6db\nqyl0CqghRn6GyMoatNgBUl/W2vFGyLbxnYqz5P6p+hH4xyY4vSjra3b20Y0oHWhy\nc0s2zN5LkA2nA9iRVCPWMdo=\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-733wh@gal-bot.iam.gserviceaccount.com",
            "client_id": "101563202781212999365",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-733wh%40gal-bot.iam.gserviceaccount.com"
          },
    mongo:{
            url : 'mongodb://@localhost:27017/gal?authSource=$[authSource]'
    }
};

module.exports = config;