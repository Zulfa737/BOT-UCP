const { ModalSubmitInteraction } = require('discord.js');
const bcrypt = require('bcrypt');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
  customId: 'modal-bind',
  /**
   * 
   * @param {ExtendedClient} client 
   * @param {ModalSubmitInteraction} interaction 
   */
  run: async (client, interaction) => {
    const ucpName = interaction.fields.getTextInputValue('ucp_name_input');
    const plainPassword = interaction.fields.getTextInputValue('password_input');

    try {
      const [rows] = await MysqlGrand.execute('SELECT * FROM playerucp WHERE ucp = ?', [ucpName]);
      if (rows.length === 0) {
        return interaction.reply({ content: ':x: Invalid UCP name or password!', ephemeral: true });
      }

      const userData = rows[0];
      const hashedPassword = userData.password; // pakai kolom 'password'

      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
      if (!isMatch) {
        return interaction.reply({ content: ':x: Invalid UCP name or password!', ephemeral: true });
      }

      const [linkedRows] = await MysqlGrand.execute('SELECT * FROM playerucp WHERE DiscordID = ?', [interaction.user.id]);
      if (linkedRows.length > 0) {
        return interaction.reply({ content: ':x: Your Discord account is already linked to another UCP account. Use the Reverif button if needed.', ephemeral: true });
      }

      await MysqlGrand.execute('UPDATE playerucp SET DiscordID = ? WHERE ucp = ?', [interaction.user.id, ucpName]);
      return interaction.reply({ content: ':white_check_mark: UCP account successfully linked to your Discord account!', ephemeral: true });

    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.editReply({ content: ':x: An error occurred during verification.' });
      } else {
        await interaction.reply({ content: ':x: An error occurred during verification.', ephemeral: true });
      }
    }
  }
};
