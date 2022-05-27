use std::error::Error;

use poem_openapi::Object;
use serde::{Deserialize, Serialize};
use sqlx::{Postgres, Transaction};
use underworld_core::{
    actions::{action::Action, MovePlayerItem, UseItemOnPlayer},
    components::items::location_tag::LocationTag,
    game::Game,
};

use crate::{
    actions::{game_actions, PerformAction},
    error::{GameNotFoundError, NoPlayerCharacterSetError},
    event::GameEvent,
};

#[derive(Serialize, Object)]
/// Results from attack on the NPC.
pub struct ItemUsed {
    /// Events that happened due to the attack.
    events: Vec<GameEvent>,
    /// Actions that can now be performed after the attack.
    actions: Vec<PerformAction>,
}

#[derive(Deserialize, Object, Serialize)]
/// Args for an attack action against a single NPC.
pub struct UseItemOnPlayerArgs {
    /// Username for the action.
    pub username: String,
    /// The ID of the game which the action will happen in.
    pub game_id: String,
    /// ID of the item to use.
    pub item_id: String,
}

pub async fn use_item_on_player(
    transaction: &mut Transaction<'_, Postgres>,
    args: &UseItemOnPlayerArgs,
) -> Result<ItemUsed, Box<dyn Error>> {
    let player_character =
        match crate::player_characters::repository::current(transaction, &args.username).await? {
            Some(it) => it,
            None => return Err(Box::new(NoPlayerCharacterSetError)),
        };

    let state = match super::repository::by_id(transaction, &args.username, &args.game_id).await? {
        Some(it) => it,
        None => return Err(Box::new(GameNotFoundError)),
    };

    let mut game = Game {
        player: player_character,
        state,
    };

    let use_item = UseItemOnPlayer {
        item_id: args.item_id.clone(),
    };

    let events = game
        .handle_action(&Action::UseItemOnPlayer(use_item))
        .unwrap();
    super::repository::save(transaction, &args.username, &game.state).await?;
    crate::player_characters::repository::save(transaction, &args.username, &game.player).await?;

    let game_events: Vec<GameEvent> = events.into_iter().map(GameEvent::from).collect();

    Ok(ItemUsed {
        events: game_events,
        actions: game_actions(&game, &args.username),
    })
}

#[derive(Deserialize, Object, Serialize)]
/// Args for an attack action against a single NPC.
pub struct MovePlayerItemArgs {
    /// Username for the action.
    pub username: String,
    /// The ID of the game which the action will happen in.
    pub game_id: String,
    /// ID of the item to use.
    pub item_id: String,
    /// Location to put item in
    pub location_tag: LocationTag,
    /// Ready the item so that it will be used for attack/defense.
    pub put_at_the_ready: bool,
}

#[derive(Serialize, Object)]
/// Results from attack on the NPC.
pub struct ItemMoved {
    /// Events that happened due to the attack.
    events: Vec<GameEvent>,
    /// Actions that can now be performed after the attack.
    actions: Vec<PerformAction>,
}

pub async fn move_player_item(
    transaction: &mut Transaction<'_, Postgres>,
    args: &MovePlayerItemArgs,
) -> Result<ItemMoved, Box<dyn Error>> {
    let player_character =
        match crate::player_characters::repository::current(transaction, &args.username).await? {
            Some(it) => it,
            None => return Err(Box::new(NoPlayerCharacterSetError)),
        };

    let state = match super::repository::by_id(transaction, &args.username, &args.game_id).await? {
        Some(it) => it,
        None => return Err(Box::new(GameNotFoundError)),
    };

    let mut game = Game {
        player: player_character,
        state,
    };

    let move_item = MovePlayerItem {
        item_id: args.item_id.clone(),
        location_tag: args.location_tag.clone(),
        put_at_the_ready: args.put_at_the_ready,
    };

    let events = game
        .handle_action(&Action::MovePlayerItem(move_item))
        .unwrap();
    super::repository::save(transaction, &args.username, &game.state).await?;
    crate::player_characters::repository::save(transaction, &args.username, &game.player).await?;

    let game_events: Vec<GameEvent> = events.into_iter().map(GameEvent::from).collect();

    Ok(ItemMoved {
        events: game_events,
        actions: game_actions(&game, &args.username),
    })
}