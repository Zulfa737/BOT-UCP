const { StringSelectMenuInteraction } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'select-discord',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {

        const value1 = interaction.values[0] == 'spd';
        const value2 = interaction.values[0] == 'sgs';
        const value3 = interaction.values[0] == 'sna';
        const value4 = interaction.values[0] == 'scf';
        const value5 = interaction.values[0] == 'smd';
        //const value6 = interaction.values[0] == 'bisnis';

                
        if(value1) {
        await interaction.reply({ content: 'https://discord.gg/zV9VMxeDQJ', ephemeral: true });
        }
        else if(value2) {
        await interaction.reply({ content: 'https://discord.gg/KCjeYSwv74', ephemeral: true });
        }
        else if(value3) {
        await interaction.reply({ content: 'https://discord.gg/rCedkJJ3Jg', ephemeral: true });
        }
        else if(value4) {
        await interaction.reply({ content: 'https://discord.gg/BhGP9NaAud', ephemeral: true });
        }
        else if(value5) {
        await interaction.reply({ content: 'https://discord.gg/BhGP9NaAud', ephemeral: true });
        }
    }
};
