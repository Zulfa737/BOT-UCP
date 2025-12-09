const { ButtonInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'button-unbanned',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        const modal = new ModalBuilder()
        .setCustomId('modal-unbanned')
        .setTitle('Banned UCP IP');

        const ucpInput = new TextInputBuilder()
        .setCustomId('ucp_input')
        .setLabel('UCP Input')
        .setPlaceholder('Input Valid Yours UCP!')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

        modal.addComponents(
        new ActionRowBuilder().addComponents(ucpInput))
        interaction.showModal(modal);

        }
    };