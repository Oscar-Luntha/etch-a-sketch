# Etch-A-Sketch

A simple grid-based puzzle game where the player recreates a given shaded pattern. One grid is pre-generated; the other is painted by the user. The goal is to match both grids exactly.

## Features

### Tile Painting Modes

Players can choose how they want to paint:

* **Mouse-over mode** – paint tiles by hovering over them.
* **Click mode** – paint tiles manually by clicking.

### Level System

The game currently includes **five levels**, with difficulty ranging from:

* Easy
* Medium
* Hard
* Extreme
* Insane

Each level increases grid complexity, shading density, and precision required.

## How It Works

The game renders **two grid areas**:

1. **Reference Grid**
   A pre-computed, shaded pattern that the player must replicate.

2. **Player Grid**
   An empty grid the player fills using the selected painting mode.

The player completes a level when every cell in the Player Grid matches the corresponding cell in the Reference Grid.
If successful, the player may advance to the next level or replay the current one.

## Gameplay Loop

1. Select a painting mode.
2. Observe the shaded pattern in the Reference Grid.
3. Paint the Player Grid to match it exactly.
4. When all cells match, the level is marked as complete.
5. Continue to the next difficulty or retry.

## Future Goals

* Timer-based challenges
* Scoring system based on accuracy and speed
* Custom level creation
* Color modes instead of binary shading
* Well just over engineer it until we learn something goood 
---
