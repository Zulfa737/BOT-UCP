const { ButtonInteraction, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'button-deletechar',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const [rowi] = await MysqlGrand.query('SELECT * FROM playerucp WHERE DiscordID = ?', [interaction.user.id]);

        if (!rowi || rowi.length === 0) {
            return interaction.reply({
                content: '❎ - You haven\'t registered your UCP yet.',
                ephemeral: true
            });
        }

        const [res] = await MysqlGrand.query(`SELECT * FROM player_characters WHERE Char_AdminName = ?`, [rowi[0].ucp]);

        if (res[0]) {
            const select = new StringSelectMenuBuilder()
                .setCustomId('select-deletechar')
                .setPlaceholder('Select Your Character!');

            for (var i = 0; i < res.length; i++) {
                select.addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`${res[i].Char_Name}`)
                        .setValue(`${res[i].Char_Name}`)
                        .setDescription(`Account ID: ${res[i].pID} Level: ${res[i].Char_Level}`)
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