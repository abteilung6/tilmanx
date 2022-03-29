---
sidebar_position: 1
---

# Environments

Tilmanx is able to run in following environments

- testing
- development
- staging
- production

## Django

The django runner indicates the environment by the environment variable `ENV_NAME`.

```
export ENV_NAME=testing
export ENV_NAME=development
export ENV_NAME=staging
export ENV_NAME=production
```

Running django test with `python manage.py test` will automatically set the environment variable `ENV_NAME` to `testing`.

If you're using PyCharm, just hit `Edit Configurations` button and set the environment variable
or use `Settings -> Languages & Frameworks -> Django`.

## React Native

See also https://reactnative.dev/docs/

### Development

Start Metro

```
npx react-native start
```

Start your application

```
npx react-native run-android
```

### Release

Adding Keystore in directory `android/app`

```
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Modify `gradle.properties`

```
MYAPP_UPLOAD_STORE_FILE=changeme
MYAPP_UPLOAD_KEY_ALIAS=changeme
MYAPP_UPLOAD_STORE_PASSWORD=changeme
MYAPP_UPLOAD_KEY_PASSWORD=changeme
```

Build app in directory `android/`

```
./gradlew bundleRelease
```
