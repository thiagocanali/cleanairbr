// Explicit Better Auth model/column mapping for database/neon/003_auth_tables.sql.
// Keep this as plain configuration so it can be tested without opening DB connections.
export const betterAuthDatabaseSchema = Object.freeze({
 user: Object.freeze({
  modelName:'auth_user',
  fields:Object.freeze({emailVerified:'email_verified',createdAt:'created_at',updatedAt:'updated_at'}),
 }),
 session: Object.freeze({
  modelName:'auth_session',
  fields:Object.freeze({userId:'user_id',expiresAt:'expires_at',createdAt:'created_at',updatedAt:'updated_at',ipAddress:'ip_address',userAgent:'user_agent'}),
 }),
 account: Object.freeze({
  modelName:'auth_account',
  fields:Object.freeze({accountId:'account_id',providerId:'provider_id',userId:'user_id',accessToken:'access_token',refreshToken:'refresh_token',idToken:'id_token',accessTokenExpiresAt:'access_token_expires_at',refreshTokenExpiresAt:'refresh_token_expires_at',createdAt:'created_at',updatedAt:'updated_at'}),
 }),
 verification: Object.freeze({
  modelName:'auth_verification',
  fields:Object.freeze({expiresAt:'expires_at',createdAt:'created_at',updatedAt:'updated_at'}),
 }),
});
