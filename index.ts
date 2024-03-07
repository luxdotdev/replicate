import { $ } from "bun";

await $`pg_dump --disable-triggers -v -a -d "${process.env.PROD_DB_URL}" -f /verceldb_dump.sql`;

const tablesToTruncate =
  '"_TeamToUser", "Account", "DefensiveAssist", "DvaRemech", "EchoDuplicateEnd", "EchoDuplicateStart", "HeroSpawn", "HeroSwap", "Kill", "Map", "MapData", "MatchEnd", "MatchStart", "MercyRez", "ObjectiveCaptured", "ObjectiveUpdated", "OffensiveAssist", "PayloadProgress", "PlayerStat", "PointProgress", "RemechCharged", "RoundEnd", "RoundStart", "Scrim", "Session", "SetupComplete", "Team", "TeamInviteToken", "TeamManager", "UltimateCharged", "UltimateEnd", "UltimateStart", "User", "VerificationToken"';

await $`psql "${process.env.REPLICA_DB_URL}" -c 'TRUNCATE TABLE '${tablesToTruncate}' CASCADE;'`;

await $`psql "${process.env.REPLICA_DB_URL}" -c "SET session_replication_role = 'replica';"`;
await $`psql "${process.env.REPLICA_DB_URL}" -f /verceldb_dump.sql`;
await $`psql "${process.env.REPLICA_DB_URL}" -c "SET session_replication_role = 'origin';"`;

console.log("Backup and restore completed!");
