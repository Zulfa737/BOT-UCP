const { StringSelectMenuInteraction } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'select-streamer',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {

        const char = interaction.values;
        await MysqlGrand.query(`SELECT * FROM player_characters WHERE Char_Name = '${char}'`);
        MysqlGrand.query(`UPDATE player_characters SET Char_RenderValue = '250', Char_Render = '0.5' WHERE Char_Name = '${char}'`);
        mek = interaction.update({
            content: `**SUCCESS** Streamer **${char}** berhasil di perbaiki!`,
            components: [],
            ephemeral: true,
        });
    }
};
