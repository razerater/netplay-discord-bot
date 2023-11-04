const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const { getAllCommandsAsJson } = require('./utils.js');


function deployAllCommands(commands) {
    const rest = new REST().setToken(token);
    (async () => {
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);
            const data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    })();
}

function main() {
    const commands = getAllCommandsAsJson();
    deployAllCommands(commands);
}

if (require.main === module) {
    main();
}
