const { ButtonInteraction, EmbedBuilder, ChatInputCommandInteraction, SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');
const config = require('../../../config');
const { IntSucces, IntError } = require('../../../functions');

module.exports = {
    customId: 'button-daniedsaran',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    options: {
        ownerOnly: true,
        developers: true
    },
    run: async (client, interaction) => {
    
      
          try {
            const channel = interaction.channel;
            const messageId = interaction.user.selectedChar;  // Ambil char yang sudah disimpan
            const message = await channel.messages.fetch(messageId);
      
            const embed = message?.embeds?.[0];
            if (!embed) return interaction.reply({ content: 'No suggestion found in this message.', ephemeral: true });
      
            // Update embed status
            const updatedEmbed = EmbedBuilder.from(embed)
                .setColor('#FF0000')
              .setFields(
                embed.data.fields[0],
                { name: 'Status', value: `> Danied` }
              )
      
            await message.edit({ embeds: [updatedEmbed] });
            await interaction.reply({ content: `Suggestion has been marked as Danied.`, ephemeral: true });
          } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Error updating suggestion. Check the message ID.', ephemeral: true });
          }
        },
      };