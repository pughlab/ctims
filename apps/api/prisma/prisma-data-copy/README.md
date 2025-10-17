# Prisma Data Copy

This script copies a specific `trial_group` and all its related data from a source database to a destination database.

## Prerequisites

- Node.js and `npm` must be installed.
- You need credentials for both the source and destination databases.
- You need prisma-field-encryption key set up for both databases.

## Setup and Configuration

1.  **Source Database Configuration:**
    The source database is configured via environment variables, typically in a `.env` file at the project root. The script requires:
    -   `DATABASE_URL`: The connection string for the source database.
    -   `PRISMA_FIELD_ENCRYPTION_KEY`: The encryption key for the source database.

    Example `.env` configuration:
    ```
    DATABASE_URL="mysql://user:password@host:port/source_db"
    PRISMA_FIELD_ENCRYPTION_KEY="k1.aesgcm256.your-source-key"
    ```

## Usage

Run the script from the project's root directory:

```bash
npm run prisma:data-copy
```

The script will guide you through the following prompts:

1.  **Select Trial Group:** A numbered list of available trial groups from the source database will be displayed. Enter the number corresponding to the trial group you wish to copy.
2.  **Enter Destination Database URL:** Provide the connection string for the destination database.
3.  **Enter Destination Encryption Key:** Provide the encryption key for the destination database.

## Script Behavior

-   **Selective Copying:** The script only copies users and the selected trial group that are referenced in the trials being copied.
-   **Skipping Existing Trials:** If a trial with a specific `trial_internal_id` already exists in the destination database, that trial and its related data will be skipped.
-   **Encryption Handling:** The script decrypts the `ctml_json.data` field from the source database and re-encrypts it in the destination database using the key you provide.
-   **Logging:** The script provides progress logs, including the creation of new users and trial groups in the destination database.
