const { ChatInputCommandInteraction, ActionRowBuilder, SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../../config');

module.exports = {
    structure: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Menghapus sejumlah pesan dalam channel')
    .addIntegerOption(option =>
      option.setName('jumlah')
        .setDescription('Jumlah pesan yang ingin dihapus (1-100)')
        .setRequired(true)
    ),
    options: {
        ownerOnly: true,
        developers: true
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        // Ambil jumlah dari input user
    const jumlah = interaction.options.getInteger('jumlah');

    // Validasi jumlah pesan antara 1-100
    if (jumlah < 1 || jumlah > 100) {
      return interaction.reply({ content: 'Jumlah pesan harus antara 1 dan 100.', ephemeral: true });
    }

    // Hapus pesan
    try {
      await interaction.channel.bulkDelete(jumlah, true);
      interaction.reply({ content: `Berhasil menghapus ${jumlah} pesan.`, ephemeral: true });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'Terjadi kesalahan saat menghapus pesan.', ephemeral: true });
    }
  },
};
