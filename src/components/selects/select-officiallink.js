const { StringSelectMenuInteraction } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'select-officiallink',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {

        const value1 = interaction.values[0] == 'discord';
        const value2 = interaction.values[0] == 'fng';

                
        if(value1) {
        await interaction.reply({ content: 'https://discord.gg/YC5yYRYZhk', ephemeral: true });
        }
        else if(value2) {
        await interaction.reply({ content: 'https://discord.gg/wGqS8aMEQX', ephemeral: true });
        }
    }
};