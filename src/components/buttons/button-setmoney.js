const { ButtonInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'button-setmoney',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        const modal = new ModalBuilder()
        .setCustomId('modal-setmoney')
        .setTitle('Set Money');

        const charInput = new TextInputBuilder()
        .setCustomId('char_input')
        .setLabel('Char Input')
        .setPlaceholder('Input Valid Yours Char Example : Xeno_Tadasi')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

        const moneyInput = new TextInputBuilder()
        .setCustomId('money_input')
        .setLabel('Money Input')
        .setPlaceholder('Input Valid Yours Money Example : 30')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

        modal.addComponents(
        new ActionRowBuilder().addComponents(charInput),
        new ActionRowBuilder().addComponents(moneyInput),)
        interaction.showModal(modal);

        }
    };