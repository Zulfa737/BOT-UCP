const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    ChannelType
} = require("discord.js");

module.exports = {
    structure: new SlashCommandBuilder()
        .setName("poll")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Create a poll and send it to a certain channel.")
        .addStringOption(option =>
            option.setName("question")
                .setDescription("*Provide the question of the poll.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("choice-1")
                .setDescription("*First choice.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("choice-2")
                .setDescription("*Second choice.")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("The channel to send the poll to.")
                .setRequired(false)
                .addChannelTypes(ChannelType.GuildText)
        )
        .setDMPermission(false) // Prevents the command from being executable in bot DMs.
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels), // Edit this permission to your liking.
    run: async (client, interaction) => {
        const { options, channel } = interaction;

        // Required options:
        const question = options.getString("question");
        const choiceOne = options.getString("choice-1");
        const choiceTwo = options.getString("choice-2");
        const Channel = options.getChannel("channel") || channel; // If channel option provided, send poll therel. Otherwise send poll in the channel of interaction.

        try {
            // Send the poll embed.
            const message = await Channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("\`📊\` Voting Server!")
                        .setDescription(`**Question:** ${question}`)
                        .addFields(
                            { name: `> ✅ ${choiceOne}`, value: '  ', inline: false },
                            { name: `> ❌ ${choiceTwo}`, value: '  ', inline: false }
                        )
                        .setFooter({
                            text: `Requested by: ${interaction.member.user.tag}`,
                            iconURL: interaction.member.displayAvatarURL({ dynamic: true })
                        })
                        //.setImage('https://media.discordapp.net/attachments/1287019974107467790/1434903428064346265/1762178012931.jpg?ex=690bffb4&is=690aae34&hm=380dffc8c0d9eafa837f1c9587b0581532e6ecf4e80cf16a8ae4a616dba7e6a8&=&format=webp&width=943&height=551')
                        .setTimestamp()
                        //.setColor("Blue")
                ]
            })

            // Add the number reactions to the poll embed.
            await message.react("✅");
            await message.react("❌");

            // Send the success embed.
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        //.setColor("Green")
                        .setDescription(
                            `:white_check_mark: | Successfully sent the poll embed in the channel: <#${channel.id}>`
                        )
                        .addFields(
                            { name: "\`❓\` Question", value: `${question}`, inline: true },
                            { name: "\`✅\` Choice 1", value: `${choiceOne}`, inline: true },
                            { name: "\`❌\` Choice 2", value: `${choiceTwo}`, inline: true },
                        )
                ],
                ephemeral: true
            })
        } catch (err) { // Catch for an error.
            console.log(err);
            return await interaction.reply({ // Send an error embed.
                embeds: [
                    new EmbedBuilder()
                        //.setColor("Yellow")
                        .setDescription(
                            `:warning: | Something went wrong. Please try again later.`
                        )
                ],
                ephemeral: true
            })
        }
    }
}