# MCDC BDS
A Minecraft-to-Discord chat bridge, designed for servers.

Minecraft Version 1.19.0+

> <span style="color:red;">**WARNING:**</span> This pack does not work on *Local Worlds* or *Realms*.

This pack runs by making HTTP `POST` and `GET` requests to a medium server, designed for local use. The server then processes the request and with sends data to Discord (POST, MC-DC), or sends data back to the request (GET, DC-MC). For more information, see [How it Works](#how-it-works).

## Usage
This usage specifically targets a local host as the medium, however adapting to a provider follows a similar path, as long as file access is granted.

> <span style="color:red;">**WARNING:**</span> This pack makes network requests. Do not use this unless you know what you're doing. Make sure you've verified the safety of all the code involved.

### Setup the Add-on
1. [Download](https://github.com/cda94581/expert-spoon/releases/tag/add-ons.mcdc-bds) the latest release of *MCDC* for the target Minecraft version
2. Unzip the downloaded file
3. Navigate to `BP/scripts/index.js`. You may need to modify Line 3 if you have port conflicts or plan to host the medium remotely:
```js
const host = 'http://DOMAIN:PORT';
```
4. Save and close the file
5. Copy the behavior pack (`BP`) to the Minecraft behavior packs folder. Optionally, rename the pack folder
	- Minecraft: `%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\behavior_packs`
	- Minecraft Preview: `%localappdata%\Packages\.MinecraftWindowsBeta_8wekyb3d8bbwe\LocalState\games\com.mojang\behavior_packs`

### Setup the Minecraft Server
1. Open [Minecraft](minecraft://) on the target version
2. Create a New World or open the designated server world
3. Enable the *GameTest Framework* experimental toggle
4. Apply the **MCDC For BDS** pack
5. Save the world
	- I'm not talking about being a hero
	- I mean, if you really want to save Earth, go ahead
	- Actually, that might be a better idea than playing Minecraft, if you are able to
	- If you want to save the world, stop reading this and go do it
	- Seriously, stop
	- I mean it
	- Your wasting you're time
	- You can enjoy that your/you're typo
	- Leaving it here is painful
	- Okay actually stop reading and go save the world now
6. [Download](https://www.minecraft.net/en-us/download/server/bedrock) the Minecraft BDS software for the target version
7. Unzip the server software and configure the different settings like you would with any server
8. Copy the behavior pack (`BP`) to the `behavior_packs` folder of the server. Again, optionally rename the folder
9. Locate the world folder and copy that into the `worlds` folder of the server
	- The world folder is located within the `minecraftWorlds` folder of the `com.mojang` folder (path mentioned above)
	- The folder names are random, so to find the proper world, find the folder that contains a `levelname.txt` file with the desired world name
	- The folder name needs to be renamed to match the `LevelName` property in `server.properties`
10. Remove the MCDC behavior pack located in the world's `behavior_pack` folder
	- This is *not* the server's `behavior_pack` folder, they're two different things
11. Navigate to the `config/default/permissions.json` file and make sure "mojang-minecraft" and "mojang-net" are enabled

### Setup the Medium Server
1. The latest release of *MCDC* should already be installed after the [Setup the Add-on](#setup-the-add-on) section. If not, install it and unzip the file
2. If it isn't already installed, install the latest LTS version of [NodeJS](https://nodejs.org/en/download/). Make sure `NPM` gets installed
3. Navigate to the `bot` folder
4. In the command prompt (or terminal), run `npm i` in the `bot` folder to install all the necessary packages (discord.js)
5. Go to the [Discord Developer Portal](https://discord.com/developers) and setup/invite a bot to your server
	- There are plenty of guides on Google to get started
6. Go to the channel in which to send messages (MC-DC) in and create a webhook
7. Get the ID of the channel in which to listen for messages (DC-MC)
8. Open the `config.json` file within the `bot` folder and modify the values accordingly. Take note of the quotations
	- The bot will listen for messages in the `channel` channel. This is the channel ID, not the channel name
	- `token` is the token of the bot created in step 5. Again, there are guides on the web to get starte
	- `webhookID` and `webhookToken` refers to the webhook created in step 6. The syntax of the URL of the webhook is `https://discord.com/api/webhooks/{webhookID}/{webhookToken}`
	- `port` refers to the port of the medium server. Should be something unique that isn't reserved for something else. This matches with the port specified in step 3 of [Setup the Add-on](#setup-the-add-on)
9. Open the `GTID.json` file to map Gamertags to Discord IDs, as shown below. This is to assign an avatar to MC-DC messages. Works best on servers with a whitelist. Take note of the quotations
```json
"GAMERTAG": "DISCORDID",
"cda94581": "##################"
```

### Run Everything
1. Navigate to the `bot` folder and run `npm run start` or `node .` in the command prompt or terminal
	- If the BDS has not been fully setup yet, `npm run test-send` and `npm run test-fetch` can be run to ensure that sending messages to Discord and getting messages from Discord both work
	- These files can be modified as needed to test different names/etc
2. Start the Bedrock Server
3. Enjoy!

- To stop the Bedrock Server or the Medium Server, simply input `Ctrl + C` in the command prompt or terminal
- The Medium Server needs to be constantly running to ensure proper function. Consider using Ubuntu and its [`screen`](https://linuxize.com/post/how-to-use-linux-screen/) command to push both the Bedrock Server and the Medium Server to a background task

## How it Works
This section explains the concept of the Minecraft-to-Discord chat bridge.

With Minecraft 1.19.0+, two new GameTest modules were added: `mojang-net` and `mojang-minecraft-server-admin`.  
`mojang-net` finally enables servers to communicate with the web. Due to security reasons, this is currently limited to only BDS as server admins are more likely to understand these reasons before adding it onto their servers. *This is why* MCDC *cannot be run in a singleplayer world or a realm.*

`mojang-net` unlocks HTTP requests to a web server somewhere in the world. Utilizing just a `POST` request, `mojang-net` could in theory send data to a Discord webhook and completely bypass the medium server, however a medium server was implemented for two main reasons:
- Getting the avatar
	- This *can* be done with a variable map that maps all Xbox gamertags with a avatar URL, but this inhibits the ability to dynamically change as a user changes their avatar, may result in 404 errors if an avatar is changed, and is overall messy
- Enabling MC chats to read from DC

As stated in many places, HTTP stands for Hyper-Text Transfer Protocol. This protocol allows for data to be quickly transferred from one location to another. This can be in the form of a webpage, or it can be something much closer to a backend server.

Different HTTP methods can be used to perform different tasks. *MCDC* relies on two main types of HTTP request methods: `POST` and `GET`. The `POST` method requests to send data to an HTTP server, while the `GET` method only serves to receive data.

The *Medium Server* serves to receive data to process from an HTTP request, as well as running a Discord bot to get additional data. Hooking these two processes together allows for seamless communication to Discord, whilst also connecting it to the web.

The GameTest add-on listens to a message being sent (`ChatEvent`). Upon receiving such a message, an HTTP POST request is made to the medium server. Within this request contains a **body**. This provides the server with the data in which the server will then parse.  
The GameTest sends the sender's gamertag and the content of the message. The medium server receives this data, and with the user's gamertag, gets its ID from an already predetermined configuration.  
The medium server then uses the Discord bot to look for this member and get its avatar. This also has a safe fallback system in case the avatar cannot be found. This is much cleaner than a map in a GameTest.  
Finally, the medium server uses the Discord webhook to send a message with an avatar and username, pushing that message to a Discord channel.

Meanwhile, the Discord bot that's being run by the medium server is listening to messages sent in Discord. Upon receiving a message, it ensures it passes the checks of proper channel, a message that has content (not just an image or something), and isn't a message that was already sent by itself.  
Passing these checks, the relevant data is pushed to a variable. The data includes the user's display name, full username and discriminator, and the message content.  
Every second in the GameTest (`TickEvent`, can also be manually changed), an HTTP GET request is made to the medium server. This asks the server the variable that the data is contained in. If there is no data, the medium informs the GameTest of that. Otherwise, it sends the data to the GameTest and deletes the data within the variable, allowing for new messages to be received.  
Doing so, the GameTest uses that data to send a message and successfully links Discord with Minecraft.

## Metadata
**Author:** [cda94581](https://github.com/cda94581)  
**License:** [MIT](https://github.com/cda94581/expert-spoon/blob/main/LICENSE)