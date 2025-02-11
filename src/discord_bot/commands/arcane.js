const { SlashCommandBuilder } = require("@discordjs/builders");

const { makeid } = require("../utils/utils");
const { postRequestMore } = require("../utils/request");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("arcane")
        .setDescription("Repliddd!")
        .addSubcommand(subcommand =>
            subcommand
                .setName('streamer')
                .setDescription('Info about a user')
                .addStringOption((option) => {
                    return option
                        .setName("input")
                        .setDescription("The user's avatar to show")
                        .setRequired(true);
                })
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('url')
                .setDescription('Info about the server')
                .addStringOption((option) => {
                    return option
                        .setName("input")
                        .setDescription("The user's avatar to show")
                        .setRequired(true);
                })
        ),
    async execute(client, interaction) {
        const filename = `${makeid(5)}.jpg`;
        let url = interaction.options.getString("input");
        console.log(interaction.options.getSubcommand())
        if (interaction.options.getSubcommand() === 'streamer') {
            url = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${url}.jpg`;
        }

        const target_url = "/ai/arcane",
            target_args = {
                url,
                filename,
            },
            target_msg = [
                `Processing: ${filename} - style=arcane`,
                `Check: ${process.env.BASE_URL}${target_url}/${filename}`,
            ];
        await interaction.deferReply();
        postRequestMore(
            client,
            interaction,
            target_url,
            target_args,
            target_msg,
            function (data) {
                return interaction.editReply({
                    content: data,
                    ephemeral: true,
                });
            }
        );
    },
};
