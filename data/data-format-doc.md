# The structure of the data format for SpreadSheets
This document aims to describe the data format and table layout expected from data to be loaded as cards.

## Known limitations
The current implementation has a few limitations which are as follows:
* The data can only describe cards
* The data needs to be clean and properly structured in order to not break the build
* The initial state needs to be described in code
* The image database needs to be described in code

These limitations are in no way impossible to fix but they have currently not been prioritized due to time constraints.

## A card sheet
This sections describes the column names used by the loader. The headers ar annotated with their respective type as follows `<header> -> <string>`. For example `Card Name -> ID` 

* Card Name -> ID
* Card Type -> Text
* Character -> CharacterID
* Text of card -> Text
* Swipe Left Text -> Text
* Swipe Right Text -> Text
* Left Effect -> Effect
* Right Effect -> Effect
* Left Step -> ID
* Right Step -> ID
* Image Desc -> Text
* Location -> Text
* Title -> Text
* Weight -> Number
* When -> WorldQueries

### WorldQueries Type
A world query describes a state space, of the game, in which a card is available in the card stack. All the requirements specified in a world query needs to be satisfied in order for the card to be available. Multiple world queries are used to make cards available in separate state spaces. For `numbers` a world query uses a range selector and for `booleans` exact matches are allowed.

#### Syntax
All content in the `WorldQueries` type is to be considered case insensitive.

A world query is described by a number of state selections separated by `,`. A state selection is written as `<variable>=<value-range>` where `<variable>` is the name of a variable and `<value-range>` can be a `boolean` or a `number range`. A `number range` is written as `<x>-<y>`, where `<x>`, `<y>` are numbers and `<x>` is less than or equal to `<y>`. Multiple world queries are separated by `;`. A `boolean` is either `true` or `false`

The example `a=1-5, b=0-100, c=true; d=false, e=10-10` will be evaluated as follows:
```yaml
- state:
    a: [1, 5]
    b: [0, 100]
  flags:
    c: true
- state:
    e: [10, 10]
  flags:
    d: false
``` 

### Effect Type
An effect is described by one or more operations. There are three types of operations, `replace`, `set` and `add`. The `replace` operation resets the game to the initial game state (the state from which the game was started) and applies a `set` operation with the specified variables. A `set` operation sets a variable in the game state to a specified value. Finally an `add` operation adds a value to a variable.

`Note`: The `set` and `replace` operations support `numbers` and `booleans` while `add` only supports `numbers`.

#### Syntax
All content in the `Effect` type is to be considered case insensitive.

In a cell operations are separated by `;` and an operation can be described as `<variable>(-|+|=|==)<value>`. Where `<variable>` should be replaced by the name of a variable, `<value>` should be a `number` or a `boolean`. The operators `-` and `+` will create an `add` operation with a negative and positive value respectively. While the operator `=` and `==` represent `set` and `replace` respectively.

#### Evaluation
The evaluation of an expression is made in a very specific order. The order of the operations in a cell is not relevant to the outcome. All operations are evaluated in the order `replace` then `set` and finally `add`. Operations of the same type are grouped and applied together.

The example `a=1; b==2; c+3; d-4` will be evaluated as follows:
```yaml
- type: replace
  state:
    b: 2
- type: set
  state:
    a: 1
- type: add
  state:
    c: 3
    d: -4
```

### CharacterID Type
A value of type `CharacterID` is not parsed at all but it is expected that you use a value already specified within the image database located in the script which loads the data. Refer to you specific scenario in order to know which values to use.

### ID Type
A value of type `ID` is always parsed into lower case letters and thus any usage of it may be considered case insensitive.

Ex. `My Cool ID` is parsed as `my cool id`.

### Text Type
Text is more or less used as is.