use poem_openapi::Object;
use serde::Serialize;
use sqlx::{Postgres, Transaction};
use underworld_core::{
    actions::{Action, InspectFixture, InspectNpc},
    components::{rooms::RoomView, PlayerCharacterView},
    events::Event,
    Game,
};

use crate::{
    actions::{game_actions, PerformAction},
    error::GameError,
    event::GameEvent,
};

#[derive(Object, Serialize)]
pub struct NpcInspected {
    pub health_discovered: bool,
    pub packed_items_discovered: bool,
    pub actions: Vec<PerformAction>,
    pub events: Vec<GameEvent>,
    pub current_room: RoomView,
    pub current_player: PlayerCharacterView,
}

pub async fn inspect_npc(
    transaction: &mut Transaction<'_, Postgres>,
    username: &str,
    game_id: &str,
    args: &InspectNpc,
) -> Result<NpcInspected, GameError> {
    let state = match super::repository::by_id(transaction, username, game_id).await? {
        Some(it) => it,
        None => return Err(GameError::GameNotFoundError),
    };
    let player = match crate::player_characters::repository::current(transaction, username).await? {
        Some(it) => it,
        None => return Err(GameError::NoPlayerCharacterSetError),
    };
    let mut game = Game { state, player };

    let action = Action::InspectNpc(args.to_owned());
    let events = game.handle_action(&action)?;

    super::repository::save(transaction, username, &game.state)
        .await
        .unwrap();
    crate::player_characters::repository::save(transaction, username, &game.player)
        .await
        .unwrap();

    let game_events: Vec<GameEvent> = events.iter().cloned().map(GameEvent::from).collect();

    let current_room = game.state.view_current_room();
    let current_player = underworld_core::systems::view::player::check(&game.player);

    let mut npc_inspected = NpcInspected {
        health_discovered: false,
        packed_items_discovered: false,
        actions: game_actions(&game, username),
        events: game_events,
        current_player,
        current_room,
    };

    for event in events {
        match event {
            Event::NpcHealthDiscovered(_) => {
                npc_inspected.health_discovered = true;
            }
            Event::NpcPackedDiscovered(_) => {
                npc_inspected.packed_items_discovered = true;
            }
            _ => {}
        }
    }

    Ok(npc_inspected)
}

#[derive(Object, Serialize)]
pub struct FixtureInspected {
    pub has_hidden_compartment_discovered: bool,
    pub actions: Vec<PerformAction>,
    pub events: Vec<GameEvent>,
    pub current_room: RoomView,
    pub current_player: PlayerCharacterView,
}

pub async fn inspect_fixture(
    transaction: &mut Transaction<'_, Postgres>,
    username: &str,
    game_id: &str,
    args: &InspectFixture,
) -> Result<FixtureInspected, GameError> {
    let state = match super::repository::by_id(transaction, username, game_id)
        .await
        .unwrap()
    {
        Some(it) => it,
        None => return Err(GameError::GameNotFoundError),
    };
    let player = match crate::player_characters::repository::current(transaction, username)
        .await
        .unwrap()
    {
        Some(it) => it,
        None => return Err(GameError::NoPlayerCharacterSetError),
    };
    let mut game = Game { state, player };

    let action = Action::InspectFixture(args.to_owned());
    let events = game.handle_action(&action)?;

    super::repository::save(transaction, username, &game.state).await?;
    crate::player_characters::repository::save(transaction, username, &game.player).await?;
    let game_events: Vec<GameEvent> = events.iter().cloned().map(GameEvent::from).collect();

    let current_room = game.state.view_current_room();
    let current_player = underworld_core::systems::view::player::check(&game.player);

    let mut fixture_inspected = FixtureInspected {
        actions: game_actions(&game, username),
        has_hidden_compartment_discovered: false,
        events: game_events,
        current_player,
        current_room,
    };

    fixture_inspected.has_hidden_compartment_discovered = events
        .iter()
        .any(|event| matches!(event, Event::FixtureHasHiddenCompartmentDiscovered(_)));

    Ok(fixture_inspected)
}
