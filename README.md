# Gilded Rose

## Approach

- Cloned and stripped out the original repo
- Made a list from the requirements of things that MUST work:
  - items have a SellIn value which shows the number of days left to sell the items
  - items have a Quality value which shows the value of the items
  - end of each day system lowers both values for every item
  - quality degrades twice as fast once the sell by date has passed
  - quality of an item is never negative
  - "Aged Brie" increases in Quality the older it gets
  - the Quality of an item is never more than 50
  - "Sulfuras", is a legendary item so never has to be sold or decreases in Quality
  - "Backstage passes", increases in Quality as its SellIn value approaches
  - quality increases by 2 when there are 10 days or less
  - quality increases by 3 when there are 5 days or less
  - quality drops to 0 after the concert
  - "Sulfuras" is a legendary item and its Quality is 80 and it never alters

- Write empty tests for the requirements without code, just the text of the requirements
- Write the code that will make the tests pass
- Refactor the code but do not alter the items class or property
- Add a new feature 'conjured items' for a new category of items to the system

## My Notes

The idea here is that things lower in quality the more they age which is not correct as different types of items age differently.

Create some sort of dictionary to check the rules for each item so I can conduct a search or look-up and then age the item accordingly when I run updateQuality().

Refactored the updateQuality() to check if the desired result is achieved.

- Items[i] could be saved as ‘const item = items[i]
- Lots of ‘!=’ should be ‘!==’ in the source code
- Source code is difficult to read
- Will need lots of conditions to maintain this code
- ‘Sellin_value’ for ‘Sulfuras’ wasn’t supposed to change according to the rules but is listed with a ‘-1’ (think this is a bug).
- Also created a populate() function which I can use to test against a set of dummy data that matches what is required. This is to also show that there are no issues when running tests with using mock data.

## Guidance Notes

- Clone or fork this repo, and do this exercise in any of the available languages that you are most comfortable using.
- There is no time limit to this exercise, but try to time box it for yourself to avoid spending an inordinate amount of effort on it.
- A history of git commits will be very helpful when we go on to discuss the exercise.
- This exercise is about sparking a conversation, not about the "best" technical implementation.

## Additional notes for Junior developers

- You are not required to finish this exercise.
- Your approach to the problem is more interesting to us than a solution.
- This is mostly a refactoring exercise - you do not need to have any reverence for the current implementation!

## Requirements Specification

Hi and welcome to team Gilded Rose.

As you know, we are a small inn with a prime location in a prominent city ran by a friendly innkeeper named Allison. We also buy and sell only the finest goods. Unfortunately, our goods are constantly degrading in quality as they approach their sell by date. We have a system in place that updates our inventory for us. It was developed by a no-nonsense type named Leeroy, who has moved on to new adventures. Your task is to add the new feature to our system so that we can begin selling a new category of items. First an introduction to our system:

- All items have a SellIn value which denotes the number of days we have to sell the item
- All items have a Quality value which denotes how valuable the item is
- At the end of each day our system lowers both values for every item

Pretty simple, right? Well this is where it gets interesting:

- Once the sell by date has passed, Quality degrades twice as fast
- The Quality of an item is never negative
- "Aged Brie" actually increases in Quality the older it gets
- The Quality of an item is never more than 50
- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
- Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
- Quality drops to 0 after the concert

We have recently signed a supplier of conjured items. This requires an update to our system:

`"Conjured" items degrade in Quality twice as fast as normal items`

Feel free to make any changes to the UpdateQuality method and add any new code as long as everything still works correctly. However __do not alter the Item class or Items property as those belong to the goblin in the corner who will insta-rage and one-shot you as he doesn't believe in shared code ownership__ (you can make the UpdateQuality method and Items property static if you like, we'll cover for you).

Just for clarification, an item can never have its Quality increase above 50, however "Sulfuras" is a legendary item and as such its Quality is 80 and it never alters.
