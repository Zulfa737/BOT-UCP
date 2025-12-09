const { EmbedBuilder } = require('discord.js');
const chalk = require("chalk");
const axios = require('axios');
const config = require('./config');

/**
 * Logs a message with optional styling.
 *
 * @param {string} string - The message to log.
 * @param {'info' | 'err' | 'warn' | 'done' | undefined} style - The style of the log.
 */
const log = (string, style) => {
  const styles = {
    info: { prefix: chalk.blue("[INFO]"), logFunction: console.log },
    err: { prefix: chalk.red("[ERROR]"), logFunction: console.error },
    warn: { prefix: chalk.yellow("[WARNING]"), logFunction: console.warn },
    done: { prefix: chalk.green("[SUCCESS]"), logFunction: console.log },
  };
  
  const selectedStyle = styles[style] || { logFunction: console.log };
  selectedStyle.logFunction(`${selectedStyle.prefix || ""} ${string}`);
};

/**
 * Formats a timestamp.
 *
 * @param {number} time - The timestamp in milliseconds.
 * @param {import('discord.js').TimestampStylesString} style - The timestamp style.
 * @returns {string} - The formatted timestamp.
 */
const time = (time, style) => {
  return `<t:${Math.floor(time / 1000)}${style ? `:${style}` : ""}>`;
};

/**
 * Whenever a string is a valid snowflake (for Discord).

 * @param {string} id 
 * @returns {boolean}
 */
const isSnowflake = (id) => {
  return /^\d+$/.test(id);
};

/**
 * Whenever a string is a valid IntSucces (for Discord).

 * @param {string} id 
 * @returns {boolean}
 */
 const IntSucces = async(interaction, args) => {
    const msgEmbed = new EmbedBuilder()
    .setDescription(args)
    .setColor('#5CDFA1')
    //.setImage('https://media.discordapp.net/attachments/1287019974107467790/1434903428064346265/1762178012931.jpg?ex=690bffb4&is=690aae34&hm=380dffc8c0d9eafa837f1c9587b0581532e6ecf4e80cf16a8ae4a616dba7e6a8&=&format=webp&width=943&height=551')
    return interaction.reply({ embeds: [msgEmbed], ephemeral: true })
}

/**
 * Whenever a string is a valid IntError (for Discord).

 * @param {string} id 
 * @returns {boolean}
 */
const MsgReply = async(interaction, args) => {
    const msgEmbed = new EmbedBuilder()
    .setDescription(args)
    //.setImage('https://media.discordapp.net/attachments/1287019974107467790/1434903428064346265/1762178012931.jpg?ex=690bffb4&is=690aae34&hm=380dffc8c0d9eafa837f1c9587b0581532e6ecf4e80cf16a8ae4a616dba7e6a8&=&format=webp&width=943&height=551')
    return interaction.reply({ embeds: [msgEmbed], ephemeral: true })
}

/**
 * Whenever a string is a valid IntError (for Discord).

 * @param {string} id 
 * @returns {boolean}
 */
const IntError = async(interaction, args) => {
    const msgEmbed = new EmbedBuilder()
    .setDescription(args)
    .setColor('#5CDFA1')
    //.setImage('https://media.discordapp.net/attachments/1287019974107467790/1434903428064346265/1762178012931.jpg?ex=690bffb4&is=690aae34&hm=380dffc8c0d9eafa837f1c9587b0581532e6ecf4e80cf16a8ae4a616dba7e6a8&=&format=webp&width=943&height=551')
    return interaction.reply({ embeds: [msgEmbed], ephemeral: true })
}

/**
 * Whenever a string is a valid IntUsage (for Discord).

 * @param {string} id 
 * @returns {boolean}
 */
const IntUsage = async(interaction, args) => {
    const msgEmbed = new EmbedBuilder() 
    .setDescription(args)
    .setColor('Yellow')
    return interaction.reply({ embeds: [msgEmbed], ephemeral: true })
}

module.exports = {
  log,
  time,
  isSnowflake,
  IntSucces,
  IntError,
  IntUsage,
  MsgReply
  
};
