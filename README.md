# minesweeper

## Functionality and Features
● Show the board
● Left-click reveals the cell’s content
o The cell may contain a mine (bomb)
o Or it can be a safe cell
● Right-click flags/unflags a (suspected) cell

● Game ends when:
o Clicking a mine - all the mines are revealed (User lost)
o All the mines are flagged, and all the other cells are
revealed (User's victory)
● When left-clicking on a cell, reveal it and then:
o Cell with a mine – reveal all the mines and end the game
o Cell that has some neighbors that are mines – show the
number of mines
o Cell that has no mines in his neighbors – also expand to
reveal it's 1st degree neighbors
● Support 3 levels of the game
o Beginner (4 * 4 with 2 MINES)
o Medium (8 * 8 with 14 MINES)
o Expert (12 * 12 with 32 MINES)

Holds the current game state:
isOn: true when game is on
revealedCount: How many cells are
revealed
markedCount: How many cells are
marked (with a flag)
secsPassed: How many seconds passed
First click is never a Mine
The first clicked cell is never a mine

## Lives
Add support for “LIVES” -
The user has 3 LIVES:
When a MINE is clicked:
• Show an indication to the user that he clicked a mine
• The LIVES counter decreases
• The cell is being unrevealed
• The user can mark it and continue playing

The Smiley button
Add the smiley button - clicking the smiley resets the game
here are some smiley states:
● Normal 😃
● Sad & Dead – LOSE 🤯 (stepped on a mine and have
no life left)
● Sunglasses – WIN 😎

### Support for HINTS
The user has 3 hints
When a hint is clicked, it changes its look, example:
Now, when an unrevealed cell is clicked, the cell and its
neighbors are revealed for 1.5 seconds, and the clicked hint
disappears.
### Best Score
Keep the best score in local storage (per level) and show it on
the page
### Full Expand
When a cell that has no mines in his neighbors is clicked –
reveal the cell and also expand to all it's neighbors in a
recursive way.
Here is an example:
Think about a recursion.

## More features to add
### Safe click
The user has 3 Safe-Clicks:
Clicking the Safe-Click button will mark a random (unrevealed)
safe cell (for 1.5 seconds) so the user knows that he can safely
click that cell.
Coding Academy©

### Undo
Add an “UNDO” button, so the user can undo (some of) his
moves
### Manually positioned mines
Create a “manually create” mode in which the user first
positions the mines (by clicking cells) and then plays.
### MEGA HINT
Mega-Hint works only once every game. It is used to reveal an
area of the board for 2 seconds. Functionality description: (1)
Click the “Mega Hint” button (2) then click the area’s top-left
cell (3) then click bottom-right cell. The whole area will be
revealed for 2 seconds.

### MINE EXTERMINATOR
Clicking the “Exterminator” button, eliminate 3 of the existing
mines, randomly. These mines will disappear from the board.
Re-calculation of neighbors-count is needed
אזהרה–הפרויקטהזה ייקח אותךרחוק משחשבת
