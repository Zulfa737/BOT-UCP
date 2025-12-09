const { ButtonInteraction, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'button-ck',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

    const [res] = await MysqlGrand.query(`SELECT * FROM playerucp WHERE DiscordID = '${interaction.user.id}'`);
    if (res[0]) {
        const select = new StringSelectMenuBuilder()
            .setCustomId('select-ck')
            .setPlaceholder('Select Your Character!');

            for (var i = 0; i < res.length; i++) {
                select.addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`${res[i].Username}`)
                        .setValue(`${res[i].Username}`)
                        .setDescription(`Account ID: ${res[i].pID} Level: ${res[i].Level}`)
                );
            }
        const row = new ActionRowBuilder().addComponents(select);

        return interaction.reply({
            content: 'Choose your Character!',
            components: [row],
            ephemeral: true
        });
    } else {
        return interaction.reply({
            content: '❎ - You haven\'t registered an charcter yet',
            ephemeral: true
        });
    }
}}