const { ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'button-createchar',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const [MaxChar] = await MysqlGrand.query(
            'SELECT * FROM playerucp WHERE DiscordID = ? LIMIT 3',
            [interaction.user.id]
        );        
        const [rows] = await MysqlGrand.query(`SELECT ucp_name FROM ucp WHERE discordid = '${interaction.user.id}'`);
        if (rows.length === 0 || MaxChar.length >= 3) {        
            await interaction.reply({ content: ":x: You don't have UCP or you already have more than 3 character slots", ephemeral: true });
        } else {
        const modals = new ModalBuilder()
            .setCustomId('modal-createchar')
            .setTitle(`Create Your Charater`);

        const FristNameInput = new TextInputBuilder()
            .setCustomId('frist-name')
            .setLabel('Your Frist Name')
            .setPlaceholder('Input Valid Frist Name')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const LastNameInput = new TextInputBuilder()
            .setCustomId('last-name')
            .setLabel('Your Last Name')
            .setPlaceholder('Input Valid Last Name')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const DateBrithInput = new TextInputBuilder()
            .setCustomId('date-brith')
            .setLabel('Your Date Brith')
            .setPlaceholder('example: 12/09/1999')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const GanderInput = new TextInputBuilder()
            .setCustomId('gander-input')
            .setLabel('Your Gander')
            .setPlaceholder('example: male/female')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const SkinInput = new TextInputBuilder()
            .setCustomId('skin-input')
            .setLabel('Your Skin ID')
            .setPlaceholder('example: 1,2,3,4')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        modals.addComponents(
        new ActionRowBuilder().addComponents(FristNameInput),
        new ActionRowBuilder().addComponents(LastNameInput),
        new ActionRowBuilder().addComponents(DateBrithInput),
        new ActionRowBuilder().addComponents(GanderInput),
        new ActionRowBuilder().addComponents(SkinInput))
        interaction.showModal(modals);
        }
    }
};