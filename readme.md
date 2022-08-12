# OpenBot
## About:
OpenBot is a project I started in order to pracice and learn about discord bots. It has no end goal or thing that it specializes in, but it is a platform for myself and others to add to (hence, "Open").
## File Structure:
<pre>
📦OpenBot
 ┣ 📂src
 ┃ ┣ 📂commands
 ┃ ┃ ┣ 📂fun
 ┃ ┃ ┃ ┗ 📜inspirobot.js
 ┃ ┃ ┗ 📂tools
 ┃ ┃ ┃ ┣ 📜button.js
 ┃ ┃ ┃ ┣ 📜embed.js
 ┃ ┃ ┃ ┣ 📜invite.js
 ┃ ┃ ┃ ┗ 📜ping.js
 ┃ ┣ 📂components
 ┃ ┃ ┗ 📂buttons
 ┃ ┃ ┃ ┗ 📜twitchPage.js
 ┃ ┣ 📂events
 ┃ ┃ ┗ 📂client
 ┃ ┃ ┃ ┣ 📜interactionCreate.js
 ┃ ┃ ┃ ┣ 📜message.js
 ┃ ┃ ┃ ┗ 📜ready.js
 ┃ ┣ 📂functions
 ┃ ┃ ┗ 📂handlers
 ┃ ┃ ┃ ┣ 📜handleCommands.js
 ┃ ┃ ┃ ┣ 📜handleComponents.js
 ┃ ┃ ┃ ┗ 📜handleEvents.js
 ┃ ┗ 📜bot.js
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜readme.md
</pre>
## TODO:
- [x] Respond to both slash commands and normal messages
- [ ] List people in voice channel
- [ ] Connect to OBS