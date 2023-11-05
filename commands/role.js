const { SlashCommandBuilder } = require('discord.js');
const { assignableRoleIds } = require('../config.json');


module.exports = {

    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Assigns you the requested role')
        .addStringOption(option =>
            option.setName('role')
                .setDescription('The name of the role, e.g. `netplay`')
                .setRequired(true)),

    async execute(interaction) {
        roleToAssign = interaction.options.get('role').value;
        role = interaction.member.guild.roles.cache.find((role) => role.name === roleToAssign);
        // console.log(interaction.member.guild.roles);
        if (assignableRoleIds.includes(role.id)) {
            /*const x = */interaction.member.roles.add(role);
            // console.log(x);
            // await interaction.reply(`Assigned user ${interaction.user.globalName} the ${roleToAssign} role.`);
            await interaction.reply({content:`Assigned user ${interaction.user.globalName} the ${role.name} role.`, ephemeral:true});
        } else {
            await interaction.reply({content:`User ${interaction.user.globalName} does not have permission to assume the ${role.name} role.`, ephemeral:true});
        }
    },

};
