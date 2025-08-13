# OTP Authentication API

This module provides OTP (One-Time Password) authentication functionality for user login.

## Endpoints

### 1. Request OTP
**POST** `/auth/mobile`

Request an OTP code to be sent to the user's mobile number.

**Request Body:**
```json
{
  "mobile": "09123456789"
}
```

**Response:**
```json
{
  "message": "OTP code has been sent to mobile",
  "tempOtp": "4444"  // Only included for temporary OTP (4444)
}
```

**Rate Limiting:** 1 request per minute per IP

### 2. Validate OTP
**POST** `/auth/code`

Validate the OTP code and get authentication tokens.

**Request Body:**
```json
{
  "mobile": "09123456789",
  "code": "4444"
}
```

**Response:**
```json
{
  "data": {
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "user": {
      "id": "user_id",
      "mobile": "09123456789",
      "name": "User Name",
      "email": "user@example.com",
      "status": 1
    },
    "permissions": ["READ", "WRITE"]
  },
  "message": "OTP successfully validated"
}
```

### 3. Refresh Token
**POST** `/auth/refresh-token`

Renew access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "data": {
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  },
  "message": "Tokens renewed successfully"
}
```

## Authentication Flow

1. **Request OTP**: User provides mobile number
2. **Receive OTP**: User gets OTP code (currently "4444" for testing)
3. **Validate OTP**: User provides mobile and OTP code
4. **Get Tokens**: User receives access and refresh tokens
5. **Use Access Token**: Include in Authorization header for protected endpoints

## Temporary OTP Implementation

Currently using temporary OTP code "4444" for testing:

- **OTP Code**: Always "4444"
- **SMS**: Not sent for temporary OTP (logged to console instead)
- **Response**: Includes `tempOtp` field for testing
- **Expiration**: 5 minutes

## Production Changes Needed

When ready for production:

1. **Generate Random OTP**: Change `generateOtp()` to use `crypto.randomInt(1000, 9999)`
2. **Send SMS**: Remove temporary OTP logic and always send SMS
3. **Remove tempOtp**: Remove the `tempOtp` field from response
4. **Update DTO**: Change validation back to 6 digits if needed

## Error Responses

### Invalid Mobile
```json
{
  "statusCode": 400,
  "message": "Please insert valid mobile"
}
```

### Invalid OTP
```json
{
  "statusCode": 400,
  "message": "Invalid OTP"
}
```

### Expired OTP
```json
{
  "statusCode": 400,
  "message": "OTP expired"
}
```

### Rate Limit Exceeded
```json
{
  "statusCode": 429,
  "message": "Too Many Requests"
}
```

## Usage with Cart API

After successful OTP validation, use the access token with cart endpoints:

```
Authorization: Bearer <access_token>
```

Example:
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
     http://localhost:3000/cart
``` 