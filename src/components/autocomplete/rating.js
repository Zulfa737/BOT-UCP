const { AutocompleteInteraction } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    commandName: 'rating-staff',
    options: {
        public: true
    },
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {AutocompleteInteraction} interaction 
     */
    run: async (client, interaction) => {
            const ratings = ['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐', '⭐', 'None'];
            
            const currentInput = interaction.options.getFocused();
            const filteredratings = ratings.filter(rating => rating.toLowerCase().startsWith(currentInput.toLowerCase()));

            await interaction.respond(filteredratings.map(rating => ({ name: rating, value: rating })));
        }
    };
