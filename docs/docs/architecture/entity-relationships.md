---
sidebar_position: 1
---

# Entity Relationships

User

- email, password, firstname and lastname from registration process
- created_at, updated_at timestamps
- is_verified from email verification
- can have multiple conversations
- can be multiple participants

Conversation

- can have 1..2 participants
- has a creator
- created_at, updated_at timestamps

Participant

- user_id representing the conversation
- conversation_id representing the conversation
- user_id and conversation_id must be unqiue together

Message

- conversation_id
- sender_id, the user that sended this message
- message, just a text for now
- created_at timestamp

Friendship

- requester_id represents the user who created that offer
- addressee_id represents the user who can accept or decline that offer
- status can be "offered" or "accepted" otherwhise the friendship will be deleted
- only an accepted friendship is a "real" friendship
- created_at, updated_at, accepted_at, declined_at timestamp
