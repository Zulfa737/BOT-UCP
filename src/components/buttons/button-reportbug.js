const { ButtonInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'button-reportbug',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        const modal = new ModalBuilder()
        .setCustomId('modal-reportbug')
        .setTitle('Reports Bug');

        const bugInput = new TextInputBuilder()
        .setCustomId('bug_input')
        .setLabel('Bug Input')
        .setPlaceholder('Input Valid Yours Report Bugs!')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

        const imageInput = new TextInputBuilder()
        .setCustomId('image_input')
        .setLabel('Image/Screenshot')
        .setPlaceholder('Input Valid Link Screenshot')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
        
        const reasonbugInput = new TextInputBuilder()
        .setCustomId('reasonbug_input')
        .setLabel('Deskripsi Bugs')
        .setPlaceholder('Input Valid Deskripsi Bug')
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(8)
        .setRequired(true);

        modal.addComponents(
        new ActionRowBuilder().addComponents(bugInput),
        new ActionRowBuilder().addComponents(imageInput),
        new ActionRowBuilder().addComponents(reasonbugInput))
        interaction.showModal(modal);

        }
    };