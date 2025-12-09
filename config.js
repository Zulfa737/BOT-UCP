module.exports = {
    client: {
        token: "MTAwNDczODExODcxNDQwMDc2OQ.G_tBaX.fHk7RM3Q7uNsjrXXQPJjb_vm16GIvTSmU8VmW0", //id token discord
        id: "1004738118714400769", //id bot discord
        guild: "1444311082331275397", //id guild server
    },
    ticket: {
        categoryid: "1444311084025516188", // Id Category Untuk Tempat Create ticket
        logticket: "1444944898829848646", //Id Chennel Untuk Log Ticket
    },
    mysql: {
        host: "node.arneticcloud.my.id", //your ip database no port!!!
        user: "u21_CcRgEjfUzK", //your username database
        password: "yfadZ9fBxKfCgugxy=U+qexx", //your password database
        database: "s21_server", //your name databasew
    },
    github: {
    	username: "", // Username Github Kamu
    	token: "", // Tokens Github Kamu
    },
    backup: {
        folder: './backups',
        schedule: '0 1 * * *' // Setiap jam 1 pagi
    },
    handler: {
        prefix: "!",
        deploy: true,
        commands: {
            prefix: true,
            slash: true,
            user: true,
            message: true,
        }
    },
    users: {
        developers: "822282148060725279",
        ownerId: "822282148060725279"
    },
    development: {
        enabled: false,
        guild: "1444311082331275397",
    },
    messageSettings: {
        ownerMessage: "The bot developer has sole permission to use this command.",
        developerMessage: "You are not authorized to use this command.",
        cooldownMessage: "Slow down, friend! You are too fast to use this command ({cooldown}s).",
        globalCooldownMessage: "Slow down, friend! This command is on global cooldown ({cooldown}s).",
        notHasPermissionMessage: "You do not have permission to use this command.",
        notHasPermissionComponent: "You do not have permission to use this component.",
        missingDevIDsMessage: "This is a developer specific command, but it cannot be executed because the user ID is not in the configuration file."
    }
};
