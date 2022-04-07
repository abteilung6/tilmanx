---
sidebar_position: 3
---

# Deployment

## Build APK with Github Actions

For encoding, we will make use of the popular Base64 encoding scheme. This will allow us to store the file as text in our GitHub Secrets
and later on in the GitHub Workflow process decode it back to our original KeyStore file.

```
cat `tilmanx.keystore` | base64
```

You should see a newly created file `base64_encoded_keystore.txt`.

Go into your project's GitHub secrets and add new GitHub Secrets called

- `KEYSTORE_STORE_FILE_BASE64` (based64 encoded text)
- `KEYSTORE_STORE_FILE`
- `SIGNING_STORE_PASSWORD`
- `SIGNING_KEY_PASSWORD`
- `SIGNING_KEY_ALIAS`
