# Equipment Management
v1.20.0

Directly manage and enchant equipment items, allow for easier enchanting of "offhand" items, armor, and armor stand items!

> **THIS PACK DOES NOT PROVIDE FUNCTION TO THE OFFHAND.**  
For function, consider FoxyNoTail's [Off Hand Add-on](https://foxynotail.com/add-ons/off-hand).

## Installation
1. Download the add-on from the [releases section](https://github.com/cda94581/expert-spoon/releases/tag/add-ons.equipment-management) and import it into Minecraft.
2. Using a new or existing world, enable "Equipment Management" in the Behavior Packs tab.
3. Ensure the "Beta APIs" is enabled in the experimental settings section.

## Usage
All management commands are triggered through the `/scriptevent` command. Each command is prefixed with the namespace, `equipment`. See [Commands](#commands) for information on each command and a descripton.

The `<X> <Y> <Z>` parameters are coordinates. This script will find the armor stand that is closest to that location as its selection.

Two UI commands are provided to reduce confusion. They are accessed with the `/scriptevent equipment:p_ui` and `/scriptevent equipment:as_ui` commands.

*p* and *as* refer to players and armor stands, respectively.

### Warning
This script uses the experimental Beta Script APIs. They are under heavy development and break often between versions. I make no guarantee that this will be maintained over time.

If needed, consider [contacting me](https://cda94581.github.io/about.html#links) if it is necessary for the pack to be updated.

## Commands
Preface all commands with the `/scriptevent` command.

- Plain text is **required** to be typed out, as is.  
- Items surrounded in angled brackets `<>` are **required** variables.
- Items surrounded in square brackets `[]` are **optional** variables.
- Empty brackets `[]` indicate a list.

Examples:
- Giving and enchanting an armor stand at `0, 0, 0` with a Diamond Helmet containing Protection 4 and Unbreaking 3
	- `/scriptevent equipment:as_head_give 0 0 0 diamond_helmet 1 protection:4 unbreaking:3`
- Enchanting an item in the offhand with Mending
	- `/scriptevent equipment:p_offhand mending:1`
	- OR `/scriptevent equipment:p_offhand mending`

<!-- BEGIN COMMAND LIST -->
Command | Usage | Description
--- | --- | ---
`p_legs` | `equipment:p_legs [Enchantment ID]:[Level][]` | Enchants an item in the leggings slot.
`p_legs_give` | `equipment:p_legs_give <Item ID> <Amount> [Enchantment ID]:[Level][]` | Enchants an item in the leggings slot. Gives an item, replacing any current equipment in that slot.
`p_head` | `equipment:p_head [Enchantment ID]:[Level][]` | Enchants an item in the helmet slot.
`p_head_give` | `equipment:p_head_give <Item ID> <Amount> [Enchantment ID]:[Level][]` | Enchants an item in the helmet slot. Gives an item, replacing any current equipment in that slot.
`p_feet` | `equipment:p_feet [Enchantment ID]:[Level][]` | Enchants an item in the boots slot.
`p_feet_give` | `equipment:p_feet_give <Item ID> <Amount> [Enchantment ID]:[Level][]` | Enchants an item in the boots slot. Gives an item, replacing any current equipment in that slot.
`p_chest` | `equipment:p_chest [Enchantment ID]:[Level][]` | Enchants an item in the chestplate slot.
`p_chest_give` | `equipment:p_chest_give <Item ID> <Amount> [Enchantment ID]:[Level][]` | Enchants an item in the chestplate slot. Gives an item, replacing any current equipment in that slot.
`as_legs` | `equipment:as_legs <X> <Y> <Z> [Enchantment ID]:[Level][]` | Enchants an item in the leggings slot. Applies to armor stands.
`as_legs_give` | `equipment:as_legs_give <X> <Y> <Z> <Item ID> <Amount> [Enchantment ID]:[Level][]` | Enchants an item in the leggings slot. Gives an item, replacing any current equipment in that slot. Applies to armor stands.
`as_head` | `equipment:as_head <X> <Y> <Z> [Enchantment ID]:[Level][]` | Enchants an item in the helmet slot. Applies to armor stands.
`as_head_give` | `equipment:as_head_give <X> <Y> <Z> <Item ID> <Amount> [Enchantment ID]:[Level][]` | Enchants an item in the helmet slot. Gives an item, replacing any current equipment in that slot. Applies to armor stands.
`as_feet` | `equipment:as_feet <X> <Y> <Z> [Enchantment ID]:[Level][]` | Enchants an item in the boots slot. Applies to armor stands.
`as_feet_give` | `equipment:as_feet_give <X> <Y> <Z> <Item ID> <Amount> [Enchantment ID]:[Level][]` | Enchants an item in the boots slot. Gives an item, replacing any current equipment in that slot. Applies to armor stands.
`as_chest` | `equipment:as_chest <X> <Y> <Z> [Enchantment ID]:[Level][]` | Enchants an item in the chestplate slot. Applies to armor stands.
`as_chest_give` | `equipment:as_chest_give <X> <Y> <Z> <Item ID> <Amount> [Enchantment ID]:[Level][]` | Enchants an item in the chestplate slot. Gives an item, replacing any current equipment in that slot. Applies to armor stands.
`help` | `equipment:help [command]` | Gets a list of all commands and its usage.
`p_offhand` | `equipment:p_offhand [Enchantment ID]:[Level][]` | Enchants an item in the offhand.
`p_offhand_give` | `equipment:p_offhand_give <Item ID> <Amount> [Enchantment ID]:[Level][]` | Enchants an item in the offhand. Gives an item, replacing any current equipment in that slot.
`as_offhand` | `equipment:as_offhand <X> <Y> <Z> [Enchantment ID]:[Level][]` | Enchants an item in the offhand. Applies to armor stands.
`as_offhand_give` | `equipment:as_offhand_give <X> <Y> <Z> <Item ID> <Amount> [Enchantment ID]:[Level][]` | Enchants an item in the offhand. Gives an item, replacing any current equipment in that slot. Applies to armor stands.
`p_ui` | `equipment:p_ui ` | Enchants an equipment piece. Shows a UI for ease of use.
`as_ui` | `equipment:as_ui ` | Enchants an equipment piece. Shows a UI for ease of use.
<!-- END COMMAND LIST -->

## How it Works
I'm tired of writing a README file that will hardly be read, so here's the brief jist of it:
- There's a bunch of random scripts and functions to reduce code by like 2%, because each command is pretty much the same.

For `_give` commands, a few extra steps are ran first.
1. Get the target (either a player, or an armor stand).
2. Give the target an unenchanted version of their item in the target slot (either the offhand, or a specific armor slot).

The rest process is shared by every command
1. Get the target (either a player, or an armor stand).
2. Get the target's mainhand item and save it to memory.
3. Get the target slot item and copy it to the mainhand.
4. Enchant the mainhand item using the `/enchant` command.
5. Get the mainhand item and move it back to the target slot.
6. Load the saved item back into the mainhand.

The UI commands work by creating a UI, using the inputs, and executing an appropriate command based on responses.

## Contributing
Contributors are welcome! Anyone may fork and make pull requests.

You will need the following in order to properly develop, package, and test the script:
- [Regolith by Bedrock OSS](https://bedrock-oss.github.io/regolith)
- [NodeJS](https://nodejs.org)
- [Git](https://git-scm.com/) (and Github)

### Guidelines
This page is not fleshed out, but here are a few pieces of information you may find useful:
- Do not edit the `commandList.js` or `data/commandMeta.json` files. Filters will populate this as necessary.
- No need to commit the packaged add-on, because that's applied to the releases section.
- The command list on this README page will also automatically update when the `build` profile is run. Do not remove the comments that say `<!-- BEGIN COMMAND LIST -->` and `<!-- END COMMAND LIST -->`.
- Ideally, this pack should remain small, as it is more of a "tool" than an "experience". However, there is a [roadmap](#roadmap) for a few potential ideas that could make the usage more convenient.
- I primarily develop on Linux, so I apologize for any "Windows is annoying" comments that I may have added in frustration.

### Roadmap
- After 1.20.10, take advantage of the expanded dynamic properties limits to "save" UI options.
- Create a settings UI that can help with enabling/disabling certain features, and setting user defaults.
- A more accessible method to update the items of other players.
- Using a custom item/gesture to automatically open a UI for armor stands, to avoid painfully typing coordinates.
- Potentially add language localization as an optional resource pack.
- Add a pack icon lol.

## Credits
**Author:** [cda94581](https://github.com/cda94581)  
**License:** [MIT](https://github.com/cda94581/expert-spoon/blob/main/LICENSE)