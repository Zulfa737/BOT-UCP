const ExtendedClient = require('../../class/ExtendedClient');
const MysqlGrand = require('../../../Mysql');

module.exports = {
    customId: 'select-deletechar',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {

        const char = interaction.values;
        await MysqlGrand.query(`SELECT * FROM player_characters WHERE Char_Name = '${char}'`);
        MysqlGrand.query(`DELETE FROM player_characters WHERE Char_Name = '${char}'`);
        mek = interaction.update({
            content: `**SUCCESS** delete your **${char}**!`,
            components: [],
            ephemeral: true,
        });
    }
};