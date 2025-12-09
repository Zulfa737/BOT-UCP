const { ButtonInteraction, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'button-cs',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

    const [res] = await MysqlGrand.query(`SELECT * FROM playerucp WHERE DiscordID = '${interaction.user.id}'`);
    if (res[0]) {
        const select = new StringSelectMenuBuilder()
            .setCustomId('select-cs')
            .setPlaceholder('Select Your Character!');

            for (var i = 0; i < res.length; i++) {
                select.addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`${res[i].username}`)
                        .setValue(`${res[i].username}`)
                        .setDescription(`Account ID: ${res[i].reg_id} Level: ${res[i].level}`)
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