const { ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');
const components = require('../../handlers/components');

module.exports = {
    customId: 'modal-reportbug',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const chennel = interaction.guild.channels.cache.get('1328719630528680027');
        const buginput = interaction.fields.getTextInputValue('bug_input');
        const reasoninput = interaction.fields.getTextInputValue('reasonbug_input');
        const photoUrl = interaction.fields.getTextInputValue('image_input');

        // Periksa apakah nilai photoUrl valid
        if (!photoUrl.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/)) {
            return interaction.reply({ content: 'Invalid URL. Please provide a valid image link.', ephemeral: true });
        }


        const embed = new EmbedBuilder()
            .setDescription(`Report bug by <@${interaction.user.id}>`)
            .addFields(
                { name: `Bug Judul`, value: `> ${buginput}`, inline: true }, // Gunakan nilai char yang dipilih
                { name: `Reason Bug`, value: `> ${reasoninput}`, inline: true },
                { name: `Status`, value: `> Pending`, inline: false }
            )
            .setImage(photoUrl)
            .setColor('#FF0000')
            .setFooter({ text: 'Copyright (c) 2024 Kota Impian Roleplay (All rights reversed)' });
        
            const buttons = new ActionRowBuilder()
                    .addComponents(
                    new ButtonBuilder()
                    .setLabel('Fixed')
                    .setStyle('Success')
                    .setCustomId('button-fixbug')
            );
        const messageId = await chennel.send({ embeds: [embed], components: [buttons] });
        interaction.user.selectedChar = messageId; 
        await interaction.reply({ content: 'Yours Succesfully report bugs to developer', ephemeral: true });
        }
    };