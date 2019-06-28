module.exports = (client) => {

    /*
    PERMISSION LEVEL FUNCTION
    This is a very basic permission system for commands which uses "levels"
    "spaces" are intentionally left black so you can add them if you want.
    NEVER GIVE ANYONE BUT OWNER THE LEVEL 10! By default this can run any
    command including the VERY DANGEROUS `eval` and `exec` commands!
    */

    client.permlevel = message => {
        let permlvl = 0;

        const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

        while (permOrder.length) {
            const currentLevel = permOrder.shift();
            if (message.guild && currentLevel.guildOnly) continue;
            if (currentLevel.check(message)) {
                permlvl = currentLevel.level;
                break;
            }
        }
        return permlvl;
    };

    /*
    GUILD SETTINGS FUNCTION
    This function merges the default settings (from config.defaultSettings) with any
    guild override you might have for particular guild. If no overrides are present,
    the default settings are used.
    */

    // getSettings merges the client defaults with the guild settings. guild settings in
    // enmap should only have *unique* overrides that are different from defaults.
    client.getSettings = (guild) => {
        if (!guild) return client.settings.get("default");
        const guildConf = client.settings.get(guild.id) || {};
        // This "..." thing is the "Spread Operator". It's awesome!
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        return ({ ...client.settings.get("default"), ...guildConf });
    }

    // writeSettings overrides, or adds, any configuration item that is different
    // than the defaults. This ensures less storage wasted and to detect overrides.
    client.writeSettings = (id, newSettings) => {
        const defaults = client.settings.get("default");
        let settings = client.settings.get(id) || {};
        // Using the spread operator again, and lodash's "pickby" function to remove any key
        // from the settings that aren't in the defaults (meaning, they don't belong there)
        client.settings.set(id, {
            ..._.pickBy(settings, (v, k) => !_.isNil(defaults[k])),
            ..._.pickBy(newSettings, (v, k) => !_.isNil(defaults[k]))
        });
    };

};