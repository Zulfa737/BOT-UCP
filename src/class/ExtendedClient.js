const { Client, Partials, Collection, GatewayIntentBits } = require("discord.js");
const config = require('../../config');
const commands = require("../handlers/commands");
const events = require("../handlers/events");
const deploy = require("../handlers/deploy");
const components = require("../handlers/components");

module.exports = class extends Client {
    collection = {
        interactioncommands: new Collection(),
        prefixcommands: new Collection(),
        aliases: new Collection(),
        components: {
            buttons: new Collection(),
            selects: new Collection(),
            modals: new Collection(),
            autocomplete: new Collection()
        }
    };
    applicationcommandsArray = [];

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildPresences,,
                GatewayIntentBits.MessageContent,,
                
            ],
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.Message,
                Partials.Reaction,
                Partials.User,
                Partials.ThreadMember,
            ]
        });
    };

    start = async () => {
        commands(this);
        events(this);
        components(this);

        await this.login(config.client.token);

        if (config.handler.deploy) deploy(this, config);
    };
};