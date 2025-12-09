const { ButtonInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'button-bandiscord',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        const modal = new ModalBuilder()
        .setCustomId('modal-bandiscord')
        .setTitle('Banned UCP & DiscordID Bug');

        const ucpInput = new TextInputBuilder()
        .setCustomId('ucp_input')
        .setLabel('UCP Input')
        .setPlaceholder('Input Valid Yours UCP!')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

        const reasonInput = new TextInputBuilder()
        .setCustomId('reason_input')
        .setLabel('Reason Input')
        .setPlaceholder('Input Valid Yours Reason!')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

        modal.addComponents(
        new ActionRowBuilder().addComponents(ucpInput),
        new ActionRowBuilder().addComponents(reasonInput))
        interaction.showModal(modal);

        }
    };