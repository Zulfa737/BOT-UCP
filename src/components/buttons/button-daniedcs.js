const { ButtonInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'button-deniedcs',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const char = interaction.user.selectedChar;  // Ambil char yang sudah disimpan

        // Pastikan char ada
        if (!char) {
            return interaction.reply({ content: 'Character is undefined or missing', ephemeral: true });
        }
        

        interaction.user.selectedChar = char; 

        const modal = new ModalBuilder()
        .setCustomId('modal-daniedcs')
        .setTitle('Character Story');

        const csInput = new TextInputBuilder()
        .setCustomId('message-daniedcs')
        .setLabel('Your Massages/Reason For Charater Story!')
        .setPlaceholder('Input Valid Message CS')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

        modal.addComponents(
        new ActionRowBuilder().addComponents(csInput))
        interaction.showModal(modal);
    }
};