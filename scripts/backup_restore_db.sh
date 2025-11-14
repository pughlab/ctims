#!/bin/bash

#############################################
# MySQL Backup & Restore Script
# For CTIMS database (ctml_schema, ctml_json, trial, trial_group, user, event tables)
# Supports interactive and cron modes
#############################################

set -e  # Exit on error

# Configuration
CONTAINER_NAME="ctims-db-qa-backup"
BACKUP_DIR="ctims_backup"
TABLES=("ctml_schema" "ctml_json" "trial" "trial_group" "user" "event")
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

#############################################
# Functions
#############################################

print_header() {
    echo -e "${BLUE}================================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Load environment variables from .env file
load_env() {
    print_info "Loading environment variables..."

    # Determine project root (one level up from scripts directory)
    PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

    # Check for .env in current directory first
    if [ -f "$(pwd)/.env" ]; then
        ENV_FILE="$(pwd)/.env"
        print_info "Found .env file in current directory: $ENV_FILE"

        # Read DATABASE_URL or individual vars from .env file
        while IFS='=' read -r key value; do
            # Skip comments and empty lines
            [[ "$key" =~ ^#.*$ ]] && continue
            [[ -z "$key" ]] && continue

            # Remove quotes from value if present
            value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")

            case "$key" in
                DATABASE_URL)
                    DATABASE_URL="$value"
                    ;;
                MYSQL_USER)
                    MYSQL_USER="$value"
                    ;;
                MYSQL_PASSWORD)
                    MYSQL_PASSWORD="$value"
                    ;;
                MYSQL_DATABASE)
                    MYSQL_DATABASE="$value"
                    ;;
            esac
        done < <(grep -E '^[^#]*(MYSQL_|DATABASE_URL)=' "$ENV_FILE")

    # Check for .env in project root (one level up from scripts)
    elif [ -f "$PROJECT_ROOT/.env" ]; then
        ENV_FILE="$PROJECT_ROOT/.env"
        print_info "Found .env file in project root: $ENV_FILE"

        # Read DATABASE_URL or individual vars from .env file
        while IFS='=' read -r key value; do
            # Skip comments and empty lines
            [[ "$key" =~ ^#.*$ ]] && continue
            [[ -z "$key" ]] && continue

            # Remove quotes from value if present
            value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")

            case "$key" in
                DATABASE_URL)
                    DATABASE_URL="$value"
                    ;;
                MYSQL_USER)
                    MYSQL_USER="$value"
                    ;;
                MYSQL_PASSWORD)
                    MYSQL_PASSWORD="$value"
                    ;;
                MYSQL_DATABASE)
                    MYSQL_DATABASE="$value"
                    ;;
            esac
        done < <(grep -E '^[^#]*(MYSQL_|DATABASE_URL)=' "$ENV_FILE")

    # Check for /home/qa_env_vars.sh (production server)
    elif [ -f "/home/qa_env_vars.sh" ]; then
        ENV_FILE="/home/qa_env_vars.sh"
        print_info "Found environment file in /home: $ENV_FILE"

        # Source the file with set -a to export all variables (like docker_build_backend_qa.sh)
        set -a
        . "$ENV_FILE"
        set +a

    # Neither file found - throw error
    else
        print_error "Environment file not found!"
        print_error "Checked locations:"
        print_error "  1. $(pwd)/.env"
        print_error "  2. $PROJECT_ROOT/.env"
        print_error "  3. /home/qa_env_vars.sh"
        exit 1
    fi

    # Parse DATABASE_URL if it exists, otherwise use individual vars
    if [ ! -z "$DATABASE_URL" ]; then
        # Extract from DATABASE_URL (format: mysql://user:password@host:port/database)
        DB_USER=$(echo "$DATABASE_URL" | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')
        DB_PASSWORD=$(echo "$DATABASE_URL" | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p')
        DB_NAME=$(echo "$DATABASE_URL" | sed -n 's/.*\/\([^?]*\).*/\1/p')
    else
        # Use individual environment variables
        DB_USER="${MYSQL_USER:-ctims}"
        DB_PASSWORD="${MYSQL_PASSWORD:-ctims}"
        DB_NAME="${MYSQL_DATABASE:-ctims}"
    fi

    print_success "Environment variables loaded from: $ENV_FILE"
    print_info "Database: $DB_NAME"
    print_info "User: $DB_USER"
}

# Check if container is running
check_container() {
    print_info "Checking if container '$CONTAINER_NAME' is running..."

    if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        print_error "Container '$CONTAINER_NAME' is not running"
        exit 1
    fi

    print_success "Container is running"
}

# Create backup directory
create_backup_dir() {
    if [ ! -d "$BACKUP_DIR" ]; then
        print_info "Creating backup directory: $BACKUP_DIR"
        mkdir -p "$BACKUP_DIR"
        print_success "Backup directory created"
    fi
}

# Backup function
backup_database() {
    print_header "Starting Database Backup"

    load_env
    check_container
    create_backup_dir

    print_info "Timestamp: $TIMESTAMP"
    echo ""

    for table in "${TABLES[@]}"; do
        BACKUP_FILE="${BACKUP_DIR}/${table}_${TIMESTAMP}.sql"
        COMPRESSED_FILE="${BACKUP_FILE}.gz"

        print_info "Backing up table: $table"

        # Backup table data only (no schema)
        # Note: MySQL doesn't have --data-only like pg_dump, so we use --no-create-info
        if docker exec "$CONTAINER_NAME" mysqldump \
            -u"$DB_USER" \
            --password="$DB_PASSWORD" \
            "$DB_NAME" \
            "$table" \
            --no-create-info \
            --single-transaction \
            --quick \
            --lock-tables=false \
            --skip-add-drop-table \
            --skip-add-locks \
            --skip-disable-keys \
            --skip-extended-insert \
            --no-tablespaces > "$BACKUP_FILE" 2>/dev/null; then

            # Compress the backup
            print_info "Compressing backup..."
            gzip "$BACKUP_FILE"

            # Get file size
            SIZE=$(du -h "$COMPRESSED_FILE" | cut -f1)
            print_success "Table '$table' backed up successfully ($SIZE)"
            print_info "File: $COMPRESSED_FILE"
        else
            print_error "Failed to backup table: $table"
            exit 1
        fi
        echo ""
    done

    print_success "All tables backed up successfully!"
    print_info "Backup location: $(pwd)/$BACKUP_DIR"
}

# List available backups
list_backups() {
    print_header "Available Backup Files"

    if [ ! -d "$BACKUP_DIR" ]; then
        print_warning "No backup directory found"
        return 1
    fi

    # Get unique timestamps from backup files
    TIMESTAMPS=($(ls "$BACKUP_DIR"/*.sql.gz 2>/dev/null | \
                  sed 's/.*_\([0-9]\{8\}_[0-9]\{6\}\)\.sql\.gz/\1/' | \
                  sort -u))

    if [ ${#TIMESTAMPS[@]} -eq 0 ]; then
        print_warning "No backup files found"
        return 1
    fi

    echo ""
    echo "Index | Timestamp         | Date                  | Files"
    echo "------|-------------------|----------------------|-------"

    local index=1
    for ts in "${TIMESTAMPS[@]}"; do
        # Format timestamp for display
        DATE_PART="${ts:0:8}"
        TIME_PART="${ts:9:6}"
        FORMATTED_DATE="${DATE_PART:0:4}-${DATE_PART:4:2}-${DATE_PART:6:2}"
        FORMATTED_TIME="${TIME_PART:0:2}:${TIME_PART:2:2}:${TIME_PART:4:2}"

        # Count files for this timestamp
        FILE_COUNT=$(ls "$BACKUP_DIR"/*_${ts}.sql.gz 2>/dev/null | wc -l | tr -d ' ')

        printf "%-5s | %-17s | %s %s | %s/%s\n" \
            "$index" "$ts" "$FORMATTED_DATE" "$FORMATTED_TIME" "$FILE_COUNT" "${#TABLES[@]}"

        index=$((index + 1))
    done

    echo ""
    return 0
}

# Restore function
restore_database() {
    print_header "Starting Database Restore"

    load_env
    check_container

    # List available backups
    if ! list_backups; then
        exit 1
    fi

    # Get array of timestamps
    TIMESTAMPS=($(ls "$BACKUP_DIR"/*.sql.gz 2>/dev/null | \
                  sed 's/.*_\([0-9]\{8\}_[0-9]\{6\}\)\.sql\.gz/\1/' | \
                  sort -u))

    # Ask user to select backup
    echo -e "${YELLOW}Select backup to restore (enter index number):${NC}"
    read -p "> " SELECTION

    # Validate selection
    if ! [[ "$SELECTION" =~ ^[0-9]+$ ]]; then
        print_error "Invalid selection. Please enter a number."
        exit 1
    fi

    if [ "$SELECTION" -lt 1 ] || [ "$SELECTION" -gt ${#TIMESTAMPS[@]} ]; then
        print_error "Invalid selection. Please select a valid index."
        exit 1
    fi

    # Get selected timestamp
    SELECTED_TIMESTAMP="${TIMESTAMPS[$((SELECTION - 1))]}"

    echo ""
    print_warning "You are about to restore the following backup:"
    print_info "Timestamp: $SELECTED_TIMESTAMP"
    print_info "Tables: ${TABLES[*]}"
    echo ""
    print_warning "⚠️  This will DELETE ALL CURRENT DATA in these tables!"
    echo ""

    # Ask for confirmation
    read -p "Are you sure you want to proceed? (yes/no): " CONFIRMATION

    if [ "$CONFIRMATION" != "yes" ]; then
        print_info "Restore cancelled by user"
        exit 0
    fi

    echo ""
    print_header "Restoring Database"

    # Verify all backup files exist
    print_info "Verifying backup files..."
    for table in "${TABLES[@]}"; do
        BACKUP_FILE="${BACKUP_DIR}/${table}_${SELECTED_TIMESTAMP}.sql.gz"
        if [ ! -f "$BACKUP_FILE" ]; then
            print_error "Backup file not found: $BACKUP_FILE"
            exit 1
        fi
    done
    print_success "All backup files found"
    echo ""

    # Restore each table
    for table in "${TABLES[@]}"; do
        BACKUP_FILE="${BACKUP_DIR}/${table}_${SELECTED_TIMESTAMP}.sql.gz"

        print_info "Restoring table: $table"

        # Truncate table first (MySQL TRUNCATE doesn't support CASCADE, but we handle foreign keys)
        print_info "Truncating table '$table'..."
        # Disable foreign key checks temporarily
        if docker exec "$CONTAINER_NAME" mysql \
            -u"$DB_USER" \
            --password="$DB_PASSWORD" \
            "$DB_NAME" \
            -e "SET FOREIGN_KEY_CHECKS=0; TRUNCATE TABLE \`$table\`; SET FOREIGN_KEY_CHECKS=1;" > /dev/null 2>&1; then
            print_success "Table truncated"
        else
            print_error "Failed to truncate table: $table"
            exit 1
        fi

        # Restore data
        print_info "Restoring data..."
        if gunzip -c "$BACKUP_FILE" | docker exec -i "$CONTAINER_NAME" mysql \
            -u"$DB_USER" \
            --password="$DB_PASSWORD" \
            "$DB_NAME" > /dev/null 2>&1; then
            print_success "Table '$table' restored successfully"
        else
            print_error "Failed to restore table: $table"
            exit 1
        fi

        # Get row count
        ROW_COUNT=$(docker exec "$CONTAINER_NAME" mysql \
            -u"$DB_USER" \
            --password="$DB_PASSWORD" \
            "$DB_NAME" \
            -sN -e "SELECT COUNT(*) FROM \`$table\`;" 2>/dev/null | tr -d ' ')
        print_info "Rows restored: $ROW_COUNT"
        echo ""
    done

    print_success "Database restored successfully!"
}

# Show usage
show_usage() {
    echo "Usage: $0 [backup]"
    echo ""
    echo "Options:"
    echo "  backup    Perform backup (non-interactive, for cron jobs)"
    echo "  (none)    Interactive mode - asks for backup or restore"
    echo ""
    echo "Examples:"
    echo "  $0              # Interactive mode"
    echo "  $0 backup       # Backup mode (for cron)"
}

#############################################
# Main Script
#############################################

main() {
    # Check if argument provided (for cron mode)
    if [ $# -eq 1 ]; then
        if [ "$1" == "backup" ]; then
            backup_database
            exit 0
        elif [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
            show_usage
            exit 0
        else
            print_error "Invalid argument: $1"
            show_usage
            exit 1
        fi
    elif [ $# -gt 1 ]; then
        print_error "Too many arguments"
        show_usage
        exit 1
    fi

    # Interactive mode
    print_header "MySQL Backup & Restore Tool"
    echo ""
    echo "What would you like to do?"
    echo "  1) Backup database"
    echo "  2) Restore database"
    echo "  3) Exit"
    echo ""
    read -p "Enter your choice (1-3): " CHOICE

    case $CHOICE in
        1)
            echo ""
            backup_database
            ;;
        2)
            echo ""
            restore_database
            ;;
        3)
            print_info "Exiting..."
            exit 0
            ;;
        *)
            print_error "Invalid choice"
            exit 1
            ;;
    esac
}

# Run main function
main "$@"

