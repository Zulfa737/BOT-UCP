const { ButtonInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');
const components = require('../../handlers/components');

module.exports = {
    customId: 'modal-saran',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const chennel = interaction.guild.channels.cache.get('1403012090733527140');
        const saraninput = interaction.fields.getTextInputValue('saran_input');

        const embed = new EmbedBuilder()
            .setDescription(`Suggestions For <@${interaction.user.id}>`)
            .addFields(
                { name: `Suggestions`, value: `> ${saraninput}` }, // Gunakan nilai char yang dipilih
                { name: `Accept/Danied`, value: `> Pending` }
            )
            .setColor("5865F2")
            .setFooter({ text: 'Copyright (c) 2024 Kota Impian Roleplay (All rights reversed)' });

        const buttons = new ActionRowBuilder()
        .addComponents(

            new ButtonBuilder()
            .setLabel('Accept')
            .setStyle('Success')
            .setCustomId('button-accsaran'),

            new ButtonBuilder()
            .setLabel('Danied!')
            .setStyle('Danger')
            .setCustomId('button-daniedsaran'),
        );
        
        const messageId = await chennel.send({ embeds: [embed], components: [buttons] });

        interaction.user.selectedChar = messageId; 
        await interaction.reply({ content: 'Yours Succesfully create suggestion', ephemeral: true });
        messageId.react('👍');
        messageId.react('👎');

        }
    };