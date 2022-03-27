from enum import Enum, unique


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
