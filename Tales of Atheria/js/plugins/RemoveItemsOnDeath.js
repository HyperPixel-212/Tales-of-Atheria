/*:
 * @plugindesc Removes all party items when the player dies (Game Over) and reloads a saved game or continues from a common event.
 * @author karlMiller
 *
 * @help
 * This plugin removes all items (items) from the party
 * when the player gets a Game Over.
 *
 * It works by hooking into the Scene_Gameover class.
 * No plugin commands are required.
 *
 * Just add this plugin to your game to enable it.
 */

(function () {
    const clearInventory = function () {
        const party = $gameParty;

        // Remove all items
        party.items().forEach(item => {
            party.loseItem(item, party.numItems(item));
        });

        console.log("Inventory cleared by plugin command.");
    };

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);

        if (command === "ClearInventoryOnDeath") {
            clearInventory();
        }
    };
})();