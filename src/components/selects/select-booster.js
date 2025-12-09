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
        MysqlGrand.query(`UPDATE players SET boost = '1' WHERE username = '${char}'`);
        interaction.user.send({
            content: `**SUCCESS** Your Char **${char}** start booster Store!`,
            components: [],
            ephemeral: true,
        });
    }
};