const { ButtonInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'button-setadmin',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        const modal = new ModalBuilder()
        .setCustomId('modal-setadmin')
        .setTitle('Set Money');

        const charInput = new TextInputBuilder()
        .setCustomId('char_input')
        .setLabel('Char Input')
        .setPlaceholder('Input Valid Yours Char Example : Ronnie_Varquez')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

        const adminInput = new TextInputBuilder()
        .setCustomId('admin_input')
        .setLabel('Admin Name Input')
        .setPlaceholder('Input Valid Yours admin Name Example : Kota Impian')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

        const adminlevelInput = new TextInputBuilder()
        .setCustomId('adminlevel_input')
        .setLabel('Admin Level Input')
        .setPlaceholder('Input Valid Yours admin level Example : 1,2,3,4,5,6')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

        modal.addComponents(
        new ActionRowBuilder().addComponents(charInput),
        new ActionRowBuilder().addComponents(adminInput),
        new ActionRowBuilder().addComponents(adminlevelInput))
        interaction.showModal(modal);

        }
    };