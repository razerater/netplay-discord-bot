const fs = require('node:fs');
const path = require('node:path');
const { Collection } = require('discord.js');


function getAllCommands() {
    const commands = [];
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            commands.push(command);
        } else {
            throw new Error(`The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }

    return commands;
}

function getAllCommandsAsJson() {
    return getAllCommands().map(
        (command) => { return command.data.toJSON() }
    );
}

function getAllCommandsAsCollection() {
    commandsCollection = new Collection()
    for (const command of getAllCommands()) {
        commandsCollection.set(command.data.name, command);
    }
    return commandsCollection;
}

module.exports = { getAllCommandsAsJson, getAllCommandsAsCollection };
