const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Assigns you the requested role, e.g. /role netplay'),
    async execute(interaction) {
        console.log(interaction);
        await interaction.reply('h');
    },
};
