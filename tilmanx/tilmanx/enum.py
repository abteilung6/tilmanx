from enum import Enum, unique


@unique
class Environment(Enum):
    TESTING = 'testing'
    """Testing environment"""
    DEVELOPMENT = 'development'
    """Development environment"""
    STAGING = 'staging'
    """Staging environment"""
    PRODUCTION = 'production'
    """Production environment"""
