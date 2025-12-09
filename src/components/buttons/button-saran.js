const { ButtonInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'button-saran',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const modal = new ModalBuilder()
        .setCustomId('modal-saran')
        .setTitle('Berikan saran/kritik');

        const saranInput = new TextInputBuilder()
        .setCustomId('saran_input')
        .setLabel('Saran/Kritik')
        .setPlaceholder('Masukan Saran/Kritik kalian')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

        modal.addComponents(
        new ActionRowBuilder().addComponents(saranInput))
        interaction.showModal(modal);

        }
    };