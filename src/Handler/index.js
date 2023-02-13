const { glob } = require('glob');
const { promisify } = require('util');
const chalk = require('chalk');

const globPromise = promisify(glob);

module.exports = async client => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/src/Commands/**/*.js`);
    const formatString = str => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
    commandFiles.map(value => {
        const file = require(value);
        const splitted = value.split('/');
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
        if (file.aliases && Array.isArray(file.aliases)) {
            file.aliases.forEach(alias => client.aliases.set(alias, file.name));
        }
        console.log(chalk.grey.bold('[DEBUG]'), chalk.white(`Loaded module ${formatString(file.name)}`));
    });

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/src/Events/*.js`);
    eventFiles.map(value => require(value));

    // Slash Commands
    const slashCommands = await globPromise(`${process.cwd()}/src/Slash/*/*.js`);
    const arrayOfSlashCommands = [];

    slashCommands.map(value => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (['MESSAGE', 'USER'].includes(file.type)) delete file.description;
        if (file.userPermissions) file.defaultPermission = false;
        arrayOfSlashCommands.push(file);
    });

    client.on('ready', async () => {
        try {
            await client.application.commands.set(arrayOfSlashCommands);
        } catch (err) {
            console.log(err);
        }
    });
};
