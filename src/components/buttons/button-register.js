const { ButtonInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'button-register',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const [existingAccount] = await MysqlGrand.query('SELECT * FROM playerucp WHERE DiscordID = ?', [interaction.user.id]);
        if (existingAccount.length > 0) {
            return interaction.reply({ content: `:x: Kamu sudah memiliki akun ucp bernama: ${existingAccount[0].ucp}`, ephemeral: true });
        } else {
        const modal = new ModalBuilder()
        .setCustomId('modal-register')
        .setTitle('Kota Impian UCP Registration');

        const ucpInput = new TextInputBuilder()
        .setCustomId('ucp_input')
        .setLabel('UCP Name')
        .setPlaceholder('Input Valid UCP Name')
        .setStyle(TextInputStyle.Short)
        .setMaxLength(12)
        .setRequired(true);

        modal.addComponents(
        new ActionRowBuilder().addComponents(ucpInput))
        interaction.showModal(modal);

        }
    }
};

// const { ButtonInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
// const ExtendedClient = require('../../class/ExtendedClient');
// const MysqlGrand = require('../../../Mysql');

// module.exports = {
//     customId: 'button-register',
//     /**
//      * 
//      * @param {ExtendedClient} client 
//      * @param {ButtonInteraction} interaction 
//      */
//     run: async (client, interaction) => {

//         const [existingAccount] = await MysqlGrand.query('SELECT * FROM playerucp WHERE DiscordID = ?', [interaction.user.id]);
//         if (existingAccount.length > 0) {
//             return interaction.reply({ content: `:x: Kamu sudah memiliki akun ucp bernama: ${existingAccount[0].ucp}`, ephemeral: true });
//         } else {
//         const modal = new ModalBuilder()
//         .setCustomId('modal-register')
//         .setTitle('Kota Impian UCP Registration');

//         const ucpInput = new TextInputBuilder()
//         .setCustomId('ucp_input')
//         .setLabel('UCP Name')
//         .setPlaceholder('Input Valid UCP Name')
//         .setStyle(TextInputStyle.Short)
//         .setMaxLength(12)
//         .setRequired(true);

//         const passwordInput = new TextInputBuilder()
//         .setCustomId('password_input')
//         .setLabel('Password')
//         .setPlaceholder('Input Valid UCP Password')
//         .setStyle(TextInputStyle.Short)
//         .setMaxLength(24)
//         .setMinLength(8)
//         .setRequired(true);

//         const confirmPasswordInput = new TextInputBuilder()
//         .setCustomId('confirm_password_input')
//         .setLabel('Confirm Password')
//         .setPlaceholder('Re-Input Valid UCP Password')
//         .setStyle(TextInputStyle.Short)
//         .setMaxLength(24)
//         .setMinLength(8)
//         .setRequired(true);

//         modal.addComponents(
//         new ActionRowBuilder().addComponents(ucpInput),
//         new ActionRowBuilder().addComponents(passwordInput),
//         new ActionRowBuilder().addComponents(confirmPasswordInput))
//         interaction.showModal(modal);

//         }
//     }
// };
