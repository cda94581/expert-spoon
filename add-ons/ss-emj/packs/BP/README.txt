Silent Syndicate Emoji Pack [BP]
Emojis up-to-date as of February 20, 2022
Best Supported by Minecraft 1.18.10
Version 2022.2.22
---
The Silent Syndicate Emoji Pack adds custom emojis from the Silent Syndicate Discord Server (discord.gg/silentwisperer).

NOTE
Additional information about how the emojis are registered into the game can be found in the resource pack's README.txt file.
The chat replacement works for CHAT ONLY. It will NOT replace text on signs, named items, commands, etc. That stuff is only supported by the resource pack, and you should refer to its README.txt file for more information.
Unlike the resource pack, this pack uses features in active development and locked within experimental toggles. This version WILL BREAK in Minecraft 1.18.10, and will need to be updated accordingly.

HOW IT WORKS
GameTests are awesome. They are JavaScript scripts that can be used to test things quickly, or have been used for gameplay. Typically, gameplay is acheived by "subscribing" to an "event", and running JavaScript in response.
Silent Syndicate Emoji Pack uses GameTests to subscribe to the "BeforeChat" event, which fires before a message is sent. Here, the message can be edited as needed. Using a simple Regular Expression "replace" method, the message's contents replace emoji texts (:FrogThink:) that are mapped, with their proper unicode form.

USAGE
Apply the behavior pack and enable "GameTest Framework" in the experimental settings of the world options.
Sending messages matching the format :emoji_name: will be replaced with the proper emoji. This does NOT work with signs, anvil naming, commands, or anything that isn't purely sending chat messages.
A list of emoji names can be found in the resource pack's README.txt file.