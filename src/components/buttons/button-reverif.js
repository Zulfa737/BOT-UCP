const { ButtonInteraction, EmbedBuilder, ChatInputCommandInteraction, SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'button-reverif',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        const [rows] = await MysqlGrand.query('SELECT * FROM playerucp WHERE DiscordID = ?', [interaction.user.id]);

        if (rows.length === 0) {
            await interaction.reply({ content: ":x: If you don't have a UCP account, please register first", ephemeral: true });
            return;
        }

        // ID role yang mau diberikan
        const roleId = '1444311082696183860'; // ganti sesuai role ID yang mau dikasih

        // Tambahkan role ke member
        const member = interaction.guild.members.cache.get(interaction.user.id);
        if (member) {
            await member.roles.add(roleId).catch(err => {
                console.error('Gagal menambahkan role:', err);
            });
        }
        
        const embed = new EmbedBuilder()
	        .setTitle('Re-Verfikasi berhasil')
			.setDescription('You have been verified again on the Kota Impian Roleplay server!!')
            .addFields(
                { name: 'User Panel Control', value: `${rows[0].ucp}`, inline: true },
                { name: 'DiscordID', value: `${rows[0].DiscordID}`, inline: false },
            )
			.setFooter({ text: 'Copyright (c) 2025 Kota Impian Roleplay (All rights reversed)' })
			.setTimestamp();
            
        await interaction.user.send({ embeds: [embed] });
    }};