// Mock PrismaClient and its methods
const mockTrialGroup = {
  findMany: jest.fn(),
  create: jest.fn(),
};
const mockUser = {
  findMany: jest.fn(),
  create: jest.fn(),
};
const mockCtmlSchema = {
  findMany: jest.fn(),
  create: jest.fn(),
};
const mockTrial = {
  findMany: jest.fn(),
  create: jest.fn(),
  findFirst: jest.fn(),
};
const mockCtmlJson = {
  create: jest.fn(),
};

const mockDisconnect = jest.fn();
const mockConnect = jest.fn();
const mockTransaction = jest.fn();

const mockPrismaClient = {
  trial_group: mockTrialGroup,
  user: mockUser,
  ctml_schema: mockCtmlSchema,
  trial: mockTrial,
  ctml_json: mockCtmlJson,
  $use: jest.fn(),
  $connect: mockConnect,
  $disconnect: mockDisconnect,
  $transaction: mockTransaction,
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrismaClient),
}));

// Mock prompts
jest.mock('prompts', () => jest.fn());

// Mock prisma-field-encryption
jest.mock('prisma-field-encryption', () => ({
  fieldEncryptionMiddleware: jest.fn(() => jest.fn()),
}));

describe('data-copy', () => {
  let PrismaClientMock: jest.Mock;
  let promptsMock: jest.Mock;
  let main: () => Promise<void>;

  beforeEach(() => {
    jest.resetModules(); // Ensure modules are re-imported for each test
    PrismaClientMock = require('@prisma/client').PrismaClient;
    promptsMock = require('prompts');
    main = require('./data-copy').main;

    // Reset all mocks before each test
    mockTrialGroup.findMany.mockReset();
    mockTrialGroup.create.mockReset();
    mockUser.findMany.mockReset();
    mockUser.create.mockReset();
    mockCtmlSchema.findMany.mockReset();
    mockCtmlSchema.create.mockReset();
    mockTrial.findMany.mockReset();
    mockTrial.create.mockReset();
    mockTrial.findFirst.mockReset();
    mockCtmlJson.create.mockReset();
    mockDisconnect.mockReset();
    mockConnect.mockReset();
    mockTransaction.mockReset();
    mockPrismaClient.$use.mockReset();

    // Default successful connection for destination DB
    mockConnect.mockResolvedValue(undefined);
    // Default transaction implementation
    mockTransaction.mockImplementation(async (fn) => {
      const tx = {
        trial: mockTrial,
        ctml_json: mockCtmlJson,
      };
      return fn(tx);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should exit if no trial group is selected', async () => {
    mockTrialGroup.findMany.mockResolvedValueOnce([{ id: 1, name: 'Group A' }]);
    promptsMock.mockResolvedValueOnce({ selection: undefined });
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await main();

    expect(consoleSpy).toHaveBeenCalledWith('No trial group selected. Exiting.');
    consoleSpy.mockRestore();
  });

  it('should exit if database URL or encryption key are not provided', async () => {
    mockTrialGroup.findMany.mockResolvedValueOnce([{ id: 1, name: 'Group A' }]);
    promptsMock.mockResolvedValueOnce({ selection: 1 });
    promptsMock.mockResolvedValueOnce({ databaseUrl: undefined, encryptionKey: undefined });
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await main();

    expect(consoleSpy).toHaveBeenCalledWith('Database URL and encryption key are required. Exiting.');
    consoleSpy.mockRestore();
  });

  it('should exit if encryption key format is invalid', async () => {
    mockTrialGroup.findMany.mockResolvedValueOnce([{ id: 1, name: 'Group A' }]);
    promptsMock.mockResolvedValueOnce({ selection: 1 });
    promptsMock.mockResolvedValueOnce({ databaseUrl: 'some-url', encryptionKey: 'invalid-key-format' });
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await main();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid encryption key format. Expected format: k1.aesgcm256.xxx');
    consoleErrorSpy.mockRestore();
  });

  it('should exit if destination DB connection fails', async () => {
    mockTrialGroup.findMany.mockResolvedValueOnce([{ id: 1, name: 'Group A' }]);
    promptsMock.mockResolvedValueOnce({ selection: 1 });
    promptsMock.mockResolvedValueOnce({ databaseUrl: 'some-url', encryptionKey: 'k1.aesgcm256.test-key' });

    mockConnect.mockRejectedValueOnce(new Error('Connection failed'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await main();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to connect to the destination database:',
      expect.any(Error)
    );
    consoleErrorSpy.mockRestore();
  });

  it('should successfully copy data to an empty destination DB', async () => {
    const sourceTrialGroups = [{ id: 1, name: 'Group A' }];
    const sourceUsers = [{ id: 101, email: 'user1@example.com', name: 'User One', username: 'user1', first_name: 'User', last_name: 'One', email_verified: true, refresh_token: null, keycloak_id: 'kc123' }];
    const sourceSchemas = [{ id: 201, version: 1, schema: '{}' }];
    const trialCreatedAt = new Date('2024-01-15T10:00:00Z');
    const trialUpdatedAt = new Date('2024-02-20T15:30:00Z');
    const ctmlJsonCreatedAt = new Date('2024-01-15T10:05:00Z');
    const ctmlJsonUpdatedAt = new Date('2024-02-20T15:35:00Z');
    const sourceTrials = [
      {
        id: 301,
        nct_id: 'NCT001',
        trial_internal_id: 'TRIAL001',
        trial_groupId: 1,
        modifiedById: 101,
        userId: 101,
        nickname: 'Test Trial',
        principal_investigator: 'Dr. Test',
        status: 'DRAFT',
        protocol_no: 'P001',
        trial_status: 'PENDING',
        matchSentDate: null,
        createdAt: trialCreatedAt,
        updatedAt: trialUpdatedAt,
        ctml_schemas: [{ id: 201, version: 1 }],
        ctml_jsons: [{ id: 401, trialId: 301, versionId: 201, data: '{}', has_match: false, createdAt: ctmlJsonCreatedAt, updatedAt: ctmlJsonUpdatedAt }],
      },
    ];

    // Mock prompts
    promptsMock.mockResolvedValueOnce({ selection: 1 });
    promptsMock.mockResolvedValueOnce({ databaseUrl: 'dest-url', encryptionKey: 'k1.aesgcm256.dest-key' });

    // Mock findMany calls
    mockTrialGroup.findMany.mockResolvedValueOnce(sourceTrialGroups); // Initial fetch
    mockTrial.findMany.mockResolvedValueOnce(sourceTrials);
    mockUser.findMany.mockResolvedValueOnce(sourceUsers).mockResolvedValueOnce([]); // source then dest
    mockTrialGroup.findMany.mockResolvedValueOnce(sourceTrialGroups).mockResolvedValueOnce([]); // source then dest
    mockCtmlSchema.findMany.mockResolvedValueOnce(sourceSchemas).mockResolvedValueOnce([]); // source then dest
    mockTrial.findFirst.mockResolvedValue(null);

    // Mock create operations
    mockUser.create.mockImplementation((data) => Promise.resolve({ ...data.data, id: 1101 }));
    mockTrialGroup.create.mockImplementation((data) => Promise.resolve({ ...data.data, id: 1001 }));
    mockCtmlSchema.create.mockImplementation((data) => Promise.resolve({ ...data.data, id: 1201 }));
    mockTrial.create.mockImplementation((data) => Promise.resolve({ ...data.data, id: 1301 }));
    mockCtmlJson.create.mockImplementation((data) => Promise.resolve({ ...data.data, id: 1401 }));

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await main();

    expect(consoleSpy).toHaveBeenCalledWith('Creating user in destination DB: user1@example.com');
    expect(consoleSpy).toHaveBeenCalledWith('Creating trial group in destination DB: Group A');
    expect(consoleSpy).toHaveBeenCalledWith('Successfully copied: 1 trials');
    expect(mockTrial.create).toHaveBeenCalledTimes(1);
    expect(mockTrial.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        createdAt: trialCreatedAt,
        updatedAt: trialUpdatedAt,
      }),
    }));
    expect(mockCtmlJson.create).toHaveBeenCalledTimes(1);
    expect(mockCtmlJson.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        createdAt: ctmlJsonCreatedAt,
        updatedAt: ctmlJsonUpdatedAt,
      }),
    }));
    expect(mockDisconnect).toHaveBeenCalledTimes(2);
    consoleSpy.mockRestore();
  });

  it('should correctly map existing data and handle ID differences', async () => {
    const sourceTrialGroups = [{ id: 1, name: 'Group A' }];
    const sourceUsers = [{ id: 101, email: 'user1@example.com', name: 'User One', username: 'user1', first_name: 'User', last_name: 'One', email_verified: true, refresh_token: null, keycloak_id: 'kc123' }];
    const sourceSchemas = [{ id: 201, version: 1, schema: '{}' }];
    const sourceTrials = [
      {
        id: 301,
        nct_id: 'NCT001',
        trial_internal_id: 'TRIAL001',
        trial_groupId: 1,
        modifiedById: 101,
        userId: 101,
        nickname: 'Test Trial',
        principal_investigator: 'Dr. Test',
        status: 'DRAFT',
        protocol_no: 'P001',
        trial_status: 'PENDING',
        matchSentDate: null,
        createdAt: new Date('2024-01-15T10:00:00Z'),
        updatedAt: new Date('2024-02-20T15:30:00Z'),
        ctml_schemas: [{ id: 201, version: 1 }],
        ctml_jsons: [{ id: 401, trialId: 301, versionId: 201, data: '{}', has_match: false, createdAt: new Date('2024-01-15T10:05:00Z'), updatedAt: new Date('2024-02-20T15:35:00Z') }],
      },
    ];

    // Mock prompts
    promptsMock.mockResolvedValueOnce({ selection: 1 });
    promptsMock.mockResolvedValueOnce({ databaseUrl: 'dest-url', encryptionKey: 'k1.aesgcm256.dest-key' });

    // Mock findMany calls
    mockTrialGroup.findMany.mockResolvedValueOnce(sourceTrialGroups); // Initial fetch
    mockTrial.findMany.mockResolvedValueOnce(sourceTrials);
    mockUser.findMany.mockResolvedValueOnce(sourceUsers).mockResolvedValueOnce([{ id: 9901, email: 'user1@example.com' }]); // source then dest
    mockTrialGroup.findMany.mockResolvedValueOnce(sourceTrialGroups).mockResolvedValueOnce([{ id: 9902, name: 'Group A' }]); // source then dest
    mockCtmlSchema.findMany.mockResolvedValueOnce(sourceSchemas).mockResolvedValueOnce([]); // source then dest
    mockTrial.findFirst.mockResolvedValue(null);

    // Mock create operations
    mockCtmlSchema.create.mockImplementation((data) => Promise.resolve({ ...data.data, id: 9903 }));
    mockTrial.create.mockImplementation((data) => Promise.resolve({ ...data.data, id: 9904 }));
    mockCtmlJson.create.mockImplementation((data) => Promise.resolve({ ...data.data, id: 9905 }));

    await main();

    expect(mockUser.create).not.toHaveBeenCalled();
    expect(mockTrialGroup.create).not.toHaveBeenCalled();
    expect(mockTrial.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ trial_groupId: 9902, modifiedById: 9901, userId: 9901 }),
    }));
    expect(mockDisconnect).toHaveBeenCalledTimes(2);
  });

  it('should skip trials that already exist in the destination DB', async () => {
    const sourceTrialGroups = [{ id: 1, name: 'Group A' }];
    const sourceUsers = [{ id: 101, email: 'user1@example.com', name: 'User One', username: 'user1', first_name: 'User', last_name: 'One', email_verified: true, refresh_token: null, keycloak_id: 'kc123' }];
    const sourceSchemas = [{ id: 201, version: 1, schema: '{}' }];
    const sourceTrials = [
      {
        id: 301,
        nct_id: 'NCT001',
        trial_internal_id: 'TRIAL001',
        trial_groupId: 1,
        modifiedById: 101,
        userId: 101,
        nickname: 'Test Trial',
        principal_investigator: 'Dr. Test',
        status: 'DRAFT',
        protocol_no: 'P001',
        trial_status: 'PENDING',
        matchSentDate: null,
        createdAt: new Date('2024-01-15T10:00:00Z'),
        updatedAt: new Date('2024-02-20T15:30:00Z'),
        ctml_schemas: [{ id: 201, version: 1 }],
        ctml_jsons: [{ id: 401, trialId: 301, versionId: 201, data: '{}', has_match: false, createdAt: new Date('2024-01-15T10:05:00Z'), updatedAt: new Date('2024-02-20T15:35:00Z') }],
      },
    ];

    // Mock prompts
    promptsMock.mockResolvedValueOnce({ selection: 1 });
    promptsMock.mockResolvedValueOnce({ databaseUrl: 'dest-url', encryptionKey: 'k1.aesgcm256.dest-key' });

    // Mock findMany calls
    mockTrialGroup.findMany.mockResolvedValueOnce(sourceTrialGroups); // Initial fetch
    mockTrial.findMany.mockResolvedValueOnce(sourceTrials);
    mockUser.findMany.mockResolvedValueOnce(sourceUsers).mockResolvedValueOnce([]); // source then dest
    mockTrialGroup.findMany.mockResolvedValueOnce(sourceTrialGroups).mockResolvedValueOnce([]); // source then dest
    mockCtmlSchema.findMany.mockResolvedValueOnce(sourceSchemas).mockResolvedValueOnce([]); // source then dest
    mockTrial.findFirst.mockResolvedValue({ id: 9904, trial_internal_id: 'TRIAL001' }); // Trial exists

    // Mock create operations
    mockUser.create.mockImplementation((data) => Promise.resolve({ ...data.data, id: 1101 }));
    mockTrialGroup.create.mockImplementation((data) => Promise.resolve({ ...data.data, id: 1001 }));
    mockCtmlSchema.create.mockImplementation((data) => Promise.resolve({ ...data.data, id: 1201 }));

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await main();

    expect(consoleSpy).toHaveBeenCalledWith('Skipping trial: NCT001 (already exists in destination)');
    expect(consoleSpy).toHaveBeenCalledWith('Skipped (already exist): 1 trials');
    expect(mockTrial.create).not.toHaveBeenCalled();
    expect(mockCtmlJson.create).not.toHaveBeenCalled();
    expect(mockDisconnect).toHaveBeenCalledTimes(2);
    consoleSpy.mockRestore();
  });

  it('should handle errors when copying individual trials and continue', async () => {
    const sourceTrialGroups = [{ id: 1, name: 'Group A' }];
    const sourceUsers = [{ id: 101, email: 'user1@example.com', name: 'User One', username: 'user1', first_name: 'User', last_name: 'One', email_verified: true, refresh_token: null, keycloak_id: 'kc123' }];
    const sourceSchemas = [{ id: 201, version: 1, schema: '{}' }];
    const sourceTrials = [
      {
        id: 301,
        nct_id: 'NCT001',
        trial_internal_id: 'TRIAL001',
        trial_groupId: 1,
        modifiedById: 101,
        userId: 101,
        nickname: 'Test Trial',
        principal_investigator: 'Dr. Test',
        status: 'DRAFT',
        protocol_no: 'P001',
        trial_status: 'PENDING',
        matchSentDate: null,
        createdAt: new Date('2024-01-15T10:00:00Z'),
        updatedAt: new Date('2024-02-20T15:30:00Z'),
        ctml_schemas: [{ id: 201, version: 1 }],
        ctml_jsons: [{ id: 401, trialId: 301, versionId: 201, data: '{}', has_match: false, createdAt: new Date('2024-01-15T10:05:00Z'), updatedAt: new Date('2024-02-20T15:35:00Z') }],
      },
    ];

    // Mock prompts
    promptsMock.mockResolvedValueOnce({ selection: 1 });
    promptsMock.mockResolvedValueOnce({ databaseUrl: 'dest-url', encryptionKey: 'k1.aesgcm256.dest-key' });

    // Mock findMany calls
    mockTrialGroup.findMany.mockResolvedValueOnce(sourceTrialGroups); // Initial fetch
    mockTrial.findMany.mockResolvedValueOnce(sourceTrials);
    mockUser.findMany.mockResolvedValueOnce(sourceUsers).mockResolvedValueOnce([]); // source then dest
    mockTrialGroup.findMany.mockResolvedValueOnce(sourceTrialGroups).mockResolvedValueOnce([]); // source then dest
    mockCtmlSchema.findMany.mockResolvedValueOnce(sourceSchemas).mockResolvedValueOnce([]); // source then dest
    mockTrial.findFirst.mockResolvedValue(null);

    // Mock create operations
    mockUser.create.mockImplementation((data) => Promise.resolve({ ...data.data, id: 1101 }));
    mockTrialGroup.create.mockImplementation((data) => Promise.resolve({ ...data.data, id: 1001 }));
    mockCtmlSchema.create.mockImplementation((data) => Promise.resolve({ ...data.data, id: 1201 }));

    // Mock transaction to throw error
    mockTransaction.mockRejectedValueOnce(new Error('Database error'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await main();

    expect(consoleErrorSpy).toHaveBeenCalledWith('✗ Failed to copy trial: NCT001', 'Database error');
    expect(consoleErrorSpy).toHaveBeenCalledWith('  Error details:', expect.any(Error));
    expect(consoleSpy).toHaveBeenCalledWith('Failed: 1 trials');
    consoleErrorSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});