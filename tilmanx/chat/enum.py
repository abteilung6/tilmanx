from enum import Enum, unique


@unique
class ModelEnum(Enum):
    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]


@unique
class FriendshipStatus(Enum):
    OFFERED = 'OFFERED'
    """Requester has offered the friendship."""
    ACCEPTED = 'ACCEPTED'
    """Addressee has accepted the friendship."""


@unique
class FriendshipAction(Enum):
    ACCEPT = 'ACCEPT'
    """Addressee accepts the friendship."""


@unique
class ConversationType(ModelEnum):
    PRIVATE = 'PRIVATE'
    """A private conversation consists of two participants"""
    GROUP = 'GROUP'
    """A group conversation consists of finite participants"""


@unique
class MessageType(Enum):
    CHAT_MESSAGE = "chat_message"
    FRIENDSHIP_MESSAGE = "friendship_message"
