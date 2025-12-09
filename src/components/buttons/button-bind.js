const { ButtonInteraction, EmbedBuilder, ChatInputCommandInteraction, SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');
const config = require('../../../config');
const { IntSucces, IntError } = require('../../../functions');

module.exports = {
    customId: 'button-bind',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
          const [rows] = await MysqlGrand.query('SELECT * FROM playerucp WHERE DiscordID = ?', [interaction.user.id]);
            if (rows.length > 0) {
                return interaction.reply({ content: ':x: This UCP account is already bound to another Discord account! Please press the button below to reverify your account.', ephemeral: true });
            } else {

                const modal = new ModalBuilder()
                .setCustomId('modal-bind')
                .setTitle('Bind UCP Account');
            
              const ucpNameInput = new TextInputBuilder()
                .setCustomId('ucp_name_input')
                .setLabel('UCP Name')
                .setPlaceholder('Input your UCP')
                .setStyle(TextInputStyle.Short)
                .setRequired(true);
            
              const otpInput = new TextInputBuilder()
                .setCustomId('password_input')
                .setLabel('Password')
                .setPlaceholder('Input your Password')
                .setStyle(TextInputStyle.Short)
                .setRequired(true);
            
              modal.addComponents(
                new ActionRowBuilder().addComponents(ucpNameInput),
                new ActionRowBuilder().addComponents(otpInput));
            
              interaction.showModal(modal);
            }
        } catch (error) {
            console.error(error);
            interaction.reply({ content: ':x: There was an error binding your UCP account.', ephemeral: true });
        }
    }
};