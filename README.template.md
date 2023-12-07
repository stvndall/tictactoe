# tic tac toe

## **Note**
I have made a restructuring change since the official assessment handover. This is because I didn't like having so much on the same Layer. 
The official commit at the point of handover is `assessmentsumbitted` -> `git checkout assessmentsumbitted`

*Normally I would upload the PDF, but this will be a public repo, and I don't want to give away the question, or requirement*

## Scope
1. Single player game on ember js
2. Multiplayer, limited implementation using ruby
3. Multiplayer using websockets - Serious stretch goal

## Approach

Beacuse I still don't know ember and rails, I will not start off with testing, and rather looking for feedback in the API / output. Once I understand more about the frameworks I will retrospectively add more tests


## What I would want to do with more time

1. More unit test coverage - I like testing as I'm going - but this is POC land
2. Better Error handling
3. Better logging - Both what is being logged, and the logging sinks
4. Update the data schema
5. Convert to web sockets (Action Cabels in rails I think)

  
## Documentation

### Create a new game

```mermaid
sequenceDiagram
    participant Website 
    participant API
    participant DB
    Website->>API:Create new game
    API->>DB:Create new game
    DB-->>API:Created record containing ID
    API-->>Website: Created record
    Website-->Website: Navigate to game screen
```

### Join an Existing Game

```mermaid
sequenceDiagram
    participant Website 
    participant API
    participant DB
    Website->>API:Join game
    API->>DB: Fetch Game
    DB-->>API: Game
    alt Game PlayerO is already set
        API-->>Website: ERROR
    else
        API->>DB:Update PlayerO with given Details
        API-->>Website: Return Successful record update
        Website-->Website: Navigate to game screen
    end
```

### Game loop

```mermaid
sequenceDiagram
    participant Website 
    participant API
    participant DB
    loop Until Game is over
    Website->>API: Get Current State of game
    Website-->Website:Update game state to match received
        alt Players turn
            Website->>API:Claim Piece of baord
            API-->DB:Fetch game
            activate API
            DB-->>API:Game
            alt Cell is already claimed
                API-->>Website:ERROR
            else 
                API-->>API:Determine if winner yet
                alt if no winner
                    API-->>API:Determine if draw
                end
                API->>DB: Save updated Record
                API-->>Website: Successfully updated payload
                Website-->Website: Update Board accordingly
            deactivate API
            end
        end
    end 
```

## Thoughts

### Night 1
Took me a good few hours to get my head around tracking of ember objects. 
Although I should have realised earlier that the proxy implementation they are using is very basic, likely for speed purposes.

*Created basic Single player experience on emberjs.*
Nothing fancy, no good shiny front end, still just learning the framework.

I understand what the tests are looking for, but with my 4 hours of experience with ember, I don't know if I quite know how to best setup my components for testing. 


### Night 2
the ruby server was pretty simple to put together, granted it's not doing much.
emberjs docs are hit and miss. Some of the docs are great, and understandable, while others require you to know ember to understand what is being explained. 

*Created basic run through of client / server game where 2 browsers can play at the same time*

I have still not gone back to the tests, because my basic architecture and design have morphed the more I understand the tools

### Night 3 && 4
I got caught in the reeds a little with looking into more ways to handle activities, like API calls, logging, decent code breakout. All of which I found some great options, however not reasonable to complete within the timeframe. All things I can use if I am to use the stack going forward

I am fairly certain in my very few hours I have worked with these tools, my code is both messy and falls into many anti patterns I'm not aware of yet.
