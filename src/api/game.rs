use poem::{web::Data, Result};
use poem_openapi::{
    param::Path,
    payload::{Json, PlainText},
    ApiResponse, OpenApi,
};
use sqlx::PgPool;
use underworld_core::components::{non_player::NonPlayerView, rooms::room_view::RoomView};

use crate::{
    error::{Error, GameError},
    game::{
        attack::{attack_npc, AttackNpcArgs, NpcAttacked},
        exit::{exit_current_room, ExitRoomArgs, RoomExited},
        generate::{generate_game, GenerateGameArgs, GeneratedGame},
        get::game_ids,
        look::{
            inspect_npc, look_at_npc, look_at_room, quick_look_room, InspectNpcArgs, NpcInspected,
            NpcLookArgs, RoomLookArgs,
        },
        loot::{loot_npc, LootNpcArgs, NpcLooted},
    },
};

#[derive(ApiResponse)]
enum LookResponse {
    #[oai(status = 200)]
    LookAtRoom(Json<RoomView>),

    #[oai(status = 404)]
    NotFound(PlainText<String>),
}

#[derive(ApiResponse)]
enum LookNpcResponse {
    #[oai(status = 200)]
    NpcViewed(Json<NonPlayerView>),

    #[oai(status = 404)]
    NotFound(PlainText<String>),

    #[oai(status = 500)]
    GameError(Json<GameError>),
}

#[derive(ApiResponse)]
enum InspectNpcResponse {
    #[oai(status = 200)]
    NpcInspected(Json<NpcInspected>),

    #[oai(status = 404)]
    NotFound(PlainText<String>),

    #[oai(status = 500)]
    GameError(Json<GameError>),
}

#[derive(ApiResponse)]
enum LootNpcResponse {
    #[oai(status = 200)]
    NpcLooted(Json<NpcLooted>),

    #[oai(status = 404)]
    NotFound(PlainText<String>),

    #[oai(status = 500)]
    GameError(Json<GameError>),
}

#[derive(ApiResponse)]
pub enum GenerateGameResponse {
    #[oai(status = 201)]
    GameGenerated(Json<GeneratedGame>),

    #[oai(status = 500)]
    GameError(Json<GameError>),
}

#[derive(ApiResponse)]
enum AttackNpcResponse {
    #[oai(status = 200)]
    NpcAttacked(Json<NpcAttacked>),

    #[oai(status = 500)]
    BadRequest(Json<Error>),
}

#[derive(ApiResponse)]
enum ExitRoomResponse {
    #[oai(status = 200)]
    RoomExited(Json<RoomExited>),

    #[oai(status = 500)]
    BadRequest(Json<Error>),
}

#[derive(ApiResponse)]
enum GameIdResponse {
    #[oai(status = 200)]
    GameIds(Json<Vec<String>>),
}

pub struct UnderworldGameApi;

#[OpenApi]
impl UnderworldGameApi {
    /// Generate and persist a new game.
    ///
    /// # Example
    ///
    /// Call `/game/generate` with
    /// ```
    /// {
    ///   "username": "my_username"
    /// }
    /// ```
    /// to generate and save a new game for my_username
    #[oai(path = "/game/generate", method = "post")]
    async fn generate_game(
        &self,
        pool: Data<&PgPool>,
        args: Json<GenerateGameArgs>,
    ) -> Result<GenerateGameResponse> {
        let mut transaction = pool.0.begin().await.unwrap();
        let generated_result = generate_game(&mut transaction, &args).await;
        transaction.commit().await.unwrap();

        match generated_result {
            Ok(generated_game) => Ok(GenerateGameResponse::GameGenerated(Json(generated_game))),
            Err(e) => Ok(GenerateGameResponse::GameError(Json(e))),
        }
    }

    /// Get IDs of all current games
    ///
    /// # Example
    ///
    /// Call `/my_username/games` to retrieve all game ids for my_username
    #[oai(path = "/:username/games", method = "get")]
    async fn list_games(
        &self,
        pool: Data<&PgPool>,
        username: Path<String>,
    ) -> Result<GameIdResponse> {
        let mut transaction = pool.0.begin().await.unwrap();
        let result = game_ids(&mut transaction, &username).await;
        transaction.commit().await.unwrap();
        Ok(GameIdResponse::GameIds(Json(result)))
    }

    /// Exit the current room of the specified game through the specified exit.
    #[oai(path = "/game/exit_current_room", method = "post")]
    async fn exit_current_room(
        &self,
        pool: Data<&PgPool>,
        args: Json<ExitRoomArgs>,
    ) -> Result<ExitRoomResponse> {
        let mut transaction = pool.0.begin().await.unwrap();
        let exit_result = exit_current_room(&mut transaction, &args).await;
        transaction.commit().await.unwrap();
        match exit_result {
            Ok(it) => Ok(ExitRoomResponse::RoomExited(Json(it))),
            Err(it) => Ok(ExitRoomResponse::BadRequest(Json(Error {
                message: it.to_string(),
            }))),
        }
    }

    /// Attack a specific NPC inside the current room of the specified game.
    #[oai(path = "/game/attack_npc", method = "post")]
    async fn attack_npc(
        &self,
        pool: Data<&PgPool>,
        args: Json<AttackNpcArgs>,
    ) -> Result<AttackNpcResponse> {
        let mut transaction = pool.0.begin().await.unwrap();
        let attack_result = attack_npc(&mut transaction, &args).await;
        transaction.commit().await.unwrap();

        match attack_result {
            Ok(it) => Ok(AttackNpcResponse::NpcAttacked(Json(it))),
            Err(e) => Ok(AttackNpcResponse::BadRequest(Json(Error {
                message: e.to_string(),
            }))),
        }
    }

    /// Loot some items from an NPC.
    #[oai(path = "/game/loot_npc", method = "post")]
    async fn loot_npc(
        &self,
        pool: Data<&PgPool>,
        args: Json<LootNpcArgs>,
    ) -> Result<LootNpcResponse> {
        let mut transaction = pool.0.begin().await.unwrap();
        let loot_result = loot_npc(&mut transaction, &args).await;
        transaction.commit().await.unwrap();

        match loot_result {
            Ok(it) => Ok(LootNpcResponse::NpcLooted(Json(it))),
            Err(GameError::GameNotFound) => Ok(LootNpcResponse::NotFound(PlainText(format!(
                "{}",
                GameError::GameNotFound
            )))),
            Err(e) => Ok(LootNpcResponse::GameError(Json(e))),
        }
    }

    /// Take a closer look at the current room.
    #[oai(path = "/game/look_at_current_room", method = "post")]
    async fn look_at_current_room(
        &self,
        pool: Data<&PgPool>,
        args: Json<RoomLookArgs>,
    ) -> Result<LookResponse> {
        let mut transaction = pool.0.begin().await.unwrap();
        let view_result = look_at_room(&mut transaction, &args).await;
        transaction.commit().await.unwrap();

        match view_result {
            Ok(it) => Ok(LookResponse::LookAtRoom(Json(it))),
            Err(e) => Ok(LookResponse::NotFound(PlainText(e.to_string()))),
        }
    }

    /// Glance quickly at the current room.
    #[oai(path = "/game/quick_look_current_room", method = "post")]
    async fn quick_look_current_room(
        &self,
        pool: Data<&PgPool>,
        args: Json<RoomLookArgs>,
    ) -> Result<LookResponse> {
        let mut transaction = pool.0.begin().await.unwrap();
        let view_result = quick_look_room(&mut transaction, &args).await;
        transaction.commit().await.unwrap();
        match view_result {
            Ok(it) => Ok(LookResponse::LookAtRoom(Json(it))),
            Err(e) => Ok(LookResponse::NotFound(PlainText(e.to_string()))),
        }
    }

    /// Look at a specific NPC in the current room.
    #[oai(path = "/game/look_at_npc", method = "post")]
    async fn look_at_npc(
        &self,
        pool: Data<&PgPool>,
        args: Json<NpcLookArgs>,
    ) -> Result<LookNpcResponse> {
        let mut transaction = pool.0.begin().await.unwrap();
        match look_at_npc(&mut transaction, &args).await {
            Ok(it) => {
                transaction.commit().await.unwrap();
                Ok(LookNpcResponse::NpcViewed(Json(it)))
            }
            Err(GameError::GameNotFound) => Ok(LookNpcResponse::NotFound(PlainText(
                "game_not_found".to_string(),
            ))),
            Err(it) => Ok(LookNpcResponse::GameError(Json(it))),
        }
    }

    /// Inspect an NPC to find out more information about them when looking at them next.
    /// After completing an inspect, look at the NPC to see new information.
    #[oai(path = "/game/inspect_npc", method = "post")]
    async fn inspect_npc(
        &self,
        pool: Data<&PgPool>,
        args: Json<InspectNpcArgs>,
    ) -> Result<InspectNpcResponse> {
        let mut transaction = pool.0.begin().await.unwrap();
        match inspect_npc(&mut transaction, &args).await {
            Ok(it) => {
                transaction.commit().await.unwrap();
                Ok(InspectNpcResponse::NpcInspected(Json(it)))
            }
            Err(GameError::GameNotFound) => Ok(InspectNpcResponse::NotFound(PlainText(
                "game_not_found".to_string(),
            ))),
            Err(it) => Ok(InspectNpcResponse::GameError(Json(it))),
        }
    }
}